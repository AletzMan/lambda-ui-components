
import { Button } from '../src/main'
import { CheckCircle } from "lucide-react"

function App() {

  return (
    <>
      <div>
        UI Components
        <Button
          size="medium"
          icon={<CheckCircle />}
          radius={'medium'}
          variant="solid"
          color="danger"
          icon_position="left"
          loading={false}
          label='Aceptar' />
      </div>
    </>
  )
}

export default App
