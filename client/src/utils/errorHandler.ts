export const errorHandler = (err: unknown, message: string | undefined) => {
  if (err instanceof Error) {
    throw new Error(`${message}. ` + err.message);
  }
  throw new Error(`${message}. ` + err);
};
