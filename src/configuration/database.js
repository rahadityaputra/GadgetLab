import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.USERNAME,
    password: process.env.PASSWORD || "",
    database: process.env.DATABASE_NAME
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






