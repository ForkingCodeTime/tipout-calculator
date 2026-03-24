"use client";

import { useCallback, useState } from "react";

type Row = { id: number; tips: string; percent: string };

const inputClassName =
  "rounded-md border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 shadow-sm outline-none ring-neutral-950/10 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-950/20";

const readOnlyInputClassName = `${inputClassName} cursor-default bg-neutral-50 text-neutral-800`;

/** Derived from tips × (percent / 100); not stored separately — recomputed whenever tips or percent change. */
function amountOwedToBackOfHouse(tips: string, percent: string): string {
  const t = parseFloat(tips);
  const p = parseFloat(percent);
  if (!Number.isFinite(t) || !Number.isFinite(p)) return "";
  return ((t * p) / 100).toFixed(2);
}

export default function Home() {
  const [rows, setRows] = useState<Row[]>(() => [
    { id: 0, tips: "", percent: "" },
  ]);

  const addRow = useCallback(() => {
    setRows((prev) => [...prev, { id: prev.length, tips: "", percent: "" }]);
  }, []);

  return (
    <div className="min-h-full flex flex-col bg-white px-6 py-10 text-neutral-900">
      <h1 className="text-2xl font-semibold tracking-tight">Hi Paul</h1>
      <p>
        Here is a first draft of a tip out calculcating webpage. Do you think
        this might help you out? Is it what you were looking for? I feel like
        I'm forgetting some of the requirements you had but I don't remember
        exactly.
      </p>
      <p>
        Right now it's all manual input, but it isn't really hard to set up
        something that reads in excel files. It also wouldn't be too difficult
        to set up some features so that people you've put in would be remembered
        along with how much they want to tip out.
      </p>
      <p>
        Anyway, I'd love some feedback on if this is kind of what you are
        looking for. Let me know.
      </p>

      <section className="mt-10 flex flex-col gap-6">
        <h2 className="sr-only">Entry rows</h2>
        {rows.map((row, index) => (
          <div
            key={row.id}
            className={
              index === rows.length - 1 && rows.length > 1
                ? "row-enter"
                : undefined
            }
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
              <label className="flex min-w-0 flex-1 flex-col gap-2 text-sm font-medium text-neutral-700">
                Name
                <input
                  type="text"
                  name={`name-${row.id}`}
                  autoComplete="name"
                  className={inputClassName}
                  placeholder="Jane Doe"
                />
              </label>
              <label className="flex min-w-0 flex-1 flex-col gap-2 text-sm font-medium text-neutral-700">
                Tips Received
                <input
                  type="text"
                  inputMode="decimal"
                  name={`tips-${row.id}`}
                  value={row.tips}
                  onChange={(e) =>
                    setRows((prev) =>
                      prev.map((r) =>
                        r.id === row.id ? { ...r, tips: e.target.value } : r,
                      ),
                    )
                  }
                  className={inputClassName}
                  placeholder="0.00"
                />
              </label>
              <label className="flex min-w-0 flex-1 flex-col gap-2 text-sm font-medium text-neutral-700">
                Percent tipped to back of house
                <input
                  type="text"
                  inputMode="decimal"
                  name={`percentAmount-${row.id}`}
                  value={row.percent}
                  onChange={(e) =>
                    setRows((prev) =>
                      prev.map((r) =>
                        r.id === row.id ? { ...r, percent: e.target.value } : r,
                      ),
                    )
                  }
                  className={inputClassName}
                  placeholder="0"
                />
              </label>
              <label className="flex min-w-0 flex-1 flex-col gap-2 text-sm font-medium text-neutral-700">
                Amount owed to back of house
                <input
                  type="text"
                  readOnly
                  aria-readonly="true"
                  name={`amountOwed-${row.id}`}
                  value={amountOwedToBackOfHouse(row.tips, row.percent)}
                  className={readOnlyInputClassName}
                  placeholder="0.00"
                />
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addRow}
          className="self-start rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:bg-neutral-800 hover:shadow-md active:translate-y-px"
        >
          Add another row
        </button>
      </section>
    </div>
  );
}
