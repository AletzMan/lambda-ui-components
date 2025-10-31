export type Direction =
	| "row"
	| "row-reverse"
	| "column"
	| "column-reverse"
	| "initial"
	| "inherit"
	| "unset"
	| "revert"
	| "revert-layer"
	| "-moz-initial";

export type JustifyContent =
	| "-moz-initial"
	| "center"
	| "end"
	| "flex-end"
	| "flex-start"
	| "inherit"
	| "initial"
	| "left"
	| "right"
	| "normal"
	| "revert"
	| "revert-layer"
	| "space-around"
	| "space-between"
	| "space-evenly"
	| "start"
	| "stretch"
	| "unset";

export type AlignItems =
	| "flex-start"
	| "flex-end"
	| "center"
	| "end"
	| "start"
	| "self-end"
	| "self-start"
	| "baseline"
	| "stretch"
	| "normal"
	| "inherit"
	| "initial"
	| "revert"
	| "revert-layer"
	| "unset"
	| "-moz-initial";

export type Gap = string | number;

export type Wrap =
	| "nowrap"
	| "wrap"
	| "wrap-reverse"
	| "inherit"
	| "initial"
	| "revert"
	| "revert-layer"
	| "unset"
	| "-moz-initial";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	direction?: Direction;
	justify?: JustifyContent | undefined;
	align?: AlignItems | undefined;
	gap?: Gap;
	wrap?: Wrap;
}
