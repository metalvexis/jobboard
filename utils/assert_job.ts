import { serverSupabaseServiceRole } from "#supabase/server";
import type { Tables, Database } from "~/utils/supabase";
import { zGetWorkzagReq } from "~/utils/zods";

export const assert_job = defineRequestMiddleware(async (event) => {
  const jobId = getRouterParam(event, "jobId");

  const reqParams = {
    jobId,
  };

  const validParams = await zGetWorkzagReq.parseAsync(reqParams);
  console.log("validParams", validParams);
  const sbclient = serverSupabaseServiceRole<Database>(event);
  const job: Partial<Tables<"jobs">> | null = (
    await sbclient.from("jobs").select("*").eq("id", validParams.jobId).single()
  ).data;

  console.log("job", job);
  if (!job) {
    throw createError({
      statusCode: 404,
      message: "job not found",
    });
  }

  event.context.job = job;
});
