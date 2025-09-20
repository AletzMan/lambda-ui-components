import { Table } from "./Table";
import type { Meta, StoryObj } from "@storybook/react";
import { TableProps } from "./table.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { Tag } from "../Tag/Tag";

const meta: Meta<typeof Table> = {
	title: "Components/Table",
	component: Table,
	argTypes: {
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
		},
		variant: {
			control: "select",
			options: ["soft", "underlined", "striped", "bordered"],
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

const TableComponent = (args: Partial<TableProps>) => {
	return (
		<ContainerComponent title="Table" subtitle={args.variant?.toString() || ""}>
			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "flex-start",
					width: "90svw",
				}}
			>
				<Table
					{...args}
					size={args.size || "medium"}
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
									<Tag color="success" size="tiny" text="Active" variant="subtle" />
								) : (
									<Tag color="danger" size="tiny" text="Inactive" variant="subtle" />
								)}
							</Table.Cell>
							<Table.Cell align="center">{item.joined}</Table.Cell>
						</Table.Row>
					)}
				>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader sortKey="id" type="number" width="70px" isSortable>
								ID
							</Table.ColumnHeader>
							<Table.ColumnHeader sortKey="name" type="string" width="150px" isSortable>
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
		</ContainerComponent>
	);
};

export const Bordered: Story = {
	render: (args) => <TableComponent {...args} />,
	args: {
		variant: "bordered",
		size: "medium",
		rowsPerPage: 5,
	},
};

export const Soft: Story = {
	render: (args) => <TableComponent {...args} />,
	args: {
		variant: "soft",
		size: "medium",
		rowsPerPage: 5,
	},
};

export const Underlined: Story = {
	render: (args) => <TableComponent {...args} />,
	args: {
		variant: "underlined",
		size: "medium",
		rowsPerPage: 5,
	},
};

export const Striped: Story = {
	render: (args) => <TableComponent {...args} />,
	args: {
		variant: "striped",
		size: "medium",
		rowsPerPage: 5,
	},
};

