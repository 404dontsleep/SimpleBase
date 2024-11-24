const message = {
  EMAIL_VERIFICATION_SUCCESS: "Email verification success",
  REGISTER_SUCCESS: "Register success",
  LOGIN_SUCCESS: "Login success",
  SEND_EMAIL_SUCCESS: "Send email success",
};

export default function MyMessage(_message: keyof typeof message) {
  return _message;
}
