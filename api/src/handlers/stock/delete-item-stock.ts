import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteItemFromStockHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'DELETE') {
        throw new Error(`Only delete method accepted, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    try {
        const { pathParameters } = event;
        const itemId = pathParameters?.id;

        if (!itemId) {
            throw new Error('Missing ID in path parameters');
        }

        await prisma.stock.delete({
            where: {
                id_ingredient: Number(itemId),
            },
        });

        const response = {
            statusCode: 200,
            body: `Ingredient with id=${pathParameters.id} removed from stock.`,
        };

        console.info(`response from: ${event.path} statusCode: ${response.statusCode}`);
        return response;
    } catch (error) {
        console.error('Error', error);

        const response = {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };

        return response;
    } finally {
        await prisma.$disconnect();
    }
};
