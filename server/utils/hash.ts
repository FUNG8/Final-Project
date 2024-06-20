import bcrypt from "bcrypt";

const SALT_ROUND = 4;

export async function hashPassword(passwordInput: string) {
  let passwordHash = await bcrypt.hash(passwordInput, SALT_ROUND);
  return passwordHash;
}

export async function comparePassword(
  passwordInput: string,
  passwordHash: string
) {
  console.log("check 3", passwordInput, passwordHash);
  let result = await bcrypt.compare(passwordInput, passwordHash);

  return result;
}
