CREATE TYPE "public"."consent_event_kind" AS ENUM('profile_submit', 'notice_reconsent');--> statement-breakpoint
CREATE TYPE "public"."review_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "profile_consent_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"notice_version" text NOT NULL,
	"kind" "consent_event_kind" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"full_name" text NOT NULL,
	"preferred_name" text DEFAULT '' NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"school" text NOT NULL,
	"other_school" text DEFAULT '' NOT NULL,
	"programme" text NOT NULL,
	"year_of_study" text NOT NULL,
	"graduation_month" text DEFAULT '' NOT NULL,
	"graduation_year" text DEFAULT '' NOT NULL,
	"reason" text NOT NULL,
	"skills" text[] DEFAULT '{}'::text[] NOT NULL,
	"starting_out" boolean DEFAULT false NOT NULL,
	"interests" text[] DEFAULT '{}'::text[] NOT NULL,
	"outcome" text DEFAULT '' NOT NULL,
	"github" text DEFAULT '' NOT NULL,
	"linkedin" text DEFAULT '' NOT NULL,
	"open_to_squad" boolean DEFAULT false NOT NULL,
	"offer_mentor" boolean DEFAULT false NOT NULL,
	"send_updates" boolean DEFAULT false NOT NULL,
	"review_status" "review_status" DEFAULT 'pending' NOT NULL,
	"reviewed_at" timestamp with time zone,
	"reviewed_by" uuid,
	"privacy_notice_version" text NOT NULL,
	"consented_at" timestamp with time zone NOT NULL,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_activity_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_user_id_key" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "profile_consent_events" ADD CONSTRAINT "profile_consent_events_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_reviewed_by_user_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "neon_auth"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "profile_consent_events_user_id_created_at_idx" ON "profile_consent_events" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "profiles_review_status_idx" ON "profiles" USING btree ("review_status");--> statement-breakpoint
CREATE INDEX "profiles_updated_at_idx" ON "profiles" USING btree ("updated_at");