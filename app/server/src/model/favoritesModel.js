import { DataTypes } from "sequelize";
import { sequelize } from "../configuration/databasev2.js";


export const Favorite = sequelize.define(
    'favorite',
    {
        id_favorite : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true,
        }, 

        id_user : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        id_device : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        device_img : {
            type : DataTypes.STRING,
            allowNull : false,

        },
        device_name : {
            type : DataTypes.STRING,
            allowNull : false,
        }
    },
    {
        tableName : 'favorites'
    }
)

