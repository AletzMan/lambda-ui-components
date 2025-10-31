import { Avatar } from "./Avatar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarGroupProps, AvatarProps } from "./avatar.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Avatar> = {
	title: "Components/Avatar",
	component: Avatar,
	argTypes: {
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
		},
	},
};
export default meta;

type Story = StoryObj<typeof Avatar>;
type GroupStory = StoryObj<typeof Avatar.Group>;

const users = [
	{ name: "Alice Wonderland", src: "https://randomuser.me/api/portraits/women/26.jpg" },
	{ name: "Jane Doe" },
	{ name: "John Smith", src: "https://randomuser.me/api/portraits/men/32.jpg" },
	{ name: "Bob Marley" },
	{ name: "Charlie Puth", src: "https://randomuser.me/api/portraits/men/29.jpg" },
	{ name: "David Bowie" },
	{ name: "Karla Bowie", src: "https://randomuser.me/api/portraits/women/28.jpg" },
	{ name: "Extra User" },
];

const Template = (args: AvatarProps & { subtitle: string }) => {
	return (
		<ContainerComponent title="Avatar" subtitle={args.subtitle}>
			<Avatar {...args} />
		</ContainerComponent>
	);
};

const TemplateSize = (args: AvatarProps & { subtitle: string }) => {
	return (
		<ContainerComponent title="Avatar" subtitle={args.subtitle}>
			<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
				<Avatar {...args} name="Tiny User" size="tiny" />
				<Avatar {...args} name="Small User" size="small" />
				<Avatar {...args} name="Medium User" size="medium" />
				<Avatar {...args} name="Large User" size="large" />
			</div>
		</ContainerComponent>
	);
};

const GroupTemplate = (args: AvatarGroupProps & { subtitle: string }) => {
	return (
		<ContainerComponent title="Avatar Group" subtitle={args.subtitle}>
			<Avatar.Group {...args} users={users} />
		</ContainerComponent>
	);
};

export const Basic: Story = {
	render: (args) => <Template {...args} subtitle="Basic" />,
	args: {
		name: "Jane Doe",
		size: "medium",
	},
};

export const WithImage: Story = {
	render: (args) => <Template {...args} subtitle="With Image" />,
	args: {
		name: "John Smith",
		src: "https://randomuser.me/api/portraits/men/32.jpg",
		size: "large",
	},
};

export const Sizes: Story = {
	render: (args) => <TemplateSize {...args} subtitle="Sizes" />,
	args: {
		size: "medium",
	},
};

export const Group: GroupStory = {
	render: (args) => <GroupTemplate {...args} subtitle="Group" />,
	args: {
		size: "small",
		max: 5,
	},
};

export const GroupOverflow: GroupStory = {
	render: (args) => <GroupTemplate {...args} subtitle="Group Overflow" />,
	args: {
		size: "medium",
		max: 3,
	},
};
