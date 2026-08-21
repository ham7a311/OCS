"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StepProgress } from "@/components/profile/step-progress";
import {
  StepConsent,
  StepSkills,
  StepWants,
  StepWhereYouStudy,
  StepWhoYouAre,
  StepWhyYoureHere,
} from "@/components/profile/wizard-steps";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  createEmptyProfile,
  isStepValid,
  PROFILE_STEPS,
  TOTAL_PROFILE_STEPS,
  type ProfileFormData,
} from "@/data/profile";
import { duration, easeUi } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ProfileWizard({
  email,
  initialData,
  submitLabel = "Submit Profile",
  onSubmit,
}: {
  email: string;
  initialData?: ProfileFormData;
  submitLabel?: string;
  onSubmit: (data: ProfileFormData) => void | Promise<void>;
}) {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<ProfileFormData>(
    () => initialData ?? createEmptyProfile(),
  );
  const [attempted, setAttempted] = useState<Record<number, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = <K extends keyof ProfileFormData>(field: K, value: ProfileFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const valid = isStepValid(step, formData);
  const showErrors = Boolean(attempted[step]);
  const current = PROFILE_STEPS[step - 1] ?? PROFILE_STEPS[0];

  function goTo(next: number) {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }

  async function handleNext() {
    if (!valid) {
      setAttempted((prev) => ({ ...prev, [step]: true }));
      return;
    }
    if (step < TOTAL_PROFILE_STEPS) {
      goTo(step + 1);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(formData);
    } catch (caught) {
      setSubmitError(caught instanceof Error ? caught.message : "Could not save your profile.");
    } finally {
      setSubmitting(false);
    }
  }

  const stepProps = { data: formData, email, showErrors, updateField };

  return (
    <div>
      <StepProgress current={step} />

      <div className="mt-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            initial="enter"
            animate="center"
            exit="leave"
            variants={
              reduced
                ? {
                    enter: { opacity: 0 },
                    center: { opacity: 1 },
                    leave: { opacity: 0 },
                  }
                : {
                    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 24 : -24 }),
                    center: { opacity: 1, x: 0 },
                    leave: (dir: number) => ({ opacity: 0, x: dir > 0 ? -24 : 24 }),
                  }
            }
            transition={
              reduced
                ? { duration: duration.instant, ease: easeUi }
                : { duration: duration.fast, ease: easeUi }
            }
          >
            <Eyebrow index={current.index}>{current.title}</Eyebrow>
            <div className="mt-8">
              {step === 1 ? <StepWhoYouAre {...stepProps} /> : null}
              {step === 2 ? <StepWhereYouStudy {...stepProps} /> : null}
              {step === 3 ? <StepWhyYoureHere {...stepProps} /> : null}
              {step === 4 ? <StepSkills {...stepProps} /> : null}
              {step === 5 ? <StepWants {...stepProps} /> : null}
              {step === 6 ? <StepConsent {...stepProps} /> : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        <div className={cn("flex items-center gap-3", step > 1 ? "justify-between" : "justify-end")}>
          {step > 1 ? (
            <Button type="button" variant="secondary" onClick={() => goTo(step - 1)}>
              Back
            </Button>
          ) : null}
          <Button
            type="button"
            disabled={!valid || submitting}
            onClick={handleNext}
            className="disabled:pointer-events-auto disabled:cursor-not-allowed"
          >
            {step < TOTAL_PROFILE_STEPS ? "Next" : submitLabel}
          </Button>
        </div>
        {submitError ? <p className="text-sm text-signal-error">{submitError}</p> : null}
        {step === 6 ? (
          <p className="text-sm leading-relaxed text-ink-faint">
            A committee member reviews new profiles before access is granted.
          </p>
        ) : null}
      </div>
    </div>
  );
}
