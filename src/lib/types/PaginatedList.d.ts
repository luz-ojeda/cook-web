type Pagination = {
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	totalRecords: number;
};

type PaginatedList<DataType> = {
	data: DataType[];
	pagination?: Pagination | null;
};

export { Pagination, PaginatedList };
