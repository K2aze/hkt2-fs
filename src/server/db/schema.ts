import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
  serial,
} from "drizzle-orm/pg-core";

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

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 60 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const userContactsTable = pgTable("user_contacts", {
  user_id: integer("user_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .primaryKey(),
  full_name: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone_number: varchar("phone_number", { length: 20 }).notNull(),
  email_verified: boolean("email_verified").notNull().default(false),
  phone_verified: boolean("phone_verified").notNull().default(false),
});

export const sessionsTable = pgTable("sessions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  user_id: integer("user_id").references(() => usersTable.id, {
    onDelete: "cascade",
  }),
  expires_at: timestamp("expires_at").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => usersTable.id, {
    onDelete: "set null",
  }),
  session_id: varchar("session_id", { length: 64 }).references(
    () => sessionsTable.id,
    {
      onDelete: "set null",
    },
  ),
  full_name: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone_number: varchar("phone_number", { length: 20 }),
  booking_date: timestamp("booking_date").notNull(),
  time: timeSlotEnum("time").notNull().default("evening"),
  people: integer("people").notNull().default(1),
  services: integer("services").array().notNull(),
  requests: text("requests"),
  status: bookingStatusEnum("status").notNull().default("new"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
