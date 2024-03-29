import { Table } from "../components/Table";

export const component = function About() {
	const columns = [
		{
			accessorKey: "status",
			header: "Status",
		},
		{
			accessorKey: "email",
			header: "Email",
		},
		{
			accessorKey: "amount",
			header: "Amount",
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue("amount"));
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(amount);

				return <div>{formatted}</div>;
			},
		},
		// {
		// 	id: "actions",
		// 	cell: ({ row }) => {
		// 		const payment = row.original;

		// 		return (
		// 			<DropdownMenu>
		// 				<DropdownMenuTrigger asChild>
		// 					<Button variant="ghost" className="h-8 w-8 p-0">
		// 						<span className="sr-only">Open menu</span>
		// 						<MoreHorizontal className="h-4 w-4" />
		// 					</Button>
		// 				</DropdownMenuTrigger>
		// 				<DropdownMenuContent align="end">
		// 					<DropdownMenuLabel>Actions</DropdownMenuLabel>
		// 					<DropdownMenuItem
		// 						onClick={() => navigator.clipboard.writeText(payment.id)}
		// 					>
		// 						Copy payment ID
		// 					</DropdownMenuItem>
		// 					<DropdownMenuSeparator />
		// 					<DropdownMenuItem>View customer</DropdownMenuItem>
		// 					<DropdownMenuItem>View payment details</DropdownMenuItem>
		// 				</DropdownMenuContent>
		// 			</DropdownMenu>
		// 		);
		// 	},
		// },
	];

	const data = [
		{
			id: "728ed52f",
			amount: 100,
			status: "pending",
			email: "m@example.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		// ...
	];

	return <Table columns={columns} data={data} />;
};
