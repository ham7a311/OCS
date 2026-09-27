const STEPS = [
  {
    index: "01",
    title: "A plain-language notice",
    note: "Before anything is collected.",
    mark: "notice",
  },
  {
    index: "02",
    title: "A real consent checkbox",
    note: "Real words. Never pre-ticked.",
    mark: "checkbox",
  },
  {
    index: "03",
    title: "Separate marketing consent",
    note: "With a working unsubscribe.",
    mark: "split",
  },
  {
    index: "04",
    title: "A named person",
    note: "Responsible for the data we hold.",
    mark: "steward",
  },
] as const;

type Mark = (typeof STEPS)[number]["mark"];

function StepMark({ mark }: { mark: Mark }) {
  if (mark === "checkbox") {
    return <span className="data-path__box" aria-hidden="true" />;
  }
  if (mark === "split") {
    return (
      <span className="data-path__split" aria-hidden="true">
        <span className="data-path__box" />
        <span className="data-path__box" />
      </span>
    );
  }
  if (mark === "steward") {
    return <span className="data-path__node data-path__node--filled" aria-hidden="true" />;
  }
  return <span className="data-path__node" aria-hidden="true" />;
}

/**
 * What happens to a student's data, in the order it happens: the path a form
 * submission walks before OCS is allowed to keep anything.
 */
export function DataPath() {
  return (
    <figure className="data-path">
      <figcaption className="data-path__caption">Before we keep anything</figcaption>
      <ol className="data-path__list">
        {STEPS.map((step) => (
          <li key={step.index} className="data-path__step">
            <span className="data-path__rail" aria-hidden="true">
              <StepMark mark={step.mark} />
            </span>
            <span className="data-path__index">{step.index}</span>
            <span className="data-path__text">
              <span className="data-path__title">{step.title}</span>
              <span className="data-path__note">{step.note}</span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
