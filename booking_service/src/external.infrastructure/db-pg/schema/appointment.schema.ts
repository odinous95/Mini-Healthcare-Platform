import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientName: varchar("patient_name").notNull(),
  doctorName: varchar("doctor_name").notNull(),
  appointmentDate: timestamp("appointment_date").notNull(),
  reason: varchar("reason").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Appointment = InferSelectModel<typeof appointments>;
