import { useState } from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core"
import Register from "./LoginModal"

const useStyles = makeStyles(() => ({
  button: {
    padding: "5px 40px",
  },
}))

const LoginButton = () => {
  const { button } = useStyles()
  const [isOpen, setOpen] = useState(false)

  const hoClick = (val?: boolean) => () => {
    if (val !== undefined) {
      setOpen(val)
    } else {
      setOpen(!isOpen)
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        className={button}
        onClick={hoClick()}
      >
        Log in
      </Button>
      <Register
        isOpen={isOpen}
        handleClose={hoClick(false)}
      />
    </>
  )
}

export default LoginButton