import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getStockHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getStock only accepts GET method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    try {
        const items = await prisma.stock.findMany();

        const response = {
            statusCode: 200,
            body: JSON.stringify(items),
        };
        console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

        return response;
    } catch (err) {
        console.error('Error', err);

        const response = {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };

        return response;
    }
};
