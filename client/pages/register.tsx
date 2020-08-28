import React from "react"
import { Formik, Form } from "formik"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"

const Register = () => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={() => {
      }}
    >
      {() => (
        <Form>
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}

export default Register