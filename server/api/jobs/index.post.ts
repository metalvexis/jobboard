import { zh } from "h3-zod";
import { zWorkzag } from "~/utils/zods";
export default eventHandler(async (event) => {
  readRawBody(event);

  zh.useValidatedBody(event, zWorkzag);
  return `Jobs API handler`;
});
