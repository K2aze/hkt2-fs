import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull().unique(),
  password_hash: varchar({ length: 60 }).notNull(),
  is_active: boolean().notNull().default(false),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

export const userContactsTable = pgTable("user_contacts", {
  user_id: integer()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .primaryKey(),
  full_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone_number: varchar({ length: 20 }).notNull(),
  email_verified: boolean().notNull().default(false),
  phone_verified: boolean().notNull().default(false),
});

export const sessionsTable = pgTable("sessions", {
  id: varchar({ length: 64 }).primaryKey(),
  user_id: integer().references(() => usersTable.id, { onDelete: "cascade" }),
  expires_at: timestamp().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});

//CUSTOM ENUM FOR BOOKING

export const bookingStatusEnum = pgEnum("booking_status", [
  "new",
  "contacted",
  "scheduled",
  "closed",
  "cancelled",
]);

export const timeSlotEnum = pgEnum("time_slot", [
  "morning",
  "afternoon",
  "evening",
]);

//TABLE BOOKING
export const bookingsTable = pgTable("bookings", {
  user_id: integer().references(() => usersTable.id, { onDelete: "set null" }),
  session_id: varchar({ length: 64 }).references(() => sessionsTable.id, {
    onDelete: "set null",
  }),
  full_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone_number: varchar({ length: 20 }),
  booking_date: timestamp().notNull(),
  time: timeSlotEnum().notNull().default("evening"),
  people: integer().notNull().default(1),
  services: integer().array().notNull(),
  requests: text(),
  status: bookingStatusEnum().notNull().default("new"),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});
