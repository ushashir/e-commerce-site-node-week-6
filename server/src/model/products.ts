import { DataTypes, Model } from 'sequelize';

import db from '../config/db.config';


interface ProductsAttributes {
    id: string;
    productName: string;
    image: string,
    brand: string,
    category: string,
    description: string,
    price: string,
    countInStock: string,
    rating: string,
    numReviews: string,
    userId: string
}

export class ProductInstance extends 
    Model<ProductsAttributes>{}

ProductInstance.init(
    {
    id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
        allowNull:false
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        },
        brand: {
            type: DataTypes.STRING,
        },
         category: {
            type: DataTypes.STRING,
        },
         description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.STRING,
        },
         countInStock: {
            type: DataTypes.STRING,
        },
         rating: {
            type: DataTypes.STRING,
        },
        numReviews: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.STRING
        }
    }, {
    sequelize: db,
    tableName: 'products' 
});
