import { getStockHandler } from './src/handlers/stock/get-stock';
import { addItemToStockHandler } from './src/handlers/stock/add-item-stock';
import { deleteItemFromStockHandler } from './src/handlers/stock/delete-item-stock';
import schema from './prisma/schema.prisma';
import x from './node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node';

if (process.env.NODE_ENV !== 'production') {
    console.debug(schema);
    console.debug(x);
}

export { getStockHandler, addItemToStockHandler, deleteItemFromStockHandler };
