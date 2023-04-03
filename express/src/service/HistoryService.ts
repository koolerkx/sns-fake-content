// import { History, HistoryModel } from "../schemas/History.schema";
import { prisma } from "../utils/db";

export class HistoryService {

    async getAllHistory() {
        return await prisma.histories.findMany({
            orderBy: {
                createdAt: 'desc',
            }
        });
    }

    async addHistory(obj: { score: number; text: string; type: string; }) {
        return await prisma.histories.create({
            data: {
                ...obj,
                createdAt: new Date(),
                label: obj.score > .5 ? 'true' : 'false',
            }
        });
    }

    async removeHistory(id: string) {
        return await prisma.histories.delete({
            where: {
                id,
            }
        });
    }

    async resetHistoryList() {
        return await prisma.histories.deleteMany();
    }

}