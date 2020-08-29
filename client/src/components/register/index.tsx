import { useState } from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core"
import Register from "../register/RegisterModal"

const useStyles = makeStyles(() => ({
  button: {
    padding: "5px 40px",
  },
  signUpButton: {
    marginLeft: 15,
  },
}))

const ButtonRegister = () => {
  const { button, signUpButton } = useStyles()
  const [isOpen, setOpen] = useState(false)

  const HoClick = (val?: boolean) => () => {
    if (val !== undefined) {
      setOpen(val)
    } else {
      setOpen(!isOpen)
    }
  }
  return (
    <>
      <Button
        color="primary"
        variant="contained"
        className={`${button} ${signUpButton}`}
        onClick={HoClick()}
      >
        Sign up
      </Button >
      <Register
        isOpen={isOpen}
        handleClose={HoClick(false)}
      />
    </>
  )
}

export default ButtonRegister