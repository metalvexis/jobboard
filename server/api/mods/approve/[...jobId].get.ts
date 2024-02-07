import { assert_job } from "~/utils/assert_job";
import { assert_jwt } from "~/utils/assert_jwt";
import type { AuthKey } from "~/utils/zods";
import { Tables } from "~/utils/supabase";

export default eventHandler({
  onRequest: [assert_job, assert_jwt],
  async handler(event) {
    const authKey = event.context.authKey as AuthKey;
    const job = event.context.job as Tables<"jobs">;
    console.log("context.job", job);
    return `Mods approve handler`;
  },
});