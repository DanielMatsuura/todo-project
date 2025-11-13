import axios from "axios";

export const GetErrorMessage = (error: unknown) => {
  const message =
    error instanceof Error
      ? error.message
      : "An unexpected error occurred.";

  return message;
}

export const GetErrorMessageAxios = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = (error.response?.data)?.message ?? error.message;
    return message;
  }
  if (error instanceof Error) throw error;
  return "An unexpected error occurred";
}