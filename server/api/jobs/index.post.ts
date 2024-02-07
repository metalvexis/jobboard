import { serverSupabaseServiceRole } from "#supabase/server";
import { zh } from "h3-zod";
import { zCreateWorkzagReq } from "~/utils/zods";
import type { Tables, Database } from "~/utils/supabase";

export default eventHandler(async (event) => {
  const sbclient = serverSupabaseServiceRole<Database>(event);

  readRawBody(event);

  const { email, ...rest } = await zh.useValidatedBody(
    event,
    zCreateWorkzagReq
  );

  let userId: number | null = null;
  const assertUser = await sbclient
    .from("users")
    .select("id, email")
    .eq("email", email);

  if (!assertUser.data?.length) {
    const newUser = (
      await sbclient.from("users").insert({ email }).returns<Tables<"users">>()
    ).data;
    userId = newUser ? newUser.id : null;

    console.log("created new user", newUser);
  }
  userId =
    assertUser.data?.length && assertUser.data ? assertUser.data[0].id : null;

  const newJob: Partial<Tables<"jobs">> = {
    user_id: userId,
    ...rest,
  };

  if (assertUser.count === 0) {
    // TODO: notify moderators of new user posting
  }

  const newJobInserted = await sbclient.from("jobs").insert(newJob).select();

  console.log("jobs", newJobInserted);

  return {
    jobId: newJobInserted.data?.[0].id,
  };
});
