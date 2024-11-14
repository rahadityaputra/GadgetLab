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
        id_phone : {
            type : DataTypes.STRING,
            allowNull : false,
        }
    },
    {
        tableName : 'favorites'
    }
)

