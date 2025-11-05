import { ClientOnly, ClientOnlyProps } from "./ClientOnly";
import { Meta } from "@storybook/react-vite";

const meta: Meta<typeof ClientOnly> = {
	title: "Components/ClientOnly",
	component: ClientOnly,
};

export default meta;

const Template = (args: ClientOnlyProps) => <ClientOnly {...args} />;

export const Default = (args: ClientOnlyProps) => <Template {...args} />;
Default.args = {
	children: <div>Client Only</div>,
	fallback: "Loading...",
};
