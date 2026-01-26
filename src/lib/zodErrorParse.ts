import { ZodError } from "zod/v3";

export function zodErrorParse(error: ZodError<unknown>) {
  const simplifiedErrors = error.errors.map((err) => ({
    code: err.code,
    path: err.path,
  }));

  console.log(simplifiedErrors);

  return simplifiedErrors;
}
