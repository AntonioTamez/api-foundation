export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details: Record<string, unknown>;
  };
}

export interface ValidationErrorDetail {
  field: string;
  message: string;
}
