import { Formik, Form } from "formik"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core"
import { loginFormSchema } from "./FormValidation"
import { useLoginMutation } from "../../generated/graphql"

const useStyles = makeStyles(() => ({
  title: {
    marginBottom: 16,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "15px 0 5px",
    marginBottom: 8
  },
  button: {
    minWidth: 88,
    minHeight: 36,
    margin: "0 8px 8px auto",
  }
}))

interface ILoginForm {
  closeModal: () => void
}

const LoginForm = ({ closeModal }: ILoginForm) => {
  const [, login] = useLoginMutation()
  const { input, form, button, title } = useStyles()

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const { data } = await login({ input: values })

        if (data.loginUser.errors) {
          data.loginUser.errors.forEach((err) => {
            setErrors({
              [err.field]: err.message
            })
          })
        } else {
          closeModal()
        }

      }}
      validationSchema={loginFormSchema}
      validateOnChange={false}
    >
      {({ values, handleChange, errors, isSubmitting }) => (
        <Form className={form} >
          <Typography variant="h6" className={title}>
            Log in
          </Typography>
          <FormControl>
            <TextField
              name="email"
              classes={{ root: input }}
              label="Email address"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </FormControl>
          <FormControl>
            <TextField
              name="password"
              classes={{ root: input }}
              label="Password"
              variant="outlined"
              value={values.password}
              onChange={handleChange}
              type="password"
              error={!!errors.password}
              helperText={errors.password}
            />
          </FormControl>
          <Button
            className={button}
            variant="outlined"
            color="primary"
            type="submit"
          >
            {isSubmitting ? <CircularProgress size={22} /> : "Sign up"}
          </Button>
        </Form>

      )}
    </Formik>
  )
}

export default LoginForm