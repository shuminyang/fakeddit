import { object, string } from "yup"

export const loginFormSchema = object().shape({
  email: string().email().required(),
  password: string().required().min(6)
})
