"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, CodeBlock, Dialog } from "lambda-ui-components";
import { Code2Icon, Component } from "lucide-react";

export interface ExampleCardProps {
	title: string;
	children: React.ReactNode; // El componente visual
	code?: string; // El snippet de código a mostrar detrás
	status?: string; // Stable/Beta/Experimental, opcional
}

export function ExampleCard({ title, children, code, status }: ExampleCardProps) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<motion.article
				whileHover={{
					scale: 1.005,
					boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
					outline: "1px solid var(--primary-hover-color)",
				}}
				transition={{ type: "spring", stiffness: 250, damping: 20 }}
				className="relative w-full min-h-72 bg-(--surface-a) border border-(--neutral-opacity-color)
                 p-4 rounded-md shadow-md transition-shadow hover:shadow-lg hover:shadow-primary-400/10 overflow-hidden"
			>
				<div className="flex items-center justify-between w-full mb-2">
					<h3 className="flex items-center gap-2 text-md font-bold">
						<Component className="w-4 h-4 text-cyan-300/50" />
						{title}
					</h3>
					<Button
						variant="text"
						radius="small"
						icon={<Code2Icon />}
						onClick={() => setShowModal(true)}
					/>
				</div>
				<div className="flex flex-col items-center justify-center gap-6 w-full h-full mb-2">
					{children}
				</div>
				{status && (
					<span className="absolute bottom-4 -rotate-45 -right-6 text-xs rounded px-8 py-0.5  bg-green-500 text-green-100 font-semibold">
						{status}
					</span>
				)}
			</motion.article>
			<Dialog
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				title={
					<span className="flex items-center gap-2 text-lg text-(--foreground-title-color) font-bold">
						<Code2Icon className="w-4 h-4 text-yellow-300/90" />
						{title}
					</span>
				}
				showCloseButton
				transitionMode="scaleUp"
			>
				<div className="p-4">
					<CodeBlock code={code} language="jsx" buttonCopy theme="dark" className="w-full" />
				</div>
			</Dialog>
		</>
	);
}
