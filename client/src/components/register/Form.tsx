import { useEffect } from "react"
import { Formik, Form } from "formik"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core"
import { registerFormSchema } from "./FormValidation"
import { useMutation } from "urql"

const REGISTER_MUTATION = `
mutation RegisterUser($email: String!, $userName: String!, $password: String!) {
  registerUser(input:{ username: $userName, password: $password, email: $email }) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
}
`

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
    margin: "0 8px 8px auto",
  }
}))

const RegisterForm = () => {
  const [{data, error}, register] = useMutation(REGISTER_MUTATION)
  const { input, form, button, title } = useStyles()

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Formik
      initialValues={{ email: "", userName: "", password: "" }}
      onSubmit={(values) => {
        register(values)
      }}
      validationSchema={registerFormSchema}
      validateOnChange={false}
    >
      {({ values, handleChange, errors }) => (
        <Form className={form} >
          <Typography variant="h6" className={title}>
            Sign up
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
              name="userName"
              classes={{ root: input }}
              label="UserName"
              variant="outlined"
              value={values.userName}
              onChange={handleChange}
              error={!!errors.userName}
              helperText={errors.userName}
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
            Sign up
          </Button>
        </Form>

      )}
    </Formik>
  )
}

export default RegisterForm