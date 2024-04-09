type ApiError = {
	type: string | null;
	title?: string | null;
	status?: number | null;
	detail?: string | null;
	errors?: object[];
};

export { ApiError };
