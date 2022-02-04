import { Emails } from '../models/emails';
import { insertEmail, getEmails, deleteEmailFromTable } from '../queries';

export const getAllEmails = async (req, res) => {
    try{
        const emails = await getEmails();
        res.status(200).send({emails});
    } catch (err) {
        res.status(500).send({status: 'error'});
    }
    
}

export const saveEmail = async (req, res) => {
    try {
        const emailModel = new Emails(req.body.email, req.body.email.split('@')[1].split('.')[0]);
        await insertEmail([emailModel.email, emailModel.provider]);
        res.status(200).send({status: 'success'});
    } catch (err) {
        console.log(err);
    }
}

export const deleteEmail = async (req, res) => {
    try {
        const email = req.params.email;
        await deleteEmailFromTable(email);
        const emails = await getEmails();
        res.status(200).send({status: 'success', emails});
    } catch(err) {
        res.status(500).send({status: 'error'});
    }
}