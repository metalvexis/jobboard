import { assert_job } from "~/utils/assert_job";
import { assert_jwt } from "~/utils/assert_jwt";
import type { AuthKey } from "~/utils/zods";

export default eventHandler({
  onRequest: [assert_job, assert_jwt],
  async handler(event) {
    const authKey = event.context.authKey as AuthKey;
    console.log("context.job", event.context.mods);
    return `Mods mark as spam handler`;
  },
});
