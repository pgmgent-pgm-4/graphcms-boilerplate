export const handleHTTPError = (error, next) => next(error);

export function HTTPError(message, statusCode) {
  const instance = new Error(message);
  instance.statusCode = statusCode;

  return instance;
}
