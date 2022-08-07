import { DataTypes, Model } from 'sequelize';

import db from '../config/db.config';

interface TodoAttributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    password: any;
    
}

export class UserInstance extends 
    Model<TodoAttributes>{}

UserInstance.init(
    {
    id: {
            type: DataTypes.STRING,
            primaryKey: true,
        allowNull:false
        },
    firstName: {
            type: DataTypes.STRING,
        allowNull: false,
            validate: {
            notNull: {
                msg: "Password is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
        },
    lastName: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    email: {
            type: DataTypes.STRING,
            primaryKey: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        },
        },
    phoneNumber: {
            type: DataTypes.NUMBER,
        allowNull: false,
            validate: {
            notNull: {
                msg: "Password is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
        },
    password: {
            type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
        }
    }, {
    sequelize: db,
    tableName: 'todo'
    
});