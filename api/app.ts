import { getStockHandler } from './src/handlers/stock/get-stock';
import { addItemToStockHandler } from './src/handlers/stock/add-item-stock';
import { deleteItemFromStockHandler } from './src/handlers/stock/delete-item-stock';
import { updateStockQuantityHandler } from './src/handlers/stock/update-quantity-stock';
import { getItemFromStockHandler } from './src/handlers/stock/get-item-stock';

import schema from './prisma/schema.prisma';
import x from './node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node';
import y from './node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node';

if (process.env.NODE_ENV !== 'production') {
    console.debug(schema);
    console.debug(x);
    console.debug(y);
}

export {
    getStockHandler,
    addItemToStockHandler,
    deleteItemFromStockHandler,
    updateStockQuantityHandler,
    getItemFromStockHandler,
};
