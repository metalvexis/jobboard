import { serverSupabaseServiceRole } from "#supabase/server";
import type { Tables, Database } from "~/utils/supabase";
import { zh } from "h3-zod";
import { zGetWorkzagListReq } from "~/utils/zods";
import type { GetWorkzagListReq, GetWorkzagListRes } from "~/utils/zods";

const PER_PAGE = 10;

export default eventHandler(async (event): Promise<GetWorkzagListRes> => {
  await zh.useValidatedQuery(event, zGetWorkzagListReq);

  const sbclient = serverSupabaseServiceRole<Database>(event);

  const { page } = getQuery<GetWorkzagListReq>(event);

  const startIndex = 0 * (parseInt(page || "") || 0);
  const lastIndex = PER_PAGE * (parseInt(page || "") || 1);
  console.log("range", startIndex, lastIndex);
  const allJobsCount = await sbclient
    .from("jobs")
    .select("id", { count: "exact", head: true });
  const totalJobCount = allJobsCount.count || 0;
  const jobs = (
    await sbclient
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false })
      .range(startIndex, lastIndex)
  ).data;

  return {
    jobs,
    totalJobCount,
    totalPages: Math.ceil(totalJobCount / PER_PAGE),
  };
});
