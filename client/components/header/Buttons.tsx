import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core"
import ButtonRegister from "../register"

const useStyles = makeStyles(() => ({
  button: {
    padding: "5px 40px",
  },
}))

const Buttons = () => {
  const { button } = useStyles()
  return (
    <div>
      <Button variant="outlined" className={button}>Log in</Button>
      <ButtonRegister />
    </div>
  )
}

export default Buttons