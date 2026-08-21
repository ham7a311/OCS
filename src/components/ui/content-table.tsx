import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ContentTableRow = {
  id: string;
  cells: readonly ReactNode[];
  note?: string;
};

const menuCellRoles = [
  "table-cell-tier",
  "table-cell-format",
  "table-cell-effort",
  "table-cell-copy",
] as const;

export function ContentTable({
  columns,
  rows,
  colWidths,
  nowrapColumns = [0],
  framed = false,
  className,
}: {
  columns: readonly string[];
  rows: readonly ContentTableRow[];
  colWidths?: readonly string[];
  nowrapColumns?: readonly number[];
  framed?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(framed && "model-page-table")}>
      <table className={cn("ocs-content-table w-full border-collapse text-left", className)}>
        {colWidths ? (
          <colgroup>
            {colWidths.map((width, index) => (
              <col key={columns[index] ?? index} style={{ width }} />
            ))}
          </colgroup>
        ) : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="border-b border-line-subtle px-4 py-3 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase sm:px-5 sm:py-4"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.cells.map((cell, index) => {
                const last = index === row.cells.length - 1;
                const label = columns[index] ?? "";

                return (
                  <td
                    key={`${row.id}-${label}`}
                    data-label={label}
                    className={cn(
                      "border-b border-line-subtle px-4 py-4 align-top text-sm leading-relaxed sm:px-5 sm:py-5",
                      framed
                        ? menuCellRoles[index]
                        : index === 0
                          ? "font-mono text-[0.8125rem] tracking-[0.04em] text-amber-300"
                          : "text-ink-muted",
                      nowrapColumns.includes(index) && "ocs-table-label",
                    )}
                  >
                    {cell}
                    {last && row.note ? (
                      <p className="mt-2 text-sm leading-relaxed text-ink-faint">{row.note}</p>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
