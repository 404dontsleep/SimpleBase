const errors = {
  EMAIL_ALREADY_VERIFIED: "Email already verified",
  EMAIL_NOT_FOUND: "Email not found",
  EMAIL_BLOCKED: "Email blocked",
  EMAIL_ALREADY_EXISTS: "Email already exists",
  EMAIL_NOT_VERIFIED: "Email not verified",
  CODE_IS_REQUIRED: "Code is required",
  CODE_IS_INVALID: "Invalid code",

  LOGIN_REQUIRED: "Login is required",
  EMAIL_AND_PASSWORD_REQUIRED: "Email and password are required",
  EMAIL_OR_PASSWORD_INVALID: "Invalid email or password",

  REQUEST_RATE_LIMIT_EXCEEDED: "Request rate limit exceeded",
  PERMISSION_DENIED: "Permission denied",
};

export default function MyError(message: keyof typeof errors) {
  return new Error(message);
}
