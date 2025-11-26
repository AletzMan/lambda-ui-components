"use client";
import PropertyLayout from "../../components/PropertyLayout";
import { ClientOnly } from "lambda-ui-components";

export const ClientOnlyFeatures = () => {
	return (
		<>
			<PropertyLayout
				title="Usage"
				description={
					<div>
						<p>The ClientOnly component wraps content that should only render on the client side, preventing server-side rendering hydration mismatches.</p>
					</div>
				}
				id="usage"
				code={`import { ClientOnly } from "lambda-ui-components";

export default function App() {
	return (
		<ClientOnly>
			<div className="p-4 bg-(--surface-a) border border-(--neutral-opacity-color) rounded-md">
				<p className="text-(--foreground-title-color)">✓ Client-side content rendered</p>
				<p className="text-xs text-(--foreground-secondary-color) mt-2">
					Current time: {new Date().toLocaleTimeString()}
				</p>
			</div>
		</ClientOnly>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<ClientOnly>
						<div className="p-4 bg-(--surface-a) border border-(--neutral-opacity-color) rounded-md">
							<p className="text-(--foreground-title-color)">✓ Client-side content rendered</p>
							<p className="text-xs text-(--foreground-secondary-color) mt-2">
								Current time: {new Date().toLocaleTimeString()}
							</p>
						</div>
					</ClientOnly>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Fallback"
				description={
					<div>
						<p>You can provide a <code className="code-tag">fallback</code> prop to display content during server-side rendering or before client hydration completes.</p>
					</div>
				}
				id="with-fallback"
				code={`import { ClientOnly } from "lambda-ui-components";

export default function App() {
	return (
		<ClientOnly fallback={<p>Loading...</p>}>
			<p>Client-side content with fallback</p>
		</ClientOnly>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<ClientOnly
						fallback={
							<div className="p-4 bg-(--surface-a) border border-(--neutral-opacity-color) rounded-md">
								<p className="text-(--foreground-secondary-color)">Loading client content...</p>
							</div>
						}
					>
						<div className="p-4 bg-(--surface-a) border border-(--neutral-opacity-color) rounded-md">
							<p className="text-(--foreground-title-color)">✓ Client content loaded</p>
						</div>
					</ClientOnly>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Use Cases"
				description={
					<div>
						<p>Common scenarios where ClientOnly is useful:</p>
						<ul className="list-disc list-inside mt-2 space-y-1 text-(--foreground-secondary-color)">
							<li>Accessing browser-only APIs (localStorage, window, document)</li>
							<li>Rendering components that depend on client-side state</li>
							<li>Preventing hydration mismatches with dynamic content</li>
							<li>Lazy-loading heavy components only on the client</li>
						</ul>
					</div>
				}
				id="use-cases"
				code={`import { ClientOnly } from "lambda-ui-components";

export default function App() {
	return (
		<div>
			<h2>Browser Info</h2>
			<ClientOnly fallback={<p>Detecting browser...</p>}>
				<div>
					<p>User Agent: {navigator.userAgent}</p>
					<p>Screen Width: {window.innerWidth}px</p>
					<p>Local Storage Available: {typeof localStorage !== 'undefined' ? 'Yes' : 'No'}</p>
				</div>
			</ClientOnly>
		</div>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<ClientOnly
						fallback={
							<div className="p-4 bg-(--surface-a) border border-(--neutral-opacity-color) rounded-md">
								<p className="text-(--foreground-secondary-color)">Detecting browser...</p>
							</div>
						}
					>
						<div className="p-4 bg-(--surface-a) border border-(--neutral-opacity-color) rounded-md space-y-2">
							<h3 className="text-(--foreground-title-color) font-semibold mb-3">Browser Information</h3>
							<p className="text-sm text-(--foreground-secondary-color)">
								<strong>Screen Width:</strong> {typeof window !== 'undefined' ? window.innerWidth : 0}px
							</p>
							<p className="text-sm text-(--foreground-secondary-color)">
								<strong>Local Storage:</strong> {typeof localStorage !== 'undefined' ? 'Available' : 'Not Available'}
							</p>
							<p className="text-sm text-(--foreground-secondary-color)">
								<strong>Platform:</strong> {typeof navigator !== 'undefined' ? navigator.platform : 'Unknown'}
							</p>
						</div>
					</ClientOnly>
				</div>
			</PropertyLayout>
		</>
	);
};
