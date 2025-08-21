import { TableProps } from "./table.types";
import { containerVariants, rowVariants, tableVariants } from "./table.variants";
import { headerVariants } from "./table.variants";
import { cellVariants } from "./table.variants";

export const Table = ({ size, variant, ...props }: TableProps) => {
	return (
		<div className={containerVariants({ variant })}>
			<table className={tableVariants({ size, variant })} {...props}>
				<thead>
					<tr>
						<th className={headerVariants({ size, variant })}>Header 1</th>
						<th className={headerVariants({ size, variant })}>Header 2</th>
					</tr>
				</thead>
				<tbody className={rowVariants({ size, variant })}>
					<tr>
						<td className={cellVariants({ size, variant })}>Row 1, Cell 1</td>
						<td className={cellVariants({ size, variant })}>Row 1, Cell 2</td>
					</tr>
					<tr>
						<td className={cellVariants({ size, variant })}>Row 2, Cell 1</td>
						<td className={cellVariants({ size, variant })}>Row 2, Cell 2</td>
					</tr>
					<tr>
						<td className={cellVariants({ size, variant })}>Row 3, Cell 1</td>
						<td className={cellVariants({ size, variant })}>Row 3, Cell 2</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
