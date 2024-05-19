export interface ApiError {
  response: {
    data: {
      failureReason: string;
    };
    status: number;
  };
}

export function getFailureReason(error: any): string | undefined {
  return isApiError(error) ? error.response.data.failureReason : undefined;
}

function isApiError(error: any): error is ApiError {
  return Boolean(error?.response?.data?.failureReason);
}
