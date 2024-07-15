function logRecipesError(url: string, error: unknown) {
	console.log('\n');
	if (error instanceof Error) {
		console.error(`Error occurred while fetching recipes in the url ${url}: ${error.message}`);
		console.log('\n');
		if (error.cause instanceof AggregateError) {
			console.log('The following errors were aggregated: \n');
			console.group();
			error.cause.errors.forEach((e) => {
				console.error(e);
			});
			console.groupEnd();
			console.log('\n');
		}
	} else {
		console.error(`An unknown error occurred while fetching recipes in the url ${url}: ${error}`);
	}
}

export { logRecipesError };
