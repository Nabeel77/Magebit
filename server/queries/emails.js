import { performQueryWithParams } from '../database/connection';

export const insertEmail = async (data) => {
    try {
        const query = `INSERT INTO emails(email, provider, added) VALUES(?, ?, Now());`;
        await performQueryWithParams(query, data);
    } catch (err) {
        
    }
}

export const getEmails = async () => {
    try {
        const query = `SELECT email, provider, added from emails ORDER BY added`;
        const result = await performQueryWithParams(query);
        return result;
    } catch (err) {

    }
}

export const deleteEmailFromTable = async (email) => {
    try {
        const query = `DELETE FROM emails WHERE email = '${email}'`;
        await performQueryWithParams(query)
    } catch(err) {

    }
}