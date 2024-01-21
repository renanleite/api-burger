import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addItemToStockHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    console.info('received:', event);

    try {
        const requestData = event.body ? JSON.parse(event.body) : null;

        if (
            !requestData ||
            typeof requestData.ingredient_name !== 'string' ||
            typeof requestData.quantity !== 'number'
        ) {
            throw new Error('Invalid request data');
        }

        const newItem = await prisma.stock.create({
            data: {
                ingredient_name: requestData.ingredient_name,
                quantity: requestData.quantity,
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify(newItem),
        };
    } catch (err) {
        console.log('Error', err);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    } finally {
        await prisma.$disconnect();
    }
};
