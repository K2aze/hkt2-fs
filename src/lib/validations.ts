import z from "zod";

const usernameSchema = z
  .string({ error: "USERNAME_NOT_STRING" })
  .min(6, "USERNAME_MIN_LENGTH")
  .max(255, "USERNAME_MAX_LENGTH");

const passwordSchema = z
  .string({ error: "PASSWORD_NOT_STRING" })
  .min(6, "PASSWORD_MIN_LENGTH")
  .refine((val) => Buffer.byteLength(val, "utf8") <= 72, {
    error: "PASSWORD_MAX_LENGTH",
  });

const fullNameSchema = z
  .string({ error: "FULLNAME_NOT_STRING" })
  .min(1, "FULLNAME_REQUIRED")
  .max(255, "FULLNAME_MAX_LENGTH");

const emailSchema = z.email({ error: "EMAIL_INVALID" });

const phoneNumberSchema = z
  .string({ error: "PHONENUMBER_NOT_STRING" })
  .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i, {
    error: "PHONENUMBER_INVALID",
  })
  .min(8, { error: "PHONENUMBER_MIN_LENGTH" })
  .max(15, { error: "PHONENUMBER_MAX_LENGTH" });

const bookingDateSchema = z.coerce.date().refine(
  (date) => {
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  },
  { message: "BOOKING_DATE_UNVALID" },
);

const numberOfParticipants = z
  .number({ error: "NOT_NUMBER" })
  .int({ error: "NOT_INTEGER" })
  .min(1, { error: "MIN_1_PEOPLE" })
  .max(20, { error: "MAX_20_PEOPLE" })
  .optional()
  .default(1);

const serviceType = z
  .array(
    z
      .number()
      .int({ error: "SERVICE_TYPE_UNVALID" })
      .min(0, { error: "SERVICE_TYPE_UNVALID" })
      .max(5, { error: "SERVICE_TYPE_UNVALID" }),
  )
  .min(1, { error: "SERVICE_TYPE_UNVALID" })
  .max(6, { error: "SERVICE_TYPE_UNVALID" })
  .refine((arr) => new Set(arr).size === arr.length, {
    error: "SERVICE_TYPE_UNVALID",
  });

const specialRequests = z
  .string()
  .max(500, { error: "REQUESTS_MAX_LENGTH" })
  .optional()
  .or(z.literal(""));

const newsletterSubscription = z.boolean().optional().default(false);

const preferredTimeSlot = z.enum(["morning", "afternoon", "evening"], {
  error: "TIME_NOT_VALID",
});

//REGISTER FORM VALIDATION
export const registerSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  fullName: fullNameSchema,
  email: emailSchema,
  phoneNumber: phoneNumberSchema,
});

export type RegisterSchema = z.infer<typeof registerSchema>;

//LOGIN FORM VALIDATION
export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;

//BOOKINGS FORM VALIDATION
export const bookingSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phoneNumber: phoneNumberSchema,
  bookingDate: bookingDateSchema,
  people: numberOfParticipants,
  services: serviceType,
  time: preferredTimeSlot,
  requests: specialRequests,
  subscription: newsletterSubscription,
});
