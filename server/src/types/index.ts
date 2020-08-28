import { Request, Response } from "express"

export type CustomContext = {
  req: Request & { session?: Express.Session },
  res: Response
}