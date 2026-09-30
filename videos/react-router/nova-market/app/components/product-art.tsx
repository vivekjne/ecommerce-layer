import type { Product } from "~/lib/types";

const SHAPES: Record<Product["art"], React.ReactNode> = {
  shoe: (
    <path
      d="M18 70 C18 50 30 44 44 46 L56 30 L72 44 C86 46 100 56 102 70 Z"
      fill="#fff"
      opacity=".92"
    />
  ),
  mug: (
    <g fill="#fff" opacity=".92">
      <rect x="32" y="34" width="46" height="42" rx="8" />
      <path
        d="M78 44 h8 a10 10 0 0 1 0 22 h-8"
        fill="none"
        stroke="#fff"
        strokeWidth="7"
      />
    </g>
  ),
  lamp: (
    <g fill="#fff" opacity=".92">
      <path d="M40 24 h40 l10 28 h-60 z" />
      <rect x="57" y="52" width="6" height="26" />
      <rect x="40" y="76" width="40" height="7" rx="3" />
    </g>
  ),
  bag: (
    <g fill="#fff" opacity=".92">
      <rect x="32" y="34" width="56" height="48" rx="14" />
      <path
        d="M46 34 v-6 a14 14 0 0 1 28 0 v6"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
      />
    </g>
  ),
  phones: (
    <g
      fill="none"
      stroke="#fff"
      strokeWidth="7"
      opacity=".92"
      strokeLinecap="round"
    >
      <path d="M30 66 V54 a30 30 0 0 1 60 0 V66" />
      <rect
        x="24"
        y="60"
        width="14"
        height="22"
        rx="5"
        fill="#fff"
      />
      <rect
        x="82"
        y="60"
        width="14"
        height="22"
        rx="5"
        fill="#fff"
      />
    </g>
  ),
};

export function ProductArt({
  product,
  className = "",
}: {
  product: Pick<Product, "art" | "color">;
  className?: string;
}) {
  return (
    <div
      className={
        "flex items-center justify-center " + className
      }
      style={{
        background: `linear-gradient(135deg, ${product.color}, #6d28d9)`,
      }}
    >
      <svg viewBox="0 0 120 100" className="h-3/4 w-3/4">
        {SHAPES[product.art]}
      </svg>
    </div>
  );
}
