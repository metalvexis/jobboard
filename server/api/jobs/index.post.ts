import { serverSupabaseServiceRole } from "#supabase/server";
import { zh } from "h3-zod";
import { zCreateWorkzagReq } from "~/utils/zods";
import type { NotificationReq, JobDescription } from "~/utils/zods";
import type { Tables, Database } from "~/utils/supabase";
import { USER_ROLES, APPROVAL_STATUS } from "~/utils/constants";
import type { IApprovalStatus } from "~/utils/constants";
import { publishToQueue } from "~/utils/publish_to_queue";

const QUEUE_NAME = process.env.NOTIF_QUEUE || "NOTIF_QUEUE";

export default eventHandler(async (event) => {
  const { email, ...rest } = await zh.useValidatedBody(
    event,
    zCreateWorkzagReq
  );

  const sbclient = serverSupabaseServiceRole<Database>(event);
  let userId: number | null = null;
  let approval_status: IApprovalStatus = APPROVAL_STATUS.PENDING;

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
    userId = assertUser.data[0].id;
    // inherit approval status from first post
    const assertUserFirstPost = await sbclient
      .from("jobs")
      .select("approval_status", { count: "exact", head: true })
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .single();
    approval_status =
      (assertUserFirstPost.data?.approval_status as IApprovalStatus) ||
      APPROVAL_STATUS.PENDING;
  }

  const typecastedJd = rest.job_descriptions?.[
    "jobDescription"
  ] as JobDescription[];
  const jd: JobDescription[] = typecastedJd || [];
  const newJob: Partial<Tables<"jobs">> = {
    ...rest,
    user_id: userId,
    approval_status,
    job_descriptions: {
      jobDescription: jd,
    },
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
