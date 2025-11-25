"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Carousel, Splitter } from "lambda-ui-components";

const sampleImages = [
	"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
	"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
	"https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop",
	"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
	"https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=600&fit=crop",
];

const breakpoints = [
	{ breakpoint: 0, items: 1 },
	{ breakpoint: 768, items: 1 },
	{ breakpoint: 1200, items: 2 },
];

export const CarouselFeatures = () => {

	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Carousel"
				description="Experiment with all the properties of the Carousel component in real time."
				propConfigs={[
					{
						name: "autoPlay",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Auto Play",
						description: "Enable automatic slide transitions.",
					},
					{
						name: "loop",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Loop",
						description: "Enable infinite looping.",
					},
					{
						name: "showNavigationButtons",
						type: "boolean",
						defaultValue: true,
						default: true,
						label: "Show Navigation",
						description: "Show previous/next buttons.",
					},
					{
						name: "showPagination",
						type: "boolean",
						defaultValue: true,
						default: true,
						label: "Show Pagination",
						description: "Show pagination indicators.",
					},
					{
						name: "orientation",
						type: "radio",
						defaultValue: "horizontal",
						default: "horizontal",
						label: "Orientation",
						description: "Carousel orientation.",
						values: ["horizontal", "vertical"],
					},
					{
						name: "slideMode",
						type: "radio",
						defaultValue: "auto",
						default: "auto",
						label: "Slide Mode",
						description: "How slides advance.",
						values: ["auto", "single"],
					},
					{
						name: "paginationType",
						type: "radio",
						defaultValue: "dots",
						default: "dots",
						label: "Pagination Type",
						description: "Type of pagination indicators.",
						values: ["dots", "thumbnail"],
					},
					{
						name: "dotType",
						type: "radio",
						defaultValue: "circle",
						default: "circle",
						label: "Dot Type",
						description: "Visual style of dot pagination. Only applies when paginationType is 'dots'.",
						values: ["circle", "line", "square", "number"],
					},
					{
						name: "transitionDuration",
						type: "number",
						defaultValue: 5000,
						default: 5000,
						label: "Transition Duration",
						description: "Duration in milliseconds for autoplay transitions.",
					},
				]}
			>

				{(props) => (
					<div className="flex justify-center items-center py-6">
						<Carousel {...props} breakpoints={breakpoints}>
							{sampleImages.map((src, index) => (
								<div key={index} className="w-full h-[400px] px-1">
									<img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-xs" />
								</div>
							))}
						</Carousel>
					</div>
				)}
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				description={
					<div>
						<p>Basic carousel with images. Each child element becomes a slide.</p>
					</div>
				}
				id="usage"
				code={`import { Carousel } from "lambda-ui-components";

export default function App() {
	return (
		<Carousel>
			<div className="w-full h-[400px]">
				<img src="/image1.jpg" alt="Slide 1" className="w-full h-full object-cover" />
			</div>
			<div className="w-full h-[400px]">
				<img src="/image2.jpg" alt="Slide 2" className="w-full h-full object-cover" />
			</div>
			<div className="w-full h-[400px]">
				<img src="/image3.jpg" alt="Slide 3" className="w-full h-full object-cover" />
			</div>
		</Carousel>
	);
}`}
			/>

			<PropertyLayout
				title="With Auto Play and Loop"
				description={
					<div>
						<p>Enable <code className="code-tag">autoPlay</code> for automatic transitions and <code className="code-tag">loop</code> for infinite scrolling.</p>
					</div>
				}
				id="autoplay-loop"
				code={`import { Carousel } from "lambda-ui-components";

export default function App() {
const sampleImages = [
	"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
	"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
	"https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop",
	"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
	"https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=600&fit=crop",	
	"https://images.unsplash.com/photo-1518173946688-a4c8892bbd9f?w=800&h=600&fit=crop",	
];
	return (
		<Carousel autoPlay loop>
			{sampleImages.map((src, index) => (
				<div key={index} className="w-full h-[400px] px-1">
					<img src={src} alt={\`Slide ${`\${index + 1}`}\`} className="w-full h-full object-cover rounded-sm" />
				</div>
			))}
		</Carousel>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Carousel autoPlay loop>
						{sampleImages.map((src, index) => (
							<div key={index} className="w-full h-[400px] px-1">
								<img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-sm" />
							</div>
						))}
					</Carousel>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Responsive Breakpoints"
				description={
					<div>
						<p>Use <code className="code-tag">breakpoints</code> to show different numbers of slides at different screen sizes.</p>
					</div>
				}
				id="breakpoints"
				code={`import { Carousel } from "lambda-ui-components";

export default function App() {
	const breakpoints = [
		{ breakpoint: 0, items: 1 },
		{ breakpoint: 768, items: 2 },
		{ breakpoint: 1200, items: 3 },
	];

	return (
		<Carousel breakpoints={breakpoints}>
			<div className="w-full h-[300px] bg-blue-500 flex items-center justify-center text-white text-2xl rounded-sm">1</div>
			<div className="w-full h-[300px] bg-green-500 flex items-center justify-center text-white text-2xl rounded-sm">2</div>
			<div className="w-full h-[300px] bg-red-500 flex items-center justify-center text-white text-2xl rounded-sm">3</div>
			<div className="w-full h-[300px] bg-yellow-500 flex items-center justify-center text-white text-2xl rounded-sm">4</div>
			<div className="w-full h-[300px] bg-purple-500 flex items-center justify-center text-white text-2xl rounded-sm">5</div>
		</Carousel>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Carousel breakpoints={[
						{ breakpoint: 0, items: 1 },
						{ breakpoint: 768, items: 2 },
						{ breakpoint: 1200, items: 3 },
					]}>
						<div className="w-full h-[300px] bg-blue-500 flex items-center justify-center text-white text-2xl rounded-sm">1</div>
						<div className="w-full h-[300px] bg-green-500 flex items-center justify-center text-white text-2xl rounded-sm">2</div>
						<div className="w-full h-[300px] bg-red-500 flex items-center justify-center text-white text-2xl rounded-sm">3</div>
						<div className="w-full h-[300px] bg-yellow-500 flex items-center justify-center text-white text-2xl rounded-sm">4</div>
						<div className="w-full h-[300px] bg-purple-500 flex items-center justify-center text-white text-2xl rounded-sm">5</div>
					</Carousel>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Thumbnail Pagination"
				description={
					<div>
						<p>Use <code className="code-tag">paginationType="thumbnail"</code> to show thumbnails instead of dots.</p>
					</div>
				}
				id="thumbnails"
				code={`import { Carousel } from "lambda-ui-components";
import { div } from "framer-motion/client";

export default function App() {
	return (
		<Carousel paginationType="thumbnail">
			<div className="w-full h-[400px]">
				<img src="/image1.jpg" alt="Slide 1" className="w-full h-full object-cover" />
			</div>
			<div className="w-full h-[400px]">
				<img src="/image2.jpg" alt="Slide 2" className="w-full h-full object-cover" />
			</div>
			<div className="w-full h-[400px]">
				<img src="/image3.jpg" alt="Slide 3" className="w-full h-full object-cover" />
			</div>
		</Carousel>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Carousel paginationType="thumbnail">
						{sampleImages.slice(0, 3).map((src, index) => (
							<div key={index} className="w-full h-[400px]">
								<img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-md" />
							</div>
						))}
					</Carousel>
				</div>
			</PropertyLayout>
		</>
	);
};
