"use client";
import PropertyLayout from "../../components/PropertyLayout";
import { Button, useNotification } from "lambda-ui-components";

export const NotificationFeatures = () => {
	const { showNotification } = useNotification();

	return (
		<>
			<PropertyLayout
				title="Setup"
				id="setup"
				description={
					<div>
						<p>First, wrap your application with the <code className="code-tag">NotificationProvider</code> at the root level.</p>
					</div>
				}
				code={`import { NotificationProvider } from "lambda-ui-components";

export default function App() {
	return (
		<NotificationProvider 
			maxNotifications={4} 
			placement="top-right" 
			duration={5000}
		>
			{/* Your app content */}
		</NotificationProvider>
	);
}`}
			/>

			<PropertyLayout
				title="Usage"
				id="usage"
				description={
					<div>
						<p>Use the <code className="code-tag">useNotification</code> hook to show notifications from any component within the provider.</p>
					</div>
				}
				code={`import { useNotification, Button } from "lambda-ui-components";

export default function MyComponent() {
	const { showNotification } = useNotification();

	const handleClick = () => {
		showNotification({
			title: "Success!",
			message: "Your changes have been saved successfully.",
			notificationType: "success",
			closable: true,
		});
	};

	return <Button onClick={handleClick} label="Show Notification" />;
}`}
			/>

			<PropertyLayout
				title="Different Types"
				description={
					<div>
						<p>Notifications come in different types: <code className="code-tag">neutral</code>, <code className="code-tag">info</code>, <code className="code-tag">success</code>, <code className="code-tag">warning</code>, and <code className="code-tag">danger</code>.</p>
					</div>
				}
				id="types"
				code={`import { useNotification, Button } from "lambda-ui-components";

export default function NotificationTypes() {
	const { showNotification } = useNotification();

	return (
		<div className="flex flex-col gap-2">
			<Button 
				onClick={() => showNotification({
					title: "Neutral",
					message: "This is a neutral notification.",
					notificationType: "neutral",
				})}
				label="Show Neutral"
			/>
			<Button 
				onClick={() => showNotification({
					title: "Info",
					message: "This is an informational notification.",
					notificationType: "info",
				})}
				label="Show Info"
			/>
			<Button 
				onClick={() => showNotification({
					title: "Success",
					message: "Operation completed successfully.",
					notificationType: "success",
				})}
				label="Show Success"
			/>
			<Button 
				onClick={() => showNotification({
					title: "Warning",
					message: "Please review before proceeding.",
					notificationType: "warning",
				})}
				label="Show Warning"
			/>
			<Button 
				onClick={() => showNotification({
					title: "Danger",
					message: "An error has occurred.",
					notificationType: "danger",
				})}
				label="Show Danger"
			/>
		</div>
	);
}`}
			>
				<div className="flex flex-wrap gap-2 justify-center items-center py-6">
					<Button
						onClick={() => showNotification({
							title: "Neutral",
							message: "This is a neutral notification.",
							notificationType: "neutral",
						})}
						label="Show Neutral"
					/>
					<Button
						onClick={() => showNotification({
							title: "Info",
							message: "This is an informational notification.",
							notificationType: "info",
						})}
						label="Show Info"
					/>
					<Button
						onClick={() => showNotification({
							title: "Success",
							message: "Operation completed successfully.",
							notificationType: "success",
						})}
						label="Show Success"
					/>
					<Button
						onClick={() => showNotification({
							title: "Warning",
							message: "Please review before proceeding.",
							notificationType: "warning",
						})}
						label="Show Warning"
					/>
					<Button
						onClick={() => showNotification({
							title: "Danger",
							message: "An error has occurred.",
							notificationType: "danger",
						})}
						label="Show Danger"
					/>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Variants"
				description={
					<div>
						<p>Notifications support different visual variants: <code className="code-tag">themed</code> (default), <code className="code-tag">solid</code>, <code className="code-tag">soft</code>, <code className="code-tag">darkened</code>, and <code className="code-tag">lightened</code>.</p>
					</div>
				}
				id="variants"
				code={`import { useNotification, Button } from "lambda-ui-components";

export default function NotificationVariants() {
	const { showNotification } = useNotification();

	return (
		<div className="flex flex-col gap-2">
			<Button 
				onClick={() => showNotification({
					title: "Solid Variant",
					message: "This is a solid notification.",
					notificationType: "info",
					variant: "solid",
				})}
				label="Solid"
			/>
			<Button 
				onClick={() => showNotification({
					title: "Soft Variant",
					message: "This is a soft notification.",
					notificationType: "info",
					variant: "soft",
				})}
				label="Soft"
			/>
			<Button 
				onClick={() => showNotification({
					title: "Themed Variant",
					message: "This is a themed notification.",
					notificationType: "info",
					variant: "themed",
				})}
				label="Themed"
			/>
			<Button 
				onClick={() => showNotification({
					title: "Lightened Variant",
					message: "This is a lightened notification.",
					notificationType: "info",
					variant: "lightened",
				})}
				label="Lightened"
			/>
			<Button 
				onClick={() => showNotification({
					title: "Darkened Variant",
					message: "This is a darkened notification.",
					notificationType: "info",
					variant: "darkened",
				})}
				label="Darkened"
			/>
		</div>
	);
}`}
			>
				<div className="flex flex-wrap gap-2 justify-center items-center py-6">
					<Button
						onClick={() => showNotification({
							title: "Solid Variant",
							message: "This is a solid notification.",
							notificationType: "info",
							variant: "solid",
						})}
						label="Solid"
					/>
					<Button
						onClick={() => showNotification({
							title: "Soft Variant",
							message: "This is a soft notification.",
							notificationType: "info",
							variant: "soft",
						})}
						label="Soft"
					/>
					<Button
						onClick={() => showNotification({
							title: "Themed Variant",
							message: "This is a themed notification.",
							notificationType: "info",
							variant: "themed",
						})}
						label="Themed"
					/>
					<Button
						onClick={() => showNotification({
							title: "Darkened Variant",
							message: "This is a darkened notification.",
							notificationType: "info",
							variant: "darkened",
						})}
						label="Darkened"
					/>
					<Button
						onClick={() => showNotification({
							title: "Lightened Variant",
							message: "This is a lightened notification.",
							notificationType: "info",
							variant: "lightened",
						})}
						label="Lightened"
					/>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Actions"
				description={
					<div>
						<p>Add action buttons to your notification using the <code className="code-tag">onConfirm</code> and <code className="code-tag">onCancel</code> callbacks.</p>
					</div>
				}
				id="with-actions"
				code={`import { useNotification, Button } from "lambda-ui-components";

export default function NotificationWithActions() {
	const { showNotification } = useNotification();

	const handleShowConfirmation = () => {
		showNotification({
			title: "Confirm Action",
			message: "Are you sure you want to proceed?",
			notificationType: "warning",
			closable: true,
			onConfirm: () => {
				console.log("Confirmed!");
				// Perform the action
			},
			onCancel: () => {
				console.log("Cancelled");
			},
			confirmText: "Yes",
			cancelText: "Cancel",
		});
	};

	return <Button onClick={handleShowConfirmation} label="Show Confirmation" />;
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Button
						onClick={() => showNotification({
							title: "Confirm Action",
							message: "Are you sure you want to proceed?",
							notificationType: "warning",
							closable: true,
							onConfirm: () => {
								console.log("Confirmed!");
								alert("Action confirmed!");
							},
							onCancel: () => {
								console.log("Cancelled");
							},
							confirmText: "Yes",
							cancelText: "Cancel",
						})}
						label="Show Confirmation"
					/>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Custom Placement"
				description={
					<div>
						<p>Control where notifications appear using the <code className="code-tag">placement</code> prop. You can set a default placement in the provider or override it per notification.</p>
					</div>
				}
				id="placement"
				code={`import { useNotification, Button } from "lambda-ui-components";

export default function CustomPlacement() {
	const { showNotification } = useNotification();

	return (
		<div className="flex flex-wrap gap-2">
			<Button 
				onClick={() => showNotification({
					title: "Top Left",
					message: "Notification in top-left corner",
					placement: "top-left",
				})}
				label="Top Left"
			/>
			<Button 
				onClick={() => showNotification({
					title: "Top Right",
					message: "Notification in top-right corner",
					placement: "top-right",
				})}
				label="Top Right"
			/>
			<Button 
				onClick={() => showNotification({
					title: "Bottom Left",
					message: "Notification in bottom-left corner",
					placement: "bottom-left",
				})}
				label="Bottom Left"
			/>
			<Button 
				onClick={() => showNotification({
					title: "Bottom Right",
					message: "Notification in bottom-right corner",
					placement: "bottom-right",
				})}
				label="Bottom Right"
			/>
		</div>
	);
}`}
			>
				<div className="flex flex-wrap gap-2 justify-center items-center py-6">
					<Button
						onClick={() => showNotification({
							title: "Top Left",
							message: "Notification in top-left corner",
							placement: "top-left",
						})}
						label="Top Left"
					/>
					<Button
						onClick={() => showNotification({
							title: "Top Right",
							message: "Notification in top-right corner",
							placement: "top-right",
						})}
						label="Top Right"
					/>
					<Button
						onClick={() => showNotification({
							title: "Bottom Left",
							message: "Notification in bottom-left corner",
							placement: "bottom-left",
						})}
						label="Bottom Left"
					/>
					<Button
						onClick={() => showNotification({
							title: "Bottom Right",
							message: "Notification in bottom-right corner",
							placement: "bottom-right",
						})}
						label="Bottom Right"
					/>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Custom Duration"
				description={
					<div>
						<p>Set how long notifications stay visible using the <code className="code-tag">duration</code> prop (in milliseconds). Set to <code className="code-tag">0</code> to disable auto-close.</p>
					</div>
				}
				id="duration"
				code={`import { useNotification, Button } from "lambda-ui-components";

export default function CustomDuration() {
	const { showNotification } = useNotification();

	return (
		<div className="flex gap-2">
			<Button 
				onClick={() => showNotification({
					title: "Quick",
					message: "This will close in 2 seconds",
					duration: 2000,
				})}
				label="2 seconds"
			/>
			<Button 
				onClick={() => showNotification({
					title: "Persistent",
					message: "This won't auto-close",
					duration: 0,
					closable: true,
				})}
				label="No auto-close"
			/>
		</div>
	);
}`}
			>
				<div className="flex gap-2 justify-center items-center py-6">
					<Button
						onClick={() => showNotification({
							title: "Quick",
							message: "This will close in 2 seconds",
							duration: 2000,
						})}
						label="2 seconds"
					/>
					<Button
						onClick={() => showNotification({
							title: "Persistent",
							message: "This won't auto-close",
							duration: 0,
							closable: true,
						})}
						label="No auto-close"
					/>
				</div>
			</PropertyLayout>
		</>
	);
};
