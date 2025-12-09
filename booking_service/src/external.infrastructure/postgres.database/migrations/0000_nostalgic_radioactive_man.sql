CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_name" varchar NOT NULL,
	"doctor_name" varchar NOT NULL,
	"appointment_date" timestamp NOT NULL,
	"reason" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
