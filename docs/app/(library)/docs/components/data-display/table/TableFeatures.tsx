"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Table } from "lambda-ui-components";
import { useState } from "react";

interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	status: string;
}

const sampleData: User[] = [
	{ id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
	{ id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
	{ id: 4, name: "Alice Williams", email: "alice@example.com", role: "Manager", status: "Active" },
	{ id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "User", status: "Active" },
];

export const TableFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Table"
				description="Experiment with all the properties of the Table component in real time."
				childrenComponentsNames={[`<Table.Header>
		<Table.Row>
				<Table.ColumnHeader sortKey="id">ID</Table.ColumnHeader>
				<Table.ColumnHeader sortKey="name">Name</Table.ColumnHeader>
				<Table.ColumnHeader sortKey="email">Email</Table.ColumnHeader>
				<Table.ColumnHeader sortKey="role">Role</Table.ColumnHeader>
				<Table.ColumnHeader sortKey="status">Status</Table.ColumnHeader>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{sampleData.map((user) => (
				<Table.Row key={user.id}>
					<Table.Cell>{user.id}</Table.Cell>
					<Table.Cell>{user.name}</Table.Cell>
					<Table.Cell>{user.email}</Table.Cell>
					<Table.Cell>{user.role}</Table.Cell>
					<Table.Cell>{user.status}</Table.Cell>
				</Table.Row>
			))}
		</Table.Body`]}
				propConfigs={[
					{
						name: "variant",
						type: "radio",
						defaultValue: "bordered",
						default: "bordered",
						label: "Variant",
						description: "Visual style of the table.",
						values: ["soft", "underlined", "bordered", "striped"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Size of the table.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "highlightOnHover",
						type: "boolean",
						default: false,
						defaultValue: false,
						label: "Highlight on hover",
						description: "Highlight table rows on hover.",
					}
				]}
			>
				{(props) => (
					<div className="flex justify-center items-center py-6 w-full">
						<Table {...props} data={sampleData}>
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeader sortKey="id" width="50px">ID</Table.ColumnHeader>
									<Table.ColumnHeader sortKey="name" width="130px">Name</Table.ColumnHeader>
									<Table.ColumnHeader sortKey="email" width="190px">Email</Table.ColumnHeader>
									<Table.ColumnHeader sortKey="role" width="90px">Role</Table.ColumnHeader>
									<Table.ColumnHeader sortKey="status" width="90px">Status</Table.ColumnHeader>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{sampleData.map((user) => (
									<Table.Row key={user.id}>
										<Table.Cell>{user.id}</Table.Cell>
										<Table.Cell>{user.name}</Table.Cell>
										<Table.Cell>{user.email}</Table.Cell>
										<Table.Cell>{user.role}</Table.Cell>
										<Table.Cell>{user.status}</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table>
					</div>
				)}
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				description={
					<div>
						<p>Basic table with rows and columns. Use compound components for structure.</p>
					</div>
				}
				id="usage"
				code={`import { Table } from "lambda-ui-components";

const data = [
	{ id: 1, name: "John Doe", email: "john@example.com" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com" },
];

export default function App() {
	return (
		<Table data={data}>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader sortKey="id">ID</Table.ColumnHeader>
					<Table.ColumnHeader sortKey="name">Name</Table.ColumnHeader>
					<Table.ColumnHeader sortKey="email">Email</Table.ColumnHeader>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data.map((user) => (
					<Table.Row key={user.id}>
						<Table.Cell>{user.id}</Table.Cell>
						<Table.Cell>{user.name}</Table.Cell>
						<Table.Cell>{user.email}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}`}
			/>

			<PropertyLayout
				title="With Sorting"
				description={
					<div>
						<p>Enable sorting by adding <code className="code-tag">isSortable</code> to column headers and handling <code className="code-tag">onSortColumn</code>.</p>
					</div>
				}
				id="sorting"
				code={`import { Table } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [data, setData] = useState([...users]);

	const handleSort = (column: string, direction: "asc" | "desc") => {
		const sorted = [...data].sort((a, b) => {
			if (direction === "asc") {
				return a[column] > b[column] ? 1 : -1;
			}
			return a[column] < b[column] ? 1 : -1;
		});
		setData(sorted);
	};

	return (
		<Table data={data} onSortColumn={handleSort}>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader sortKey="name" isSortable>Name</Table.ColumnHeader>
					<Table.ColumnHeader sortKey="email" isSortable>Email</Table.ColumnHeader>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data.map((user) => (
					<Table.Row key={user.id}>
						<Table.Cell>{user.name}</Table.Cell>
						<Table.Cell>{user.email}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					{(() => {
						const [data, setData] = useState([...sampleData]);

						const handleSort = (column: string, direction: "asc" | "desc") => {
							const sorted = [...data].sort((a, b) => {
								const aVal = a[column as keyof User];
								const bVal = b[column as keyof User];
								if (direction === "asc") {
									return aVal > bVal ? 1 : -1;
								}
								return aVal < bVal ? 1 : -1;
							});
							setData(sorted);
						};

						return (
							<Table data={data} onSortColumn={handleSort}>
								<Table.Header>
									<Table.Row>
										<Table.ColumnHeader sortKey="name" isSortable>Name</Table.ColumnHeader>
										<Table.ColumnHeader sortKey="email" isSortable>Email</Table.ColumnHeader>
										<Table.ColumnHeader sortKey="role" isSortable>Role</Table.ColumnHeader>
										<Table.ColumnHeader sortKey="status" isSortable>Status</Table.ColumnHeader>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{data.map((user) => (
										<Table.Row key={user.id}>
											<Table.Cell>{user.name}</Table.Cell>
											<Table.Cell>{user.email}</Table.Cell>
											<Table.Cell>{user.role}</Table.Cell>
											<Table.Cell>{user.status}</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
							</Table>
						);
					})()}
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Pagination"
				description={
					<div>
						<p>Add pagination using the <code className="code-tag">pagination</code> prop.</p>
					</div>
				}
				id="pagination"
				code={`import { Table } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [page, setPage] = useState(1);
	const rowsPerPage = 3;
	const totalPages = Math.ceil(data.length / rowsPerPage);
	
	const paginatedData = data.slice(
		(page - 1) * rowsPerPage,
		page * rowsPerPage
	);

	return (
		<Table 
			data={paginatedData}
			pagination={{
				page,
				totalPages,
				rowsPerPage,
				totalRows: data.length,
				onPageChange: setPage
			}}
		>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader sortKey="name">Name</Table.ColumnHeader>
					<Table.ColumnHeader sortKey="email">Email</Table.ColumnHeader>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{paginatedData.map((user) => (
					<Table.Row key={user.id}>
						<Table.Cell>{user.name}</Table.Cell>
						<Table.Cell>{user.email}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					{(() => {
						const [page, setPage] = useState(1);
						const rowsPerPage = 3;
						const totalPages = Math.ceil(sampleData.length / rowsPerPage);

						const paginatedData = sampleData.slice(
							(page - 1) * rowsPerPage,
							page * rowsPerPage
						);

						return (
							<Table
								data={paginatedData}
								pagination={{
									page,
									totalPages,
									rowsPerPage,
									totalRows: sampleData.length,
									onPageChange: setPage
								}}
							>
								<Table.Header>
									<Table.Row>
										<Table.ColumnHeader sortKey="name">Name</Table.ColumnHeader>
										<Table.ColumnHeader sortKey="email">Email</Table.ColumnHeader>
										<Table.ColumnHeader sortKey="role">Role</Table.ColumnHeader>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{paginatedData.map((user) => (
										<Table.Row key={user.id}>
											<Table.Cell>{user.name}</Table.Cell>
											<Table.Cell>{user.email}</Table.Cell>
											<Table.Cell>{user.role}</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
							</Table>
						);
					})()}
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Width of columns"
				description={
					<div>
						<p>Control column widths using the <code className="code-tag">width</code> prop on <code className="code-tag">Table.ColumnHeader</code>. You can use any CSS width value like percentages, pixels, or fr units.</p>
					</div>
				}
				id="column-widths"
				code={`import { Table } from "lambda-ui-components";

export default function App() {
	return (
		<Table data={data}>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader sortKey="id" width="50px">ID</Table.ColumnHeader>
					<Table.ColumnHeader sortKey="name" width="130px">Name</Table.ColumnHeader>
					<Table.ColumnHeader sortKey="email" width="185px">Email</Table.ColumnHeader>
					<Table.ColumnHeader sortKey="role" width="95px">Role</Table.ColumnHeader>
					<Table.ColumnHeader sortKey="status" width="100px">Status</Table.ColumnHeader>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data.map((user) => (
					<Table.Row key={user.id}>
						<Table.Cell>{user.id}</Table.Cell>
						<Table.Cell>{user.name}</Table.Cell>
						<Table.Cell>{user.email}</Table.Cell>
						<Table.Cell>{user.role}</Table.Cell>
						<Table.Cell>{user.status}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}`}
			>
				<div className="flex flex-col gap-6 justify-center items-center py-6">
					<div className="w-full">
						<p className="text-sm font-semibold mb-2">Soft</p>
						<Table data={sampleData}>
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeader sortKey="id" width="50px">ID</Table.ColumnHeader>
									<Table.ColumnHeader sortKey="name" width="130px">Name</Table.ColumnHeader>
									<Table.ColumnHeader sortKey="email" width="185px">Email</Table.ColumnHeader>
									<Table.ColumnHeader sortKey="role" width="95px">Role</Table.ColumnHeader>
									<Table.ColumnHeader sortKey="status" width="100px">Status</Table.ColumnHeader>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{sampleData.map((user) => (
									<Table.Row key={user.id}>
										<Table.Cell>{user.id}</Table.Cell>
										<Table.Cell>{user.name}</Table.Cell>
										<Table.Cell>{user.email}</Table.Cell>
										<Table.Cell>{user.role}</Table.Cell>
										<Table.Cell>{user.status}</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table>
					</div>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Column Alignment"
				description={
					<div>
						<p>Control the alignment of cell content using the <code className="code-tag">align</code> prop on <code className="code-tag">Table.Cell</code>. Available options are <code className="code-tag">left</code>, <code className="code-tag">center</code>, and <code className="code-tag">right</code>.</p>
					</div>
				}
				id="column-alignment"
				code={`import { Table } from "lambda-ui-components";

export default function App() {
	return (
		<Table data={data}>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader sortKey="id">ID</Table.ColumnHeader>
					<Table.ColumnHeader sortKey="name">Name</Table.ColumnHeader>
					<Table.ColumnHeader sortKey="role">Role</Table.ColumnHeader>
					<Table.ColumnHeader sortKey="status">Status</Table.ColumnHeader>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data.map((item) => (
					<Table.Row key={item.id}>
						<Table.Cell align="center">{item.id}</Table.Cell>
						<Table.Cell align="left">{item.name}</Table.Cell>
						<Table.Cell align="right">{item.role}</Table.Cell>
						<Table.Cell align="center">{item.status}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Table data={sampleData.slice(0, 3)} size="small">
						<Table.Header>
							<Table.Row>
								<Table.ColumnHeader sortKey="id" width="80px">ID</Table.ColumnHeader>
								<Table.ColumnHeader sortKey="name">Name</Table.ColumnHeader>
								<Table.ColumnHeader sortKey="role" width="120px">Role</Table.ColumnHeader>
								<Table.ColumnHeader sortKey="status" width="100px">Status</Table.ColumnHeader>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{sampleData.slice(0, 3).map((user) => (
								<Table.Row key={user.id}>
									<Table.Cell align="center">{user.id}</Table.Cell>
									<Table.Cell align="left">{user.name}</Table.Cell>
									<Table.Cell align="right">{user.role}</Table.Cell>
									<Table.Cell align="center">{user.status}</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</div>
			</PropertyLayout>
		</>
	);
};
