"use client";
import { Table, Tooltip } from "lambda-ui-components";
import { Info } from "lucide-react";

export interface TableProps {
	prop: string;
	default: string;
	type: string;
	typePrimitive: string;
	tooltip: string;
}

const typeColors: Record<string, string> = {
	string: "text-green-600",
	boolean: "text-blue-600",
	callback: "text-yellow-600",
	object: "text-(--foreground-title-color)",
	array: "text-(--foreground-title-color)",
	undefined: "text-(--foreground-title-color)",
	null: "text-(--foreground-title-color)",
	any: "text-(--foreground-title-color)",
};

export const TableProps = ({ props , title = "API Reference", subtitle = "Props", id = "props" }: { props: TableProps[]; title?: string; subtitle?: string; id?: string }) => {
	return (
		<section className="flex flex-col pl-2 pr-3">
			<header>
				<h1
					id="api-reference"
					className="text-2xl font-bold text-left tracking-tight text-(--foreground-color) mb-4 w-full scroll-mt-20"
				>
					{title}
				</h1>
				<h2
					id={id}
					className="text-xl font-bold text-left tracking-tight text-(--foreground-color) mb-4 w-full scroll-mt-20"
				>
					{subtitle}
				</h2>
			</header>
			<Table variant="bordered" size="tiny" data={props} pagination={undefined}>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader sortKey="prop" width="170px">
							<span className="font-bold text-(--foreground-color)">Prop</span>
						</Table.ColumnHeader>
						<Table.ColumnHeader sortKey="default" width="150px">
							<span className="font-bold text-(--foreground-color)">Default</span>
						</Table.ColumnHeader>
						<Table.ColumnHeader sortKey="type" width="300px">
							<span className="font-bold text-(--foreground-color)">Type</span>
						</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{props.map((prop) => (
						<Table.Row key={prop.prop}>
							<Table.Cell className="text-(--primary-text-color) px-4 py-2 border-b border-(--border-color) font-mono">
								<div className="flex items-center gap-2">
									<span className="bg-(--primary-opacity-color) px-2 py-1 rounded-sm border border-(--primary-opacity-color)/80">
										{prop.prop}
									</span>
									<Tooltip content={prop.tooltip} color="neutral">
										<span>
											<Info className="size-4.5 fill-(--primary-opacity-color) text-(--primary-hover-color)" />
										</span>
									</Tooltip>
								</div>
							</Table.Cell>
							<Table.Cell className="text-(--foreground-title-color) px-4 py-2 border-b border-(--border-color) font-mono">
								<span className="bg-(--surface-c) px-2 py-1 rounded-sm border border-(--surface-e)/80">
									{prop.default}
								</span>
							</Table.Cell>
							<Table.Cell
								className={`px-4 py-2 border-b border-(--border-color) font-mono ${
									typeColors[prop.typePrimitive]
								}`}
							>
								{prop.type}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</section>
	);
};
