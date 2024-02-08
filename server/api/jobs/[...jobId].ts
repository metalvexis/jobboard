import { assert_job } from "~/utils/assert_job";
import type { Tables } from "~/utils/supabase";

export default eventHandler({
  onRequest: [assert_job],
  async handler(event) {
    const job: Partial<Tables<"jobs">> | null = event.context.job;

    return {
      job,
    };
  },
});
