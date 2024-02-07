import { serverSupabaseServiceRole } from "#supabase/server";
import type { Tables, Database } from "~/utils/supabase";

import { zGetWorkzagReq, GetWorkzagReq } from "~/utils/zods";
export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");

  const reqParams = {
    jobId: name || null,
  };

  const validParams = await zGetWorkzagReq.parseAsync(reqParams);

  const sbclient = serverSupabaseServiceRole<Database>(event);
  const job = (
    await sbclient.from("jobs").select("*").eq("id", validParams.jobId).single()
  ).data;

  if (!job) {
    throw createError({
      status: 404,
      message: "job not found",
    });
  }

  return {
    job,
  };
});
