"use client";
import PropertyLayout from "../../components/PropertyLayout";
import { usePathObserver, useActiveSectionObserver, usePopover } from "lambda-ui-components";
import { createPortal } from "react-dom";

export const HooksFeatures = () => {
    const currentPath = usePathObserver();
    const activeSection = useActiveSectionObserver({ selectors: "h2, h3" });
    const {
        isOpen,
        setIsOpen,
        menuPosition,
        triggerRef,
        contentRef,
        handleKeyDown
    } = usePopover<HTMLDivElement, HTMLDivElement>({ x: 0, y: 5 });

    return (
        <>
            <PropertyLayout
                title="usePathObserver"
                description={
                    <div>
                        <p>A hook that observes and returns the current URL pathname. Automatically updates when navigation occurs.</p>
                        <p className="mt-2 text-(--foreground-secondary-color)">Useful for tracking route changes in client-side applications without relying on a specific router library.</p>
                        <p className="mt-2 text-(--foreground-secondary-color)">
                            <strong className="text-(--foreground-title-color)">Note:</strong> Recommended for use in non-Next.js environments. For Next.js applications, use the built-in <code className="code-tag">usePathname</code> hook from <code className="code-tag">next/navigation</code>.
                        </p>
                    </div>
                }
                id="use-path-observer"
                code={`import { usePathObserver } from "lambda-ui-components";

export default function App() {
	const currentPath = usePathObserver();

	return (
		<div>
			<p>Current path: {currentPath}</p>
		</div>
	);
}`}
            >
                <div className="flex justify-center items-center py-6">
                    <div className="p-4 bg-(--surface-a) border border-(--neutral-opacity-color) rounded-md">
                        <p className="text-(--foreground-title-color) font-semibold mb-2">Current Path:</p>
                        <code className="text-sm text-(--primary-base-color) bg-(--surface-b) px-3 py-1 rounded">
                            {currentPath}
                        </code>
                        <p className="text-xs text-(--foreground-secondary-color) mt-3">
                            Navigate to different pages to see this value update automatically.
                        </p>
                    </div>
                </div>
            </PropertyLayout>

            <PropertyLayout
                title="usePopover"
                description={
                    <div>
                        <p>A comprehensive hook for managing popover positioning, keyboard navigation, and accessibility.</p>
                        <p className="mt-2 text-(--foreground-secondary-color)">Handles automatic positioning (above/below), click-outside detection, keyboard navigation, and focus management.</p>
                        <p className="mt-2 text-(--foreground-secondary-color)">
                            <strong className="text-(--foreground-title-color)">Important:</strong> The popover content must use <code className="code-tag">position: fixed</code> and should be rendered using <code className="code-tag">createPortal(content, document.body)</code> to avoid overflow and z-index issues.
                        </p>
                    </div>
                }
                id="use-popover"
                code={`import { usePopover } from "lambda-ui-components";
import { createPortal } from "react-dom";

export default function App() {
	const {
		isOpen,
		setIsOpen,
		menuPosition,
		triggerRef,
		contentRef,
		handleKeyDown
	} = usePopover<HTMLButtonElement, HTMLDivElement>();

	return (
		<div>
			<button
				ref={triggerRef}
				onClick={() => setIsOpen(!isOpen)}
				onKeyDown={handleKeyDown}
			>
				Toggle Popover
			</button>
			{isOpen && createPortal(
				<div
					ref={contentRef}
					className="fixed z-50"
					style={{
						top: menuPosition.top,
						left: menuPosition.left
					}}
				>
					Popover content
				</div>,
				document.body
			)}
		</div>
	);
}`}
            >
                <div className="flex flex-col justify-center items-center gap-10 py-6 min-h-[200px]">
                    <div className="p-4 bg-(--surface-a) border border-(--neutral-opacity-color) rounded-md">
                        <p className="text-(--foreground-secondary-color) text-sm mb-3">
                            This hook is used internally by components like Select, Dropdown, and DatePicker.
                        </p>
                        <p className="text-(--foreground-secondary-color) text-sm">
                            <strong className="text-(--foreground-title-color)">Features:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-xs text-(--foreground-secondary-color)">
                            <li>Automatic positioning (above/below based on available space)</li>
                            <li>Keyboard navigation (Arrow keys, Enter, Escape)</li>
                            <li>Click-outside detection</li>
                            <li>Focus management</li>
                            <li>Scroll and resize handling</li>
                        </ul>
                    </div>
                    <div className="flex justify-center items-center" ref={triggerRef}>
                        <button
                            className="px-4 py-2 bg-cyan-950 text-gray-100 rounded-md hover:bg-cyan-800 transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            onKeyDown={handleKeyDown}
                        >
                            Toggle Popover
                        </button>
                        {isOpen && (
                            createPortal(
                                <div
                                    ref={contentRef}
                                    className="flex flex-col justify-center items-center gap-2 fixed z-50 bg-gray-950 border border-gray-800 rounded-sm p-2"
                                    style={{
                                        top: menuPosition.top,
                                        left: menuPosition.left,
                                    }}
                                >
                                    <h1 className="text-sm text-cyan-300">usePopover hook</h1>
                                    <p className="text-sm text-gray-300 max-w-[300px]">Handles automatic positioning (above/below), click-outside detection, keyboard navigation, and focus management.</p>
                                    <p className="text-xs text-gray-400">Click outside to close</p>
                                </div>,
                                document.body
                            )
                        )}
                    </div>
                </div>
            </PropertyLayout>

            <PropertyLayout
                title="useActiveSectionObserver"
                description={
                    <div>
                        <p>A hook that tracks which section is currently visible in the viewport using Intersection Observer API.</p>
                        <p className="mt-2 text-(--foreground-secondary-color)">Perfect for implementing "scroll spy" navigation menus that highlight the active section.</p>
                    </div>
                }
                id="use-active-section-observer"
                code={`import { useActiveSectionObserver } from "lambda-ui-components";

export default function App() {
	const activeSection = useActiveSectionObserver({
		selectors: "h2, h3",
		rootMargin: "-20% 0px -70% 0px"
	});

	return (
		<div>
			<nav>
				<a href="#section1" className={activeSection === "section1" ? "active" : ""}>
					Section 1
				</a>
				<a href="#section2" className={activeSection === "section2" ? "active" : ""}>
					Section 2
				</a>
			</nav>
			<h2 id="section1">Section 1</h2>
			<p>Content...</p>
			<h2 id="section2">Section 2</h2>
			<p>Content...</p>
		</div>
	);
}`}
            >
                <div className="flex justify-center items-center py-6">
                    <div className="p-4 bg-(--surface-a) border border-(--neutral-opacity-color) rounded-md">
                        <p className="text-(--foreground-title-color) font-semibold mb-2">Active Section:</p>
                        <code className="text-sm text-(--primary-base-color) bg-(--surface-b) px-3 py-1 rounded">
                            {activeSection || "None"}
                        </code>
                        <p className="text-xs text-(--foreground-secondary-color) mt-3">
                            Scroll through this page to see the active section ID update.
                        </p>
                        <div className="mt-3 space-y-1">
                            <p className="text-xs text-(--foreground-secondary-color)">
                                <strong>Parameters:</strong>
                            </p>
                            <ul className="list-disc list-inside text-xs text-(--foreground-secondary-color)">
                                <li><code className="code-tag">selectors</code>: CSS selector for sections (default: "h2")</li>
                                <li><code className="code-tag">rootMargin</code>: Intersection observer margin (default: "-20% 0px -70% 0px")</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </PropertyLayout>
        </>
    );
};
