function logRecipesError(url: string, error: unknown) {
	console.log();
	if (error instanceof Error) {
		console.error(`Error occurred while fetching recipes in the url ${url}: ${error.message}`);
		console.log();
		if (error.cause instanceof AggregateError) {
			console.log('The following errors were aggregated: ');
			console.log();
			console.group();
			error.cause.errors.forEach((e) => {
				console.error(e);
			});
			console.groupEnd();
			console.log();
		}
	} else {
		console.error(`An unknown error occurred while fetching recipes in the url ${url}: ${error}`);
	}
}

export { logRecipesError };
