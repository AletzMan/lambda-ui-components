"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Dialog, Button } from "lambda-ui-components";
import { useState } from "react";

export const DialogFeatures = () => {
	const [isOpenDraggable, setIsOpenDraggable] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isOpenCloseEscape, setIsOpenCloseEscape] = useState(false);
	const [isOpenPlayground, setIsOpenPlayground] = useState(false);

	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Dialog"
				description="Experiment with all the properties of the Dialog component in real time."
				propConfigs={[
					{
						name: "title",
						type: "string",
						defaultValue: "Confirm Action",
						default: "",
						label: "Title",
						description: "Content for the dialog header/title.",
					},
					{
						name: "transitionMode",
						type: "radio",
						defaultValue: "scaleUp",
						default: "scaleUp",
						label: "Transition Mode",
						description: "Animation type when opening/closing the dialog.",
						values: ["fade", "scaleUp", "unfold", "fadeFromTop", "fadeFromBottom", "fadeFromLeft", "fadeFromRight"],
					},
					{
						name: "backdropType",
						type: "radio",
						defaultValue: "dark",
						default: "dark",
						label: "Backdrop Type",
						description: "Style of the backdrop overlay.",
						values: ["dark", "blur", "transparent"],
					},
					{
						name: "isModal",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Is Modal",
						description: "If true, clicking outside won't close the dialog.",
					},
					{
						name: "isDraggable",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Is Draggable",
						description: "If true, the dialog can be dragged by its header.",
					},
					{
						name: "showCloseButton",
						type: "boolean",
						defaultValue: true,
						default: true,
						label: "Show Close Button",
						description: "If true, displays a close button in the header.",
					},
				]}
			>
				{(props) => (
					<div className="flex justify-center items-center py-6">
						<Button onClick={() => setIsOpenPlayground(true)} label="Open Dialog" />
						<Dialog
							{...props}
							isOpen={isOpenPlayground}
							onClose={() => setIsOpenPlayground(false)}
							footer={
								<div className="flex gap-2 justify-end">
									<Button onClick={() => setIsOpenPlayground(false)} label="Cancel" variant="outline" />
									<Button onClick={() => setIsOpenPlayground(false)} label="Confirm" />
								</div>
							}
						>
							<p className="text-center py-8 px-12">This is the dialog content. You can put any content here.</p>
						</Dialog>
					</div>
				)}
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Dialog, Button } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)} label="Open Dialog" />
			<Dialog
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Confirm Action"
				footer={
					<div className="flex gap-2 justify-end">
						<Button onClick={() => setIsOpen(false)} label="Cancel" variant="outline" />
						<Button onClick={() => setIsOpen(false)} label="Confirm" />
					</div>
				}
			>
				<p className="text-center py-8 px-12">Are you sure you want to proceed with this action?</p>
			</Dialog>
		</>
	);
}`}
			/>

			<PropertyLayout
				title="Draggable Dialog"
				description={
					<div>
						<p>Set <code className="code-tag">isDraggable</code> to <code className="code-tag">true</code> to allow users to drag the dialog by its header.</p>
					</div>
				}
				id="draggable"
				code={`import { Dialog, Button } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)} label="Open Draggable Dialog" />
			<Dialog
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Draggable Dialog"
				isDraggable
			>
				<p className="text-center py-8 px-12">Click and drag the header to move this dialog around!</p>
			</Dialog>
		</>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Button onClick={() => setIsOpenDraggable(true)} label="Open Draggable Dialog" />
					<Dialog
						isOpen={isOpenDraggable}
						onClose={() => setIsOpenDraggable(false)}
						title="Draggable Dialog"
						isDraggable
					>
						<p className="text-center py-8 px-12">Click and drag the header to move this dialog around!</p>
					</Dialog>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Modal Dialog"
				description={

					<p >Set <code className="code-tag">isModal</code> to <code className="code-tag">true</code> to prevent closing the dialog by clicking outside. Users must use the close button or cancel action.</p>

				}
				id="modal"
				code={`import { Dialog, Button } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)} label="Open Modal Dialog" />
			<Dialog
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Important Notice"
				isModal
				footer={
					<Button onClick={() => setIsOpen(false)} label="I Understand" />
				}
			>
				<p className="text-center py-8 px-12">This is a modal dialog. You must click the button to close it.</p>
			</Dialog>
		</>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Button onClick={() => setIsOpenCloseEscape(true)} label="Open Modal Dialog" />
					<Dialog
						isOpen={isOpenCloseEscape}
						onClose={() => setIsOpenCloseEscape(false)}
						title="Important Notice"
						isModal
						footer={
							<Button onClick={() => setIsOpenCloseEscape(false)} label="I Understand" />
						}
					>
						<p className="text-center py-8 px-12">This is a modal dialog. You must click the button to close it.</p>
					</Dialog>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Close on Escape"
				description={
					<p>Set <code className="code-tag">closeOnEscape</code> to <code className="code-tag">false</code> to prevent the dialog from closing when the Escape key is pressed. This is useful for critical dialogs that require explicit user action.</p>
				}
				id="close-escape"
				code={`import { Dialog, Button } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)} label="Open Dialog" />
			<Dialog
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Critical Action"
				closeOnEscape={false}
				footer={
					<div className="flex gap-2 justify-end">
						<Button onClick={() => setIsOpen(false)} label="Cancel" variant="outline" />
						<Button onClick={() => setIsOpen(false)} label="Proceed" color="danger" />
					</div>
				}
			>
				<p className="text-center py-8 px-12">
					This dialog cannot be closed with the Escape key. 
					You must click a button to proceed.
				</p>
			</Dialog>
		</>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Button onClick={() => setIsOpenModal(true)} label="Open Dialog (No Escape)" />
					<Dialog
						isOpen={isOpenModal}
						onClose={() => setIsOpenModal(false)}
						title="Critical Action"
						closeOnEscape={false}
						footer={
							<div className="flex gap-2 justify-end">
								<Button onClick={() => setIsOpenModal(false)} label="Cancel" variant="outline" />
								<Button onClick={() => setIsOpenModal(false)} label="Proceed" color="danger" />
							</div>
						}
					>
						<p className="text-center py-8 px-12">
							This dialog cannot be closed with the Escape key.
							You must click a button to proceed.
						</p>
					</Dialog>
				</div>
			</PropertyLayout>
		</>
	);
};
