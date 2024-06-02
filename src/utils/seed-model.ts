import type { Model as MongooseModel } from 'mongoose';

export const seedModel = async (seed: unknown[], Model: MongooseModel<object>): Promise<void> => {
	await Model.deleteMany({});
	await Model.insertMany(seed);
};
