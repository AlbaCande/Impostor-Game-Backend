import mongoose from 'mongoose';

export const connectToDb = async (uri: string): Promise<void> => {
	await mongoose.connect(uri);
};
