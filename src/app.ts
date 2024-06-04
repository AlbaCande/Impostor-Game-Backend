import express from 'express';
import dotenv from 'dotenv';
import { generateDbUri } from './utils/uri';
import { connectToDb } from './db/connect';
import { seedModel } from './utils/seed-model';
import Word from './models/word';
import wordSeed from './seeds/word';
import router from './routes';
import cors from 'cors';

dotenv.config();
const FALLBACK_PORT = 3001;

const app = express();

app.use(cors());

const APP_PORT = process.env.APP_PORT || FALLBACK_PORT;

const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_NAME = process.env.DB_NAME as string;
const DB_APP_NAME = process.env.DB_APP_NAME as string;

app.get('/up', (_, res) => {
	res.send({ up: 'And running!' });
});

app.use(router);

app.listen(APP_PORT, async () => {
	const mongoDbUri = generateDbUri(DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_APP_NAME);

	try {
		await connectToDb(mongoDbUri);

		console.debug('Connected to database!');

		const numberOfWordsInDb = await Word.countDocuments().exec();

		if (numberOfWordsInDb === 0) {
			console.debug('Seeding database...');
			await seedModel(wordSeed, Word);
		}

		console.debug(`Server is running on port ${APP_PORT}`);
	} catch (err) {
		console.error('There was an error connecting to the database');

		process.exit(1);
	}
});
