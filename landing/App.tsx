
import { Button, Checkbox, Input, InputGroup, InputNumber, Radio, RadioGroup, Switch } from '../src/main'
import { Coins, Search, SearchIcon, Settings, Settings2, User } from "lucide-react"
import styles from "./styles.module.css"
import { useState } from 'react'
import { ButtonThemeController } from '../src/ThemeProvider/ThemeProvider'
import { buttonsPrimary } from './constants'



function App() {
  const [loadingButtons, setLoadingButtons] = useState(false)
  const [disabledButtons, setDisabledButtons] = useState(false)
  const [radiusButtons, setRadiusButtons] = useState<"medium" | "small" | "large" | "none" | "pill" | "circle" | undefined>("medium")
  const [sizeButtons, setSizeButtons] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium")
  const [sizeCheckbox, setSizeCheckbox] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium")
  const [disabledCheckbox, setDisabledCheckbox] = useState(false)
  const [radiusCheckbox, setRadiusCheckbox] = useState<"medium" | "small" | "none" | "circle" | undefined>("medium")
  const [sizeSwitch, setSizeSwitch] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium")
  const [disabledSwitch, setDisabledSwitch] = useState(false)
  const [shapeSwitch, setShapeSwitch] = useState<"square" | "soft" | "rounded" | undefined>("rounded")
  const [sizeInput, setSizeInput] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium")
  const [disabledInput, setDisabledInput] = useState(false)
  const [radiusInput, setRadiusInput] = useState<"medium" | "small" | "large" | "none" | "pill" | undefined>("medium")
  const [variantInput, setVariantInput] = useState<"outline" | "flat" | "underline" | undefined>("outline")
  const [validInput, setValidInput] = useState(true)
  const [errorMessage, setErrorMessage] = useState("This field has an error.")
  const [sizeInputNumber, setSizeInputNumber] = useState<"medium" | "small" | "large" | "tiny" | undefined>("medium")
  const [disabledInputNumber, setDisabledInputNumber] = useState(false)
  const [radiusInputNumber, setRadiusInputNumber] = useState<"medium" | "small" | "large" | "none" | "pill" | undefined>("medium")
  const [validInputNumber, setValidInputNumber] = useState(true)
  const [errorMessageNumber, setErrorMessageNumber] = useState("This field has an error.")
  const [sizeRadio, setSizeRadio] = useState<"medium" | "small" | "large" | undefined>("medium")
  const [disabledRadio, setDisabledRadio] = useState(false)
  const [valueRadioBordered, setValueRadioBordered] = useState("")

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
              <Switch variant="solid" color="primary" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="solid" color="secondary" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="solid" color="success" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
              <Switch variant="solid" color="danger" size={sizeSwitch} disabled={disabledSwitch} shape={shapeSwitch} />
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
              <RadioGroup defaultValue='second' selectedOption={valueRadioBordered} gap='0.35em' size={sizeRadio} variant='bordered' onChange={(e) => setValueRadioBordered(e)}>
                <Radio color='primary' type='radio' value="first" label="First" />
                <Radio color='secondary' type='radio' value="third" label="Third" />
                <Radio color='danger' type='radio' value="second" label="Second" />
                <Radio color='success' type='radio' value="fourth" label="Fourth" />
                <Radio color='warning' type='radio' value="fifth" label="Fifth" />
                <Radio color='info' type='radio' value="sixth" label="Sixth" />
              </RadioGroup>
            </div>
            <div className={styles.buttons}>
              <RadioGroup defaultValue='second' selectedOption={valueRadioBordered} gap='0.35em' size={sizeRadio} variant='flat' onChange={(e) => setValueRadioBordered(e)}>
                <Radio color='primary' type='radio' value="first" label="First" />
                <Radio color='secondary' type='radio' value="third" label="Third" />
                <Radio color='danger' type='radio' value="second" label="Second" />
                <Radio color='success' type='radio' value="fourth" label="Fourth" />
                <Radio color='warning' type='radio' value="fifth" label="Fifth" />
                <Radio color='info' type='radio' value="sixth" label="Sixth" />
              </RadioGroup>
            </div>
            <div className={styles.buttons}>
              <RadioGroup defaultValue='second' selectedOption={valueRadioBordered} gap='0.35em' size={sizeRadio} variant='outline' onChange={(e) => setValueRadioBordered(e)} radius='medium' name='outline' orientation='vertical'>
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
      </section>
    </section>
  )
}

export default App
