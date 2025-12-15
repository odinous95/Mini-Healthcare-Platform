import { NextFunction, Request, Response } from "express";
import { RequestValidator } from "./validations";
import { CreateAppointmentRequest } from "../DTOS";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPES } from "../utils";
import { IAppointmentCore } from "../domain/appointment";
@injectable()
export class AppointmentController {
  private appointmentUsecase: IAppointmentCore;
  constructor(
    @inject(INTERFACE_TYPES.AppointmentUsecase)
    appointmentUsecase: IAppointmentCore
  ) {
    this.appointmentUsecase = appointmentUsecase;
  }
  async onGetAppointments(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.appointmentUsecase.getAppointments();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
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
      const data = await this.appointmentUsecase.createAppointment(input);
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}
