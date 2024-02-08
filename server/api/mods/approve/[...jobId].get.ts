import { serverSupabaseServiceRole } from "#supabase/server";
import type { Tables, Database } from "~/utils/supabase";
import { assert_job } from "~/utils/assert_job";
import { assert_jwt } from "~/utils/assert_jwt";
import { APPROVAL_STATUS } from "~/utils/constants";

export default eventHandler({
  onRequest: [assert_job, assert_jwt],
  async handler(event) {
    const job = event.context.job as Tables<"jobs">;

    const sbclient = serverSupabaseServiceRole<Database>(event);
    const targetPost = (
      await sbclient.from("jobs").select().eq("id", job.id).single()
    ).data;

    const userIdPoster = targetPost?.user_id || null;

    if (!userIdPoster) {
      throw createError({
        statusCode: 404,
        message: "User not found",
      });
    }

    const approvedPost = (
      await sbclient
        .from("jobs")
        .update({ approval_status: APPROVAL_STATUS.APPROVED })
        .eq("user_id", userIdPoster)
        .select()
    ).data;

    return {
      jobs: approvedPost,
    };
  },
});
