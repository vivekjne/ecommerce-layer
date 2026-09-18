import { MinusIcon, PlusIcon } from "./icons.js";

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantityStepper({ value, onChange, min = 1, max, disabled }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 dark:text-neutral-400 dark:hover:bg-neutral-900"
      >
        <MinusIcon className="h-3.5 w-3.5" />
      </button>
      <span className="w-6 text-center text-sm font-medium text-neutral-900 tabular-nums dark:text-neutral-100">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled || (max != null && value >= max)}
        onClick={() => onChange(max != null ? Math.min(max, value + 1) : value + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 dark:text-neutral-400 dark:hover:bg-neutral-900"
      >
        <PlusIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
