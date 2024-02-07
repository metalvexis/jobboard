import { serverSupabaseServiceRole } from "#supabase/server";
import type { Tables, Database } from "~/utils/supabase";
import { zh } from "h3-zod";
import { zGetWorkzagListReq } from "~/utils/zods";
import type { GetWorkzagListReq } from "~/utils/zods";

export default eventHandler(async (event) => {
  await zh.useValidatedQuery(event, zGetWorkzagListReq);

  const sbclient = serverSupabaseServiceRole<Database>(event);

  const { page } = getQuery<GetWorkzagListReq>(event);

  const startIndex = 0 * (parseInt(page) || 0);
  const lastIndex = 10 * (parseInt(page) || 1);
  console.log("range", startIndex, lastIndex);
  const jobs = (
    await sbclient
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false })
      .range(startIndex, lastIndex)
  ).data;

  return {
    jobs,
  };
});
