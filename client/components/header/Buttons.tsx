import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
  button: {
    padding: "5px 40px",
  },
  signUpButton: {
    marginLeft: 15,
  },
}))

const Buttons = () => {
  const { button, signUpButton } = useStyles()
  return (
    <div>
      <Button variant="outlined" className={button}>Log in</Button>
      <Button color="primary" variant="contained" className={`${button} ${signUpButton}`} >Sign up</Button>
    </div>
  )
}

export default Buttons