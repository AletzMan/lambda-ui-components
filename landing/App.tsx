
import { Button, Checkbox, FileUpload, Input, InputGroup, InputNumber, Pagination, Radio, RadioGroup, Range, Select, Switch, TextArea, Tooltip } from '../src/main';
import { Bookmark, CircleEllipsis, CodeXml, Coins, RssIcon, Search, SearchIcon, Settings, Settings2, User } from "lucide-react";
import styles from "./styles.module.css";
import { useState } from 'react';
import { buttonsPrimary } from './constants';
import { useNotification } from '../src/components/Notification/NotificationProvider';
import { Card } from '../src/components/Card/Card';
import { ButtonThemeController } from '../src/components/ThemeProvider/ButtonThemeController';
import { RangeValue } from '../src/components/Range/range.types';



function App() {
  const [loadingButtons, setLoadingButtons] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState(false);
  const [radiusButtons, setRadiusButtons] = useState<"medium" | "small" | "large" | "none" | "pill" | "circle" | undefined>("small");
  const [sizeButtons, setSizeButtons] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium");
  const [sizeCheckbox, setSizeCheckbox] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium");
  const [disabledCheckbox, setDisabledCheckbox] = useState(false);
  const [radiusCheckbox, setRadiusCheckbox] = useState<"medium" | "small" | "none" | "circle" | undefined>("small");
  const [variantCheckbox, setVariantCheckbox] = useState<"outline" | "flat" | "solid" | undefined>("solid");
  const [sizeSwitch, setSizeSwitch] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium");
  const [disabledSwitch, setDisabledSwitch] = useState(false);
  const [shapeSwitch, setShapeSwitch] = useState<"square" | "soft" | "rounded" | undefined>("rounded");
  const [variantSwitch, setVariantSwitch] = useState<"outline" | "flat" | "solid" | undefined>("solid");
  const [sizeInput, setSizeInput] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium");
  const [disabledInput, setDisabledInput] = useState(false);
  const [radiusInput, setRadiusInput] = useState<"medium" | "small" | "large" | "none" | "pill" | undefined>("small");
  const [variantInput, setVariantInput] = useState<"outline" | "flat" | "underline" | undefined>("outline");
  const [validInput, setValidInput] = useState(true);
  const [errorMessage, setErrorMessage] = useState("This field has an error.");
  const [sizeInputNumber, setSizeInputNumber] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium");
  const [disabledInputNumber, setDisabledInputNumber] = useState(false);
  const [radiusInputNumber, setRadiusInputNumber] = useState<"medium" | "small" | "large" | "none" | "pill" | undefined>("small");
  const [validInputNumber, setValidInputNumber] = useState(true);
  const [errorMessageNumber, setErrorMessageNumber] = useState("This field has an error.");
  const [sizeRadio, setSizeRadio] = useState<"medium" | "small" | "large" | undefined>("medium");
  const [typeRadio, setTypeRadio] = useState<"radio" | "button" | undefined>("button");
  const [orientationRadio, setOrientationRadio] = useState<"horizontal" | "vertical" | undefined>("horizontal");
  const [variantRadio, setVariantRadio] = useState<"outline" | "flat" | "solid" | undefined>("solid");
  const [colorRadio, setColorRadio] = useState<"primary" | "secondary" | "danger" | "success" | "warning" | "info" | undefined>("primary");
  const [disabledRadio, setDisabledRadio] = useState(false);
  const [valueRadioBordered, setValueRadioBordered] = useState("");
  const [sizeSelect, setSizeSelect] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium");
  const [disabledSelect, setDisabledSelect] = useState(false);
  const [radiusSelect, setRadiusSelect] = useState<"medium" | "small" | "large" | "none" | "pill" | undefined>("small");
  const [validSelect, setValidSelect] = useState(true);
  const [errorMessageSelect, setErrorMessageSelect] = useState("This field has an error.");
  const [notificationType, setNotificationType] = useState<"themed" | "solid" | "darkened" | "lightened" | "flat" | undefined>("themed");
  const [notificationPosition, setNotificationPosition] = useState<"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right" | undefined>("top-center");
  const [closableNotification, setClosableNotification] = useState(false);
  const [hasButtonsConfirmNotification, setHasButtonsConfirmNotification] = useState(false);
  const [hasButtonsCancelNotification, setHasButtonsCancelNotification] = useState(false);
  const [radiusCard, setRadiusCard] = useState<"medium" | "small" | "large" | "none" | undefined>("small");
  const [sizeCard, setSizeCard] = useState<"medium" | "small" | "large" | undefined>("small");
  const [variantCard, setVariantCard] = useState<"outline" | "borderless" | undefined>("outline");
  const [radiusTextArea, setRadiusTextArea] = useState<"medium" | "small" | "large" | "none" | undefined>("small");
  const [sizeTextArea, setSizeTextArea] = useState<"medium" | "small" | "large" | "tiny" | undefined>("small");
  const [variantTextArea, setVariantTextArea] = useState<"outline" | "borderless" | undefined>("outline");
  const [disabledTextArea, setDisabledTextArea] = useState(false);
  const [invalidTextArea, setInvalidTextArea] = useState(false);
  const [errorMessageTextArea, setErrorMessageTextArea] = useState("This field has an error.");
  const [radiusFileUpload, setRadiusFileUpload] = useState<"medium" | "small" | "large" | "none" | undefined>("small");
  const [sizeFileUpload, setSizeFileUpload] = useState<"medium" | "small" | "large" | undefined>("medium");
  const [typeFileUpload, setTypeFileUpload] = useState<"button" | "dropzone" | undefined>("dropzone");
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
  const [sizePagination, setSizePagination] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium");
  const [variantPagination, setVariantPagination] = useState<"outline" | "flat" | "solid" | undefined>("solid");
  const [radiusPagination, setRadiusPagination] = useState<"medium" | "small" | "large" | "none" | "pill" | undefined>("small");
  const { showNotification } = useNotification();
  const [valueRange, setValueRange] = useState<RangeValue>([20, 60]);
  const [sizeRange, setSizeRange] = useState<"medium" | "small" | "large" | undefined>("medium");
  const [disabledRange, setDisabledRange] = useState(false);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(100);
  const [colorToolTip, setColorToolTip] = useState<"primary" | "secondary" | "danger" | "success" | "warning" | "info" | undefined>("primary");
  const [sizeToolTip, setSizeToolTip] = useState<"medium" | "small" | "large" | undefined>("medium");

  return (
    <section className={`${styles.section} `}>
      <header className={styles.header}>
        <h1 className={styles.title}>Lambda UI Components</h1>
        <ButtonThemeController />
      </header>
      {/* BUTTON */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>Button</h2>
        <div className={styles.control_buttons}>
          <Checkbox label='Disabled' checked={disabledButtons} size="medium" color="secondary" onChange={(e) => setDisabledButtons(e.currentTarget.checked)} />
          <Checkbox label='Loading' checked={loadingButtons} size="medium" color="info" onChange={(e) => setLoadingButtons(e.currentTarget.checked)} />
          <select className={styles.control_size} value={sizeButtons} onChange={(e) => setSizeButtons(e.currentTarget.value as "medium" | "small" | "large" | "tiny" | undefined)}>
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <select className={styles.control_size} value={radiusButtons} onChange={(e) => setRadiusButtons(e.currentTarget.value as "medium" | "small" | "large" | "none" | "pill" | "circle" | undefined)}>
            <option value="none">None</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="pill">Pill</option>
            <option value="circle">Cirlce</option>
          </select>
        </div>
        <div className={styles.container_buttons}>
          <div className={`${styles.buttons} ${styles.buttons_large}`}>
            {buttonsPrimary.map((button) => (
              <Button key={button.color}
                className={styles.button}
                size={sizeButtons}
                radius={radiusButtons}
                variant="solid"
                color={button.color}
                label={button.label}
                disabled={disabledButtons}
                loading={loadingButtons}
                loadingText="Loading"
                iconPosition="left"
                icon={button.icon} />
            ))}
          </div>
        </div>
      </section>
      {/* CHECKBOX */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>Checkbox</h2>
        <div className={styles.control_buttons}>
          <Checkbox label='Disabled' checked={disabledCheckbox} size="medium" color="secondary" onChange={(e) => setDisabledCheckbox(e.currentTarget.checked)} />
          <select className={styles.control_size} value={sizeCheckbox} onChange={(e) => setSizeCheckbox(e.currentTarget.value as "medium" | "small" | "large" | "tiny" | undefined)}>
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <select className={styles.control_size} value={radiusCheckbox} onChange={(e) => setRadiusCheckbox(e.currentTarget.value as "medium" | "small" | "none" | "circle" | undefined)}>
            <option value="none">None</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="circle">Circle</option>
          </select>
          <select className={styles.control_size} value={variantCheckbox} onChange={(e) => setVariantCheckbox(e.currentTarget.value as "outline" | "flat" | "solid" | undefined)}>
            <option value="outline">Outline</option>
            <option value="flat">Flat</option>
            <option value="solid">Solid</option>
          </select>
        </div>
        <div className={styles.container_buttons}>
          <div className={`${styles.buttons} ${styles.buttons_large}`}>
            <Checkbox size={sizeCheckbox} label='Primary' disabled={disabledCheckbox} radius={radiusCheckbox} variant={variantCheckbox} />
            <Checkbox size={sizeCheckbox} color="secondary" label='Secondary' disabled={disabledCheckbox} radius={radiusCheckbox} variant={variantCheckbox} />
            <Checkbox size={sizeCheckbox} color="success" label='Success' disabled={disabledCheckbox} radius={radiusCheckbox} variant={variantCheckbox} />
            <Checkbox size={sizeCheckbox} color="danger" label='Danger' disabled={disabledCheckbox} radius={radiusCheckbox} variant={variantCheckbox} />
            <Checkbox size={sizeCheckbox} color="warning" label='Warning' disabled={disabledCheckbox} radius={radiusCheckbox} variant={variantCheckbox} />
            <Checkbox size={sizeCheckbox} color="info" label='Info' disabled={disabledCheckbox} radius={radiusCheckbox} variant={variantCheckbox} />
          </div>
        </div>
      </section>
      {/* SWITCH */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>Switch</h2>
        <div className={styles.control_buttons}>
          <Checkbox label='Disabled' checked={disabledSwitch} size="medium" color="secondary" onChange={(e) => setDisabledSwitch(e.currentTarget.checked)} />
          <select className={styles.control_size} value={sizeSwitch} onChange={(e) => setSizeSwitch(e.currentTarget.value as "medium" | "small" | "large" | "tiny" | undefined)}>
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <select className={styles.control_size} value={shapeSwitch} onChange={(e) => setShapeSwitch(e.currentTarget.value as "square" | "soft" | "rounded" | undefined)}>
            <option value="square">Square</option>
            <option value="soft">Soft</option>
            <option value="rounded">Rounded</option>
          </select>
          <select className={styles.control_size} value={variantSwitch} onChange={(e) => setVariantSwitch(e.currentTarget.value as "outline" | "flat" | "solid" | undefined)}>
            <option value="outline">Outline</option>
            <option value="flat">Flat</option>
            <option value="solid">Solid</option>
          </select>
        </div>
        <div className={styles.container_buttons}>
          <div className={`${styles.buttons} ${styles.buttons_large}`}>
            <Switch variant={variantSwitch} color="primary" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} label='Primary' />
            <Switch variant={variantSwitch} color="secondary" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} label='Secondary' />
            <Switch variant={variantSwitch} color="success" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} label='Success' />
            <Switch variant={variantSwitch} color="danger" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} label='Danger' />
            <Switch variant={variantSwitch} color="warning" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} label='Warning' />
            <Switch variant={variantSwitch} color="info" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} label='Info' />
          </div>
        </div>
      </section>
      {/* RADIO */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>Radio</h2>
        <div className={styles.control_buttons}>
          <Checkbox label='Disabled' checked={disabledRadio} size="medium" color="secondary" onChange={(e) => setDisabledRadio(e.currentTarget.checked)} />
          <select className={styles.control_size} value={sizeRadio} onChange={(e) => setSizeRadio(e.currentTarget.value as "medium" | "small" | "large" | undefined)}>
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <select className={styles.control_size} value={typeRadio} onChange={(e) => setTypeRadio(e.currentTarget.value as "radio" | "button" | undefined)}>
            <option value="radio">Radio</option>
            <option value="button">Button</option>
          </select>
          <select className={styles.control_size} value={orientationRadio} onChange={(e) => setOrientationRadio(e.currentTarget.value as "horizontal" | "vertical" | undefined)}>
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
          <select className={styles.control_size} value={variantRadio} onChange={(e) => setVariantRadio(e.currentTarget.value as "outline" | "flat" | "solid" | undefined)}>
            <option value="outline">Outline</option>
            <option value="flat">Flat</option>
            <option value="solid">Solid</option>
          </select>
          <select className={styles.control_size} value={colorRadio} onChange={(e) => setColorRadio(e.currentTarget.value as "primary" | "secondary" | "danger" | "success" | "warning" | "info" | undefined)}>
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
            <RadioGroup defaultValue='second' type={typeRadio} selectedOption={valueRadioBordered} disabled={disabledRadio} radius='small' color={colorRadio} gap='0.5em' size={sizeRadio} variant={variantRadio} onChange={(e) => setValueRadioBordered(e)} orientation={orientationRadio} >
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
      {/* INPUT */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>Input</h2>
        <div className={styles.control_buttons}>
          <Checkbox label='Disabled' checked={disabledInput} size="medium" color="secondary" onChange={(e) => setDisabledInput(e.currentTarget.checked)} />
          <Checkbox label='Is Valid' checked={validInput} size="medium" color="info" onChange={(e) => setValidInput(e.currentTarget.checked)} />
          <select className={styles.control_size} value={sizeInput} onChange={(e) => setSizeInput(e.currentTarget.value as "medium" | "small" | "large" | "tiny" | undefined)}>
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <select className={styles.control_size} value={variantInput} onChange={(e) => setVariantInput(e.currentTarget.value as "outline" | "flat" | "underline" | undefined)}>
            <option value="outline">Outline</option>
            <option value="flat">Flat</option>
            <option value="underline">Underline</option>
          </select>
          <select className={styles.control_size} value={radiusInput} onChange={(e) => setRadiusInput(e.currentTarget.value as "medium" | "small" | "large" | "none" | "pill" | undefined)}>
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
            <Input type="text" label='Nombre' placeholder="Jhon Doe" floatingLabel={false} errorMessage='Ingrese Nombre de 3 letras' variant={variantInput} radius={radiusInput} disabled={disabledInput} size={sizeInput} required invalid={!validInput} helperText='Requerido *' />
            <Input type="email" label='E-mail' disabled={disabledInput} placeholder='example@email.com' variant={variantInput} radius={radiusInput} size={sizeInput} invalid={!validInput} errorMessage={errorMessage} />
            <Input type="password" label='Password' disabled={disabledInput} placeholder='Password' variant={variantInput} radius={radiusInput} size={sizeInput} invalid={!validInput} errorMessage={errorMessage} />
            <Input type="search" label='Busqueda' disabled={disabledInput} size={sizeInput} placeholder='Search by name, age etc...' variant={variantInput} radius={radiusInput} invalid={!validInput} errorMessage={errorMessage} />
          </div>
          <div className={styles.buttons}>
            <InputGroup prefixElement={<Coins />} suffixElement={<User />} variant={variantInput} radius={radiusInput} size={sizeInput} disabled={disabledInput} invalid={!validInput} errorMessage={errorMessage}>
              <Input type="text" label='Ingrese' placeholder='Name settings' />
            </InputGroup>
            <InputGroup prefixElement={<span>https://</span>} suffixElement={<span>.com</span>} radius={radiusInput} variant={variantInput} size={sizeInput} disabled={disabledInput} invalid={!validInput} errorMessage={errorMessage}>
              <Input type="text" label='URL de imagen' placeholder='www.example.com' />
            </InputGroup>
            <InputGroup prefixElement={<User />} variant={variantInput} size={sizeInput} radius={radiusInput} disabled={disabledInput} invalid={!validInput} errorMessage={errorMessage}>
              <Input type="text" label='Ingrese' placeholder='Username' />
            </InputGroup>
            <InputGroup suffixElement={<Settings />} variant={variantInput} size={sizeInput} radius={radiusInput} disabled={disabledInput} invalid={!validInput} errorMessage={errorMessage}>
              <Input type="text" label='Configuracion' placeholder='Settings' helperText='Requerido *' />
            </InputGroup>
          </div>
          <div className={styles.buttons}>
            <InputGroup prefixElement={<SearchIcon />} suffixElement={<Button label='Search' variant="solid" color="primary" />} variant={variantInput} size={sizeInput} radius={radiusInput} disabled={disabledInput} invalid={!validInput} errorMessage={errorMessage}>
              <Input type="search" placeholder='Search by product...' />
            </InputGroup>
            <InputGroup suffixElement={<Button label='Buscar' variant="ghost" color="primary" />} variant={variantInput} size={sizeInput} radius={radiusInput} disabled={disabledInput} invalid={!validInput} errorMessage={errorMessage}>
              <Input type="text" label='Configuracion' floatingLabel />
            </InputGroup>
            <InputGroup suffixElement={<Button icon={<Search />} variant="solid" color="info" style={{ width: "4em", backgroundColor: "#ffe11e", color: "#000000" }} />} variant={variantInput} size={sizeInput} radius={radiusInput} disabled={disabledInput} invalid={!validInput} errorMessage={errorMessage}>
              <Input type="text" label='Configuracion' floatingLabel />
            </InputGroup>
            <InputGroup prefixElement={<Button variant="ghost" color="secondary" icon={<Settings2 />} />} radius={radiusInput} size={sizeInput} disabled={disabledInput} variant={variantInput} invalid={!validInput} errorMessage={errorMessage}>
              <Input type="text" label='Configuracion' floatingLabel />
            </InputGroup>
          </div>
        </div>
      </section>
      {/* INPUT NUMBER */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>Input Number</h2>
        <div className={styles.control_buttons}>
          <Checkbox label='Disabled' checked={disabledInputNumber} size="medium" color="secondary" onChange={(e) => setDisabledInputNumber(e.currentTarget.checked)} />
          <Checkbox label='Is Valid' checked={validInputNumber} size="medium" color="info" onChange={(e) => setValidInputNumber(e.currentTarget.checked)} />
          <select className={styles.control_size} value={sizeInputNumber} onChange={(e) => setSizeInputNumber(e.currentTarget.value as "medium" | "small" | "large" | "tiny" | undefined)}>
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <select className={styles.control_size} value={radiusInputNumber} onChange={(e) => setRadiusInputNumber(e.currentTarget.value as "medium" | "small" | "large" | "none" | "pill" | undefined)}>
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
            <InputNumber variant="outline" label='Default' typeNumber='default' helperText='Helper text' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
            <InputNumber variant="outline" label='Currency USD' typeNumber='currency-USD' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
            <InputNumber variant="outline" label='Currency EUR' typeNumber='currency-EUR' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
            <InputNumber variant="outline" label='Currency GBP' typeNumber='currency-GBP' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessage} />
            <InputNumber variant="outline" label='Porcentage' typeNumber='percentage' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
            <InputNumber variant="outline" label='Decimal' typeNumber='decimal' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
          </div>
        </div>
      </section>
      {/* SELECT */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>Select</h2>
        <div className={styles.control_buttons}>
          <Checkbox label='Disabled' checked={disabledSelect} size="medium" color="secondary" onChange={(e) => setDisabledSelect(e.currentTarget.checked)} />
          <Checkbox label='Is Valid' checked={validSelect} size="medium" color="info" onChange={(e) => setValidSelect(e.currentTarget.checked)} />
          <select className={styles.control_size} value={sizeSelect} onChange={(e) => setSizeSelect(e.currentTarget.value as "medium" | "small" | "large" | "tiny" | undefined)}>
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <select className={styles.control_size} value={radiusSelect} onChange={(e) => setRadiusSelect(e.currentTarget.value as "medium" | "small" | "large" | "none" | "pill" | undefined)}>
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
            <Select label='Outline' variant="outline" options={namesSelect} size={sizeSelect} radius={radiusSelect} disabled={disabledSelect} invalid={!validSelect} errorMessage={errorMessageSelect} />
            <Select variant="flat" options={namesSelect} size={sizeSelect} radius={radiusSelect} disabled={disabledSelect} invalid={!validSelect} errorMessage={errorMessageSelect} />
            <Select variant="underline" options={namesSelect} size={sizeSelect} radius={radiusSelect} disabled={disabledSelect} invalid={!validSelect} errorMessage={errorMessageSelect} />
          </div>
        </div>
      </section>
      {/* NOTIFICATION */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>Notification</h2>
        <div className={styles.control_buttons}>
          <select className={styles.control_size} value={notificationType} onChange={(e) => setNotificationType(e.currentTarget.value as "themed" | "solid" | "flat" | "lightened" | "darkened" | undefined)}>
            <option value="themed">Themed</option>
            <option value="solid">Solid</option>
            <option value="flat">Flat</option>
            <option value="darkened">Darkened</option>
            <option value="lightened">Lightened</option>
          </select>
          <select className={styles.control_size} value={notificationPosition} onChange={(e) => setNotificationPosition(e.currentTarget.value as "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right" | undefined)}>
            <option value="top-left">Top - Left</option>
            <option value="top-center">Top - Center</option>
            <option value="top-right">Top - Right</option>
            <option value="bottom-left">Bottom - Left</option>
            <option value="bottom-center">Bottom - Center</option>
            <option value="bottom-right">Bottom - Right</option>
          </select>
          <Checkbox label='Closable' checked={closableNotification} onChange={(e) => setClosableNotification(e.currentTarget.checked)} />
          <Checkbox label='Has Button Confirm?' checked={hasButtonsConfirmNotification} onChange={(e) => setHasButtonsConfirmNotification(e.currentTarget.checked)} />
          <Checkbox label='Has Button Cancel?' checked={hasButtonsCancelNotification} onChange={(e) => setHasButtonsCancelNotification(e.currentTarget.checked)} />
        </div>
        <div className={styles.container_buttons}>
          <div className={`${styles.buttons} ${styles.buttons_large}`}>
            <Button
              variant="solid"
              color="secondary"
              size="medium"
              radius="small"
              label='Icon'
              style={{ width: "8em" }}
              onClick={() =>
                showNotification(
                  {
                    title: "Default",
                    message: "Notification Default Color",
                    closable: closableNotification,
                    variant: notificationType,
                    notificationType: "secondary",
                    placement: notificationPosition,
                    onCancel: hasButtonsCancelNotification ? () => console.log("Se cancelo") : undefined,
                    onConfirm: hasButtonsConfirmNotification ? () => console.log("Se confirmo") : undefined,
                    icon: < RssIcon />
                  })} />
            <Button
              variant="solid"
              color="secondary"
              size="medium"
              radius="small"
              label='Image'
              style={{ width: "8em" }}
              onClick={() =>
                showNotification(
                  {
                    title: "Default",
                    message: "Notification Default Color",
                    closable: closableNotification,
                    variant: notificationType,
                    notificationType: "secondary",
                    placement: notificationPosition,
                    onCancel: hasButtonsCancelNotification ? () => console.log("Se cancelo") : undefined,
                    onConfirm: hasButtonsConfirmNotification ? () => console.log("Se confirmo") : undefined,
                    icon: <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/240px-JavaScript-logo.png' />
                  })} />
            <Button
              variant="solid"
              color="success"
              size="medium"
              radius="small"
              label='Success'
              style={{ width: "8em" }}
              onClick={() =>
                showNotification(
                  {
                    title: "Success",
                    message: "Notification Success Color",
                    closable: closableNotification,
                    variant: notificationType,
                    notificationType: "success",
                    placement: notificationPosition,
                    onCancel: hasButtonsCancelNotification ? () => console.log("Se cancelo") : undefined,
                    onConfirm: hasButtonsConfirmNotification ? () => console.log("Se confirmo") : undefined,
                  })} />
            <Button
              variant="solid"
              color="danger"
              size="medium"
              radius="small"
              label='Danger
            ' style={{ width: "8em" }}
              onClick={() =>
                showNotification(
                  {
                    title: "Danger",
                    message: "Notification Danger Color",
                    closable: closableNotification,
                    variant: notificationType,
                    notificationType: "danger",
                    placement: notificationPosition,
                    onClose: () => console.log("Cerrado Warning"),
                    onCancel: hasButtonsCancelNotification ? () => console.log("Se cancelo") : undefined,
                    onConfirm: hasButtonsConfirmNotification ? () => console.log("Se confirmo") : undefined,
                  })} />
            <Button
              variant="solid"
              color="warning"
              size="medium"
              radius="small"
              label='Warnin
            g' style={{ width: "8em" }}
              onClick={() =>
                showNotification(
                  {
                    title: "Warning",
                    message: "Notification Warning Color Para no modificar la sentencia de los demas puede que varie la movilidad",
                    closable: closableNotification,
                    variant: notificationType,
                    onCancel: hasButtonsCancelNotification ? () => console.log("Se cancelo") : undefined,
                    onConfirm: hasButtonsConfirmNotification ? () => console.log("Se confirmo") : undefined,
                    notificationType: "warning",
                    placement: notificationPosition
                  })} />
            <Button
              variant="solid"
              color="info"
              size="medium"
              radius="small"
              label='Info'
              style={{ width: "8em" }}
              onClick={() =>
                showNotification(
                  {
                    title: "Info",
                    cancelText: "Cancelar",
                    confirmText: "Aceptar",
                    message: "Notification Info Color",
                    closable: closableNotification,
                    variant: notificationType,
                    notificationType: "info",
                    placement: notificationPosition,
                    onCancel: hasButtonsCancelNotification ? () => console.log("Se cancelo") : undefined,
                    onConfirm: hasButtonsConfirmNotification ? () => console.log("Se confirmo") : undefined,
                  })} />
          </div>
        </div>
      </section>
      {/* CARD */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>Card</h2>
        <div className={styles.control_buttons}>
          <select className={styles.control_size} value={variantCard} onChange={(e) => setVariantCard(e.currentTarget.value as "borderless" | "outline" | undefined)}>
            <option value="borderless">Borderless</option>
            <option value="outline">Outline</option>
          </select>
          <select className={styles.control_size} value={radiusCard} onChange={(e) => setRadiusCard(e.currentTarget.value as "none" | "small" | "medium" | "large" | undefined)}>
            <option value="none">None</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <select className={styles.control_size} value={sizeCard} onChange={(e) => setSizeCard(e.currentTarget.value as "small" | "medium" | "large" | undefined)}>
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
              actions={[{
                text: "See more",
                icon: <CircleEllipsis />,
                onClick: () => console.log("See more"),
              },
              {
                text: "Save",
                icon: <Bookmark />,
                onClick: () => console.log("Save"),
              }, {
                text: "Follow",
                icon: <RssIcon />,
                onClick: () => console.log("Follow"),
              }]}
            >
              <div>
                React Hooks revolutionized the way we write components. useState and useEffect are fundamental, but there are more hooks like useContext, useReducer, and useCallback that can significantly improve your code.
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
                React Hooks revolutionized the way we write components. useState and useEffect are fundamental, but there are more hooks like useContext, useReducer, and useCallback that can significantly improve your code.
              </div>
            </Card>
          </div>
        </div>
      </section>
      {/* TEXT AREA */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>Text Area</h2>
        <div className={styles.control_buttons}>
          <Select
            label='Variant'
            value={variantTextArea}
            className={styles.select_size}
            size="small"
            onChange={(value) => setVariantTextArea(value as "borderless" | "outline" | undefined)}
            options={[{ label: "Borderless", value: "borderless" }, { label: "Outline", value: "outline" }]} />
          <Select
            label='Radius'
            value={radiusTextArea}
            className={styles.select_size}
            size="small"
            onChange={(value) => setRadiusTextArea(value as "none" | "small" | "medium" | "large" | undefined)}
            options={[{ label: "None", value: "none" }, { label: "Small", value: "small" }, { label: "Medium", value: "medium" }, { label: "Large", value: "large" }]} />
          <Select
            label='Size'
            value={sizeTextArea}
            className={styles.select_size}
            size="small"
            onChange={(value) => setSizeTextArea(value as "small" | "medium" | "large" | "tiny" | undefined)}
            options={[{ label: "Tiny", value: "tiny" }, { label: "Small", value: "small" }, { label: "Medium", value: "medium" }, { label: "Large", value: "large" }]} />
          <Checkbox label='Disabled' checked={disabledTextArea} size="small" color="secondary" onChange={(e) => setDisabledTextArea(e.currentTarget.checked)} />
          <Checkbox label='Invalid' checked={invalidTextArea} size="small" color="info" onChange={(e) => setInvalidTextArea(e.currentTarget.checked)} />
          <Input label='Message Error' size="small" value={errorMessageTextArea} onChange={(value) => setErrorMessageTextArea(value)} />
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
              cols={30} />
          </div>
        </div>
      </section>
      {/* FILE UPLOAD */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>File Upload</h2>
        <div className={styles.control_buttons}>
          <Select
            label='Type'
            value={typeFileUpload}
            className={styles.select_size}
            size="small"
            onChange={(value) => setTypeFileUpload(value as "button" | "dropzone" | undefined)}
            options={[{ label: "Button", value: "button" }, { label: "Dropzone", value: "dropzone" }]} />
          <Select
            label='Radius'
            value={radiusFileUpload}
            className={styles.select_size}
            size="small"
            onChange={(value) => setRadiusFileUpload(value as "none" | "small" | "medium" | "large" | undefined)}
            options={[{ label: "None", value: "none" }, { label: "Small", value: "small" }, { label: "Medium", value: "medium" }, { label: "Large", value: "large" }]} />
          <Select
            label='Size'
            value={sizeFileUpload}
            className={styles.select_size}
            size="small"
            onChange={(value) => setSizeFileUpload(value as "small" | "medium" | "large" | undefined)}
            options={[{ label: "Small", value: "small" }, { label: "Medium", value: "medium" }, { label: "Large", value: "large" }]} />
          <Checkbox label='Multiple Files?' checked={multiFileUpload} size="small" color="info" onChange={(e) => setMultiFileUpload(e.currentTarget.checked)} />
          <Checkbox label='Disabled' checked={disabledFileUpload} size="small" color="secondary" onChange={(e) => setDisabledFileUpload(e.currentTarget.checked)} />
          <Checkbox label='Invalid' checked={invalidFileUpload} size="small" color="info" onChange={(e) => setInvalidFileUpload(e.currentTarget.checked)} />
          <Checkbox label='View File Size?' checked={viewFileSize} size="small" color="info" onChange={(e) => setViewFileSize(e.currentTarget.checked)} />
          <Input label='Message Error' size="small" value={errorMessageFileUpload} onChange={(value) => setErrorMessageFileUpload(value)} />
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
              placeholder='Drag and drop your files here'
              required
              maxSize={60000}
              viewFileSize={viewFileSize}
              onFilesRejected={(files) => console.log("Files Rejected", files)}
              size={sizeFileUpload}
              accept=".docx, .doc, .pdf, .jpg, .png, .webp"
              multiple={multiFileUpload} />
          </div>
        </div>
      </section>
      {/* PAGINATION */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>Pagination</h2>
        <div className={styles.control_buttons}>
          <Select
            label='Variant'
            value={variantPagination}
            className={styles.select_size}
            size="small"
            onChange={(value) => setVariantPagination(value as "outline" | "flat" | "solid" | undefined)}
            options={[{ label: "Solid", value: "solid" }, { label: "Outline", value: "outline" }, { label: "Flat", value: "flat" }]} />
          <Select
            label='Radius'
            value={radiusPagination}
            className={styles.select_size}
            size="small"
            onChange={(value) => setRadiusPagination(value as "none" | "small" | "medium" | "large" | "pill" | undefined)}
            options={[{ label: "None", value: "none" }, { label: "Small", value: "small" }, { label: "Medium", value: "medium" }, { label: "Large", value: "large" }, { label: "Pill", value: "pill" }]} />
          <Select
            label='Size'
            value={sizePagination}
            className={styles.select_size}
            size="small"
            onChange={(value) => setSizePagination(value as "small" | "medium" | "large" | "tiny" | undefined)}
            options={[{ label: "Tiny", value: "tiny" }, { label: "Small", value: "small" }, { label: "Medium", value: "medium" }, { label: "Large", value: "large" }]} />
          <div style={{ display: "flex", gap: "1em", maxWidth: "10em" }}>
            <InputNumber value={maxVisiblePages} onChange={(value) => setMaxVisiblePages(value)} size="small" />
            <InputNumber value={totalPages} onChange={(value) => setTotalPages(value || 0)} size="small" />
          </div>
          <Checkbox label='Disabled' checked={disabledPagination} size="small" color="secondary" onChange={(e) => setDisabledPagination(e.currentTarget.checked)} />
          <Checkbox label='Show PrevNextButtons' checked={showPrevNextButtons} size="small" color="info" onChange={(e) => setShowPrevNextButtons(e.currentTarget.checked)} />
          <Checkbox label='Show FirstLastButtons' checked={showFirstLastButtons} size="small" color="info" onChange={(e) => setShowFirstLastButtons(e.currentTarget.checked)} />
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
              disabled={disabledPagination} />
          </div>
        </div>
      </section>
      {/* RANGE */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>Range</h2>
        <div className={styles.control_buttons}>
          <Select
            className={styles.select_size}
            label='Size'
            value={sizeRange}
            size="small"
            onChange={(value) => setSizeRange(value as "small" | "medium" | "large" | undefined)}
            options={[{ label: "Small", value: "small" }, { label: "Medium", value: "medium" }, { label: "Large", value: "large" }]} />
          <div style={{ display: "flex", gap: "1em", maxWidth: "10em" }}>
            <InputNumber value={minRange} onChange={(value) => setMinRange(value || 0)} size="small" />
            <InputNumber value={maxRange} onChange={(value) => setMaxRange(value || 0)} size="small" />
          </div>
          <Checkbox label='Disabled' checked={disabledRange} size="small" color="secondary" onChange={(e) => setDisabledRange(e.currentTarget.checked)} />
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
              onInput={(e) => setValueRange(e)}
              onChange={(e) => setValueRange(e)} />
          </div>
        </div>
      </section>
      {/* TOOTTIP */}
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>ToolTip</h2>
        <div className={styles.control_buttons}>
          <Select
            className={styles.select_size}
            label='Color'
            value={colorToolTip}
            size="small"
            onChange={(value) => setColorToolTip(value as "primary" | "secondary" | "danger" | "success" | "warning" | "info" | undefined)}
            options={[
              { label: "Dafaulr", value: "default" },
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" },
            ]} />
          <Select
            label='Size'
            className={styles.select_size}
            value={sizeToolTip}
            size="small"
            onChange={(value) => setSizeToolTip(value as "small" | "medium" | "large" | undefined)}
            options={[{ label: "Small", value: "small" }, { label: "Medium", value: "medium" }, { label: "Large", value: "large" }]} />
          <div style={{ display: "flex", gap: "1em", maxWidth: "10em" }}>
            <InputNumber value={minRange} onChange={(value) => setMinRange(value || 0)} size="small" />
            <InputNumber value={maxRange} onChange={(value) => setMaxRange(value || 0)} size="small" />
          </div>
          <Checkbox label='Disabled' checked={disabledRange} size="small" color="secondary" onChange={(e) => setDisabledRange(e.currentTarget.checked)} />
        </div>
        <div className={styles.container_buttons}>
          <div className={`${styles.buttons} ${styles.buttons_large}`}>
            <Tooltip
              content="ToolTip">
              <span>HOLA</span>
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