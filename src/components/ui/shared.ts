// Class strings shared by several controls, defined once.
export const focusRing =
  "outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export const invalidRing =
  "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40";

// Shared by every overlay (Modal, Sheet).
export const overlayBackdrop =
  "fixed inset-0 z-50 bg-overlay transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs";

export const overlayCloseButton = "absolute top-3 right-3";
