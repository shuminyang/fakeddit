import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"
import Avatar from "@material-ui/core/Avatar"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import Search from "@material-ui/icons/Search"
import Buttons from "./Buttons"

const useStyles = makeStyles(() => ({
  toobar: {
    display: "flex",
  },
  title: {
    marginLeft: 16,
  },
  outlinedInput: {
    padding: 12,
    margin: "auto",
    width: 650,
  },
}))

const Header = () => {
  const { outlinedInput, title, toobar } = useStyles()
  return (
    <AppBar
      color="inherit"
      position="fixed"
    >
      <Toolbar className={toobar}>
        <Avatar alt="Logo" src="/reddit-logo.png" />
        <Typography variant="h6" className={title}>
          Fakeddit
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search"
          className={outlinedInput}
          InputProps={{
            classes: {
              input: outlinedInput,
            },
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
        <Buttons />

      </Toolbar>
    </AppBar>
  )
}

export default Header