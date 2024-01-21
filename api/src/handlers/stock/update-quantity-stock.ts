import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateStockQuantityHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const body = event.body ? JSON.parse(event.body) : null;
        const { id_ingredient, quantity } = body;

        const updatedItem = await prisma.stock.update({
            where: { id_ingredient },
            data: { quantity },
        });

        return {
            statusCode: 200,
            body: JSON.stringify(updatedItem),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    } finally {
        await prisma.$disconnect();
    }
};
