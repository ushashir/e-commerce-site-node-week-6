"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const products_1 = require("./products");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Full name is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Gender is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Phone number is required"
            },
            notEmpty: {
                msg: "Enter a field"
            }
        }
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.BOOLEAN,
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
    sequelize: db_config_1.default,
    tableName: 'users'
});
UserInstance.hasMany(products_1.ProductInstance, {
    foreignKey: "userId",
    as: "products"
});
products_1.ProductInstance.belongsTo(UserInstance, {
    foreignKey: 'userId',
    as: 'user'
});
