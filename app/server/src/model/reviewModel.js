import { DataTypes } from "sequelize";
import { sequelize } from "../configuration/databasev2.js";


export const Review = sequelize.define(
    'Review', 
    {
        id_review : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,

        },
        
        review_date : {
            type : DataTypes.DATEONLY,
            allowNull : false,
            defaultValue :  DataTypes.NOW
        },

        review_text : {
            type : DataTypes.TEXT,
            allowNull : false
        },

        id_device : {
            type : DataTypes.STRING,
            allowNull : false,
        },

        id_user :{
            type : DataTypes.INTEGER,
            allowNull : false,
        },

        rating : {
            type: DataTypes.INTEGER,
            allowNull : false,
        }


    }, 
    {
        tableName : 'reviews'
    }
)
