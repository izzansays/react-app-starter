import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
	RxArrowDown,
	RxArrowUp,
	RxCaretSort,
	RxChevronLeft,
	RxChevronRight,
	RxDoubleArrowLeft,
	RxDoubleArrowRight,
} from "react-icons/rx";
import styles from "./Table.module.css";

interface TableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function Table<TData, TValue>({
	columns,
	data,
}: TableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	return (
		<div className={styles.table}>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<th key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													<div>
														<button
															type="button"
															onClick={() => header.column.toggleSorting()}
														>
															<span>
																{header.column.columnDef.header as string}
															</span>
															{header.column.getIsSorted() === "desc" ? (
																<RxArrowDown />
															) : header.column.getIsSorted() === "asc" ? (
																<RxArrowUp />
															) : (
																<RxCaretSort />
															)}
														</button>
													</div>,
													header.getContext(),
											  )}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<tr key={row.id} data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))
					) : (
						<tr>
							<td colSpan={columns.length}>No results.</td>
						</tr>
					)}
				</tbody>
			</table>
			{/* <div>
				<div>
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div>
					<div>
						<p>Rows per page</p>
						<select>
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<option key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</option>
							))}
						</select>
					</div>
					<div>
						Page {table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</div>
					<div>
						<button
							type="button"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							 <span className="sr-only">Go to first page</span>
							<RxDoubleArrowLeft />
						</button>
						<button
							type="button"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<span className="sr-only">Go to previous page</span> 
							<RxChevronLeft />
						</button>
						<button
							type="button"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<span className="sr-only">Go to next page</span>
							<RxChevronRight />
						</button>
						<button
							type="button"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
						>
							 <span className="sr-only">Go to last page</span>
							<RxDoubleArrowRight />
						</button>
					</div>
				</div>
			</div> */}
		</div>
	);
}
