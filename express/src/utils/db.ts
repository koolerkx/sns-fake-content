import { PrismaClient } from "@prisma/client";

export const prisma = (() => {
    const tmp =  new PrismaClient();
    tmp.$connect();
    return tmp;
})();
