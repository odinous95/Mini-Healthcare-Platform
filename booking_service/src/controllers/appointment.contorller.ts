import { NextFunction, Request, Response } from "express";
import { IAppointmentCore } from "../interfaces";
import { RequestValidator } from "../api/validations/requestValidator";
import { CreateAppointmentRequest } from "../DTO";

export class AppointmentController {
  private interactor: IAppointmentCore;
  constructor(interactor: IAppointmentCore) {
    this.interactor = interactor;
  }
  async onAppointmentCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const { errors, input } = await RequestValidator(
        CreateAppointmentRequest,
        req.body
      );
      if (errors) {
        return res.status(400).json({ errors });
      }
      const data = await this.interactor.createAppointment(input);
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}
