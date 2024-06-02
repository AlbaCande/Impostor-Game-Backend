export const generateDbUri = (
	username: string,
	password: string,
	host: string,
	appName: string,
	databaseName: string,
): string => {
	return `mongodb+srv://${username}:${password}@${host}/${databaseName}?retryWrites=true&w=majority&appName=${appName}`;
};
