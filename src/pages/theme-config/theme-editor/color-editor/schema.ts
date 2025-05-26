import { z } from "zod/v3";

const schema = z.object({
  main: z.object({ dark: z.string().min(4), light: z.string().min(4) }),
  contrast: z.object({ dark: z.string().min(4), light: z.string().min(4) }),
});

export default schema;
