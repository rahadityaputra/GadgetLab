import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rahadityaputra',
    database: 'gadgetlab_database'
});


export const query = async (sqlQuery) => {
    try {
        const [results, fields] = await connection.query(sqlQuery);
        return results;

    } catch (error) {
        return error;
    }
};






