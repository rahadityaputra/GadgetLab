import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gadgetlab_database'
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






