import { object, string } from "yup"

export const registerFormSchema = object().shape({
  email: string().email().required(),
  userName: string().required(),
  password: string().required().min(6)
})
