"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ChoiceChip } from "@/components/ui/choice-chip";
import { Field, SelectField, TextareaField, TextInput } from "@/components/ui/form-field";
import { Panel } from "@/components/ui/panel";
import {
  GRADUATION_YEARS,
  INTERESTS,
  MONTHS,
  REASONS,
  SCHOOLS,
  SKILLS,
  STARTING_OUT_LABEL,
  YEARS_OF_STUDY,
  type ProfileFormData,
  type ReasonId,
} from "@/data/profile";
import { cn } from "@/lib/utils";

export type WizardStepProps = {
  data: ProfileFormData;
  email: string;
  showErrors: boolean;
  updateField: <K extends keyof ProfileFormData>(field: K, value: ProfileFormData[K]) => void;
};

export function StepWhoYouAre({ data, email, showErrors, updateField }: WizardStepProps) {
  return (
    <div className="flex flex-col gap-3.5">
      <Field
        label="Full name"
        htmlFor="full-name"
        required
        error={showErrors && !data.fullName.trim() ? "Enter your full name." : undefined}
      >
        <TextInput
          id="full-name"
          name="fullName"
          autoComplete="name"
          value={data.fullName}
          invalid={showErrors && !data.fullName.trim()}
          onChange={(event) => updateField("fullName", event.target.value)}
        />
      </Field>

      <Field label="Preferred name" htmlFor="preferred-name" helper="What people actually call you.">
        <TextInput
          id="preferred-name"
          name="preferredName"
          autoComplete="nickname"
          value={data.preferredName}
          onChange={(event) => updateField("preferredName", event.target.value)}
        />
      </Field>

      <Field
        label="Email"
        htmlFor="profile-email"
        helper="From your sign-in account. Not editable here."
      >
        <TextInput id="profile-email" name="email" value={email} readOnly />
      </Field>

      <Field label="Phone" htmlFor="phone" helper="Only used for chapter logistics.">
        <TextInput
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={data.phone}
          onChange={(event) => updateField("phone", event.target.value)}
        />
      </Field>
    </div>
  );
}

