import { Table } from "./Table";
import type { Meta, StoryObj } from "@storybook/react";
import { TableProps } from "./table.types";
import { Circle } from "lucide-react";

const meta: Meta<typeof Table> = {
	title: "Components/Table",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: Table,
	argTypes: {
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
		},
		variant: {
			control: "select",
			options: ["flat", "underlined", "striped", "bordered"],
		},
	},
	decorators: [
		(Story) => (
			<>
				<Story />
			</>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Table>;

interface User {
	id: number;
	name: string;
	email: string;
	age: number;
	active: boolean;
	joined: string;
	city: string;
}

const USERS_DATA: User[] = [
	{
		id: 1,
		name: "John Doe",
		email: "john.doe@example.com",
		age: 30,
		active: true,
		joined: "2023-01-01",
		city: "New York",
	},
	{
		id: 2,
		name: "Jane Doe",
		email: "jane.doe@example.com",
		age: 25,
		active: false,
		joined: "2020-02-01",
		city: "Los Angeles",
	},
	{
		id: 3,
		name: "John Smith",
		email: "john.smith@example.com",
		age: 35,
		active: true,
		joined: "2022-03-01",
		city: "Chicago",
	},
	{
		id: 4,
		name: "Sara Doe",
		email: "sara.doe@example.com",
		age: 10,
		active: false,
		joined: "2021-04-01",
		city: "San Francisco",
	},
	{
		id: 5,
		name: "Sam Smith",
		email: "sam.smith@example.com",
		age: 1,
		active: true,
		joined: "2024-05-01",
		city: "New York",
	},
	{
		id: 6,
		name: "Sara Smith",
		email: "sara.smith@example.com",
		age: 100,
		active: false,
		joined: "2019-06-01",
		city: "San Francisco",
	},
	{
		id: 7,
		name: "Luis Doe",
		email: "luis.doe@example.com",
		age: 23,
		active: true,
		joined: "2017-01-01",
		city: "California",
	},
	{
		id: 8,
		name: "Luisa Doe",
		email: "luisa.doe@example.com",
		age: 25,
		active: true,
		joined: "2024-01-01",
		city: "New Jersey",
	},
	{
		id: 9,
		name: "Young Doe",
		email: "young.doe@example.com",
		age: 28,
		active: true,
		joined: "2022-01-01",
		city: "Washington",
	},
	{
		id: 10,
		name: "Old Doe",
		email: "old.doe@example.com",
		age: 45,
		active: true,
		joined: "2015-01-01",
		city: "New York",
	},
];

const TableComponent = (args: Partial<TableProps>) => {
	return (
		<div style={{ width: "90svw", overflowX: "hidden" }}>
			<Table
				size={args.size || "medium"}
				variant={args.variant || "flat"}
				pagination={{
					page: 1,
					totalPages: Math.ceil(USERS_DATA.length / 3),
				}}
				data={USERS_DATA}
				renderRow={(item) => (
					<Table.Row key={item.id}>
						<Table.Cell align="center">{item.id}</Table.Cell>
						<Table.Cell align="center">{item.name}</Table.Cell>
						<Table.Cell align="center">{item.age}</Table.Cell>
						<Table.Cell align="center">
							{item.active ? (
								<Circle color="green" size={10} fill="green" />
							) : (
								<Circle color="red" size={10} fill="red" />
							)}
						</Table.Cell>
						<Table.Cell align="center">{item.joined}</Table.Cell>
					</Table.Row>
				)}
			>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader sortKey="id" type="number" width="70px">
							ID
						</Table.ColumnHeader>
						<Table.ColumnHeader sortKey="name" type="string" width="150px">
							Nombre
						</Table.ColumnHeader>
						<Table.ColumnHeader sortKey="age" type="number" width="100px">
							Edad
						</Table.ColumnHeader>
						<Table.ColumnHeader sortKey="active" type="boolean" width="100px">
							Activo
						</Table.ColumnHeader>
						<Table.ColumnHeader sortKey="joined" type="date" width="150px">
							Fecha
						</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>
			</Table>
		</div>
	);
};

export const Bordered: Story = {
	render: (args) => <TableComponent {...args} />,
	args: {
		variant: "bordered",
		size: "medium",
	},
};

export const Flat: Story = {
	render: (args) => <TableComponent {...args} />,
	args: {
		variant: "flat",
		size: "medium",
	},
};

export const Underlined: Story = {
	render: (args) => <TableComponent {...args} />,
	args: {
		variant: "underlined",
		size: "medium",
	},
};

export const Striped: Story = {
	render: (args) => <TableComponent {...args} />,
	args: {
		variant: "striped",
		size: "medium",
	},
};
