import { serverSupabaseServiceRole } from "#supabase/server";
import { zh } from "h3-zod";
import { zCreateWorkzagReq } from "~/utils/zods";
import type { NotificationReq } from "~/utils/zods";
import type { Tables, Database } from "~/utils/supabase";
import { USER_ROLES, APPROVAL_STATUS } from "~/utils/constants";

const QUEUE_NAME = process.env.NOTIF_QUEUE || "NOTIF_QUEUE";

export default eventHandler(async (event) => {
  const { email, ...rest } = await zh.useValidatedBody(
    event,
    zCreateWorkzagReq
  );

  const sbclient = serverSupabaseServiceRole<Database>(event);
  let userId: number | null = null;

  // check if user exists
  const assertUser = await sbclient
    .from("users")
    .select("id, email")
    .eq("email", email);

  // create new user
  if (!assertUser.data?.length) {
    const newUser = (
      await sbclient
        .from("users")
        .insert({
          role: USER_ROLES.USER,
          email,
        })
        .select()
    ).data;

    userId = newUser?.[0] ? newUser[0].id : null;

    console.log("created new user", newUser);
  } else {
    userId = assertUser.data[0].id || null;
  }

  const newJob: Partial<Tables<"jobs">> = {
    user_id: userId,
    approval_status: APPROVAL_STATUS.PENDING,
    ...rest,
  };

  const newJobInserted = await sbclient.from("jobs").insert(newJob).select();

  console.log("job created", newJobInserted);

  if (!assertUser.data?.length) {
    // Notify moderators of new user posting
    const mods = (
      await sbclient
        .from("users")
        .select("id, email")
        .eq("role", USER_ROLES.MOD)
    ).data;

    if (mods) {
      const notifData: NotificationReq = {
        receivers: mods,
        job: newJobInserted.data?.[0] || {},
        user: email,
      };
      const notifDataStr = JSON.stringify(notifData);
      console.log("sending notif to mods", notifDataStr);
      await publishToQueue(QUEUE_NAME, notifDataStr);
    }
  }

  return {
    jobId: newJobInserted.data?.[0].id,
  };
});
