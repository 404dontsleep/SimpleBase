const message = {
  EMAIL_VERIFICATION_SUCCESS: "Email verification success",
  REGISTER_SUCCESS: "Register success",
  LOGIN_SUCCESS: "Login success",
  SEND_EMAIL_SUCCESS: "Send email success",
  RESET_PASSWORD_SUCCESS: "Reset password success",
  USER_CREATED_SUCCESSFULLY: "User created successfully",
  USER_UPDATED_SUCCESSFULLY: "User updated successfully",
};

export default function MyMessage(_message: keyof typeof message) {
  return _message;
}
