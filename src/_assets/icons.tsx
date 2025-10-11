interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const PDFIcon = ({ className, ...props }: IconProps) => {
	return (
		<svg width={15} height={15} viewBox="0 0 15 15" className={className} {...props}>
			<path
				fill="currentColor"
				d="M2.5 6.5V6H2v.5zm4 0V6H6v.5zm0 4H6v.5h.5zm7-7h.5v-.207l-.146-.147zm-3-3l.354-.354L10.707 0H10.5zM2.5 7h1V6h-1zm.5 4V8.5H2V11zm0-2.5v-2H2v2zm.5-.5h-1v1h1zm.5-.5a.5.5 0 0 1-.5.5v1A1.5 1.5 0 0 0 5 7.5zM3.5 7a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 3.5 6zM6 6.5v4h1v-4zm.5 4.5h1v-1h-1zM9 9.5v-2H8v2zM7.5 6h-1v1h1zM9 7.5A1.5 1.5 0 0 0 7.5 6v1a.5.5 0 0 1 .5.5zM7.5 11A1.5 1.5 0 0 0 9 9.5H8a.5.5 0 0 1-.5.5zM10 6v5h1V6zm.5 1H13V6h-2.5zm0 2H12V8h-1.5zM2 5V1.5H1V5zm11-1.5V5h1V3.5zM2.5 1h8V0h-8zm7.646-.146l3 3l.708-.708l-3-3zM2 1.5a.5.5 0 0 1 .5-.5V0A1.5 1.5 0 0 0 1 1.5zM1 12v1.5h1V12zm1.5 3h10v-1h-10zM14 13.5V12h-1v1.5zM12.5 15a1.5 1.5 0 0 0 1.5-1.5h-1a.5.5 0 0 1-.5.5zM1 13.5A1.5 1.5 0 0 0 2.5 15v-1a.5.5 0 0 1-.5-.5z"
			></path>
		</svg>
	);
};

export const APKIcon = ({ className, ...props }: IconProps) => {
	return (
		<svg width={24} height={24} viewBox="0 0 24 24" className={className} {...props}>
			<path
				fill="currentColor"
				d="M7.962 18.23h8.076q-.08-.993-.596-1.816q-.515-.824-1.373-1.308l.758-1.373q.05-.081.015-.177q-.034-.096-.12-.146q-.082-.05-.165-.026t-.134.106l-.783 1.404q-.384-.161-.798-.245q-.413-.083-.842-.083t-.833.083t-.808.245l-.782-1.404q-.05-.086-.143-.106q-.094-.019-.18.031q-.02 0-.081.318l.777 1.373q-.858.485-1.383 1.308t-.605 1.817m2.23-1.212q-.161 0-.282-.121t-.121-.283t.12-.282q.122-.121.283-.121t.274.12q.111.122.111.284t-.111.282t-.274.121m3.635 0q-.161 0-.283-.121t-.121-.283t.121-.282q.122-.121.283-.121t.283.12q.12.122.12.284t-.12.282q-.121.121-.283.121M6.616 21q-.691 0-1.153-.462T5 19.385V4.615q0-.69.463-1.152T6.616 3H14.5L19 7.5v11.885q0 .69-.462 1.153T17.384 21zM14 8V4H6.616q-.231 0-.424.192T6 4.615v14.77q0 .23.192.423t.423.192h10.77q.23 0 .423-.192t.192-.424V8zM6 4v4zv16z"
			></path>
		</svg>
	);
};

export const CheckIcon = ({ className, ...props }: IconProps) => {
	return (
		<svg
			className={className}
			{...props}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M4 12l5 5 11-11"></path>
		</svg>
	);
};