const USERS_DATA: User[] = [
	{
		id: 1,
		name: "Liam Johnson",
		email: "liam.johnson@example.com",
		age: 28,
		active: true,
		joined: "2023-05-15",
		city: "New York",
	},
	{
		id: 2,
		name: "Olivia Williams",
		email: "olivia.williams@example.com",
		age: 34,
		active: false,
		joined: "2021-11-20",
		city: "Los Angeles",
	},
	{
		id: 3,
		name: "Noah Brown",
		email: "noah.brown@example.com",
		age: 41,
		active: true,
		joined: "2019-07-08",
		city: "Chicago",
	},
	{
		id: 4,
		name: "Emma Davis",
		email: "emma.davis@example.com",
		age: 22,
		active: true,
		joined: "2024-02-10",
		city: "Houston",
	},
	{
		id: 5,
		name: "Oliver Miller",
		email: "oliver.miller@example.com",
		age: 55,
		active: false,
		joined: "2018-04-30",
		city: "Phoenix",
	},
	{
		id: 6,
		name: "Charlotte Wilson",
		email: "charlotte.wilson@example.com",
		age: 30,
		active: true,
		joined: "2022-09-05",
		city: "Philadelphia",
	},
	{
		id: 7,
		name: "James Moore",
		email: "james.moore@example.com",
		age: 26,
		active: false,
		joined: "2023-01-25",
		city: "San Antonio",
	},
	{
		id: 8,
		name: "Amelia Taylor",
		email: "amelia.taylor@example.com",
		age: 39,
		active: true,
		joined: "2020-03-12",
		city: "San Diego",
	},
	{
		id: 9,
		name: "Benjamin Anderson",
		email: "benjamin.anderson@example.com",
		age: 48,
		active: false,
		joined: "2017-06-18",
		city: "Dallas",
	},
	{
		id: 10,
		name: "Sophia Thomas",
		email: "sophia.thomas@example.com",
		age: 29,
		active: true,
		joined: "2022-08-22",
		city: "San Jose",
	},
	{
		id: 11,
		name: "Jacob Jackson",
		email: "jacob.jackson@example.com",
		age: 33,
		active: true,
		joined: "2021-05-19",
		city: "Austin",
	},
	{
		id: 12,
		name: "Isabella White",
		email: "isabella.white@example.com",
		age: 27,
		active: false,
		joined: "2023-10-01",
		city: "Jacksonville",
	},
	{
		id: 13,
		name: "Mason Harris",
		email: "mason.harris@example.com",
		age: 44,
		active: true,
		joined: "2016-12-04",
		city: "Fort Worth",
	},
	{
		id: 14,
		name: "Mia Martin",
		email: "mia.martin@example.com",
		age: 31,
		active: false,
		joined: "2020-09-11",
		city: "Columbus",
	},
	{
		id: 15,
		name: "Ethan Thompson",
		email: "ethan.thompson@example.com",
		age: 50,
		active: true,
		joined: "2019-02-28",
		city: "San Francisco",
	},
	{
		id: 16,
		name: "Harper Garcia",
		email: "harper.garcia@example.com",
		age: 24,
		active: true,
		joined: "2024-03-17",
		city: "Charlotte",
	},
	{
		id: 17,
		name: "Alexander Martinez",
		email: "alexander.martinez@example.com",
		age: 60,
		active: false,
		joined: "2015-08-09",
		city: "Indianapolis",
	},
	{
		id: 18,
		name: "Ella Robinson",
		email: "ella.robinson@example.com",
		age: 36,
		active: true,
		joined: "2022-04-14",
		city: "Seattle",
	},
	{
		id: 19,
		name: "Michael Clark",
		email: "michael.clark@example.com",
		age: 52,
		active: false,
		joined: "2018-11-29",
		city: "Denver",
	},
	{
		id: 20,
		name: "Avery Rodriguez",
		email: "avery.rodriguez@example.com",
		age: 29,
		active: true,
		joined: "2023-06-03",
		city: "Washington",
	},
	{
		id: 21,
		name: "Daniel Lewis",
		email: "daniel.lewis@example.com",
		age: 40,
		active: true,
		joined: "2021-09-12",
		city: "Boston",
	},
	{
		id: 22,
		name: "Chloe Lee",
		email: "chloe.lee@example.com",
		age: 23,
		active: false,
		joined: "2024-01-08",
		city: "El Paso",
	},
	{
		id: 23,
		name: "Henry Hall",
		email: "henry.hall@example.com",
		age: 65,
		active: true,
		joined: "2016-02-21",
		city: "Detroit",
	},
	{
		id: 24,
		name: "Zoe Allen",
		email: "zoe.allen@example.com",
		age: 38,
		active: false,
		joined: "2020-05-16",
		city: "Memphis",
	},
	{
		id: 25,
		name: "Jackson Young",
		email: "jackson.young@example.com",
		age: 32,
		active: true,
		joined: "2022-07-30",
		city: "Portland",
	},
	{
		id: 26,
		name: "Lily Hernandez",
		email: "lily.hernandez@example.com",
		age: 25,
		active: true,
		joined: "2023-04-19",
		city: "Las Vegas",
	},
	{
		id: 27,
		name: "Sebastian King",
		email: "sebastian.king@example.com",
		age: 47,
		active: false,
		joined: "2017-09-02",
		city: "Louisville",
	},
	{
		id: 28,
		name: "Grace Wright",
		email: "grace.wright@example.com",
		age: 29,
		active: true,
		joined: "2021-12-15",
		city: "Baltimore",
	},
	{
		id: 29,
		name: "Carter Lopez",
		email: "carter.lopez@example.com",
		age: 58,
		active: false,
		joined: "2016-01-07",
		city: "Milwaukee",
	},
	{
		id: 30,
		name: "Madison Hill",
		email: "madison.hill@example.com",
		age: 35,
		active: true,
		joined: "2020-10-28",
		city: "Albuquerque",
	},
	{
		id: 31,
		name: "Wyatt Scott",
		email: "wyatt.scott@example.com",
		age: 30,
		active: true,
		joined: "2022-06-09",
		city: "Tucson",
	},
	{
		id: 32,
		name: "Victoria Green",
		email: "victoria.green@example.com",
		age: 27,
		active: false,
		joined: "2023-09-21",
		city: "Fresno",
	},
	{
		id: 33,
		name: "Jayden Adams",
		email: "jayden.adams@example.com",
		age: 51,
		active: true,
		joined: "2018-03-05",
		city: "Sacramento",
	},
	{
		id: 34,
		name: "Scarlett Baker",
		email: "scarlett.baker@example.com",
		age: 24,
		active: true,
		joined: "2024-04-29",
		city: "Mesa",
	},
	{
		id: 35,
		name: "Gabriel Gonzalez",
		email: "gabriel.gonzalez@example.com",
		age: 43,
		active: false,
		joined: "2017-05-11",
		city: "Kansas City",
	},
	{
		id: 36,
		name: "Hannah Nelson",
		email: "hannah.nelson@example.com",
		age: 37,
		active: true,
		joined: "2021-08-01",
		city: "Atlanta",
	},
	{
		id: 37,
		name: "Luke Carter",
		email: "luke.carter@example.com",
		age: 26,
		active: false,
		joined: "2023-02-18",
		city: "Omaha",
	},
	{
		id: 38,
		name: "Addison Mitchell",
		email: "addison.mitchell@example.com",
		age: 59,
		active: true,
		joined: "2016-09-25",
		city: "Miami",
	},
	{
		id: 39,
		name: "Owen Perez",
		email: "owen.perez@example.com",
		age: 45,
		active: false,
		joined: "2019-11-10",
		city: "Raleigh",
	},
	{
		id: 40,
		name: "Evelyn Roberts",
		email: "evelyn.roberts@example.com",
		age: 31,
		active: true,
		joined: "2022-05-06",
		city: "Cleveland",
	},
	{
		id: 41,
		name: "Julian Turner",
		email: "julian.turner@example.com",
		age: 53,
		active: false,
		joined: "2018-07-28",
		city: "Nashville",
	},
	{
		id: 42,
		name: "Audrey Phillips",
		email: "audrey.phillips@example.com",
		age: 21,
		active: true,
		joined: "2024-05-12",
		city: "Tampa",
	},
	{
		id: 43,
		name: "Jack Campbell",
		email: "jack.campbell@example.com",
		age: 49,
		active: true,
		joined: "2017-04-04",
		city: "New Orleans",
	},
	{
		id: 44,
		name: "Bella Parker",
		email: "bella.parker@example.com",
		age: 38,
		active: false,
		joined: "2020-01-30",
		city: "Honolulu",
	},
	{
		id: 45,
		name: "Wyatt Evans",
		email: "wyatt.evans@example.com",
		age: 32,
		active: true,
		joined: "2023-08-11",
		city: "Anchorage",
	},
	{
		id: 46,
		name: "Layla Edwards",
		email: "layla.edwards@example.com",
		age: 24,
		active: true,
		joined: "2021-03-07",
		city: "Richmond",
	},
	{
		id: 47,
		name: "Mateo Collins",
		email: "mateo.collins@example.com",
		age: 62,
		active: false,
		joined: "2015-10-14",
		city: "Boise",
	},
	{
		id: 48,
		name: "Penelope Stewart",
		email: "penelope.stewart@example.com",
		age: 30,
		active: true,
		joined: "2022-11-23",
		city: "Helena",
	},
	{
		id: 49,
		name: "Leo Russell",
		email: "leo.russell@example.com",
		age: 46,
		active: false,
		joined: "2019-04-09",
		city: "Juneau",
	},
	{
		id: 50,
		name: "Aurora Morris",
		email: "aurora.morris@example.com",
		age: 29,
		active: true,
		joined: "2023-07-07",
		city: "Dover",
	},
];
