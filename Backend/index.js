import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import userData from './routes/login/userData.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/userData', userData);

const CONNECTION_URL ='mongodb+srv://Yash:yash@cluster0.x6ffk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 1000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
	.then(()=> app.listen(PORT, console.log('Server running')))
	.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);