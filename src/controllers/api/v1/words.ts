import type { Request, Response } from 'express';
import Word from '../../../models/word';
import { getRandomInt } from '../../../utils/random';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from '../../../constants/status';

type MyResponse = {
	status: number
	message: string
	data?: unknown
}

export const findRandomWord = async (req: Request, res: Response): Promise<void> => {
	const response: MyResponse = {
		status: INTERNAL_SERVER_ERROR,
		message: 'Internal server error',
	};

	try {
		const { locale = 'en' } = req.query as { locale?: 'en' | 'es' | 'fr' };

		if (!['en', 'es', 'fr'].includes(locale)) {
			response.status = BAD_REQUEST;
			response.message = 'Invalid locale';

			throw new Error(response.message);
		}

		const wordCountInDb = await Word.countDocuments().exec();
		const wordIndex = getRandomInt(wordCountInDb);

		const randomWord = await Word.findOne().skip(wordIndex);

		if (!randomWord) {
			throw new Error('No word was found');
		}

		const parsedWord = [randomWord[locale]?.innocentWord, randomWord[locale]?.impostorWord];

		response.status = OK;
		response.message = 'Word retrieved successfully!';
		response.data = parsedWord;
	} catch (err) {
		console.error(err);
	}

	res.status(response.status).send(response);
};
