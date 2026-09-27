import { RouteLink } from "@/components/ui/route";
import { commitments } from "@/data/about";

/**
 * How We Show Up, read as the last movement of About. Every commitment is
 * fully present; nothing waits on scroll to become legible.
 */
export function ShowUpSequence() {
  return (
    <ol className="show-up">
      {commitments.map((item) => (
        <li key={item.index} className="show-up__item">
          <span className="show-up__index">{item.index}</span>
          <div className="show-up__body">
            <h4 className="show-up__label">{item.label}</h4>
            <p className="show-up__copy">{item.body}</p>
            <RouteLink href={item.link.href} className="show-up__link">
              {item.link.label}
            </RouteLink>
          </div>
        </li>
      ))}
    </ol>
  );
}
