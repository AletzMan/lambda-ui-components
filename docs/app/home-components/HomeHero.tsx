"use client";
import { CodeBlock, Link } from "lambda-ui-components";
import { motion } from "framer-motion";
import { RocketIcon } from "@/components/icons/RocketIcon";
import { Flex } from "lambda-ui-components";

export default function HomeHero() {
	const code = `pnpm add lambda-ui-components`;
	return (
		<section className="relative flex flex-row justify-between max-[839px]:flex-col-reverse items-center  min-h-[90vh] w-full py-16 text-center overflow-hidden px-14 gap-10">
			<Flex
				gap={6}
				align="flex-start"
				justify="start"
				direction="column"
				className="w-3/5 max-[839px]:w-full"
			>
				<motion.h1
					className="text-4xl md:text-6xl font-bold text-(--foreground-color) max-[839px]:text-center text-left mb-4 z-10 w-full"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
				>
					Lambda <span className="text-(--primary-base-color)">UI</span> Components
				</motion.h1>
				<motion.p
					className="w-full text-left text-lg md:text-lg max-[839px]:text-center text-(--foreground-secondary-color) mb-8 z-10"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
				>
					A modern, flexible, and production-ready React component library.
					<br />
					Build beautiful and accessible interfaces with speed and consistency.
				</motion.p>
				<motion.div
					className="flex flex-row max-[839px]:flex-col gap-4 justify-start max-[839px]:items-center w-full"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.7, delay: 0.7, type: "spring" }}
				>
					<Link
						size="large"
						variant="solid"
						color="primary"
						radius="small"
						label="Get started"
						href="/introduction"
						type="button"
						iconPosition="right"
						icon={<RocketIcon />}
					/>
					<CodeBlock code={code} language="bash" buttonCopy showLineNumbers={false} theme="dark" />
				</motion.div>
			</Flex>
			<Flex className="flex w-2/5 max-[839px]:w-full max-[839px]:justify-center justify-center">
				<AnimatedSVGDecorative />
			</Flex>
		</section>
	);
}

export function AnimatedSVGDecorative() {
	return (
		<motion.svg
			viewBox="0 0 394.35 394.35"
			width={220}
			height={220}
			className=" pointer-events-none select-none z-0"
			style={{
				opacity: 0.16,
			}}
			initial={{ scale: 1, rotate: 0, filter: "drop-shadow(0 0 0px var(--primary-base-color))" }}
			animate={{
				scale: [1, 1.08, 1],
				rotate: [0, 3, -3, 0],
				filter: [
					"drop-shadow(0 0 0px var(--primary-base-color))",
					"drop-shadow(0 0 18px var(--primary-base-color))",
					"drop-shadow(0 0 0px var(--primary-base-color))",
				],
			}}
			transition={{
				duration: 4.5,
				ease: "easeInOut",
				repeat: Infinity,
			}}
		>
			<g id="Capa_5" data-name="Capa 5">
				<path
					fill="var(--primary-base-color)"
					stroke="var(--primary-base-color)"
					strokeMiterlimit={10}
					d="M396.68,199.88c0-20.39-10.27-37.62-22.43-37.62-5.05,0-10.05,3.05-14.09,8.59a17.47,17.47,0,0,1-14,7.2h-.48a17.27,17.27,0,0,1-17.25-17.24V71.55H239.1a17.27,17.27,0,0,1-17.25-17.24v-.48a17.39,17.39,0,0,1,7.21-14c5.54-4,8.59-9,8.59-14.09,0-12.14-17.24-22.41-37.65-22.41s-37.65,10.27-37.65,22.41c0,5.05,3.05,10.05,8.6,14.09a17.41,17.41,0,0,1,7.2,14v.48A17.27,17.27,0,0,1,160.9,71.55H71.59V160.8A17.26,17.26,0,0,1,54.34,178h-.48a17.44,17.44,0,0,1-14-7.2c-4-5.53-9-8.58-14.09-8.58-12.16,0-22.43,17.23-22.43,37.62v.24c0,20.39,10.27,37.62,22.43,37.62,5.05,0,10-3.05,14.09-8.59a17.47,17.47,0,0,1,14-7.2h.48a17.27,17.27,0,0,1,17.25,17.24v89.26H160.9a17.27,17.27,0,0,1,17.25,17.24v.48a17.39,17.39,0,0,1-7.21,14c-5.54,4-8.59,9-8.59,14.09,0,12.14,17.24,22.41,37.65,22.41s37.65-10.27,37.65-22.41c0-5-3.05-10-8.6-14.09a17.41,17.41,0,0,1-7.2-14v-.48a17.27,17.27,0,0,1,17.25-17.24h89.31V239.2A17.26,17.26,0,0,1,345.66,222h.48a17.44,17.44,0,0,1,14,7.2c4,5.53,9,8.58,14.09,8.58,12.16,0,22.43-17.23,22.43-37.62v-.24Z"
					transform="translate(-2.82 -2.82)"
				/>
			</g>
			<g id="Capa_2" data-name="Capa 2">
				<path
					fill="#fff"
					stroke="#fff"
					strokeMiterlimit={10}
					d="M129.12,275.3c.67,0,18.36.07,19.26,0a4.37,4.37,0,0,0,3-2.22c.59-.59,42.21-77.62,42.21-77.62s31.36,69.8,32.76,74.08c4.52,9.47,12.84,9.67,18.54,8.47,1.72-.62,25.29-8.91,26.47-9.5,1.6-.81,1.57-2.47,1.18-3.84-.12-.44-4.94-15-5.31-16.09a2.23,2.23,0,0,0-2.81-1.18c-.56.19-9.81,3.32-11.36,3.69-4,1-6-.12-7.08-1.92-.89-.73-51-115.7-52.39-118.35-2.92-6.53-6.87-9-12.25-9.3-1.85,0-27.84-.1-29.22,0-2,.08-2.24,1.32-2.36,2.39,0,.22-.37,18.17-.15,19a2.1,2.1,0,0,0,2.06,2.09c.74,0,14.46,0,15.94.15a5.1,5.1,0,0,1,4.28,2.51c.74.89,9,20.81,9,20.81S128.29,270.26,127.6,271.31C126.84,272.76,127.35,275.17,129.12,275.3Z"
					transform="translate(-2.82 -2.82)"
				/>
				<path
					fill="none"
					stroke="var(--primary-base-color)"
					strokeMiterlimit={10}
					d="M300.84,263.62"
					transform="translate(-2.82 -2.82)"
				/>
				<path
					fill="none"
					stroke="var(--primary-base-color)"
					strokeMiterlimit={10}
					d="M306.76,292.17"
					transform="translate(-2.82 -2.82)"
				/>
			</g>
		</motion.svg>
	);
}