export function StepWhereYouStudy({ data, showErrors, updateField }: WizardStepProps) {
  const otherOpen = data.school === "Other";
  const schoolInvalid = showErrors && !data.school.trim();
  const otherInvalid = showErrors && otherOpen && !data.otherSchool.trim();

  return (
    <div className="flex flex-col gap-3.5">
      <p className="text-sm leading-relaxed text-ink-muted">
        Your chapter is OCS inside your own school or university — this is how we know which one
        you belong to.
      </p>

      <Field
        label="School or university"
        htmlFor="school"
        required
        helper="Pick Other if yours isn't listed yet — that's how new chapters start."
        error={schoolInvalid ? "Choose your school or university." : undefined}
      >
        <SelectField
          id="school"
          name="school"
          value={data.school}
          invalid={schoolInvalid}
          onChange={(event) => {
            const school = event.target.value;
            updateField("school", school);
            if (school !== "Other") updateField("otherSchool", "");
          }}
        >
          <option value="">Select a school</option>
          {SCHOOLS.map((school) => (
            <option key={school} value={school}>
              {school}
            </option>
          ))}
        </SelectField>
      </Field>

      <div className="field-reveal" data-open={otherOpen ? "true" : "false"}>
        <div className="field-reveal-inner">
          <div className="pb-1">
            <Field
              label="Your school's name"
              htmlFor="other-school"
              required
              error={otherInvalid ? "Enter your school's name." : undefined}
            >
              <TextInput
                id="other-school"
                name="otherSchool"
                value={data.otherSchool}
                invalid={otherInvalid}
                onChange={(event) => updateField("otherSchool", event.target.value)}
              />
            </Field>
          </div>
        </div>
      </div>

      <Field
        label="Programme"
        htmlFor="programme"
      >
        <TextInput
          id="programme"
          name="programme"
          placeholder="e.g. BSc Computer Science"
          value={data.programme}
          onChange={(event) => updateField("programme", event.target.value)}
        />
      </Field>

      <Field
        label="Year of study"
        htmlFor="year-of-study"
      >
        <SelectField
          id="year-of-study"
          name="yearOfStudy"
          value={data.yearOfStudy}
          onChange={(event) => updateField("yearOfStudy", event.target.value)}
        >
          <option value="">Select a year</option>
          {YEARS_OF_STUDY.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </SelectField>
      </Field>

      <fieldset>
        <legend className="font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase">
          Expected graduation
        </legend>
        <div className="mt-1.5 grid grid-cols-2 gap-3">
          <SelectField
            aria-label="Graduation month"
            name="graduationMonth"
            value={data.graduationMonth}
            onChange={(event) => updateField("graduationMonth", event.target.value)}
          >
            <option value="">Month</option>
            {MONTHS.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </SelectField>
          <SelectField
            aria-label="Graduation year"
            name="graduationYear"
            value={data.graduationYear}
            onChange={(event) => updateField("graduationYear", event.target.value)}
          >
            <option value="">Year</option>
            {GRADUATION_YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </SelectField>
        </div>
      </fieldset>
    </div>
  );
}

export function StepWhyYoureHere({ data, showErrors, updateField }: WizardStepProps) {
  return (
    <fieldset>
      <legend className="font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase">
        Why you&apos;re here (choose one)
        <span className="text-signal-error" aria-hidden="true">
          {" "}
          *
        </span>
      </legend>
      <div className="mt-8 flex flex-col gap-3">
        {REASONS.map((reason) => {
        const selected = data.reason === reason.id;
        return (
          <label key={reason.id} className="block cursor-pointer">
            <input
              type="radio"
              name="reason"
              value={reason.id}
              checked={selected}
              onChange={() => updateField("reason", reason.id as ReasonId)}
              className="peer sr-only"
            />
            <Panel
              className={cn(
                "min-h-11 px-4 py-2.5 transition-[border-color,background-color] duration-200 ease-ui",
                "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber-400",
                selected
                  ? "border-amber-400 bg-[var(--ocs-collab-bg)]"
                  : "hover:border-line",
              )}
            >
              <span className="block text-[0.9875rem] font-medium tracking-[-0.015em] text-ink">
                {reason.title}
              </span>
              <span className="mt-0.5 block text-sm leading-snug text-ink-muted">
                {reason.description}
              </span>
            </Panel>
          </label>
        );
      })}
      {showErrors && !data.reason ? (
        <p className="text-sm text-signal-error">Choose one option to continue.</p>
      ) : null}
      </div>
    </fieldset>
  );
}

export function StepSkills({ data, showErrors, updateField }: WizardStepProps) {
  const hasAnswer = data.startingOut || data.skills.length > 0;

  return (
    <div className="flex flex-col gap-3.5">
      <p className="text-sm leading-relaxed text-ink-muted">
        Be honest — this staffs build squads, it isn&apos;t a test.
      </p>

      <div className="flex flex-wrap gap-2">
        {SKILLS.map((skill) => {
          const selected = data.skills.includes(skill);
          return (
            <ChoiceChip
              key={skill}
              selected={selected}
              onClick={() => {
                updateField("startingOut", false);
                updateField(
                  "skills",
                  selected
                    ? data.skills.filter((item) => item !== skill)
                    : [...data.skills, skill],
                );
              }}
            >
              {skill}
            </ChoiceChip>
          );
        })}
        <ChoiceChip
          selected={data.startingOut}
          onClick={() => {
            const next = !data.startingOut;
            updateField("startingOut", next);
            if (next) updateField("skills", []);
          }}
        >
          {STARTING_OUT_LABEL}
        </ChoiceChip>
      </div>

      {showErrors && !hasAnswer ? (
        <p className="text-sm text-signal-error">
          Select at least one skill, or choose “None, I&apos;m starting out.”
        </p>
      ) : null}
    </div>
  );
}

export function StepWants({ data, showErrors, updateField }: WizardStepProps) {
  const interestsInvalid = showErrors && data.interests.length === 0;

  return (
    <div className="flex flex-col gap-3.5">
      <div>
        <p className="font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase">
          What you want from OCS
          <span className="text-signal-error" aria-hidden="true">
            {" "}
            *
          </span>
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {INTERESTS.map((interest) => {
            const selected = data.interests.includes(interest);
            return (
              <ChoiceChip
                key={interest}
                selected={selected}
                onClick={() =>
                  updateField(
                    "interests",
                    selected
                      ? data.interests.filter((item) => item !== interest)
                      : [...data.interests, interest],
                  )
                }
              >
                {interest}
              </ChoiceChip>
            );
          })}
        </div>
        {interestsInvalid ? (
          <p className="mt-2 text-sm text-signal-error">Choose at least one.</p>
        ) : null}
      </div>

      <Field
        label="What do you want to get out of this?"
        htmlFor="outcome"
        helper="Optional, and the most useful box on the form."
      >
        <TextareaField
          id="outcome"
          name="outcome"
          value={data.outcome}
          onChange={(event) => updateField("outcome", event.target.value)}
        />
      </Field>

      <Field label="Portfolio / GitHub" htmlFor="github">
        <TextInput
          id="github"
          name="github"
          type="url"
          inputMode="url"
          placeholder="https://"
          value={data.github}
          onChange={(event) => updateField("github", event.target.value)}
        />
      </Field>

      <Field label="LinkedIn" htmlFor="linkedin">
        <TextInput
          id="linkedin"
          name="linkedin"
          type="url"
          inputMode="url"
          placeholder="https://"
          value={data.linkedin}
          onChange={(event) => updateField("linkedin", event.target.value)}
        />
      </Field>
    </div>
  );
}

export function StepConsent({ data, showErrors, updateField }: WizardStepProps) {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        id="open-to-squad"
        checked={data.openToSquad}
        onChange={(checked) => updateField("openToSquad", checked)}
      >
        I&apos;m open to being picked for a build squad — a paid, ten-week project for a real client.
      </Checkbox>
      <Checkbox
        id="offer-mentor"
        checked={data.offerMentor}
        onChange={(checked) => updateField("offerMentor", checked)}
      >
        I can give two hours a week to review student work as a mentor.
      </Checkbox>
      <Checkbox
        id="send-updates"
        checked={data.sendUpdates}
        onChange={(checked) => updateField("sendUpdates", checked)}
      >
        Send me updates about sessions and opportunities. You can turn this off any time, and every
        message carries an unsubscribe.
      </Checkbox>
      <Checkbox
        id="profile-consent"
        checked={data.consent}
        onChange={(checked) => updateField("consent", checked)}
      >
        I agree that OCS may store the details above to run its programmes and contact me about
        them. I&apos;ve read the{" "}
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="text-amber-300 underline decoration-amber-500/40 underline-offset-2 transition-colors duration-200 ease-ui hover:text-ink"
        >
          privacy notice
        </a>
        , and I know I can view, correct or delete my data at any time.
      </Checkbox>
      {showErrors && !data.consent ? (
        <p className="text-sm text-signal-error">
          You need to agree before we can store your profile.
        </p>
      ) : null}
    </div>
  );
}
