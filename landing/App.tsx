
import { Button, Checkbox } from '../src/main'
import { AlertCircle, CheckCircle, HelpCircle, Menu, Send, Trash } from "lucide-react"
import styles from "./styles.module.css"
import { JSX } from 'react'

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

  return (
    <section>
      UI Components
      <div className={styles.container_buttons}>
        <div className={styles.buttons}>
          {buttonsPrimary.map((button) => (
            <Button key={button.color}
              className={styles.button}
              size="small"
              radius={'medium'}
              variant="solid"
              color={button.color}
              label={button.label}
              iconPosition="left"
              icon={button.icon}
              loading={false} />
          ))}
        </div>
        <div className={styles.buttons}>
          {buttonsPrimary.map((button) => (
            <Button key={button.color}
              className={styles.button}
              size="small"
              radius={'medium'}
              variant="outline"
              color={button.color}
              label={button.label}
              iconPosition="left"
              icon={button.icon}
              loading={false} />
          ))}
        </div>
        <div className={styles.buttons}>
          {buttonsPrimary.map((button) => (
            <Button key={button.color}
              className={styles.button}
              size="small"
              radius={'medium'}
              variant="dashed"
              color={button.color}
              label={button.label}
              iconPosition="left"
              icon={button.icon}
              loading={false} />
          ))}
        </div>
        <div className={styles.buttons}>
          {buttonsPrimary.map((button) => (
            <Button key={button.color}
              className={styles.button}
              size="small"
              radius={'medium'}
              variant="ghost"
              color={button.color}
              label={button.label}
              iconPosition="left"
              icon={button.icon}
              loading={false} />
          ))}
        </div>
      </div>
      <div className={styles.container_buttons}>
        <div className={styles.buttons}>
          <Checkbox size="small" label='Primary' />
          <Checkbox size="small" color="secondary" label='Secondary' />
          <Checkbox size="small" color="success" label='Success' />
          <Checkbox size="small" color="danger" label='Danger' />
          <Checkbox size="small" color="warning" label='Warning' />
          <Checkbox size="small" color="info" label='Info' />
        </div>
        <div className={styles.buttons}>
          <Checkbox size="small" variant="flat" label='Primary' />
          <Checkbox size="small" variant="flat" color="secondary" label='Secondary' />
          <Checkbox size="small" variant="flat" color="success" label='Success' />
          <Checkbox size="small" variant="flat" color="danger" label='Danger' />
          <Checkbox size="small" variant="flat" color="warning" label='Warning' />
          <Checkbox size="small" variant="flat" color="info" label='Info' />
        </div>
      </div>
    </section>
  )
}

export default App
