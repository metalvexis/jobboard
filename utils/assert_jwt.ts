import { serverSupabaseServiceRole } from "#supabase/server";
import type { Tables, Database } from "~/utils/supabase";
import jwt from "jsonwebtoken";
import { zModsAuthReq } from "~/utils/zods";
import type { AuthKey } from "~/utils/zods";
import { USER_ROLES } from "~/utils/constants";

export const assert_jwt = defineRequestMiddleware(async (event) => {
  const q: AuthKey = getQuery(event);
  const job = event.context.job as Tables<"jobs">;
  const validParams = await zModsAuthReq.parseAsync(q);

  if (!job) {
    throw createError({ statusCode: 400 });
  }

  if (!process.env.JWT_MODS_SECRET) {
    console.error("JWT_MODS_SECRET is not set");
    throw createError({ statusCode: 500 });
  }

  //TODO: use this to generate jwt for testing
  const signedJwt = jwt.sign(
    {
      modId: 3,
      jobId: 3,
    },
    process.env.JWT_MODS_SECRET,
    { expiresIn: "48h" }
  );
  const b64signedJwt = Buffer.from(signedJwt).toString("base64");

  console.log("signedJwt base64", b64signedJwt);

  const utf8signedJwt = Buffer.from(validParams.authKey, "base64").toString(
    "utf-8"
  );

  try {
    const decodedJwt: AuthKey = jwt.verify(
      utf8signedJwt,
      process.env.JWT_MODS_SECRET
    ) as AuthKey;

    const sbclient = serverSupabaseServiceRole<Database>(event);
    const mod = (
      await sbclient
        .from("users")
        .select("*")
        .eq("id", decodedJwt.jobId)
        .single()
    ).data;

    if (mod?.role !== USER_ROLES.MOD) {
      throw createError({ statusCode: 403 });
    }

    // cast to string to avoid type coercion
    if (`${job.id}` !== `${decodedJwt.jobId}`) {
      throw createError({ statusCode: 403 });
    }

    decodedJwt.modId;
    event.context.authKey = decodedJwt;
  } catch (error) {
    throw error;
  }
});
