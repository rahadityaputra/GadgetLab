import mysql from 'mysql2/promise';
import dotenv from 'dotenv/config';


const connection = await mysql.createConnection({
    host: `${process.env.HOSTNAME_MYSQL}`,
    user: `${process.env.USERNAME_MYSQL}`,
    password:`${process.env.PASSWORD_MYSQL}`,
    database: `${process.env.DATABASE_NAME}`
});


export const query = async (sqlQuery, values = []) => {
    try {
        const [results, fields] = await connection.execute(sqlQuery, values);
        console.log(results, fields);
        return results;

    } catch (error) {
        throw  error;
    }
};






