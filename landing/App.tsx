import {
	Button,
	Checkbox,
	FileUpload,
	Input,
	InputGroup,
	InputNumber,
	Pagination,
	Radio,
	RadioGroup,
	Range,
	Select,
	Switch,
	TextArea,
	Tooltip,
} from "../src/main";
import {
	BookIcon,
	Bookmark,
	CircleEllipsis,
	Code,
	CodeXml,
	Coins,
	Component,
	DatabaseIcon,
	HelpCircleIcon,
	HomeIcon,
	InfoIcon,
	LayoutDashboard,
	LogOutIcon,
	LucideBell,
	MenuIcon,
	RssIcon,
	Search,
	SearchIcon,
	Settings,
	Settings2,
	SettingsIcon,
	User,
	UserIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import { useState } from "react";
import { buttonsPrimary } from "./constants";
import { useNotification } from "../src/components/Notification/NotificationProvider";
import { Card } from "../src/components/Card/Card";
import { ButtonThemeController } from "../src/components/ThemeProvider/ButtonThemeController";
import { RangeValue } from "../src/components/Range/range.types";
import { TooltipPosition } from "../src/components/ToolTip/tooltip.types";
import { Dialog } from "../src/components/Dialog/Dialog";
import { Drawer } from "../src/components/Drawer/Drawer";
import { DrawerPlacement, DrawerWidth } from "../src/components/Drawer/drawer.types";
import { Link } from "../src/components/Link/Link";
import { Alert } from "../src/components/Alert/Alert";
import { AlertSize, AlertVariant } from "../src/components/Alert/alert.types";
import { AccordionItem } from "../src/components/Accordion/AccordionItem";
import { AccordionContent } from "../src/components/Accordion/AccordionContent";
import { AccordionHeader } from "../src/components/Accordion/AccordionHeader";
import { Accordion } from "../src/components/Accordion/Accordion";
import {
	AccordionSize,
	AccordionValue,
	AccordionVariant,
} from "../src/components/Accordion/accordion.types";
import { Carousel } from "../src/components/Carousel/Carousel";
import {
	CarouselDotType,
	CarouselSliderMode,
	CarouselOrientation,
	CarouselPaginationType,
} from "../src/components/Carousel/carousel.types";
import { Breadcrumb } from "../src/components/Breadcrumb/Breadcrumb";
import { TabSize, TabVariant, TabColor, TabRadius } from "../src/components/Tab/tab.types";
import { Tab } from "../src/components/Tab/Tab";
import { Badge } from "../src/components/Badge/Badge";
import { ColorPicker } from "../src/components/ColorPicker/ColorPicker";
import { Tag } from "../src/components/Tag/Tag";

function App() {
	const [openDrawerComponents, setOpenDrawerComponents] = useState(false);
	const [variantAccordion, setVariantAccordion] = useState<AccordionVariant>("default");
	const [sizeAccordion, setSizeAccordion] = useState<AccordionSize>("medium");
	const [loadingButtons, setLoadingButtons] = useState(false);
	const [disabledButtons, setDisabledButtons] = useState(false);
	const [radiusButtons, setRadiusButtons] = useState<
		"medium" | "small" | "large" | "none" | "pill" | "circle" | undefined
	>("small");
	const [variantButtons, setVariantButtons] = useState<
		"outline" | "classic" | "solid" | "text" | "ghost" | "dashed" | undefined
	>("solid");
	const [carouselPaginationType, setCarouselPaginationType] =
		useState<CarouselPaginationType>("dots");
	const [carouselDotType, setCarouselDotType] = useState<CarouselDotType>("circle");
	const [carouselOrientation, setCarouselOrientation] = useState<CarouselOrientation>("horizontal");
	const [carouselScroll, setCarouselScroll] = useState<CarouselSliderMode>("single");
	const [carouselShowButtons, setCarouselShowButtons] = useState(true);
	const [carouselShowNavigation, setCarouselShowNavigation] = useState(true);
	const [carouselAutoPlay, setCarouselAutoPlay] = useState(true);
	const [carouselLoop, setCarouselLoop] = useState(true);
	const [carouselDuration, setCarouselDuration] = useState(3000);
	const [sizeButtons, setSizeButtons] = useState<"medium" | "small" | "large" | "tiny" | undefined>(
		"medium"
	);
	const [sizeLink, setSizeLink] = useState<"medium" | "small" | "large" | "tiny" | undefined>(
		"medium"
	);
	const [disabledLink, setDisabledLink] = useState(false);
	const [radiusLink, setRadiusLink] = useState<
		"medium" | "small" | "large" | "none" | "pill" | "circle" | undefined
	>("small");
	const [variantLink, setVariantLink] = useState<
		"outline" | "classic" | "solid" | "text" | "ghost" | "dashed" | undefined
	>("ghost");
	const [typeLink, setTypeLink] = useState<"default" | "button" | undefined>("default");
	const [sizeCheckbox, setSizeCheckbox] = useState<
		"medium" | "small" | "large" | "tiny" | undefined
	>("medium");
	const [disabledCheckbox, setDisabledCheckbox] = useState(false);
	const [radiusCheckbox, setRadiusCheckbox] = useState<
		"medium" | "small" | "none" | "circle" | undefined
	>("small");
	const [variantCheckbox, setVariantCheckbox] = useState<"outline" | "flat" | "solid" | undefined>(
		"solid"
	);
	const [sizeSwitch, setSizeSwitch] = useState<"medium" | "small" | "large" | "tiny" | undefined>(
		"medium"
	);
	const [disabledSwitch, setDisabledSwitch] = useState(false);
	const [shapeSwitch, setShapeSwitch] = useState<"square" | "soft" | "rounded" | undefined>(
		"rounded"
	);
	const [variantSwitch, setVariantSwitch] = useState<"outline" | "flat" | "solid" | undefined>(
		"solid"
	);
	const [sizeInput, setSizeInput] = useState<"medium" | "small" | "large" | "tiny" | undefined>(
		"medium"
	);
	const [disabledInput, setDisabledInput] = useState(false);
	const [radiusInput, setRadiusInput] = useState<
		"medium" | "small" | "large" | "none" | "pill" | undefined
	>("small");
	const [variantInput, setVariantInput] = useState<"outline" | "flat" | "underline" | undefined>(
		"outline"
	);
	const [validInput, setValidInput] = useState(true);
	const [errorMessage, setErrorMessage] = useState("This field has an error.");
	const [sizeInputNumber, setSizeInputNumber] = useState<
		"medium" | "small" | "large" | "tiny" | undefined
	>("medium");
	const [disabledInputNumber, setDisabledInputNumber] = useState(false);
	const [radiusInputNumber, setRadiusInputNumber] = useState<
		"medium" | "small" | "large" | "none" | "pill" | undefined
	>("small");
	const [validInputNumber, setValidInputNumber] = useState(true);
	const [errorMessageNumber, setErrorMessageNumber] = useState("This field has an error.");
	const [sizeRadio, setSizeRadio] = useState<"medium" | "small" | "large" | undefined>("medium");
	const [typeRadio, setTypeRadio] = useState<"radio" | "button" | undefined>("button");
	const [orientationRadio, setOrientationRadio] = useState<"horizontal" | "vertical" | undefined>(
		"horizontal"
	);
	const [variantRadio, setVariantRadio] = useState<"outline" | "flat" | "solid" | undefined>(
		"solid"
	);
	const [colorRadio, setColorRadio] = useState<
		"primary" | "secondary" | "danger" | "success" | "warning" | "info" | undefined
	>("primary");
	const [disabledRadio, setDisabledRadio] = useState(false);
	const [valueRadioBordered, setValueRadioBordered] = useState("");
	const [sizeSelect, setSizeSelect] = useState<"medium" | "small" | "large" | "tiny" | undefined>(
		"medium"
	);
	const [disabledSelect, setDisabledSelect] = useState(false);
	const [radiusSelect, setRadiusSelect] = useState<
		"medium" | "small" | "large" | "none" | "pill" | undefined
	>("small");
	const [validSelect, setValidSelect] = useState(true);
	const [errorMessageSelect, setErrorMessageSelect] = useState("This field has an error.");
	const [notificationType, setNotificationType] = useState<
		"themed" | "solid" | "darkened" | "lightened" | "flat" | undefined
	>("themed");
	const [notificationPosition, setNotificationPosition] = useState<
		| "top-left"
		| "top-center"
		| "top-right"
		| "bottom-left"
		| "bottom-center"
		| "bottom-right"
		| undefined
	>("top-center");
	const [closableNotification, setClosableNotification] = useState(false);
	const [hasButtonsConfirmNotification, setHasButtonsConfirmNotification] = useState(false);
	const [hasButtonsCancelNotification, setHasButtonsCancelNotification] = useState(false);
	const [sizeAlert, setSizeAlert] = useState<AlertSize>("small");
	const [variantAlert, setVariantAlert] = useState<AlertVariant>("flat");
	const [radiusCard, setRadiusCard] = useState<"medium" | "small" | "large" | "none" | undefined>(
		"small"
	);
	const [sizeCard, setSizeCard] = useState<"medium" | "small" | "large" | undefined>("small");
	const [variantCard, setVariantCard] = useState<"outline" | "borderless" | undefined>("outline");
	const [radiusTextArea, setRadiusTextArea] = useState<
		"medium" | "small" | "large" | "none" | undefined
	>("small");
	const [sizeTextArea, setSizeTextArea] = useState<
		"medium" | "small" | "large" | "tiny" | undefined
	>("small");
	const [variantTextArea, setVariantTextArea] = useState<"outline" | "borderless" | undefined>(
		"outline"
	);
	const [disabledTextArea, setDisabledTextArea] = useState(false);
	const [invalidTextArea, setInvalidTextArea] = useState(false);
	const [errorMessageTextArea, setErrorMessageTextArea] = useState("This field has an error.");
	const [radiusFileUpload, setRadiusFileUpload] = useState<
		"medium" | "small" | "large" | "none" | undefined
	>("small");
	const [sizeFileUpload, setSizeFileUpload] = useState<"medium" | "small" | "large" | undefined>(
		"medium"
	);
	const [typeFileUpload, setTypeFileUpload] = useState<"button" | "dropzone" | undefined>(
		"dropzone"
	);
	const [disabledFileUpload, setDisabledFileUpload] = useState(false);
	const [invalidFileUpload, setInvalidFileUpload] = useState(false);
	const [multiFileUpload, setMultiFileUpload] = useState(false);
	const [viewFileSize, setViewFileSize] = useState(true);
	const [errorMessageFileUpload, setErrorMessageFileUpload] = useState("This field has an error.");
	const [totalPages, setTotalPages] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [disabledPagination, setDisabledPagination] = useState(false);
	const [showFirstLastButtons, setShowFirstLastButtons] = useState(true);
	const [showPrevNextButtons, setShowPrevNextButtons] = useState(true);
	const [maxVisiblePages, setMaxVisiblePages] = useState<number | undefined>(5);
	const [sizePagination, setSizePagination] = useState<
		"medium" | "small" | "large" | "tiny" | undefined
	>("medium");
	const [variantPagination, setVariantPagination] = useState<
		"outline" | "flat" | "solid" | undefined
	>("solid");
	const [radiusPagination, setRadiusPagination] = useState<
		"medium" | "small" | "large" | "none" | "pill" | undefined
	>("small");
	const { showNotification } = useNotification();
	const [valueRange, setValueRange] = useState<RangeValue>(30);
	const [stepRange, setStepRange] = useState(1);
	const [sizeRange, setSizeRange] = useState<"medium" | "small" | "large" | undefined>("medium");
	const [disabledRange, setDisabledRange] = useState(false);
	const [minRange, setMinRange] = useState(0);
	const [maxRange, setMaxRange] = useState(100);
	const [colorToolTip, setColorToolTip] = useState<
		"primary" | "secondary" | "danger" | "success" | "warning" | "info" | undefined
	>("secondary");
	const [sizeToolTip, setSizeToolTip] = useState<"medium" | "small" | "large" | "tiny" | undefined>(
		"small"
	);
	const [positionToolTip, setPositionToolTip] = useState<
		| "top-left"
		| "top-center"
		| "top-right"
		| "bottom-left"
		| "bottom-center"
		| "bottom-right"
		| undefined
	>("top-center");
	const [delayShowToolTip, setDelayShowToolTip] = useState(100);
	const [delayHideToolTip, setDelayHideToolTip] = useState(100);
	const [openDialog, setOpenDialog] = useState(false);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [drawerPosition, setDrawerPosition] = useState<DrawerPlacement>("left");
	const [widthDrawer, setWidthDrawer] = useState<DrawerWidth>("small");
	const [openItem, setOpenItem] = useState<AccordionValue>("");
	const [colorBreadcrumb, setColorBreadcrumb] = useState<
		"primary" | "secondary" | "danger" | "success" | "warning" | "info" | undefined
	>("secondary");
	const [sizeBreadcrumb, setSizeBreadcrumb] = useState<
		"medium" | "small" | "large" | "tiny" | undefined
	>("small");
	const [variantBreadcrumb, setVariantBreadcrumb] = useState<
		"outline" | "flat" | "none" | undefined
	>("none");
	const [separatorBreadcrumb, setSeparatorBreadcrumb] = useState<
		"chevron" | "slash" | "dot" | "arrow" | undefined
	>("chevron");
	const [maxItemsBreadcrumb, setMaxItemsBreadcrumb] = useState(0);
	const [variantTab, setVariantTab] = useState<TabVariant>("underline");
	const [sizeTab, setSizeTab] = useState<TabSize>("medium");
	const [colorTab, setColorTab] = useState<TabColor>("secondary");
	const [radiusTab, setRadiusTab] = useState<TabRadius>("small");
	const [sizeBadge, setSizeBadge] = useState<"small" | "medium" | "large" | "tiny" | undefined>(
		"small"
	);
	const [variantBadge, setVariantBadge] = useState<
		"flat" | "outline" | "solid" | "dashed" | "subtle" | undefined
	>("flat");
	const [radiusBadge, setRadiusBadge] = useState<
		"none" | "tiny" | "small" | "medium" | "large" | "full" | undefined
	>("small");
	const [countBadge, setCountBadge] = useState<number | undefined>(undefined);
	const [isCloseButton, setIsCloseButton] = useState(false);
	const [withIconBadge, setWithIconBadge] = useState(false);
	const [withTextBadge, setWithTextBadge] = useState(false);
	const [arrayBadge, setArrayBadge] = useState<string[]>([
		"primary",
		"secondary",
		"danger",
		"success",
		"warning",
		"info",
	]);
	const [sizeColorPicker, setSizeColorPicker] = useState<
		"tiny" | "small" | "medium" | "large" | undefined
	>("medium");
	const [formatColorPicker, setFormatColorPicker] = useState<
		"hex" | "rgb" | "rgba" | "hsl" | "hsla" | undefined
	>("hex");
	const [showTextColorPicker, setShowTextColorPicker] = useState(false);
	const [disabledColorPicker, setDisabledColorPicker] = useState(false);
	const [radiusColorPicker, setRadiusColorPicker] = useState<
		"none" | "small" | "medium" | "circle" | undefined
	>("small");
	const [sizeTag, setSizeTag] = useState<"small" | "medium" | "large" | "tiny" | undefined>(
		"small"
	);
	const [variantTag, setVariantTag] = useState<
		"flat" | "outline" | "solid" | "dashed" | "subtle" | undefined
	>("flat");
	const [radiusTag, setRadiusTag] = useState<
		"none" | "tiny" | "small" | "medium" | "large" | "full" | undefined
	>("small");
	const [isCloseButtonTag, setIsCloseButtonTag] = useState(false);
	const [withIconTag, setWithIconTag] = useState(false);
	const [withTextTag, setWithTextTag] = useState(false);
	const [arrayTag, setArrayTag] = useState<string[]>([
		"primary",
		"secondary",
		"danger",
		"success",
		"warning",
		"info",
	]);

	return (
		<section className={`${styles.section} scrollBar`}>
			<header className={styles.header}>
				<div className={styles.header_controls}>
					<div className={styles.header_menu}>
						<Button
							variant="outline"
							size="small"
							color="info"
							icon={<MenuIcon />}
							onClick={() => setOpenDrawerComponents(true)}
						/>
						<Drawer
							isOpen={openDrawerComponents}
							onClose={() => setOpenDrawerComponents(false)}
							title={
								<div style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
									<Component />
									<h1 style={{ fontSize: "1em" }}>Components</h1>
								</div>
							}
							closeOnOverlayClick={true}
							closeOnEscape={true}
							showCloseButton={true}
							placement="left"
							width="xsmall"
						>
							<div
								style={{ display: "flex", flexDirection: "column", gap: "0.15em", padding: "1em" }}
							>
								{COMPONENTS.map((component) => (
									<Link
										key={component}
										href={`#${component.toLowerCase()}`}
										variant={
											document.location.hash.replace("%20", " ") === `#${component.toLowerCase()}`
												? "solid"
												: "text"
										}
										type="button"
										color="info"
										label={component}
										radius="small"
										size="small"
										onClick={() => setOpenDrawerComponents(false)}
									/>
								))}
							</div>
						</Drawer>
					</div>
					<h1 className={styles.title}>Lambda UI Components</h1>
				</div>
				<ButtonThemeController />
			</header>
			{/* ACCORDION */}
			<section className={styles.subsection} id="accordion">
				<h2 className={styles.subtitle}>Accordion</h2>
				<div className={styles.control_buttons}>
					<Select
						className={styles.select_size}
						label="Variant"
						value={variantAccordion}
						size="small"
						onChange={(value) => setVariantAccordion(value as AccordionVariant)}
						options={[
							{ label: "Default", value: "default" },
							{ label: "Flush", value: "flush" },
							{ label: "Split", value: "split" },
						]}
					/>
					<Select
						label="Size"
						className={styles.select_size}
						value={sizeAccordion}
						size="small"
						onChange={(value) => setSizeAccordion(value as AccordionSize)}
						options={[
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Select
						label="Position"
						className={styles.select_size}
						value={drawerPosition}
						size="small"
						onChange={(value) => setDrawerPosition(value as DrawerPlacement)}
						options={[
							{ label: "Top", value: "top" },
							{ label: "Right", value: "right" },
							{ label: "Bottom", value: "bottom" },
							{ label: "Left", value: "left" },
						]}
					/>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<Accordion
							value={openItem}
							onValueChange={(value) => setOpenItem(value)}
							variant={variantAccordion}
							size={sizeAccordion}
							style={{ marginBottom: "30px" }}
						>
							<AccordionItem value="item-1">
								<AccordionHeader>Sección 1: Introducción</AccordionHeader>
								<AccordionContent>
									<p>Aquí va el contenido de la sección 1.</p>
									<p>Puede ser texto, imágenes, otros componentes.</p>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="item-2">
								<AccordionHeader>Sección 2: Componentes</AccordionHeader>
								<AccordionContent>
									<ul>
										<li>Componente Alert</li>
										<li>Componente Button</li>
										<li>Componente Link</li>
										<li>Componente Accordion</li>
									</ul>
									<div style={{ height: "50px" }}>Contenido extra para probar transición</div>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="item-3">
								{" "}
								{/* Item deshabilitado */}
								<AccordionHeader>Sección 3: Deshabilitada</AccordionHeader>
								<AccordionContent>
									Este contenido no se puede expandir porque el item está deshabilitado.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="item-4">
								<AccordionHeader>Sección 4: Con Contenido Largo</AccordionHeader>
								<AccordionContent>
									<p>
										Este es el inicio de un contenido que es un poco más largo para probar el scroll
										si el contenedor principal del Accordion lo permite.
									</p>
									<div style={{ height: "400px", background: "#e9e9e9" }}></div>
									<p>Fin del contenido largo.</p>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</section>
			{/* ALERT */}
			<section className={styles.subsection} id="alert">
				<h2 className={styles.subtitle}>Alert</h2>
				<div className={styles.control_buttons}>
					<Select
						label="Size"
						className={styles.select_size}
						value={sizeAlert}
						size="small"
						onChange={(value) => setSizeAlert(value as AlertSize)}
						options={[
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Select
						label="Size"
						className={styles.select_size}
						value={variantAlert}
						size="small"
						onChange={(value) => setVariantAlert(value as AlertVariant)}
						options={[
							{ label: "Flat", value: "flat" },
							{ label: "Outline", value: "outline" },
							{ label: "Solid", value: "solid" },
						]}
					/>
				</div>

				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<Alert
							variant={variantAlert}
							color="default"
							title="Default"
							message="This is a standard notification message for your information"
							customIcon={<RssIcon />}
							onClose={() => console.log("")}
							size={sizeAlert}
						/>
						<Alert
							variant={variantAlert}
							color="primary"
							title="Priamry"
							message="Please review the details below and take the necessary action"
							onClose={() => console.log("")}
							size={sizeAlert}
						/>
						<Alert
							variant={variantAlert}
							color="danger"
							title="Success"
							message="Your changes have been saved successfully"
							onClose={() => console.log("")}
							size={sizeAlert}
						/>
						<Alert
							variant={variantAlert}
							color="success"
							title="Danger"
							message="Unable to complete the request. Please try again or contact support"
							onClose={() => console.log("")}
							size={sizeAlert}
						/>
						<Alert
							variant={variantAlert}
							color="warning"
							title="Warning"
							message="Please be aware that continuing might lead to unexpected results"
							onClose={() => console.log("")}
							size={sizeAlert}
						/>
						<Alert
							variant={variantAlert}
							color="info"
							title="Info"
							message="Here is some helpful information regarding the current process"
							onClose={() => console.log("")}
							size={sizeAlert}
						/>
					</div>
				</div>
			</section>
			{/* BADGE */}
			<section className={styles.subsection} id="badge">
				<h2 className={styles.subtitle}>Badge</h2>
				<div className={styles.control_buttons}>
					<Select
						label="Size"
						className={styles.select_size}
						value={sizeBadge}
						size="small"
						onChange={(value) =>
							setSizeBadge(value as "tiny" | "small" | "medium" | "large" | undefined)
						}
						options={[
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Select
						label="Variant"
						className={styles.select_size}
						value={variantBadge}
						size="small"
						onChange={(value) =>
							setVariantBadge(value as "outline" | "flat" | "solid" | "dashed" | undefined)
						}
						options={[
							{ label: "Outline", value: "outline" },
							{ label: "Flat", value: "flat" },
							{ label: "Solid", value: "solid" },
							{ label: "Dashed", value: "dashed" },
							{ label: "Subtle", value: "subtle" },
						]}
					/>
					<Select
						label="Radius"
						className={styles.select_size}
						value={radiusBadge}
						size="small"
						onChange={(value) =>
							setRadiusBadge(
								value as "none" | "tiny" | "small" | "medium" | "large" | "full" | undefined
							)
						}
						options={[
							{ label: "None", value: "none" },
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
							{ label: "Full", value: "full" },
						]}
					/>
					<InputNumber
						label="Count"
						className={styles.select_size}
						value={countBadge}
						size="small"
						onChange={(value) => setCountBadge(value)}
					/>
					<Checkbox
						label="Close Button"
						checked={isCloseButton}
						size="medium"
						color="secondary"
						onChange={() => setIsCloseButton((state) => !state)}
					/>
					<Checkbox
						label="With Icon"
						checked={withIconBadge}
						size="medium"
						color="secondary"
						onChange={() => setWithIconBadge((state) => !state)}
					/>
					<Checkbox
						label="With Text"
						checked={withTextBadge}
						size="medium"
						color="secondary"
						onChange={() => setWithTextBadge((state) => !state)}
					/>
				</div>
				<div className={styles.container_buttons} style={{ gap: "1.5rem" }}>
					{arrayBadge.map((badge) => (
						<Badge
							key={badge}
							text=""
							size={sizeBadge}
							variant={variantBadge}
							color={
								badge as
									| "primary"
									| "secondary"
									| "danger"
									| "success"
									| "warning"
									| "info"
									| undefined
							}
							radius={radiusBadge}
							count={countBadge}
							onClose={
								isCloseButton
									? () => setArrayBadge(arrayBadge.filter((item) => item !== badge))
									: undefined
							}
						>
							{withIconBadge ? <LucideBell /> : ""}
							{withTextBadge ? <span style={{ textTransform: "capitalize" }}>{badge}</span> : ""}
						</Badge>
					))}
				</div>
			</section>
			{/** BREADCRUMB */}
			<section className={`${styles.subsection} section`} id="breadcrumb">
				<h2 className={styles.subtitle}>Breadcrumb</h2>
				<div className={styles.control_buttons}>
					<Select
						className={styles.select_size}
						label="Color"
						value={colorBreadcrumb}
						size="small"
						onChange={(value) =>
							setColorBreadcrumb(
								value as
									| "primary"
									| "secondary"
									| "success"
									| "danger"
									| "warning"
									| "info"
									| undefined
							)
						}
						options={[
							{ label: "Primary", value: "primary" },
							{ label: "Secondary", value: "secondary" },
							{ label: "Success", value: "success" },
							{ label: "Danger", value: "danger" },
							{ label: "Warning", value: "warning" },
							{ label: "Info", value: "info" },
						]}
					/>
					<Select
						label="Size"
						className={styles.select_size}
						value={sizeBreadcrumb}
						size="small"
						onChange={(value) =>
							setSizeBreadcrumb(value as "tiny" | "small" | "medium" | "large" | undefined)
						}
						options={[
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Select
						label="Variant"
						className={styles.select_size}
						value={variantBreadcrumb}
						size="small"
						onChange={(value) =>
							setVariantBreadcrumb(value as "outline" | "flat" | "none" | undefined)
						}
						options={[
							{ label: "Outline", value: "outline" },
							{ label: "Flat", value: "flat" },
							{ label: "None", value: "none" },
						]}
					/>
					<Select
						label="Separator"
						className={styles.select_size}
						value={separatorBreadcrumb}
						size="small"
						onChange={(value) =>
							setSeparatorBreadcrumb(value as "chevron" | "slash" | "dot" | "arrow" | undefined)
						}
						options={[
							{ label: "Chevron", value: "chevron" },
							{ label: "Slash", value: "slash" },
							{ label: "Dot", value: "dot" },
							{ label: "Arrow", value: "arrow" },
						]}
					/>
					<div style={{ width: "4em" }}>
						<InputNumber
							onChange={(value) => setMaxItemsBreadcrumb(value as number)}
							value={maxItemsBreadcrumb}
							size={"small"}
							min={0}
						/>
					</div>
				</div>
				<div className={styles.container_buttons}>
					<Breadcrumb
						items={[
							{ label: "Home", href: "/", icon: <HomeIcon /> },
							{ label: "Library", href: "/library", icon: <BookIcon /> },
							{ label: "Data", href: "/data", icon: <DatabaseIcon /> },
							{ label: "Section", href: "/section", icon: <LayoutDashboard /> },
							{ label: "Programming", href: "", icon: <Code /> },
						]}
						size={sizeBreadcrumb}
						variant={variantBreadcrumb}
						separator={separatorBreadcrumb}
						color={colorBreadcrumb}
						maxItems={maxItemsBreadcrumb}
					/>
				</div>
			</section>
			{/* BUTTON */}
			<section className={`${styles.subsection} section`} id="button">
				<h2 className={styles.subtitle}>Button</h2>
				<div className={styles.control_buttons}>
					<Checkbox
						label="Disabled"
						checked={disabledButtons}
						size="medium"
						color="secondary"
						onChange={(e) => setDisabledButtons(e.currentTarget.checked)}
					/>
					<Checkbox
						label="Loading"
						checked={loadingButtons}
						size="medium"
						color="info"
						onChange={(e) => setLoadingButtons(e.currentTarget.checked)}
					/>
					<Select
						label="Size"
						className={styles.select_size}
						value={sizeButtons}
						size="small"
						onChange={(e) => setSizeButtons(e as "medium" | "small" | "large" | "tiny" | undefined)}
						options={[
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Select
						label="Radius"
						className={styles.select_size}
						value={radiusButtons}
						size="small"
						onChange={(e) =>
							setRadiusButtons(
								e as "medium" | "small" | "large" | "none" | "pill" | "circle" | undefined
							)
						}
						options={[
							{ label: "None", value: "none" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
							{ label: "Pill", value: "pill" },
							{ label: "Circle", value: "circle" },
						]}
					/>
					<Select
						label="Variant"
						className={styles.select_size}
						value={variantButtons}
						size="small"
						onChange={(e) =>
							setVariantButtons(
								e as "outline" | "classic" | "solid" | "text" | "ghost" | "dashed" | undefined
							)
						}
						options={[
							{ label: "Outline", value: "outline" },
							{ label: "Classic", value: "classic" },
							{ label: "Solid", value: "solid" },
							{ label: "Text", value: "text" },
							{ label: "Ghost", value: "ghost" },
							{ label: "Dashed", value: "dashed" },
						]}
					/>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						{buttonsPrimary.map((button) => (
							<Button
								key={button.color}
								className={styles.button}
								size={sizeButtons}
								radius={radiusButtons}
								variant={variantButtons}
								color={button.color}
								label={button.label}
								disabled={disabledButtons}
								loading={loadingButtons}
								loadingText="Loading"
								iconPosition="left"
								icon={button.icon}
							/>
						))}
					</div>
				</div>
			</section>
			{/* CARD */}
			<section className={`${styles.subsection} section`} id="card">
				<h2 className={styles.subtitle}>Card</h2>
				<div className={styles.control_buttons}>
					<select
						className={styles.control_size}
						value={variantCard}
						onChange={(e) =>
							setVariantCard(e.currentTarget.value as "borderless" | "outline" | undefined)
						}
					>
						<option value="borderless">Borderless</option>
						<option value="outline">Outline</option>
					</select>
					<select
						className={styles.control_size}
						value={radiusCard}
						onChange={(e) =>
							setRadiusCard(
								e.currentTarget.value as "none" | "small" | "medium" | "large" | undefined
							)
						}
					>
						<option value="none">None</option>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
					</select>
					<select
						className={styles.control_size}
						value={sizeCard}
						onChange={(e) =>
							setSizeCard(e.currentTarget.value as "small" | "medium" | "large" | undefined)
						}
					>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
					</select>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<Card
							variant={variantCard}
							radius={radiusCard}
							size={sizeCard}
							image={{
								src: "https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg?auto=compress&cs=tinysrgb&w=750&h=350&dpr=1",
								alt: "JavaScript",
								heightPorcent: 100,
							}}
							header={{
								title: "React Hooks",
								description: "Updated Guide 2024",
								icon: <CodeXml />,
							}}
							actions={[
								{
									text: "See more",
									icon: <CircleEllipsis />,
									onClick: () => console.log("See more"),
								},
								{
									text: "Save",
									icon: <Bookmark />,
									onClick: () => console.log("Save"),
								},
								{
									text: "Follow",
									icon: <RssIcon />,
									onClick: () => console.log("Follow"),
								},
							]}
						>
							<div>
								React Hooks revolutionized the way we write components. useState and useEffect are
								fundamental, but there are more hooks like useContext, useReducer, and useCallback
								that can significantly improve your code.
							</div>
						</Card>
					</div>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<Card
							variant={variantCard}
							radius={radiusCard}
							size={sizeCard}
							header={{
								title: "React Hooks",
							}}
						>
							<div>
								React Hooks revolutionized the way we write components. useState and useEffect are
								fundamental, but there are more hooks like useContext, useReducer, and useCallback
								that can significantly improve your code.
							</div>
						</Card>
					</div>
				</div>
			</section>
			{/* CAROUSEL */}
			<section className={styles.subsection} id="carousel">
				<h2 className={styles.subtitle}>Carousel</h2>
				<div className={styles.control_buttons}>
					<Select
						className={styles.select_size}
						label="Pagination Type"
						value={carouselPaginationType}
						size="small"
						onChange={(value) => setCarouselPaginationType(value as CarouselPaginationType)}
						options={[
							{ label: "Dots", value: "dots" },
							{ label: "Thumbnail", value: "thumbnail" },
						]}
					/>
					<Select
						className={styles.select_size}
						label="Dot Type"
						value={carouselDotType}
						size="small"
						onChange={(value) => setCarouselDotType(value as CarouselDotType)}
						options={[
							{ label: "Circle", value: "circle" },
							{ label: "Line", value: "line" },
							{ label: "Square", value: "square" },
							{ label: "Number", value: "number" },
						]}
					/>
					<Select
						className={styles.select_size}
						label="Orientation"
						value={carouselOrientation}
						size="small"
						onChange={(value) => setCarouselOrientation(value as CarouselOrientation)}
						options={[
							{ label: "Horizontal", value: "horizontal" },
							{ label: "Vertical", value: "vertical" },
						]}
					/>
					<Select
						className={styles.select_size}
						label="Slider Mode"
						value={carouselScroll}
						size="small"
						onChange={(value) => setCarouselScroll(value as CarouselSliderMode)}
						options={[
							{ label: "Auto", value: "auto" },
							{ label: "Single", value: "single" },
						]}
					/>
					<Checkbox
						positionLabel="top"
						label="Show buttons?"
						checked={carouselShowButtons}
						size="medium"
						color="secondary"
						onChange={(e) => setCarouselShowButtons(e.currentTarget.checked)}
					/>
					<Checkbox
						positionLabel="top"
						label="Show pagination?"
						checked={carouselShowNavigation}
						size="medium"
						color="secondary"
						onChange={(e) => setCarouselShowNavigation(e.currentTarget.checked)}
					/>
					<Checkbox
						positionLabel="top"
						label="Is Loop?"
						checked={carouselLoop}
						size="medium"
						color="secondary"
						onChange={(e) => setCarouselLoop(e.currentTarget.checked)}
					/>
					<Checkbox
						positionLabel="top"
						label="AutoPlay?"
						checked={carouselAutoPlay}
						size="medium"
						color="secondary"
						onChange={(e) => setCarouselAutoPlay(e.currentTarget.checked)}
					/>
					<InputNumber
						label="Transition Duration"
						value={carouselDuration}
						onChange={(value) => setCarouselDuration(value as number)}
						step={100}
					/>
				</div>
				<div className={styles.container_buttons}>
					<Carousel
						breakpoints={responsiveBreakpoints} // Pasar la configuración responsiva
						showNavigationButtons={carouselShowButtons} // Mostrar botones (por defecto es true)
						showPagination={carouselShowNavigation} // Mostrar puntos (por defecto es true)
						aria-label="Carrusel de ejemplo de colores"
						transitionDuration={carouselDuration}
						orientation={carouselOrientation}
						autoPlay={carouselAutoPlay}
						loop={carouselLoop}
						paginationType={carouselPaginationType}
						dotType={carouselDotType}
						slideMode={carouselScroll}
					>
						{/* Pasar los items como hijos directos. Pueden ser cualquier elemento o componente. */}
						{items.map((item) => (
							<CarouselCard key={item.id} number={item.id} color={item.color} src={item.src} />
						))}
					</Carousel>
				</div>
			</section>
			{/* CHECKBOX */}
			<section className={styles.subsection} id="checkbox">
				<h2 className={styles.subtitle}>Checkbox</h2>
				<div className={styles.control_buttons}>
					<Checkbox
						label="Disabled"
						checked={disabledCheckbox}
						size="medium"
						color="secondary"
						onChange={(e) => setDisabledCheckbox(e.currentTarget.checked)}
					/>
					<select
						className={styles.control_size}
						value={sizeCheckbox}
						onChange={(e) =>
							setSizeCheckbox(
								e.currentTarget.value as "medium" | "small" | "large" | "tiny" | undefined
							)
						}
					>
						<option value="tiny">Tiny</option>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
					</select>
					<select
						className={styles.control_size}
						value={radiusCheckbox}
						onChange={(e) =>
							setRadiusCheckbox(
								e.currentTarget.value as "medium" | "small" | "none" | "circle" | undefined
							)
						}
					>
						<option value="none">None</option>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="circle">Circle</option>
					</select>
					<select
						className={styles.control_size}
						value={variantCheckbox}
						onChange={(e) =>
							setVariantCheckbox(e.currentTarget.value as "outline" | "flat" | "solid" | undefined)
						}
					>
						<option value="outline">Outline</option>
						<option value="flat">Flat</option>
						<option value="solid">Solid</option>
					</select>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<Checkbox
							size={sizeCheckbox}
							label="Primary"
							disabled={disabledCheckbox}
							radius={radiusCheckbox}
							variant={variantCheckbox}
						/>
						<Checkbox
							size={sizeCheckbox}
							color="secondary"
							label="Secondary"
							disabled={disabledCheckbox}
							radius={radiusCheckbox}
							variant={variantCheckbox}
						/>
						<Checkbox
							size={sizeCheckbox}
							color="success"
							label="Success"
							disabled={disabledCheckbox}
							radius={radiusCheckbox}
							variant={variantCheckbox}
						/>
						<Checkbox
							size={sizeCheckbox}
							color="danger"
							label="Danger"
							disabled={disabledCheckbox}
							radius={radiusCheckbox}
							variant={variantCheckbox}
						/>
						<Checkbox
							size={sizeCheckbox}
							color="warning"
							label="Warning"
							disabled={disabledCheckbox}
							radius={radiusCheckbox}
							variant={variantCheckbox}
						/>
						<Checkbox
							size={sizeCheckbox}
							color="info"
							label="Info"
							disabled={disabledCheckbox}
							radius={radiusCheckbox}
							variant={variantCheckbox}
						/>
					</div>
				</div>
			</section>
			{/* COLOR PICKER */}
			<section className={styles.subsection} id="color picker">
				<h2 className={styles.subtitle}>Color Picker</h2>
				<div className={styles.control_buttons}>
					<Select
						className={styles.select_size}
						label="Size"
						value={sizeColorPicker}
						size="small"
						onChange={(value) =>
							setSizeColorPicker(value as "tiny" | "small" | "medium" | "large" | undefined)
						}
						options={[
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Select
						className={styles.select_size}
						label="Radius"
						value={radiusColorPicker}
						size="small"
						onChange={(value) =>
							setRadiusColorPicker(value as "none" | "small" | "medium" | "circle" | undefined)
						}
						options={[
							{ label: "None", value: "none" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Circle", value: "circle" },
						]}
					/>
					<Select
						className={styles.select_size}
						label="Format"
						value={formatColorPicker}
						size="small"
						onChange={(value) =>
							setFormatColorPicker(value as "hex" | "rgb" | "rgba" | "hsl" | "hsla" | undefined)
						}
						options={[
							{ label: "Hex", value: "hex" },
							{ label: "RGB", value: "rgb" },
							{ label: "RGBA", value: "rgba" },
							{ label: "HSL", value: "hsl" },
							{ label: "HSLA", value: "hsla" },
						]}
					/>
					<Checkbox
						label="Show Text"
						size="medium"
						checked={showTextColorPicker}
						onChange={(value) => setShowTextColorPicker(value.currentTarget.checked)}
					/>
					<Checkbox
						label="Disabled"
						size="medium"
						checked={disabledColorPicker}
						onChange={(value) => setDisabledColorPicker(value.currentTarget.checked)}
					/>
				</div>
				<div className={styles.container_buttons}>
					<ColorPicker
						size={sizeColorPicker}
						showText={showTextColorPicker}
						disabled={disabledColorPicker}
						radius={radiusColorPicker}
						format={formatColorPicker}
					/>
				</div>
			</section>
			{/* DIALOG */}
			<section className={styles.subsection} id="dialog">
				<h2 className={styles.subtitle}>Dialog</h2>
				<div className={styles.control_buttons}>
					<Select
						className={styles.select_size}
						label="Color"
						value={colorToolTip}
						size="small"
						onChange={(value) =>
							setColorToolTip(
								value as
									| "primary"
									| "secondary"
									| "danger"
									| "success"
									| "warning"
									| "info"
									| undefined
							)
						}
						options={[
							{ label: "Primary", value: "primary" },
							{ label: "Secondary", value: "secondary" },
							{ label: "Success", value: "success" },
							{ label: "Danger", value: "danger" },
							{ label: "Warning", value: "warning" },
							{ label: "Info", value: "info" },
						]}
					/>
					<Select
						label="Size"
						className={styles.select_size}
						value={sizeToolTip}
						size="small"
						onChange={(value) =>
							setSizeToolTip(value as "tiny" | "small" | "medium" | "large" | undefined)
						}
						options={[
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Select
						label="Position"
						className={styles.select_size}
						value={positionToolTip}
						size="small"
						onChange={(value) => setPositionToolTip(value as TooltipPosition | undefined)}
						options={[
							{ label: "Top Left", value: "top-left" },
							{ label: "Top Right", value: "top-right" },
							{ label: "Top Center", value: "top-center" },
							{ label: "Bottom Center", value: "bottom-center" },
							{ label: "Bottom Left", value: "bottom-left" },
							{ label: "Bottom Right", value: "bottom-right" },
						]}
					/>
					<div style={{ display: "flex", gap: "1em", maxWidth: "10em" }}>
						<InputNumber
							label="Delay Show"
							value={delayShowToolTip}
							onChange={(value) => setDelayShowToolTip(value || 0)}
							size="small"
						/>
						<InputNumber
							label="Delay Hide"
							value={delayHideToolTip}
							onChange={(value) => setDelayHideToolTip(value || 0)}
							size="small"
						/>
					</div>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<Button label="View Dialog" onClick={() => setOpenDialog(true)} />
						<Dialog
							isOpen={openDialog}
							onClose={() => setOpenDialog(false)}
							title="Confirmar Acción"
							closeOnOverlayClick={true}
							closeOnEscape={true}
							showCloseButton={true}
							footer={
								<>
									<Button
										color="secondary"
										onClick={() => {
											setOpenDialog(false);
											showNotification({
												title: "Aceptado",
												message: "Se acepto la accion",
												closable: true,
												variant: "solid",
												notificationType: "success",
												placement: "top-right",
												duration: 2500,
											});
										}}
									>
										Accept
									</Button>
									<Button
										color="secondary"
										variant="outline"
										onClick={() => {
											setOpenDialog(false);
											showNotification({
												title: "Cancelado",
												message: "Se cancelo la accion",
												closable: true,
												variant: "solid",
												notificationType: "danger",
												placement: "top-right",
												duration: 2500,
											});
										}}
										style={{ marginLeft: "8px" }}
									>
										Cancel
									</Button>
								</>
							}
						>
							<div style={{ display: "flex", flexDirection: "column", gap: "2em", padding: "1em" }}>
								<p>¿Estás seguro de que deseas realizar esta acción?</p>
								<Input
									type="text"
									label="Campo de ejemplo"
									placeholder="Escribe algo..."
									helperText="Este es un campo de ejemplo"
									errorMessage="Este es un mensaje de error"
									size="small"
									radius="small"
									invalid={false}
									disabled={false}
								/>
							</div>
						</Dialog>
					</div>
				</div>
			</section>
			{/* DRAWER */}
			<section className={styles.subsection} id="drawer">
				<h2 className={styles.subtitle}>Drawer</h2>
				<div className={styles.control_buttons}>
					<Select
						className={styles.select_size}
						label="Width"
						value={widthDrawer}
						size="small"
						onChange={(value) => setWidthDrawer(value as DrawerWidth)}
						options={[
							{ label: "Xsmall", value: "xsmall" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Half", value: "middle" },
							{ label: "Full", value: "full" },
						]}
					/>
					<Select
						label="Size"
						className={styles.select_size}
						value={sizeToolTip}
						size="small"
						onChange={(value) =>
							setSizeToolTip(value as "tiny" | "small" | "medium" | "large" | undefined)
						}
						options={[
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Select
						label="Position"
						className={styles.select_size}
						value={drawerPosition}
						size="small"
						onChange={(value) => setDrawerPosition(value as DrawerPlacement)}
						options={[
							{ label: "Top", value: "top" },
							{ label: "Right", value: "right" },
							{ label: "Bottom", value: "bottom" },
							{ label: "Left", value: "left" },
						]}
					/>
					<div style={{ display: "flex", gap: "1em", maxWidth: "10em" }}>
						<InputNumber
							label="Delay Show"
							value={delayShowToolTip}
							onChange={(value) => setDelayShowToolTip(value || 0)}
							size="small"
						/>
						<InputNumber
							label="Delay Hide"
							value={delayHideToolTip}
							onChange={(value) => setDelayHideToolTip(value || 0)}
							size="small"
						/>
					</div>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<Button label="Open Drawer" onClick={() => setOpenDrawer(true)} />
						<Drawer
							isOpen={openDrawer}
							onClose={() => setOpenDrawer(false)}
							title="Confirmar Acción"
							closeOnOverlayClick={true}
							closeOnEscape={true}
							showCloseButton={true}
							placement={drawerPosition}
							width={widthDrawer}
							footer={
								<>
									<Button
										color="secondary"
										onClick={() => {
											setOpenDrawer(false);
										}}
									>
										Accept
									</Button>
									<Button
										color="secondary"
										variant="outline"
										onClick={() => {
											setOpenDrawer(false);
										}}
										style={{ marginLeft: "8px" }}
									>
										Cancel
									</Button>
								</>
							}
						>
							<div
								style={{ display: "flex", flexDirection: "column", gap: "0.5em", padding: "1em" }}
							>
								<Link
									label="Home"
									icon={<HomeIcon />}
									variant="text"
									color="secondary"
									href="#"
									type="button"
									size="large"
									active={true}
									justify="start"
								/>
								<Link
									label="Settings"
									icon={<SettingsIcon />}
									variant="text"
									color="secondary"
									href="#"
									type="button"
									size="large"
								/>
								<Link
									label="Profile"
									icon={<UserIcon />}
									variant="text"
									color="secondary"
									href="#"
									type="button"
									size="large"
								/>
								<Link
									label="Help"
									icon={<HelpCircleIcon />}
									variant="text"
									color="secondary"
									href="#"
									type="button"
									size="large"
								/>
								<Link
									label="About"
									icon={<InfoIcon />}
									variant="text"
									color="secondary"
									href="#"
									type="button"
									size="large"
								/>
								<Link
									label="Logout"
									icon={<LogOutIcon />}
									variant="text"
									color="secondary"
									href="#"
									type="button"
									size="large"
								/>
							</div>
						</Drawer>
					</div>
				</div>
			</section>
			{/* FILE UPLOAD */}
			<section className={styles.subsection} id="file upload">
				<h2 className={styles.subtitle}>File Upload</h2>
				<div className={styles.control_buttons}>
					<Select
						label="Type"
						value={typeFileUpload}
						className={styles.select_size}
						size="small"
						onChange={(value) => setTypeFileUpload(value as "button" | "dropzone" | undefined)}
						options={[
							{ label: "Button", value: "button" },
							{ label: "Dropzone", value: "dropzone" },
						]}
					/>
					<Select
						label="Radius"
						value={radiusFileUpload}
						className={styles.select_size}
						size="small"
						onChange={(value) =>
							setRadiusFileUpload(value as "none" | "small" | "medium" | "large" | undefined)
						}
						options={[
							{ label: "None", value: "none" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Select
						label="Size"
						value={sizeFileUpload}
						className={styles.select_size}
						size="small"
						onChange={(value) =>
							setSizeFileUpload(value as "small" | "medium" | "large" | undefined)
						}
						options={[
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Checkbox
						label="Multiple Files?"
						checked={multiFileUpload}
						size="small"
						color="info"
						onChange={(e) => setMultiFileUpload(e.currentTarget.checked)}
					/>
					<Checkbox
						label="Disabled"
						checked={disabledFileUpload}
						size="small"
						color="secondary"
						onChange={(e) => setDisabledFileUpload(e.currentTarget.checked)}
					/>
					<Checkbox
						label="Invalid"
						checked={invalidFileUpload}
						size="small"
						color="info"
						onChange={(e) => setInvalidFileUpload(e.currentTarget.checked)}
					/>
					<Checkbox
						label="View File Size?"
						checked={viewFileSize}
						size="small"
						color="info"
						onChange={(e) => setViewFileSize(e.currentTarget.checked)}
					/>
					<Input
						label="Message Error"
						size="small"
						value={errorMessageFileUpload}
						onChange={(value) => setErrorMessageFileUpload(value)}
					/>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<FileUpload
							radius={radiusFileUpload}
							type={typeFileUpload}
							disabled={disabledFileUpload}
							invalid={invalidFileUpload}
							errorMessage={errorMessageFileUpload}
							label="File Upload"
							helperText="Upload your file"
							placeholder="Drag and drop your files here"
							required
							maxSize={60000}
							viewFileSize={viewFileSize}
							onFilesRejected={(files) => console.log("Files Rejected", files)}
							size={sizeFileUpload}
							accept=".docx, .doc, .pdf, .jpg, .png, .webp"
							multiple={multiFileUpload}
						/>
					</div>
				</div>
			</section>
			{/* INPUT */}
			<section className={styles.subsection} id="input">
				<h2 className={styles.subtitle}>Input</h2>
				<div className={styles.control_buttons}>
					<Checkbox
						label="Disabled"
						checked={disabledInput}
						size="medium"
						color="secondary"
						onChange={(e) => setDisabledInput(e.currentTarget.checked)}
					/>
					<Checkbox
						label="Is Valid"
						checked={validInput}
						size="medium"
						color="info"
						onChange={(e) => setValidInput(e.currentTarget.checked)}
					/>
					<select
						className={styles.control_size}
						value={sizeInput}
						onChange={(e) =>
							setSizeInput(
								e.currentTarget.value as "medium" | "small" | "large" | "tiny" | undefined
							)
						}
					>
						<option value="tiny">Tiny</option>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
					</select>
					<select
						className={styles.control_size}
						value={variantInput}
						onChange={(e) =>
							setVariantInput(e.currentTarget.value as "outline" | "flat" | "underline" | undefined)
						}
					>
						<option value="outline">Outline</option>
						<option value="flat">Flat</option>
						<option value="underline">Underline</option>
					</select>
					<select
						className={styles.control_size}
						value={radiusInput}
						onChange={(e) =>
							setRadiusInput(
								e.currentTarget.value as "medium" | "small" | "large" | "none" | "pill" | undefined
							)
						}
					>
						<option value="none">None</option>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
						<option value="pill">Pill</option>
					</select>
					<Input value={errorMessage} onChange={(value) => setErrorMessage(value)} />
				</div>
				<div className={styles.container_buttons}>
					<div className={styles.buttons}>
						<Input
							type="text"
							label="Nombre"
							placeholder="Jhon Doe"
							floatingLabel={false}
							errorMessage="Ingrese Nombre de 3 letras"
							variant={variantInput}
							radius={radiusInput}
							disabled={disabledInput}
							size={sizeInput}
							required
							invalid={!validInput}
							helperText="Requerido *"
						/>
						<Input
							type="email"
							label="E-mail"
							disabled={disabledInput}
							placeholder="example@email.com"
							variant={variantInput}
							radius={radiusInput}
							size={sizeInput}
							invalid={!validInput}
							errorMessage={errorMessage}
						/>
						<Input
							type="password"
							label="Password"
							disabled={disabledInput}
							placeholder="Password"
							variant={variantInput}
							radius={radiusInput}
							size={sizeInput}
							invalid={!validInput}
							errorMessage={errorMessage}
						/>
						<Input
							type="search"
							label="Busqueda"
							disabled={disabledInput}
							size={sizeInput}
							placeholder="Search by name, age etc..."
							variant={variantInput}
							radius={radiusInput}
							invalid={!validInput}
							errorMessage={errorMessage}
						/>
					</div>
					<div className={styles.buttons}>
						<InputGroup
							prefixElement={<Coins />}
							suffixElement={<User />}
							variant={variantInput}
							radius={radiusInput}
							size={sizeInput}
							disabled={disabledInput}
							invalid={!validInput}
							errorMessage={errorMessage}
						>
							<Input type="text" label="Ingrese" placeholder="Name settings" />
						</InputGroup>
						<InputGroup
							prefixElement={<span>https://</span>}
							suffixElement={<span>.com</span>}
							radius={radiusInput}
							variant={variantInput}
							size={sizeInput}
							disabled={disabledInput}
							invalid={!validInput}
							errorMessage={errorMessage}
						>
							<Input type="text" label="URL de imagen" placeholder="www.example.com" />
						</InputGroup>
						<InputGroup
							prefixElement={<User />}
							variant={variantInput}
							size={sizeInput}
							radius={radiusInput}
							disabled={disabledInput}
							invalid={!validInput}
							errorMessage={errorMessage}
						>
							<Input type="text" label="Ingrese" placeholder="Username" />
						</InputGroup>
						<InputGroup
							suffixElement={<Settings />}
							variant={variantInput}
							size={sizeInput}
							radius={radiusInput}
							disabled={disabledInput}
							invalid={!validInput}
							errorMessage={errorMessage}
						>
							<Input
								type="text"
								label="Configuracion"
								placeholder="Settings"
								helperText="Requerido *"
							/>
						</InputGroup>
					</div>
					<div className={styles.buttons}>
						<InputGroup
							prefixElement={<SearchIcon />}
							suffixElement={<Button label="Search" variant="solid" color="primary" />}
							variant={variantInput}
							size={sizeInput}
							radius={radiusInput}
							disabled={disabledInput}
							invalid={!validInput}
							errorMessage={errorMessage}
						>
							<Input type="search" placeholder="Search by product..." />
						</InputGroup>
						<InputGroup
							suffixElement={<Button label="Buscar" variant="ghost" color="primary" />}
							variant={variantInput}
							size={sizeInput}
							radius={radiusInput}
							disabled={disabledInput}
							invalid={!validInput}
							errorMessage={errorMessage}
						>
							<Input type="text" label="Configuracion" floatingLabel />
						</InputGroup>
						<InputGroup
							suffixElement={
								<Button
									icon={<Search />}
									variant="solid"
									color="info"
									style={{ width: "4em", backgroundColor: "#ffe11e", color: "#000000" }}
								/>
							}
							variant={variantInput}
							size={sizeInput}
							radius={radiusInput}
							disabled={disabledInput}
							invalid={!validInput}
							errorMessage={errorMessage}
						>
							<Input type="text" label="Configuracion" floatingLabel />
						</InputGroup>
						<InputGroup
							prefixElement={<Button variant="ghost" color="secondary" icon={<Settings2 />} />}
							radius={radiusInput}
							size={sizeInput}
							disabled={disabledInput}
							variant={variantInput}
							invalid={!validInput}
							errorMessage={errorMessage}
						>
							<Input type="text" label="Configuracion" floatingLabel />
						</InputGroup>
					</div>
				</div>
			</section>
			{/* INPUT NUMBER */}
			<section className={styles.subsection} id="input number">
				<h2 className={styles.subtitle}>Input Number</h2>
				<div className={styles.control_buttons}>
					<Checkbox
						label="Disabled"
						checked={disabledInputNumber}
						size="medium"
						color="secondary"
						onChange={(e) => setDisabledInputNumber(e.currentTarget.checked)}
					/>
					<Checkbox
						label="Is Valid"
						checked={validInputNumber}
						size="medium"
						color="info"
						onChange={(e) => setValidInputNumber(e.currentTarget.checked)}
					/>
					<select
						className={styles.control_size}
						value={sizeInputNumber}
						onChange={(e) =>
							setSizeInputNumber(
								e.currentTarget.value as "medium" | "small" | "large" | "tiny" | undefined
							)
						}
					>
						<option value="tiny">Tiny</option>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
					</select>
					<select
						className={styles.control_size}
						value={radiusInputNumber}
						onChange={(e) =>
							setRadiusInputNumber(
								e.currentTarget.value as "medium" | "small" | "large" | "none" | "pill" | undefined
							)
						}
					>
						<option value="none">None</option>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
						<option value="pill">Pill</option>
					</select>
					<Input value={errorMessageNumber} onChange={(value) => setErrorMessageNumber(value)} />
				</div>
				<div className={styles.container_buttons}>
					<div className={styles.buttons}>
						<InputNumber
							variant="outline"
							label="Default"
							typeNumber="default"
							helperText="Helper text"
							radius={radiusInputNumber}
							size={sizeInputNumber}
							disabled={disabledInputNumber}
							invalid={!validInputNumber}
							errorMessage={errorMessageNumber}
						/>
						<InputNumber
							variant="outline"
							label="Currency USD"
							typeNumber="currency-USD"
							radius={radiusInputNumber}
							size={sizeInputNumber}
							disabled={disabledInputNumber}
							invalid={!validInputNumber}
							errorMessage={errorMessageNumber}
						/>
						<InputNumber
							variant="outline"
							label="Currency EUR"
							typeNumber="currency-EUR"
							radius={radiusInputNumber}
							size={sizeInputNumber}
							disabled={disabledInputNumber}
							invalid={!validInputNumber}
							errorMessage={errorMessageNumber}
						/>
						<InputNumber
							variant="outline"
							label="Currency GBP"
							typeNumber="currency-GBP"
							radius={radiusInputNumber}
							size={sizeInputNumber}
							disabled={disabledInputNumber}
							invalid={!validInputNumber}
							errorMessage={errorMessage}
						/>
						<InputNumber
							variant="outline"
							label="Porcentage"
							typeNumber="percentage"
							radius={radiusInputNumber}
							size={sizeInputNumber}
							disabled={disabledInputNumber}
							invalid={!validInputNumber}
							errorMessage={errorMessageNumber}
						/>
						<InputNumber
							variant="outline"
							label="Decimal"
							typeNumber="decimal"
							radius={radiusInputNumber}
							size={sizeInputNumber}
							disabled={disabledInputNumber}
							invalid={!validInputNumber}
							errorMessage={errorMessageNumber}
						/>
					</div>
				</div>
			</section>
			{/* LINK */}
			<section className={styles.subsection} id="link">
				<h2 className={styles.subtitle}>Link</h2>
				<div className={styles.control_buttons}>
					<div style={{ display: "flex", gap: "1rem", flexFlow: "nowrap" }}>
						<Select
							options={[
								{ label: "Tiny", value: "tiny" },
								{ label: "Small", value: "small" },
								{ label: "Medium", value: "medium" },
								{ label: "Large", value: "large" },
							]}
							value={sizeLink}
							onChange={(e) => setSizeLink(e as "medium" | "small" | "large" | "tiny" | undefined)}
							size="small"
						/>
						<Select
							options={[
								{ label: "Default", value: "default" },
								{ label: "Button", value: "button" },
							]}
							value={typeLink}
							onChange={(e) => setTypeLink(e as "default" | "button" | undefined)}
							size="small"
						/>
						<Select
							options={[
								{ label: "Clasicc", value: "classic" },
								{ label: "Solid", value: "solid" },
								{ label: "Outline", value: "outline" },
								{ label: "Dashed", value: "dashed" },
								{ label: "Ghost", value: "ghost" },
								{ label: "Text", value: "text" },
							]}
							value={variantLink}
							onChange={(e) =>
								setVariantLink(
									e as "outline" | "classic" | "solid" | "text" | "ghost" | "dashed" | undefined
								)
							}
							size="small"
						/>
						<Select
							options={[
								{ label: "None", value: "none" },
								{ label: "Small", value: "small" },
								{ label: "Medium", value: "medium" },
								{ label: "Large", value: "large" },
								{ label: "Pill", value: "pill" },
								{ label: "Circle", value: "circle" },
							]}
							value={radiusLink}
							onChange={(e) =>
								setRadiusLink(
									e as "none" | "small" | "medium" | "large" | "pill" | "circle" | undefined
								)
							}
							size="small"
						/>
					</div>

					<Checkbox
						label="Disabled"
						checked={disabledLink}
						size="medium"
						color="secondary"
						onChange={(e) => setDisabledLink(e.currentTarget.checked)}
					/>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						{buttonsPrimary.map((button) => (
							<Link
								key={button.color}
								className={styles.button}
								size={sizeLink}
								type={typeLink}
								radius={radiusLink}
								variant={variantLink}
								color={button.color}
								label={button.label}
								disabled={disabledLink}
								loading={loadingButtons}
								href="https://www.google.com"
								icon={button.icon}
							/>
						))}
					</div>
				</div>
			</section>
			{/* NOTIFICATION */}
			<section className={styles.subsection} id="notification">
				<h2 className={styles.subtitle}>Notification</h2>
				<div className={styles.control_buttons}>
					<select
						className={styles.control_size}
						value={notificationType}
						onChange={(e) =>
							setNotificationType(
								e.currentTarget.value as
									| "themed"
									| "solid"
									| "flat"
									| "lightened"
									| "darkened"
									| undefined
							)
						}
					>
						<option value="themed">Themed</option>
						<option value="solid">Solid</option>
						<option value="flat">Flat</option>
						<option value="darkened">Darkened</option>
						<option value="lightened">Lightened</option>
					</select>
					<select
						className={styles.control_size}
						value={notificationPosition}
						onChange={(e) =>
							setNotificationPosition(
								e.currentTarget.value as
									| "top-left"
									| "top-center"
									| "top-right"
									| "bottom-left"
									| "bottom-center"
									| "bottom-right"
									| undefined
							)
						}
					>
						<option value="top-left">Top - Left</option>
						<option value="top-center">Top - Center</option>
						<option value="top-right">Top - Right</option>
						<option value="bottom-left">Bottom - Left</option>
						<option value="bottom-center">Bottom - Center</option>
						<option value="bottom-right">Bottom - Right</option>
					</select>
					<Checkbox
						label="Closable"
						checked={closableNotification}
						onChange={(e) => setClosableNotification(e.currentTarget.checked)}
					/>
					<Checkbox
						label="Has Button Confirm?"
						checked={hasButtonsConfirmNotification}
						onChange={(e) => setHasButtonsConfirmNotification(e.currentTarget.checked)}
					/>
					<Checkbox
						label="Has Button Cancel?"
						checked={hasButtonsCancelNotification}
						onChange={(e) => setHasButtonsCancelNotification(e.currentTarget.checked)}
					/>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<Button
							variant="solid"
							color="secondary"
							size="medium"
							radius="small"
							label="Icon"
							style={{ width: "8em" }}
							onClick={() =>
								showNotification({
									title: "Default",
									message: "Notification Default Color",
									closable: closableNotification,
									variant: notificationType,
									notificationType: "secondary",
									placement: notificationPosition,
									onCancel: hasButtonsCancelNotification
										? () => console.log("Se cancelo")
										: undefined,
									onConfirm: hasButtonsConfirmNotification
										? () => console.log("Se confirmo")
										: undefined,
									icon: <RssIcon />,
								})
							}
						/>
						<Button
							variant="solid"
							color="secondary"
							size="medium"
							radius="small"
							label="Image"
							style={{ width: "8em" }}
							onClick={() =>
								showNotification({
									title: "Default",
									message: "Notification Default Color",
									closable: closableNotification,
									variant: notificationType,
									notificationType: "secondary",
									placement: notificationPosition,
									onCancel: hasButtonsCancelNotification
										? () => console.log("Se cancelo")
										: undefined,
									onConfirm: hasButtonsConfirmNotification
										? () => console.log("Se confirmo")
										: undefined,
									icon: (
										<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/240px-JavaScript-logo.png" />
									),
								})
							}
						/>
						<Button
							variant="solid"
							color="success"
							size="medium"
							radius="small"
							label="Success"
							style={{ width: "8em" }}
							onClick={() =>
								showNotification({
									title: "Success",
									message: "Notification Success Color",
									closable: closableNotification,
									variant: notificationType,
									notificationType: "success",
									placement: notificationPosition,
									onCancel: hasButtonsCancelNotification
										? () => console.log("Se cancelo")
										: undefined,
									onConfirm: hasButtonsConfirmNotification
										? () => console.log("Se confirmo")
										: undefined,
								})
							}
						/>
						<Button
							variant="solid"
							color="danger"
							size="medium"
							radius="small"
							label="Danger
            "
							style={{ width: "8em" }}
							onClick={() =>
								showNotification({
									title: "Danger",
									message: "Notification Danger Color",
									closable: closableNotification,
									variant: notificationType,
									notificationType: "danger",
									placement: notificationPosition,
									onClose: () => console.log("Cerrado Warning"),
									onCancel: hasButtonsCancelNotification
										? () => console.log("Se cancelo")
										: undefined,
									onConfirm: hasButtonsConfirmNotification
										? () => console.log("Se confirmo")
										: undefined,
								})
							}
						/>
						<Button
							variant="solid"
							color="warning"
							size="medium"
							radius="small"
							label="Warnin
            g"
							style={{ width: "8em" }}
							onClick={() =>
								showNotification({
									title: "Warning",
									message:
										"Notification Warning Color Para no modificar la sentencia de los demas puede que varie la movilidad",
									closable: closableNotification,
									variant: notificationType,
									onCancel: hasButtonsCancelNotification
										? () => console.log("Se cancelo")
										: undefined,
									onConfirm: hasButtonsConfirmNotification
										? () => console.log("Se confirmo")
										: undefined,
									notificationType: "warning",
									placement: notificationPosition,
								})
							}
						/>
						<Button
							variant="solid"
							color="info"
							size="medium"
							radius="small"
							label="Info"
							style={{ width: "8em" }}
							onClick={() =>
								showNotification({
									title: "Info",
									cancelText: "Cancelar",
									confirmText: "Aceptar",
									message: "Notification Info Color",
									closable: closableNotification,
									variant: notificationType,
									notificationType: "info",
									placement: notificationPosition,
									onCancel: hasButtonsCancelNotification
										? () => console.log("Se cancelo")
										: undefined,
									onConfirm: hasButtonsConfirmNotification
										? () => console.log("Se confirmo")
										: undefined,
								})
							}
						/>
					</div>
				</div>
			</section>
			{/* PAGINATION */}
			<section className={styles.subsection} id="pagination">
				<h2 className={styles.subtitle}>Pagination</h2>
				<div className={styles.control_buttons}>
					<Select
						label="Variant"
						value={variantPagination}
						className={styles.select_size}
						size="small"
						onChange={(value) =>
							setVariantPagination(value as "outline" | "flat" | "solid" | undefined)
						}
						options={[
							{ label: "Solid", value: "solid" },
							{ label: "Outline", value: "outline" },
							{ label: "Flat", value: "flat" },
						]}
					/>
					<Select
						label="Radius"
						value={radiusPagination}
						className={styles.select_size}
						size="small"
						onChange={(value) =>
							setRadiusPagination(
								value as "none" | "small" | "medium" | "large" | "pill" | undefined
							)
						}
						options={[
							{ label: "None", value: "none" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
							{ label: "Pill", value: "pill" },
						]}
					/>
					<Select
						label="Size"
						value={sizePagination}
						className={styles.select_size}
						size="small"
						onChange={(value) =>
							setSizePagination(value as "small" | "medium" | "large" | "tiny" | undefined)
						}
						options={[
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<div style={{ display: "flex", gap: "1em", maxWidth: "10em" }}>
						<InputNumber
							value={maxVisiblePages}
							onChange={(value) => setMaxVisiblePages(value)}
							size="small"
						/>
						<InputNumber
							value={totalPages}
							onChange={(value) => setTotalPages(value || 0)}
							size="small"
						/>
					</div>
					<Checkbox
						label="Disabled"
						checked={disabledPagination}
						size="small"
						color="secondary"
						onChange={(e) => setDisabledPagination(e.currentTarget.checked)}
					/>
					<Checkbox
						label="Show PrevNextButtons"
						checked={showPrevNextButtons}
						size="small"
						color="info"
						onChange={(e) => setShowPrevNextButtons(e.currentTarget.checked)}
					/>
					<Checkbox
						label="Show FirstLastButtons"
						checked={showFirstLastButtons}
						size="small"
						color="info"
						onChange={(e) => setShowFirstLastButtons(e.currentTarget.checked)}
					/>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={(page) => setCurrentPage(page)}
							size={sizePagination}
							radius={radiusPagination}
							variant={variantPagination}
							maxVisiblePages={maxVisiblePages}
							showFirstLastButtons={showFirstLastButtons}
							showPrevNextButtons={showPrevNextButtons}
							disabled={disabledPagination}
						/>
					</div>
				</div>
			</section>
			{/* RADIO */}
			<section className={styles.subsection} id="radio">
				<h2 className={styles.subtitle}>Radio</h2>
				<div className={styles.control_buttons}>
					<Checkbox
						label="Disabled"
						checked={disabledRadio}
						size="medium"
						color="secondary"
						onChange={(e) => setDisabledRadio(e.currentTarget.checked)}
					/>
					<select
						className={styles.control_size}
						value={sizeRadio}
						onChange={(e) =>
							setSizeRadio(e.currentTarget.value as "medium" | "small" | "large" | undefined)
						}
					>
						<option value="tiny">Tiny</option>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
					</select>
					<select
						className={styles.control_size}
						value={typeRadio}
						onChange={(e) => setTypeRadio(e.currentTarget.value as "radio" | "button" | undefined)}
					>
						<option value="radio">Radio</option>
						<option value="button">Button</option>
					</select>
					<select
						className={styles.control_size}
						value={orientationRadio}
						onChange={(e) =>
							setOrientationRadio(e.currentTarget.value as "horizontal" | "vertical" | undefined)
						}
					>
						<option value="vertical">Vertical</option>
						<option value="horizontal">Horizontal</option>
					</select>
					<select
						className={styles.control_size}
						value={variantRadio}
						onChange={(e) =>
							setVariantRadio(e.currentTarget.value as "outline" | "flat" | "solid" | undefined)
						}
					>
						<option value="outline">Outline</option>
						<option value="flat">Flat</option>
						<option value="solid">Solid</option>
					</select>
					<select
						className={styles.control_size}
						value={colorRadio}
						onChange={(e) =>
							setColorRadio(
								e.currentTarget.value as
									| "primary"
									| "secondary"
									| "danger"
									| "success"
									| "warning"
									| "info"
									| undefined
							)
						}
					>
						<option value="primary">Primary</option>
						<option value="secondary">Secondary</option>
						<option value="danger">Danger</option>
						<option value="success">Success</option>
						<option value="warning">Warning</option>
						<option value="info">Info</option>
					</select>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<RadioGroup
							defaultValue="second"
							type={typeRadio}
							selectedOption={valueRadioBordered}
							disabled={disabledRadio}
							radius="small"
							color={colorRadio}
							gap="0.5em"
							size={sizeRadio}
							variant={variantRadio}
							onChange={(e) => setValueRadioBordered(e)}
							orientation={orientationRadio}
						>
							<Radio value="first" label="First" />
							<Radio value="third" label="Third" />
							<Radio value="second" label="Second" />
							<Radio value="fourth" label="Fourth" />
							<Radio value="fifth" label="Fifth" />
							<Radio value="sixth" label="Sixth" />
						</RadioGroup>
					</div>
				</div>
			</section>
			{/* RANGE */}
			<section className={styles.subsection} id="range">
				<h2 className={styles.subtitle}>Range</h2>
				<div className={styles.control_buttons}>
					<Select
						className={styles.select_size}
						label="Size"
						value={sizeRange}
						size="small"
						onChange={(value) => setSizeRange(value as "small" | "medium" | "large" | undefined)}
						options={[
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<div style={{ display: "flex", gap: "1em", maxWidth: "16em" }}>
						<InputNumber
							label="Min"
							value={minRange}
							onChange={(value) => setMinRange(value || 0)}
							size="small"
						/>
						<InputNumber
							label="Max"
							value={maxRange}
							onChange={(value) => setMaxRange(value || 0)}
							size="small"
						/>
						<InputNumber
							label="Step"
							value={stepRange}
							onChange={(value) => setStepRange(value || 0)}
							size="small"
						/>
					</div>
					<Checkbox
						label="Disabled"
						checked={disabledRange}
						size="small"
						color="secondary"
						onChange={(e) => setDisabledRange(e.currentTarget.checked)}
					/>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<Range
							size={sizeRange}
							disabled={disabledRange}
							value={valueRange}
							ariaLabel={"5"}
							min={minRange}
							max={maxRange}
							step={stepRange}
							viewValue={true}
							viewBar={true}
							label="Range"
							onInput={(e) => setValueRange(e)}
							onChange={(e) => setValueRange(e)}
						/>
					</div>
				</div>
			</section>
			{/* SELECT */}
			<section className={styles.subsection} id="select">
				<h2 className={styles.subtitle}>Select</h2>
				<div className={styles.control_buttons}>
					<Checkbox
						label="Disabled"
						checked={disabledSelect}
						size="medium"
						color="secondary"
						onChange={(e) => setDisabledSelect(e.currentTarget.checked)}
					/>
					<Checkbox
						label="Is Valid"
						checked={validSelect}
						size="medium"
						color="info"
						onChange={(e) => setValidSelect(e.currentTarget.checked)}
					/>
					<select
						className={styles.control_size}
						value={sizeSelect}
						onChange={(e) =>
							setSizeSelect(
								e.currentTarget.value as "medium" | "small" | "large" | "tiny" | undefined
							)
						}
					>
						<option value="tiny">Tiny</option>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
					</select>
					<select
						className={styles.control_size}
						value={radiusSelect}
						onChange={(e) =>
							setRadiusSelect(
								e.currentTarget.value as "medium" | "small" | "large" | "none" | "pill" | undefined
							)
						}
					>
						<option value="none">None</option>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
						<option value="pill">Pill</option>
					</select>
					<Input value={errorMessageSelect} onChange={(value) => setErrorMessageSelect(value)} />
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<Select
							label="Outline"
							variant="outline"
							options={namesSelect}
							size={sizeSelect}
							radius={radiusSelect}
							disabled={disabledSelect}
							invalid={!validSelect}
							errorMessage={errorMessageSelect}
						/>
						<Select
							label="Flat"
							variant="flat"
							options={namesSelect}
							size={sizeSelect}
							radius={radiusSelect}
							disabled={disabledSelect}
							invalid={!validSelect}
							errorMessage={errorMessageSelect}
						/>
						<Select
							label="Borderless"
							variant="borderless"
							options={namesSelect}
							size={sizeSelect}
							radius={radiusSelect}
							disabled={disabledSelect}
							invalid={!validSelect}
							errorMessage={errorMessageSelect}
						/>
					</div>
				</div>
			</section>
			{/* SWITCH */}
			<section className={styles.subsection} id="switch">
				<h2 className={styles.subtitle}>Switch</h2>
				<div className={styles.control_buttons}>
					<Checkbox
						label="Disabled"
						checked={disabledSwitch}
						size="medium"
						color="secondary"
						onChange={(e) => setDisabledSwitch(e.currentTarget.checked)}
					/>
					<select
						className={styles.control_size}
						value={sizeSwitch}
						onChange={(e) =>
							setSizeSwitch(
								e.currentTarget.value as "medium" | "small" | "large" | "tiny" | undefined
							)
						}
					>
						<option value="tiny">Tiny</option>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
					</select>
					<select
						className={styles.control_size}
						value={shapeSwitch}
						onChange={(e) =>
							setShapeSwitch(e.currentTarget.value as "square" | "soft" | "rounded" | undefined)
						}
					>
						<option value="square">Square</option>
						<option value="soft">Soft</option>
						<option value="rounded">Rounded</option>
					</select>
					<select
						className={styles.control_size}
						value={variantSwitch}
						onChange={(e) =>
							setVariantSwitch(e.currentTarget.value as "outline" | "flat" | "solid" | undefined)
						}
					>
						<option value="outline">Outline</option>
						<option value="flat">Flat</option>
						<option value="solid">Solid</option>
					</select>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<Switch
							variant={variantSwitch}
							color="primary"
							size={sizeSwitch}
							disabled={disabledSwitch}
							shape={shapeSwitch}
							label="Primary"
						/>
						<Switch
							variant={variantSwitch}
							color="secondary"
							size={sizeSwitch}
							disabled={disabledSwitch}
							shape={shapeSwitch}
							label="Secondary"
						/>
						<Switch
							variant={variantSwitch}
							color="success"
							size={sizeSwitch}
							disabled={disabledSwitch}
							shape={shapeSwitch}
							label="Success"
						/>
						<Switch
							variant={variantSwitch}
							color="danger"
							size={sizeSwitch}
							disabled={disabledSwitch}
							shape={shapeSwitch}
							label="Danger"
						/>
						<Switch
							variant={variantSwitch}
							color="warning"
							size={sizeSwitch}
							disabled={disabledSwitch}
							shape={shapeSwitch}
							label="Warning"
						/>
						<Switch
							variant={variantSwitch}
							color="info"
							size={sizeSwitch}
							disabled={disabledSwitch}
							shape={shapeSwitch}
							label="Info"
						/>
					</div>
				</div>
			</section>
			{/* TAB */}
			<section className={styles.subsection} id="tab">
				<h2 className={styles.subtitle}>Tab</h2>
				<div className={styles.control_buttons}>
					<Select
						label="Variant"
						className={styles.select_size}
						value={variantTab}
						size="small"
						onChange={(value) => setVariantTab(value as TabVariant)}
						options={[
							{ label: "Underline", value: "underline" },
							{ label: "Flat", value: "flat" },
							{ label: "Box", value: "box" },
							{ label: "Border", value: "border" },
						]}
					/>
					<Select
						label="Size"
						className={styles.select_size}
						value={sizeTab}
						size="small"
						onChange={(value) => setSizeTab(value as TabSize)}
						options={[
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Select
						label="Color"
						className={styles.select_size}
						value={colorTab}
						size="small"
						onChange={(value) => setColorTab(value as TabColor)}
						options={[
							{ label: "Primary", value: "primary" },
							{ label: "Secondary", value: "secondary" },
							{ label: "Success", value: "success" },
							{ label: "Danger", value: "danger" },
							{ label: "Warning", value: "warning" },
							{ label: "Info", value: "info" },
						]}
					/>
					<Select
						label="Radius"
						className={styles.select_size}
						value={radiusTab}
						size="small"
						onChange={(value) => setRadiusTab(value as TabRadius)}
						options={[
							{ label: "None", value: "none" },
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
							{ label: "Full", value: "full" },
						]}
					/>
				</div>
				<div className={styles.container_buttons}>
					<Tab
						variant={variantTab}
						size={sizeTab}
						color={colorTab}
						radius={radiusTab}
						items={[
							{ id: "1", label: "Home", icon: <HomeIcon /> },
							{ id: "2", label: "Library", icon: <BookIcon /> },
							{ id: "3", label: "Data", icon: <DatabaseIcon /> },
							{ id: "4", label: "Section", icon: <LayoutDashboard /> },
							{ id: "5", label: "Programming", icon: <Code /> },
						]}
					/>
				</div>
			</section>
			{/* TAG */}
			<section className={styles.subsection} id="tag">
				<h2 className={styles.subtitle}>Tag</h2>
				<div className={styles.control_buttons}>
					<Select
						label="Size"
						className={styles.select_size}
						value={sizeTag}
						size="small"
						onChange={(value) =>
							setSizeTag(value as "tiny" | "small" | "medium" | "large" | undefined)
						}
						options={[
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Select
						label="Variant"
						className={styles.select_size}
						value={variantTag}
						size="small"
						onChange={(value) =>
							setVariantTag(value as "outline" | "flat" | "solid" | "dashed" | undefined)
						}
						options={[
							{ label: "Outline", value: "outline" },
							{ label: "Flat", value: "flat" },
							{ label: "Solid", value: "solid" },
							{ label: "Dashed", value: "dashed" },
							{ label: "Subtle", value: "subtle" },
						]}
					/>
					<Select
						label="Radius"
						className={styles.select_size}
						value={radiusTag}
						size="small"
						onChange={(value) =>
							setRadiusTag(
								value as "none" | "tiny" | "small" | "medium" | "large" | "full" | undefined
							)
						}
						options={[
							{ label: "None", value: "none" },
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
							{ label: "Full", value: "full" },
						]}
					/>
					<Checkbox
						label="Close Button"
						checked={isCloseButton}
						size="medium"
						color="secondary"
						onChange={() => setIsCloseButton((state) => !state)}
					/>
					<Checkbox
						label="With Icon"
						checked={withIconTag}
						size="medium"
						color="secondary"
						onChange={() => setWithIconTag((state) => !state)}
					/>
					<Checkbox
						label="With Text"
						checked={withTextTag}
						size="medium"
						color="secondary"
						onChange={() => setWithTextTag((state) => !state)}
					/>
				</div>
				<div className={styles.container_buttons} style={{ gap: "1.5rem" }}>
					{arrayBadge.map((badge) => (
						<Tag
							key={badge}
							text=""
							size={sizeTag}
							variant={variantTag}
							color={
								badge as
									| "primary"
									| "secondary"
									| "danger"
									| "success"
									| "warning"
									| "info"
									| undefined
							}
							radius={radiusTag}
							onClose={
								isCloseButton
									? () => setArrayBadge(arrayBadge.filter((item) => item !== badge))
									: undefined
							}
						>
							{withIconTag ? <LucideBell /> : ""}
							{withTextTag ? <span style={{ textTransform: "capitalize" }}>{badge}</span> : ""}
						</Tag>
					))}
				</div>
			</section>
			{/* TEXT AREA */}
			<section className={styles.subsection} id="text area">
				<h2 className={styles.subtitle}>Text Area</h2>
				<div className={styles.control_buttons}>
					<Select
						label="Variant"
						value={variantTextArea}
						className={styles.select_size}
						size="small"
						onChange={(value) => setVariantTextArea(value as "borderless" | "outline" | undefined)}
						options={[
							{ label: "Borderless", value: "borderless" },
							{ label: "Outline", value: "outline" },
						]}
					/>
					<Select
						label="Radius"
						value={radiusTextArea}
						className={styles.select_size}
						size="small"
						onChange={(value) =>
							setRadiusTextArea(value as "none" | "small" | "medium" | "large" | undefined)
						}
						options={[
							{ label: "None", value: "none" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Select
						label="Size"
						value={sizeTextArea}
						className={styles.select_size}
						size="small"
						onChange={(value) =>
							setSizeTextArea(value as "small" | "medium" | "large" | "tiny" | undefined)
						}
						options={[
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Checkbox
						label="Disabled"
						checked={disabledTextArea}
						size="small"
						color="secondary"
						onChange={(e) => setDisabledTextArea(e.currentTarget.checked)}
					/>
					<Checkbox
						label="Invalid"
						checked={invalidTextArea}
						size="small"
						color="info"
						onChange={(e) => setInvalidTextArea(e.currentTarget.checked)}
					/>
					<Input
						label="Message Error"
						size="small"
						value={errorMessageTextArea}
						onChange={(value) => setErrorMessageTextArea(value)}
					/>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<TextArea
							radius={radiusTextArea}
							size={sizeTextArea}
							variant={variantTextArea}
							disabled={disabledTextArea}
							invalid={invalidTextArea}
							errorMessage={errorMessageTextArea}
							label="Text Area"
							placeholder="Escribe algo..."
							helperText="Write something..."
							required
							rows={5}
							cols={30}
						/>
					</div>
				</div>
			</section>
			{/* TOOTTIP */}
			<section className={styles.subsection} id="tooltip">
				<h2 className={styles.subtitle}>ToolTip</h2>
				<div className={styles.control_buttons}>
					<Select
						className={styles.select_size}
						label="Color"
						value={colorToolTip}
						size="small"
						onChange={(value) =>
							setColorToolTip(
								value as
									| "primary"
									| "secondary"
									| "danger"
									| "success"
									| "warning"
									| "info"
									| undefined
							)
						}
						options={[
							{ label: "Primary", value: "primary" },
							{ label: "Secondary", value: "secondary" },
							{ label: "Success", value: "success" },
							{ label: "Danger", value: "danger" },
							{ label: "Warning", value: "warning" },
							{ label: "Info", value: "info" },
						]}
					/>
					<Select
						label="Size"
						className={styles.select_size}
						value={sizeToolTip}
						size="small"
						onChange={(value) =>
							setSizeToolTip(value as "tiny" | "small" | "medium" | "large" | undefined)
						}
						options={[
							{ label: "Tiny", value: "tiny" },
							{ label: "Small", value: "small" },
							{ label: "Medium", value: "medium" },
							{ label: "Large", value: "large" },
						]}
					/>
					<Select
						label="Position"
						className={styles.select_size}
						value={positionToolTip}
						size="small"
						onChange={(value) => setPositionToolTip(value as TooltipPosition | undefined)}
						options={[
							{ label: "Top Left", value: "top-left" },
							{ label: "Top Right", value: "top-right" },
							{ label: "Top Center", value: "top-center" },
							{ label: "Bottom Center", value: "bottom-center" },
							{ label: "Bottom Left", value: "bottom-left" },
							{ label: "Bottom Right", value: "bottom-right" },
						]}
					/>
					<div style={{ display: "flex", gap: "1em", maxWidth: "10em" }}>
						<InputNumber
							label="Delay Show"
							value={delayShowToolTip}
							onChange={(value) => setDelayShowToolTip(value || 0)}
							size="small"
						/>
						<InputNumber
							label="Delay Hide"
							value={delayHideToolTip}
							onChange={(value) => setDelayHideToolTip(value || 0)}
							size="small"
						/>
					</div>
				</div>
				<div className={styles.container_buttons}>
					<div className={`${styles.buttons} ${styles.buttons_large}`}>
						<Tooltip
							content="ToolTip"
							size={sizeToolTip}
							color={colorToolTip}
							delayShow={delayShowToolTip}
							delayHide={delayHideToolTip}
							position={positionToolTip}
						>
							<Button label="ToolTip" />
						</Tooltip>
						<Tooltip
							content="Danger"
							size={sizeToolTip}
							delayShow={delayShowToolTip}
							delayHide={delayHideToolTip}
							color="danger"
							position={positionToolTip}
						>
							<Button label="Danger" color="danger" />
						</Tooltip>
					</div>
				</div>
			</section>
		</section>
	);
}

export default App;

const namesSelect = [
	{ label: "TypeScript", value: "typescript" },
	{ label: "React", value: "react" },
	{ label: "JavaScript", value: "javascript" },
	{ label: "Angular", value: "angular" },
	{ label: "Vue", value: "vue" },
];

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

// Configuración de breakpoints para el carrusel
const responsiveBreakpoints = [
	{ breakpoint: 0, items: 1 }, // 1 item en pantallas < 768px
	{ breakpoint: 768, items: 2 }, // 2 items en pantallas >= 768px
	{ breakpoint: 1200, items: 3 }, // 3 items en pantallas >= 1200px
	{ breakpoint: 1600, items: 4 }, // 4 items en pantallas >= 1600px
];

const COMPONENTS = [
	"Accordion",
	"Alert",
	"Badge",
	"Breadcrumb",
	"Button",
	"Card",
	"Carousel",
	"Checkbox",
	"Color Picker",
	"Dialog",
	"Drawer",
	"File Upload",
	"Input",
	"Input Number",
	"Link",
	"Pagination",
	"Range",
	"Radio",
	"Select",
	"Switch",
	"Tab",
	"Tag",
	"Text Area",
	"ToolTip",
];
