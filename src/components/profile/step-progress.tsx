import { TOTAL_PROFILE_STEPS } from "@/data/profile";

export function StepProgress({ current }: { current: number }) {
  return (
    <div>
      <div className="wizard-progress" role="list" aria-label="Profile progress">
        {Array.from({ length: TOTAL_PROFILE_STEPS }, (_, index) => {
          const step = index + 1;
          const state = step < current ? "done" : step === current ? "current" : "upcoming";
          return (
            <span key={step} className="contents">
              {index > 0 ? <span className="wizard-rail" aria-hidden="true" /> : null}
              <span
                role="listitem"
                data-state={state}
                className="wizard-dot"
                aria-current={step === current ? "step" : undefined}
                aria-label={`Step ${step} of ${TOTAL_PROFILE_STEPS}${
                  state === "done" ? ", completed" : state === "current" ? ", current" : ""
                }`}
              />
            </span>
          );
        })}
      </div>
      <p className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-faint uppercase sm:hidden">
        Step {current} of {TOTAL_PROFILE_STEPS}
      </p>
    </div>
  );
}
