import express from 'express';
import { getAllEmails, saveEmail, deleteEmail } from '../controllers/emails';
import { userInputValidation } from '../validation/userInputValidation';

const emailRoutes = express.Router();


emailRoutes.get('/emails', getAllEmails);

emailRoutes.post('/emails', userInputValidation, saveEmail);

emailRoutes.delete('/emails/:email', deleteEmail)


export default emailRoutes;