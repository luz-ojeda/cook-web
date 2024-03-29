type Pagination = {
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	totalRecords: number;
};

type PaginatedList<T> = {
	data: T[];
	pagination?: Pagination | null;
};

export { Pagination, PaginatedList };
