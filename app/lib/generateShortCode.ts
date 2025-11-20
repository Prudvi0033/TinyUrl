import crypto from "crypto";
import { prisma } from "./prisma";

export const generateShortCode = async (email: string) => {
  while (true) {
    const salt = crypto.randomBytes(8).toString("hex");
    const data = email + Date.now() + salt;

    const hash = crypto
      .createHash("sha256")
      .update(data)
      .digest("hex");

    const code = hash.substring(0, 6).toLowerCase();

    const exists = await prisma.link.findUnique({
      where: { code }
    });

    if (!exists) return code;
  }
};
