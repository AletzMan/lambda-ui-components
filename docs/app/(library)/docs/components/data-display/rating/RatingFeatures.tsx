"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Rating } from "lambda-ui-components";
import { Heart, ThumbsUp, Zap, Star } from "lucide-react";
import { useState } from "react";

const ControlledRatingExample = () => {
	const [rating, setRating] = useState(3);

	return (
		<div className="flex flex-col gap-4 justify-center items-center py-6">
			<Rating value={rating} onChange={setRating} />
			<p className="text-sm">Current rating: {rating}</p>
		</div>
	);
};

export const RatingFeatures = () => {
	const [value, setValue] = useState(3);
	const [ratingWithText, setRatingWithText] = useState(3);
	const [ratingCustomIcons, setRatingCustomIcons] = useState(3);
	const [ratingCustomIconsTwo, setRatingCustomIconsTwo] = useState(3);
	const [ratingCustomIconsThree, setRatingCustomIconsThree] = useState(3);
	const [ratingCustomIconsFour, setRatingCustomIconsFour] = useState(3);

	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Rating"
				description="Experiment with all the properties of the Rating component in real time."
				propConfigs={[
					{
						name: "text",
						type: "array-string",
						defaultValue: "[\"Terrible\", \"Bad\", \"Normal\", \"Good\", \"Excellent\"]",
						default: "[\"Terrible\", \"Bad\", \"Normal\", \"Good\", \"Excellent\"]",
						label: "Text",
						description: "Text to display in the rating component.",
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Size of the rating component.",
						values: ["small", "medium", "large"],
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Variant",
						description: "Visual style of the rating.",
						values: ["solid", "outline", "bordered"],
					},
					{
						name: "color",
						type: "color",
						defaultValue: "default",
						default: "default",
						label: "Color",
						description: "Color scheme of the rating.",
						values: ["default", "primary", "secondary", "success", "danger", "warning", "info"],
					},
					{
						name: "textPosition",
						type: "radio",
						defaultValue: "right",
						default: "right",
						label: "Text Position",
						description: "Position of the rating text.",
						values: ["top", "bottom", "right"],
					},
				]}
			>
				{(props) => (
					<div className="flex justify-center items-center py-6">
						<Rating {...props} value={value} onChange={setValue} />
					</div>
				)}
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				description={
					<div>
						<p>The Rating component allows users to rate content using a set of icons.</p>
					</div>
				}
				id="usage"
				code={`import { Rating } from "lambda-ui-components";

export default function App() {
	const [value, setValue] = useState(0);
	return (
		<div className="flex gap-4">
			<Rating value={value} onChange={setValue} /> 
		</div>
	);
}`}
			/>

			<PropertyLayout
				title="With Text"
				description={
					<div>
						<p>You can display text alongside the rating using the <code className="code-tag">text</code> prop. The text changes based on the rating value.</p>
					</div>
				}
				id="with-text"
				code={`import { Rating } from "lambda-ui-components";

export default function App() {
	const [value, setValue] = useState(0);
	return (
		<div className="flex justify-center">
			<Rating 
				value={value} 
				text={["Terrible", "Bad", "Normal", "Good", "Excellent"]} 
			/>
		</div>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Rating
						value={ratingWithText}
						onChange={setRatingWithText}
						text={["Terrible", "Bad", "Normal", "Good", "Excellent"]}
					/>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Custom Icons"
				description={
					<div>
						<p>You can use custom icons for the rating items using the <code className="code-tag">customIcon</code> prop.</p>
					</div>
				}
				id="custom-icons"
				code={`import { Rating } from "lambda-ui-components";
import { Heart, ThumbsUp, Zap, Star } from "lucide-react";

export default function App() {
	return (
		<div className="flex flex-col gap-4">
			<Rating value={3} customIcon={[<Heart />, <Heart />, <Heart />, <Heart />, <Heart />]} color="danger" />
			<Rating value={3} customIcon={[<ThumbsUp />, <ThumbsUp />, <ThumbsUp />, <ThumbsUp />, <ThumbsUp />]} color="primary" />
			<Rating value={3} customIcon={[<Zap />, <Zap />, <Zap />, <Zap />, <Zap />]} color="warning" />
		</div>
	);
}`}
			>
				<div className="flex flex-col gap-4 justify-center items-center py-6">
					<Rating value={ratingCustomIcons} onChange={setRatingCustomIcons} customIcon={[<Heart key="1" />, <Heart key="2" />, <Heart key="3" />, <Heart key="4" />, <Heart key="5" />]} color="danger" />
					<Rating value={ratingCustomIconsTwo} onChange={setRatingCustomIconsTwo} customIcon={[<ThumbsUp key="1" />, <ThumbsUp key="2" />, <ThumbsUp key="3" />, <ThumbsUp key="4" />, <ThumbsUp key="5" />]} color="primary" />
					<Rating value={ratingCustomIconsThree} onChange={setRatingCustomIconsThree} customIcon={[<Zap key="1" />, <Zap key="2" />, <Zap key="3" />, <Zap key="4" />, <Zap key="5" />]} color="warning" />
					<Rating value={ratingCustomIconsFour} onChange={setRatingCustomIconsFour} customIcon={["😭", "😐", "🙂", "😁", "🤩"]} color="info" />
					<Rating value={ratingCustomIconsFour} onChange={setRatingCustomIconsFour} customIcon={["A", "B", "C", "D", "E"]} color="info" />
				</div>
			</PropertyLayout>


			<PropertyLayout
				title="Controlled"
				description={
					<div>
						<p>You can control the Rating component by using the <code className="code-tag">value</code> and <code className="code-tag">onChange</code> props with <code className="code-tag">useState</code>.</p>
					</div>
				}
				id="controlled"
				code={`import { Rating } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [rating, setRating] = useState(0);
	
	return (
		<div className="flex flex-col gap-4">
			<Rating value={rating} onChange={setRating} />
			<p>Current rating: {rating}</p>
		</div>
	);
}`}
			>
				<ControlledRatingExample />
			</PropertyLayout>

		</>
	);
};
