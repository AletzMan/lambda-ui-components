
import { Button } from '../src/main'
import { CheckCircle } from "lucide-react"

function App() {

  return (
    <>
      <div>
        UI Components
        <Button
          size="medium"
          radius={'medium'}
          variant="solid"
          color="secondary"
          label='Aceptar'
          icon={<CheckCircle />}
          icon_position="left"
          loading={false} />
      </div>
    </>
  )
}

export default App
