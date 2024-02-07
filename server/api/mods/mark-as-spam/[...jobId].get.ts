import { serverSupabaseServiceRole } from "#supabase/server";
import type { Tables, Database } from "~/utils/supabase";
import { assert_job } from "~/utils/assert_job";
import { assert_jwt } from "~/utils/assert_jwt";
import type { AuthKey } from "~/utils/zods";
import { APPROVAL_STATUS } from "~/utils/constants";

export default eventHandler({
  onRequest: [assert_job, assert_jwt],
  async handler(event) {
    const job = event.context.job as Tables<"jobs">;

    const sbclient = serverSupabaseServiceRole<Database>(event);
    const spamPost = (
      await sbclient
        .from("jobs")
        .update({ approval_status: APPROVAL_STATUS.SPAM })
        .eq("id", job.id)
        .select()
        .single()
    ).data;

    return {
      job: spamPost,
    };
  },
});
