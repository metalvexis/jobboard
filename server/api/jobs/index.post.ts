import { serverSupabaseServiceRole } from "#supabase/server";
import { zh } from "h3-zod";
import { zCreateWorkzagReq } from "~/utils/zods";
import type { Tables, Database } from "~/utils/supabase";
import { USER_ROLES, APPROVAL_STATUS, NOTIF_QUEUE } from "~/utils/constants";
import { publishToQueue } from "~/utils/lib";

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
        .returns<Tables<"users">>()
    ).data;
    userId = newUser ? newUser.id : null;

    console.log("created new user", newUser);
  }
  userId =
    assertUser.data?.length && assertUser.data ? assertUser.data[0].id : null;

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
      const notifData = JSON.stringify({
        receivers: mods,
        job: newJob,
      });

      console.log("sending notif to mods", notifData);
      await publishToQueue(NOTIF_QUEUE, notifData);
    }
  }

  return {
    jobId: newJobInserted.data?.[0].id,
  };
});
