import { DataTypes, Model } from 'sequelize';

import db from '../config/db.config';


interface ProductsAttributes {
    id: string;
    productName: string;
    image: string,
    brand: string,
    category: string,
    description: string,
    price: number,
    countInStock: number,
    rating: number,
    numReviews: number,
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
            type: DataTypes.NUMBER,
        },
         countInStock: {
            type: DataTypes.NUMBER,
        },
         rating: {
            type: DataTypes.NUMBER,
        },
        numReviews: {
            type: DataTypes.NUMBER,
        },
        userId: {
            type: DataTypes.STRING
        }
    }, {
    sequelize: db,
    tableName: 'products' 
});
