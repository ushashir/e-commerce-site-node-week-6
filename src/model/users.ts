import { DataTypes, Model } from 'sequelize';

import db from '../config/db.config';

interface UserAttributes {
    id: string;
    fullName: string;
    gender: string;
    email: string;
    phone: string;
    address: string,
    password: string;
    
}

export class UserInstance extends 
    Model<UserAttributes>{}

UserInstance.init(
    {
    id: {
            type: DataTypes.STRING,
            primaryKey: true,
        allowNull:false
        },
    fullName: {
            type: DataTypes.STRING,
        allowNull: false,
            validate: {
            notNull: {
                msg: "First name is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
        },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Last name is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }   
        },
    email: {
            type: DataTypes.STRING,
            // primaryKey: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Email is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
        },
    phone: {
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
     address: {
            type: DataTypes.STRING,
        allowNull: false,
            validate: {
            notNull: {
                msg: "Address is required"
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
    tableName: 'users'
    
});