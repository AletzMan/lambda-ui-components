import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./Carousel";
import { CarouselProps } from "./carousel.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
// Configuración de breakpoints para el carrusel
const responsiveBreakpoints = [
	{ breakpoint: 0, items: 1 },
	{ breakpoint: 768, items: 2 },
	{ breakpoint: 1200, items: 3 },
	{ breakpoint: 1600, items: 4 },
];

const meta: Meta<typeof Carousel> = {
	title: "Components/Carousel",
	component: Carousel,
	argTypes: {
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
		},
		autoPlay: {
			control: "boolean",
		},
		loop: {
			control: "boolean",
		},
		breakpoints: {
			control: "object",
			mapping: responsiveBreakpoints,
		},
		paginationType: {
			control: "select",
			options: ["dots", "thumbnail"],
		},
		transitionDuration: {
			control: "number",
		},
		dotType: {
			control: "select",
			options: ["circle", "line", "square", "number"],
		},
		showNavigationButtons: {
			control: "boolean",
		},
		showPagination: {
			control: "boolean",
		},
		slideMode: {
			control: "select",
			options: ["auto", "single"],
		},
		/*size: {
            control: {
                type: "select",
                options: ['tiny', 'small', 'medium', 'large'],
            },
            table: {
                type: {
                    summary: sizeAccordion.map(size => `'${size}'`).join('|')
                },
                defaultValue: { summary: `'medium'` }
            },*/
	},
};

export default meta;

const CarouselCard = ({ color, src }: { number: number; color: string; src: string }) => (
	<img
		src={src}
		style={{
			backgroundColor: color,
			color: "white",
			textAlign: "center",
			fontSize: "2em",
			height: "100%",
			width: "100%",
			display: "flex",
			objectFit: "cover",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: "2px",
			boxSizing: "border-box",
		}}
	/>
);

const items = [
	{
		id: 1,
		color: "#88888825",
		src: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Red
	{
		id: 2,
		color: "#88888825",
		src: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Pink
	{
		id: 3,
		color: "#88888825",
		src: "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Purple
	{
		id: 4,
		color: "#88888825",
		src: "https://images.pexels.com/photos/1374295/pexels-photo-1374295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Deep Purple
	{
		id: 5,
		color: "#88888825",
		src: "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Indigo
	{
		id: 6,
		color: "#88888825",
		src: "https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Blue
	{
		id: 7,
		color: "#88888825",
		src: "https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Light Blue
	{
		id: 8,
		color: "#88888825",
		src: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Cyan
	{
		id: 9,
		color: "#88888825",
		src: "https://images.pexels.com/photos/681467/pexels-photo-681467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Teal
	{
		id: 10,
		color: "#88888825",
		src: "https://images.pexels.com/photos/131723/pexels-photo-131723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Green
	{
		id: 1,
		color: "#88888825",
		src: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Red
	{
		id: 2,
		color: "#88888825",
		src: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Pink
	{
		id: 3,
		color: "#88888825",
		src: "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Purple
	{
		id: 4,
		color: "#88888825",
		src: "https://images.pexels.com/photos/1374295/pexels-photo-1374295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Deep Purple
	{
		id: 5,
		color: "#88888825",
		src: "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Indigo
	{
		id: 6,
		color: "#88888825",
		src: "https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Blue
	{
		id: 7,
		color: "#88888825",
		src: "https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Light Blue
	{
		id: 8,
		color: "#88888825",
		src: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Cyan
	{
		id: 9,
		color: "#88888825",
		src: "https://images.pexels.com/photos/681467/pexels-photo-681467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Teal
	{
		id: 10,
		color: "#88888825",
		src: "https://images.pexels.com/photos/131723/pexels-photo-131723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	}, // Green
];

const PreviewCarousel = (
	args: Partial<CarouselProps & React.RefAttributes<HTMLDivElement>> | undefined
) => {
	return (
		<ContainerComponent title="Carousel">
			<div style={{ display: "flex", padding: "1em", width: "auto" }}>
				<Carousel {...args} breakpoints={responsiveBreakpoints}>
					{/* Pasar los items como hijos directos. Pueden ser cualquier elemento o componente. */}
					{items.map((item) => (
						<CarouselCard key={item.id} number={item.id} color={item.color} src={item.src} />
					))}
				</Carousel>
			</div>
		</ContainerComponent>
	);
};

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
	render: (args) => <PreviewCarousel {...args} />,
	args: {
		orientation: "horizontal",
		autoPlay: true,
		loop: false,
		breakpoints: responsiveBreakpoints,
		transitionDuration: 5000,
		dotType: "circle",
		paginationType: "dots",
		showNavigationButtons: true,
		showPagination: true,
		slideMode: "single",
	},
};
