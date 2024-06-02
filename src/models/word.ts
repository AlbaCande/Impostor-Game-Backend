import mongoose from 'mongoose';

const wordValueSchema = new mongoose.Schema({
	impostorWord: { type: String, required: true },
	innocentWord: { type: String, required: true },
});

const wordSchema = new mongoose.Schema({
	en: wordValueSchema,
	es: wordValueSchema,
	fr: wordValueSchema,
});

const Word = mongoose.model('Word', wordSchema);

export default Word;
