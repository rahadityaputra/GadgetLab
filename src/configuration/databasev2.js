import { Sequelize } from "sequelize";
import dotenv from 'dotenv/config';




export const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USERNAME_MYSQL, process.env.PASSWORD_MYSQL, {
    host: 'localhost',
    dialect: 'mariadb'
});


export const  test= async ()=> {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

}


