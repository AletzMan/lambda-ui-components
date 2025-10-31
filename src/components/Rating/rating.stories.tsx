import { StoryObj } from "@storybook/react-vite";
import { Rating } from "./Rating";
import type { Meta } from "@storybook/react-vite";
import { ReactNode, useState } from "react";
import { RatingProps } from "./rating.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { AngryIcon, FrownIcon, LaughIcon, MehIcon, SmileIcon } from "lucide-react";
import { Checkbox } from "../Checkbox/Checkbox";
import { Select } from "../Select/Select";
import { Divider } from "../Divider/Divider";
import { RatingVariants } from "./rating.variants";

const meta: Meta<typeof Rating> = {
	title: "Components/Rating",
	component: Rating,
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "outline", "bordered"],
			description: "Visual style of the input",
			type: "string",
		},
		color: {
			control: "select",
			options: ["default", "primary", "secondary", "success", "danger", "warning", "info"],
			description: "Background color",
		},
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		value: {
			control: "number",
			description: "Value of the rating",
		},
		text: {
			control: "object",
			description: "Text of the rating",
		},
		textPosition: {
			control: "inline-radio",
			options: ["top", "bottom", "right"],
			description: "Position of the text",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const colors = ["default", "primary", "secondary", "success", "danger", "warning", "info"];

const DefaultRating = (args: RatingProps) => {
	const [value, setValue] = useState([3, 3, 3, 3, 3, 3, 3]);
	const [whitCustomIcon, setWhitCustomIcon] = useState(false);
	const [typeCustomIcon, setTypeCustomIcon] = useState<"icon" | "string">("icon");
	const [customIcon, setCustomIcon] = useState<ReactNode[] | undefined>(args.customIcon);

	const handleChangeCustomIcon = (value: "icon" | "string") => {
		setTypeCustomIcon(value);
		const stringIcons = ["A", "B", "C", "D", "E"];
		setCustomIcon(value === "icon" ? args.customIcon : stringIcons);
	};

	return (
		<ContainerComponent
			title="Rating"
			subtitle={args.variant || ""}
			color={args.color || "default"}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "flex-start",
					gap: "var(--padding-xl)",
				}}
			>
				<Checkbox
					checked={whitCustomIcon}
					onChange={() => setWhitCustomIcon(!whitCustomIcon)}
					label="Whit Custom Icon"
					positionLabel="left"
				/>
				<Select
					value={typeCustomIcon}
					onChange={(value) => handleChangeCustomIcon(value as "icon" | "string")}
					label="Type Custom Icon"
					disabled={!whitCustomIcon}
					size="small"
					options={[
						{ value: "icon", label: "Icon" },
						{ value: "string", label: "String" },
					]}
				/>
			</div>
			<Divider color="secondary" />
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
					gap: "var(--gap-xl)",
					width: "100%",
					marginBottom: "var(--padding-xl)",
					padding: "var(--padding-lg) var(--padding-xl)",
				}}
			>
				{colors.map((color, index) => (
					<div
						key={color}
						style={{
							display: "flex",
							alignItems: "flex-start",
							flexDirection: "column",
							gap: "var(--padding-xs)",
						}}
					>
						<label
							style={{
								marginBottom: "var(--padding-xs)",
								color:
									color === "default" ? "var(--rating-solid-color)" : `var(--${color}-base-color)`,
								fontWeight: "var(--font-weight-semibold)",
								fontSize: "var(--font-size-md)",
								textTransform: "capitalize",
							}}
						>
							{color}
						</label>
						<Rating
							key={color}
							{...args}
							value={value[index]}
							onChange={(value) =>
								setValue((prev) => prev.map((_, i) => (i === index ? value : prev[i])))
							}
							customIcon={whitCustomIcon ? customIcon : undefined}
							color={color as RatingVariants["color"]}
						/>
					</div>
				))}
			</div>
		</ContainerComponent>
	);
};

export const Solid: Story = {
	render: (args) => <DefaultRating {...args} />,
	args: {
		variant: "solid",
		color: "default",
		size: "medium",
		value: 3,
		text: ["Bad", "Regular", "Good", "Great", "Perfect"],
		customIcon: [<AngryIcon />, <FrownIcon />, <MehIcon />, <SmileIcon />, <LaughIcon />],
	},
};

export const Outline: Story = {
	render: (args) => <DefaultRating {...args} />,
	args: {
		variant: "outline",
		color: "default",
		size: "medium",
		value: 3,
		text: ["Bad", "Regular", "Good", "Great", "Perfect"],
		customIcon: [<AngryIcon />, <FrownIcon />, <MehIcon />, <SmileIcon />, <LaughIcon />],
	},
};

export const Bordered: Story = {
	render: (args) => <DefaultRating {...args} />,
	args: {
		variant: "bordered",
		color: "default",
		size: "medium",
		value: 3,
		text: ["Bad", "Regular", "Good", "Great", "Perfect"],
		customIcon: [<AngryIcon />, <FrownIcon />, <MehIcon />, <SmileIcon />, <LaughIcon />],
	},
};
