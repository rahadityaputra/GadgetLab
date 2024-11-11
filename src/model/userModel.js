import { DataTypes } from "sequelize";
import { sequelize } from "../configuration/databasev2.js";


export const User = sequelize.define(
    'User',
    {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            unique : true
        }, 
        
        password : {
            type : DataTypes.STRING,
            allowNull : false,
            
        }


    },
    {
        tableName : 'users'
    }

);






User.sync()