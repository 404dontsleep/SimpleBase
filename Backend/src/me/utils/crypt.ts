import { createHash } from "crypto";
export function sha256(data: string, salt?: string) {
  return createHash("sha256")
    .update(data + (salt || ""))
    .digest("hex");
}

export function randomString(length: number) {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
