import { assert_job } from "~/utils/assert_job";

export default eventHandler({
  onRequest: [assert_job],
  async handler(event) {
    const job = event.context.job;

    return {
      job,
    };
  },
});
