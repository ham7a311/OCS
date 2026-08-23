import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export * from "./auth-schema";

export const reviewStatusEnum = pgEnum("review_status", ["pending", "approved", "rejected"]);
export const consentEventKindEnum = pgEnum("consent_event_kind", [
  "profile_submit",
  "notice_reconsent",
]);

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    fullName: text("full_name").notNull(),
    preferredName: text("preferred_name").notNull().default(""),
    phone: text("phone").notNull().default(""),
    school: text("school").notNull(),
    otherSchool: text("other_school").notNull().default(""),
    programme: text("programme").notNull(),
    yearOfStudy: text("year_of_study").notNull(),
    graduationMonth: text("graduation_month").notNull().default(""),
    graduationYear: text("graduation_year").notNull().default(""),
    reason: text("reason").notNull(),
    skills: text("skills").array().notNull().default(sql`'{}'::text[]`),
    startingOut: boolean("starting_out").notNull().default(false),
    interests: text("interests").array().notNull().default(sql`'{}'::text[]`),
    outcome: text("outcome").notNull().default(""),
    github: text("github").notNull().default(""),
    linkedin: text("linkedin").notNull().default(""),
    openToSquad: boolean("open_to_squad").notNull().default(false),
    offerMentor: boolean("offer_mentor").notNull().default(false),
    sendUpdates: boolean("send_updates").notNull().default(false),
    reviewStatus: reviewStatusEnum("review_status").notNull().default("pending"),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true, mode: "date" }),
    reviewedBy: uuid("reviewed_by").references(() => user.id, { onDelete: "set null" }),
    privacyNoticeVersion: text("privacy_notice_version").notNull(),
    consentedAt: timestamp("consented_at", { withTimezone: true, mode: "date" }).notNull(),
    submittedAt: timestamp("submitted_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
    lastActivityAt: timestamp("last_activity_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    unique("profiles_user_id_key").on(table.userId),
    index("profiles_review_status_idx").on(table.reviewStatus),
    index("profiles_updated_at_idx").on(table.updatedAt),
  ],
);

export const profileConsentEvents = pgTable(
  "profile_consent_events",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    noticeVersion: text("notice_version").notNull(),
    kind: consentEventKindEnum("kind").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  },
  (table) => [index("profile_consent_events_user_id_created_at_idx").on(table.userId, table.createdAt)],
);

export type ProfileRow = typeof profiles.$inferSelect;
export type NewProfileRow = typeof profiles.$inferInsert;
