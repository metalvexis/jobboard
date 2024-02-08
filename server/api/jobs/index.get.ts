import { serverSupabaseServiceRole } from "#supabase/server";
import type { Tables, Database } from "~/utils/supabase";
import { zh } from "h3-zod";
import { zGetWorkzagListReq } from "~/utils/zods";
import type { GetWorkzagListReq, GetWorkzagListRes } from "~/utils/zods";
import { APPROVAL_STATUS } from "~/utils/constants";
const PER_PAGE = 10;

export default eventHandler(async (event): Promise<GetWorkzagListRes> => {
  await zh.useValidatedQuery(event, zGetWorkzagListReq);

  const sbclient = serverSupabaseServiceRole<Database>(event);

  const { page, approval_status } = getQuery<GetWorkzagListReq>(event);

  const startIndex = PER_PAGE * (parseInt(page || "") || 0);
  const lastIndex = startIndex + PER_PAGE - 1;

  const allJobsCount = await sbclient
    .from("jobs")
    .select("id", { count: "exact", head: true })
    .eq("approval_status", approval_status || APPROVAL_STATUS.APPROVED);
  const totalJobCount = allJobsCount.count || 0;
  const jobs =
    (
      await sbclient
        .from("jobs")
        .select("*")
        .eq("approval_status", approval_status || APPROVAL_STATUS.APPROVED)
        .order("created_at", { ascending: false })
        .range(startIndex, lastIndex)
    ).data || [];

  return {
    jobs,
    totalJobCount,
    totalPages: Math.ceil(totalJobCount / PER_PAGE),
  };
});
