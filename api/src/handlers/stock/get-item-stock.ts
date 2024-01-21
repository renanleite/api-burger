import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getItemFromStockHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getStock only accepts GET method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    try {
        const { pathParameters } = event;
        const itemId = pathParameters?.id;

        const item = await prisma.stock.findUnique({
            where: {
                id_ingredient: Number(itemId),
            },
        });

        const response = {
            statusCode: 200,
            body: JSON.stringify(item),
        };

        return response;
    } catch (err) {
        console.error('Error', err);

        const response = {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };

        return response;
    } finally {
        await prisma.$disconnect();
    }
};
