
import { Button, Checkbox, Input, InputGroup, InputNumber, Radio, RadioGroup, Select, Switch } from '../src/main'
import { Coins, RssIcon, Search, SearchIcon, Settings, Settings2, User } from "lucide-react"
import styles from "./styles.module.css"
import { useState } from 'react'
import { ButtonThemeController } from '../src/ThemeProvider/ThemeProvider'
import { buttonsPrimary } from './constants'
import { useNotification } from '../src/Notification/NotificationProvider'



function App() {
  const [loadingButtons, setLoadingButtons] = useState(false)
  const [disabledButtons, setDisabledButtons] = useState(false)
  const [radiusButtons, setRadiusButtons] = useState<"medium" | "small" | "large" | "none" | "pill" | "circle" | undefined>("small")
  const [sizeButtons, setSizeButtons] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium")
  const [sizeCheckbox, setSizeCheckbox] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium")
  const [disabledCheckbox, setDisabledCheckbox] = useState(false)
  const [radiusCheckbox, setRadiusCheckbox] = useState<"medium" | "small" | "none" | "circle" | undefined>("small")
  const [sizeSwitch, setSizeSwitch] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium")
  const [disabledSwitch, setDisabledSwitch] = useState(false)
  const [shapeSwitch, setShapeSwitch] = useState<"square" | "soft" | "rounded" | undefined>("rounded")
  const [sizeInput, setSizeInput] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium")
  const [disabledInput, setDisabledInput] = useState(false)
  const [radiusInput, setRadiusInput] = useState<"medium" | "small" | "large" | "none" | "pill" | undefined>("small")
  const [variantInput, setVariantInput] = useState<"outline" | "flat" | "underline" | undefined>("outline")
  const [validInput, setValidInput] = useState(true)
  const [errorMessage, setErrorMessage] = useState("This field has an error.")
  const [sizeInputNumber, setSizeInputNumber] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium")
  const [disabledInputNumber, setDisabledInputNumber] = useState(false)
  const [radiusInputNumber, setRadiusInputNumber] = useState<"medium" | "small" | "large" | "none" | "pill" | undefined>("small")
  const [validInputNumber, setValidInputNumber] = useState(true)
  const [errorMessageNumber, setErrorMessageNumber] = useState("This field has an error.")
  const [sizeRadio, setSizeRadio] = useState<"medium" | "small" | "large" | undefined>("medium")
  const [disabledRadio, setDisabledRadio] = useState(false)
  const [valueRadioBordered, setValueRadioBordered] = useState("")
  const [sizeSelect, setSizeSelect] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium")
  const [disabledSelect, setDisabledSelect] = useState(false)
  const [radiusSelect, setRadiusSelect] = useState<"medium" | "small" | "large" | "none" | "pill" | undefined>("small")
  const [validSelect, setValidSelect] = useState(true)
  const [errorMessageSelect, setErrorMessageSelect] = useState("This field has an error.")
  const [notificationType, setNotificationType] = useState<"themed" | "solid" | "darkened" | "lightened" | "flat" | undefined>("themed")
  const [notificationPosition, setNotificationPosition] = useState<"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right" | undefined>("top-center")
  const [closableNotification, setClosableNotification] = useState(false)
  const { showNotification } = useNotification()

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h1 className={styles.title}>Lambda UI Components</h1>
        <ButtonThemeController />
      </header>
      <section className={styles.subsection}>
        <h2 className={styles.subtitle}>Buttons</h2>
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
          <div className={styles.buttons}>
            {buttonsPrimary.map((button) => (
              <Button key={button.color}
                className={styles.button}
                size={sizeButtons}
                radius={radiusButtons}
                variant="classic"
                color={button.color}
                label={button.label}
                disabled={disabledButtons}
                loading={loadingButtons}
                loadingText="Loading"
                iconPosition="left"
                icon={button.icon} />
            ))}
          </div>
          <div className={styles.buttons}>
            {buttonsPrimary.map((button) => (
              <Button key={button.color}
                className={styles.button}
                size={sizeButtons}
                radius={radiusButtons}
                variant="solid"
                disabled={disabledButtons}
                loading={loadingButtons}
                loadingText="Loading"
                color={button.color}
                label={button.label}
                iconPosition="left"
                icon={button.icon} />
            ))}
          </div>
          <div className={styles.buttons}>
            {buttonsPrimary.map((button) => (
              <Button key={button.color}
                className={styles.button}
                size={sizeButtons}
                radius={radiusButtons}
                variant="outline"
                color={button.color}
                disabled={disabledButtons}
                loading={loadingButtons}
                loadingText="Loading"
                label={button.label}
                iconPosition="left"
                icon={button.icon} />
            ))}
          </div>
          <div className={styles.buttons}>
            {buttonsPrimary.map((button) => (
              <Button key={button.color}
                className={styles.button}
                size={sizeButtons}
                radius={radiusButtons}
                variant="dashed"
                color={button.color}
                disabled={disabledButtons}
                loading={loadingButtons}
                loadingText="Loading"
                label={button.label}
                iconPosition="left"
                icon={button.icon} />
            ))}
          </div>
          <div className={styles.buttons}>
            {buttonsPrimary.map((button) => (
              <Button key={button.color}
                className={styles.button}
                size={sizeButtons}
                radius={radiusButtons}
                variant="ghost"
                disabled={disabledButtons}
                loading={loadingButtons}
                loadingText="Loading"
                color={button.color}
                label={button.label}
                iconPosition="left"
                icon={button.icon} />
            ))}
          </div>
          <div className={styles.buttons}>
            {buttonsPrimary.map((button) => (
              <Button key={button.color}
                className={styles.button}
                size={sizeButtons}
                radius={'small'}
                variant="text"
                color={button.color}
                disabled={disabledButtons}
                loading={loadingButtons}
                loadingText="Loading"
                label={button.label}
                iconPosition="left"
                icon={button.icon} />
            ))}
          </div>
        </div>
      </section>
      <div className={styles.section_container}>
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
          </div>
          <div className={styles.container_buttons}>
            <div className={styles.buttons}>
              <Checkbox size={sizeCheckbox} label='Primary' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} color="secondary" label='Secondary' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} color="success" label='Success' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} color="danger" label='Danger' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} color="warning" label='Warning' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} color="info" label='Info' disabled={disabledCheckbox} radius={radiusCheckbox} />
            </div>
            <div className={styles.buttons}>
              <Checkbox size={sizeCheckbox} variant="flat" label='Primary' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} variant="flat" color="secondary" label='Secondary' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} variant="flat" color="success" label='Success' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} variant="flat" color="danger" label='Danger' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} variant="flat" color="warning" label='Warning' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} variant="flat" color="info" label='Info' disabled={disabledCheckbox} radius={radiusCheckbox} />
            </div>
            <div className={styles.buttons}>
              <Checkbox size={sizeCheckbox} variant="outline" label='Primary' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} variant="outline" color="secondary" label='Secondary' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} variant="outline" color="success" label='Success' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} variant="outline" color="danger" label='Danger' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} variant="outline" color="warning" label='Warning' disabled={disabledCheckbox} radius={radiusCheckbox} />
              <Checkbox size={sizeCheckbox} variant="outline" color="info" label='Info' disabled={disabledCheckbox} radius={radiusCheckbox} />
            </div>
          </div>
        </section>
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
          </div>
          <div className={styles.container_buttons}>
            <div className={styles.buttons}>
              <Switch variant="solid" color="primary" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} label='Primary' />
              <Switch variant="solid" color="secondary" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} label='Secondary' />
              <Switch variant="solid" color="success" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} label='Success' />
              <Switch variant="solid" color="danger" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} label='Danger' />
              <Switch variant="solid" color="warning" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="solid" color="info" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
            </div>
            <div className={styles.buttons}>
              <Switch variant="flat" color="primary" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="flat" color="secondary" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="flat" color="success" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="flat" color="danger" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="flat" color="warning" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="flat" color="info" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
            </div>
            <div className={styles.buttons}>
              <Switch variant="outline" color="primary" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="outline" color="secondary" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="outline" color="success" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="outline" color="danger" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="outline" color="warning" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="outline" color="info" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
            </div>
          </div>
        </section>
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
          </div>
          <div className={styles.container_buttons}>
            <div className={styles.buttons}>
              <RadioGroup defaultValue='second' selectedOption={valueRadioBordered} disabled={disabledRadio} gap='0.35em' size={sizeRadio} variant='bordered' onChange={(e) => setValueRadioBordered(e)}>
                <Radio color='primary' type='radio' value="first" label="First" />
                <Radio color='secondary' type='radio' value="third" label="Third" />
                <Radio color='danger' type='radio' value="second" label="Second" />
                <Radio color='success' type='radio' value="fourth" label="Fourth" />
                <Radio color='warning' type='radio' value="fifth" label="Fifth" />
                <Radio color='info' type='radio' value="sixth" label="Sixth" />
              </RadioGroup>
            </div>
            <div className={styles.buttons}>
              <RadioGroup defaultValue='second' selectedOption={valueRadioBordered} disabled={disabledRadio} gap='0.35em' size={sizeRadio} variant='flat' onChange={(e) => setValueRadioBordered(e)}>
                <Radio color='primary' type='radio' value="first" label="First" />
                <Radio color='secondary' type='radio' value="third" label="Third" />
                <Radio color='danger' type='radio' value="second" label="Second" />
                <Radio color='success' type='radio' value="fourth" label="Fourth" />
                <Radio color='warning' type='radio' value="fifth" label="Fifth" />
                <Radio color='info' type='radio' value="sixth" label="Sixth" />
              </RadioGroup>
            </div>
            <div className={styles.buttons}>
              <RadioGroup defaultValue='second' selectedOption={valueRadioBordered} disabled={disabledRadio} gap='0.35em' size={sizeRadio} variant='outline' onChange={(e) => setValueRadioBordered(e)} radius='medium' name='outline' orientation='vertical'>
                <Radio color='primary' value="first" label="First" />
                <Radio color='secondary' value="third" label="Third" />
                <Radio color='danger' value="second" label="Second" />
                <Radio color='success' value="fourth" label="Fourth" />
                <Radio color='warning' value="fifth" label="Fifth" />
                <Radio color='info' value="sixth" label="Sixth" />
              </RadioGroup>
            </div>
          </div>
        </section>
      </div>
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
          <Input value={errorMessage} onChange={(e) => setErrorMessage(e.currentTarget.value)} />
        </div>
        <div className={styles.container_buttons}>
          <div className={styles.buttons}>
            <Input type="text" label='Nombre' floatingLabel={false} errorMessage='Ingrese Nombre de 3 letras' variant={variantInput} radius={radiusInput} disabled={disabledInput} size={sizeInput} isRequired error={!validInput} />
            <Input type="email" label='E-mail' disabled={disabledInput} placeholder='Correo electronico' variant={variantInput} radius={radiusInput} size={sizeInput} error={!validInput} errorMessage={errorMessage} />
            <Input type="password" label='Password' disabled={disabledInput} placeholder='Contraseña' variant={variantInput} radius={radiusInput} size={sizeInput} error={!validInput} errorMessage={errorMessage} />
            <Input type="search" label='Busqueda' disabled={disabledInput} size={sizeInput} variant={variantInput} radius={radiusInput} error={!validInput} errorMessage={errorMessage} />
          </div>
          <div className={styles.buttons}>
            <InputGroup prefixElement={<Coins />} suffixElement={<User />} variant={variantInput} radius={radiusInput} size={sizeInput} disabled={disabledInput} error={!validInput}>
              <Input type="text" label='Ingrese' errorMessage={errorMessage} />
            </InputGroup>
            <InputGroup prefixElement={<span>https://</span>} suffixElement={<span>.com</span>} radius={radiusInput} variant={variantInput} size={sizeInput} disabled={disabledInput} error={!validInput}>
              <Input type="text" label='URL de imagen' errorMessage={errorMessage} />
            </InputGroup>
            <InputGroup prefixElement={<User />} variant={variantInput} size={sizeInput} radius={radiusInput} disabled={disabledInput} error={!validInput}>
              <Input type="text" label='Ingrese' errorMessage={errorMessage} />
            </InputGroup>
            <InputGroup suffixElement={<Settings />} variant={variantInput} size={sizeInput} radius={radiusInput} disabled={disabledInput} error={!validInput}>
              <Input type="text" label='Configuracion' helperText='Requerido *' errorMessage={errorMessage} />
            </InputGroup>
          </div>
          <div className={styles.buttons}>
            <InputGroup prefixElement={<SearchIcon />} suffixElement={<Button label='Search' variant="solid" color="primary" />} variant={variantInput} size={sizeInput} radius={radiusInput} disabled={disabledInput} error={!validInput}>
              <Input type="search" errorMessage={errorMessage} />
            </InputGroup>
            <InputGroup suffixElement={<Button label='Buscar' variant="ghost" color="primary" />} variant={variantInput} size={sizeInput} radius={radiusInput} disabled={disabledInput} error={!validInput}>
              <Input type="text" label='Configuracion' floatingLabel errorMessage={errorMessage} />
            </InputGroup>
            <InputGroup suffixElement={<Button icon={<Search />} variant="solid" color="info" style={{ width: "4em", backgroundColor: "#ffe11e", color: "#000000" }} />} variant={variantInput} size={sizeInput} radius={radiusInput} disabled={disabledInput} error={!validInput}>
              <Input type="text" label='Configuracion' floatingLabel errorMessage={errorMessage} />
            </InputGroup>
            <InputGroup prefixElement={<Button variant="ghost" color="secondary" icon={<Settings2 />} />} radius={radiusInput} size={sizeInput} disabled={disabledInput} variant={variantInput} error={!validInput}>
              <Input type="text" label='Configuracion' floatingLabel errorMessage={errorMessage} />
            </InputGroup>
          </div>
        </div>
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
            <Input value={errorMessageNumber} onChange={(e) => setErrorMessageNumber(e.currentTarget.value)} />
          </div>
          <div className={styles.container_buttons}>
            <div className={styles.buttons}>
              <InputNumber variant="outline" label='Default' typeNumber='default' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
              <InputNumber variant="outline" label='Currency USD' typeNumber='currency-USD' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
              <InputNumber variant="outline" label='Currency EUR' typeNumber='currency-EUR' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
              <InputNumber variant="outline" label='Currency GBP' typeNumber='currency-GBP' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} />
              <InputNumber variant="outline" label='Porcentage' typeNumber='percentage' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
              <InputNumber variant="outline" label='Decimal' typeNumber='decimal' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
            </div>
            <div className={styles.buttons}>
              <InputNumber variant="flat" label='Default' typeNumber='default' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
              <InputNumber variant="flat" label='Currency USD' typeNumber='currency-USD' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
              <InputNumber variant="flat" label='Currency EUR' typeNumber='currency-EUR' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
              <InputNumber variant="flat" label='Currency GBP' typeNumber='currency-GBP' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
              <InputNumber variant="flat" label='Porcentage' typeNumber='percentage' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
              <InputNumber variant="flat" label='Decimal' typeNumber='decimal' radius={radiusInputNumber} size={sizeInputNumber} disabled={disabledInputNumber} invalid={!validInputNumber} errorMessage={errorMessageNumber} />
            </div>
          </div>
        </section>
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
            <Input value={errorMessageSelect} onChange={(e) => setErrorMessageSelect(e.currentTarget.value)} />
          </div>
          <div className={styles.container_buttons}>
            <div className={styles.buttons}>
              <Select label='Outline' variant="outline" options={[{ label: "TypeScript", value: "typescript" }]} size={sizeSelect} radius={radiusSelect} disabled={disabledSelect} invalid={!validSelect} errorMessage={errorMessageSelect} />
            </div>
            <div className={styles.buttons}>
              <Select variant="flat" options={[{ label: "TypeScript", value: "typescript" }]} size={sizeSelect} radius={radiusSelect} disabled={disabledSelect} invalid={!validSelect} errorMessage={errorMessageSelect} />
            </div>
            <div className={styles.buttons}>
              <Select variant="underline" options={[{ label: "TypeScript", value: "typescript" }]} size={sizeSelect} radius={radiusSelect} disabled={disabledSelect} invalid={!validSelect} errorMessage={errorMessageSelect} />
            </div>
          </div>
        </section>
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
          </div>
          <div className={styles.container_buttons}>
            <div className={styles.buttons}>
              <Button variant="classic" color="secondary" size="medium" radius="small" label='Icon' style={{ width: "8em" }} onClick={() => showNotification({ title: "Default", message: "Notification Default Color", closable: closableNotification, variant: notificationType, notificationType: "secondary", placement: notificationPosition, onCancel: () => console.log("Se cancelo"), onConfirm: () => console.log("Se confirmo"), icon: < RssIcon /> })} />
            </div>
            <div className={styles.buttons}>
              <Button variant="classic" color="secondary" size="medium" radius="small" label='Image' style={{ width: "8em" }} onClick={() => showNotification({ title: "Default", message: "Notification Default Color", closable: closableNotification, variant: notificationType, notificationType: "secondary", placement: notificationPosition, onCancel: () => console.log("Se cancelo"), onConfirm: () => console.log("Se confirmo"), icon: <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/240px-JavaScript-logo.png' /> })} />
            </div>
            <div className={styles.buttons}>
              <Button variant="classic" color="success" size="medium" radius="small" label='Success' style={{ width: "8em" }} onClick={() => showNotification({ title: "Success", message: "Notification Success Color", closable: closableNotification, variant: notificationType, notificationType: "success", placement: notificationPosition, onCancel: () => console.log("Se cancelo"), onConfirm: () => console.log("Se confirmo") })} />
            </div>
            <div className={styles.buttons}>
              <Button variant="classic" color="danger" size="medium" radius="small" label='Danger' style={{ width: "8em" }} onClick={() => showNotification({ title: "Danger", message: "Notification Danger Color", closable: closableNotification, variant: notificationType, notificationType: "danger", placement: notificationPosition, onClose: () => console.log("Cerrado Warning"), onCancel: () => console.log("Se cancelo"), onConfirm: () => console.log("Se confirmo") })} />
            </div>
            <div className={styles.buttons}>
              <Button variant="classic" color="warning" size="medium" radius="small" label='Warning' style={{ width: "8em" }} onClick={() => showNotification({ title: "Warning", message: "Notification Warning Color Para no modificar la sentencia de los demas puede que varie la movilidad", closable: closableNotification, variant: notificationType, onConfirm: () => console.log("Se confirmo"), notificationType: "warning", placement: notificationPosition })} />
            </div>
            <div className={styles.buttons}>
              <Button variant="classic" color="info" size="medium" radius="small" label='Info' style={{ width: "8em" }} onClick={() => showNotification({ title: "Info", cancelText: "Cancelar", confirmText: "Aceptar", message: "Notification Info Color", closable: closableNotification, variant: notificationType, notificationType: "info", placement: notificationPosition, onCancel: () => console.log("Se cancelo"), onConfirm: () => console.log("Se confirmo") })} />
            </div>
          </div>
        </section>
      </section>
    </section>
  )
}

export default App
