
import { Button, Checkbox, Input, InputGroup } from '../src/main'
import { AlertCircle, CheckCircle, Coins, HelpCircle, Menu, Search, SearchIcon, Send, Settings, Settings2, Trash, User } from "lucide-react"
import styles from "./styles.module.css"
import { JSX, useState } from 'react'

interface IButton {
  color: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | null | undefined
  label: string | undefined
  icon: JSX.Element | undefined
}

const buttonsPrimary: IButton[] = [
  { color: 'primary', label: 'Primary', icon: <Send /> },
  { color: 'secondary', label: 'Secondary', icon: <Menu /> },
  { color: 'success', label: 'Success', icon: <CheckCircle /> },
  { color: 'danger', label: 'Danger', icon: <Trash /> },
  { color: 'warning', label: 'Warning', icon: <AlertCircle /> },
  { color: 'info', label: 'Info', icon: <HelpCircle /> }
]

function App() {
  const [disabled, setDisabled] = useState(false)
  const [disabledButtons, setDisabledButtons] = useState(false)
  const [loadingButtons, setLoadingButtons] = useState(false)

  return (
    <section>
      UI Components
      <div className={styles.control_buttons}>
        <Checkbox label='Disabled' checked={disabledButtons} size="medium" color="secondary" onChange={(e) => setDisabledButtons(e.currentTarget.checked)} />
        <Checkbox label='Loading' checked={loadingButtons} size="medium" color="info" onChange={(e) => setLoadingButtons(e.currentTarget.checked)} />
      </div>
      <div className={styles.container_buttons}>
        <div className={styles.buttons}>
          {buttonsPrimary.map((button) => (
            <Button key={button.color}
              className={styles.button}
              size="medium"
              radius={'small'}
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
              size="medium"
              radius={'small'}
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
              size="medium"
              radius={'small'}
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
              size="medium"
              radius={'small'}
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
              size="medium"
              radius={'small'}
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
              size="medium"
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
      <div className={styles.container_buttons}>
        <div className={styles.buttons}>
          <Checkbox size="medium" label='Primary' onChange={(e) => setDisabled(e.currentTarget.checked)} />
          <Checkbox size="medium" color="secondary" label='Secondary' />
          <Checkbox size="medium" color="success" label='Success' />
          <Checkbox size="medium" color="danger" label='Danger' />
          <Checkbox size="medium" color="warning" label='Warning' />
          <Checkbox size="medium" color="info" label='Info' />
        </div>
        <div className={styles.buttons}>
          <Checkbox size="medium" variant="flat" label='Primary' />
          <Checkbox size="medium" variant="flat" color="secondary" label='Secondary' />
          <Checkbox size="medium" variant="flat" color="success" label='Success' />
          <Checkbox size="medium" variant="flat" color="danger" label='Danger' />
          <Checkbox size="medium" variant="flat" color="warning" label='Warning' />
          <Checkbox size="medium" variant="flat" color="info" label='Info' />
        </div>
      </div>
      <div className={styles.container_buttons}>
        <div className={styles.buttons}>
          <Input type="text" label='Nombre' floatingLabel={false} error errorMessage='Ingrese Nombre de 3 letras' disabled size="medium" isRequired />
          <Input type="email" label='E-mail' disabled placeholder='Correo electronico' />
          <Input type="password" label='Password' disabled={disabled} placeholder='Contraseña' />
          <Input type="search" label='Busqueda' disabled={disabled} />
        </div>
        <div className={styles.buttons}>
          <InputGroup prefixElement={<Coins />} suffixElement={<User />} variant="underline" size="medium" disabled={disabled}>
            <Input type="text" label='Ingrese' floatingLabel />
          </InputGroup>
          <InputGroup prefixElement={<span>https://</span>} suffixElement={<span>.com</span>} variant="underline" size="medium" disabled>
            <Input type="text" label='URL de imagen' floatingLabel />
          </InputGroup>
          <InputGroup prefixElement={<User />} variant="underline" size="medium" radius="medium">
            <Input type="text" label='Ingrese' floatingLabel />
          </InputGroup>
          <InputGroup suffixElement={<Settings />} variant="underline" size={'medium'} radius="medium">
            <Input type="text" label='Configuracion' floatingLabel helperText='Requerido *' />
          </InputGroup>
        </div>
        <div className={styles.buttons}>
          <InputGroup prefixElement={<SearchIcon />} suffixElement={<Button label='Search' variant="solid" color="primary" />} variant="underline" size="medium" radius="large">
            <Input type="search" />
          </InputGroup>
          <InputGroup suffixElement={<Button label='Buscar' variant="ghost" color="primary" />} size="medium" radius="pill">
            <Input type="text" label='Configuracion' floatingLabel />
          </InputGroup>
          <InputGroup suffixElement={<Button icon={<Search />} variant="solid" color="secondary" style={{ backgroundColor: "#0aa9c1", width: "4em" }} />} size="medium" radius="medium">
            <Input type="text" label='Configuracion' floatingLabel />
          </InputGroup>
          <InputGroup prefixElement={<Button variant="ghost" color="secondary" icon={<Settings2 />} />} size="medium" radius="medium">
            <Input type="text" label='Configuracion' floatingLabel />
          </InputGroup>
        </div>
      </div>
    </section>
  )
}

export default App
