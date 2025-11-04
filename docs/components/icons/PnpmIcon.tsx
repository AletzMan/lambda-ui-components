import { IconProps } from "./IconBase";

export const PnpmIcon = ({ className, width = 32, height = 32, ...props }: IconProps) => {
	return (
		<svg className={className} width={width} height={height} viewBox="0 0 32 32" {...props}>
			<path fill="#e0e0e0" d="M2 22h8v8H2zm10 0h8v8h-8zm10 0h8v8h-8zM12 12h8v8h-8z" />
			<path fill="#ffb300" d="M2 2h8v8H2zm10 0h8v8h-8zm10 0h8v8h-8zm0 10h8v8h-8z" />
		</svg>
	);
};
