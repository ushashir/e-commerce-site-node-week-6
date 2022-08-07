import { DataTypes, Model } from 'sequelize';

import db from '../config/db.config';

interface TodoAttributes {
    id: string;
    title: string;
    completed: boolean
}

export class ProductInstance extends 
    Model<TodoAttributes>{}

ProductInstance.init(
    {
    id: {
            type: DataTypes.STRING,
            primaryKey: true,
        allowNull:false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
    sequelize: db,
    tableName: 'todo'
    
});