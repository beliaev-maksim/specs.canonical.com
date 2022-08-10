/**
 * Sort elements in set in alphabetical order and eliminate empty values.
 * @param elements list of elements
 */
export function sortSet(elements: Set<string>): string[] {
  const sortedElements = [...elements].sort((a, b) => a.localeCompare(b));
  // remove empty string
  if (sortedElements.length && !sortedElements[0]) {
    sortedElements.shift();
  }
  return sortedElements;
}

export function capitalize(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}

/**
 * Traps focus on the referenced node.
 * @param event keyboard event
 * @param ref reference to the node
 */
export const focusHandler = (
  event: React.KeyboardEvent,
  ref: React.RefObject<HTMLDivElement>
) => {
  if (event.key !== "Tab") return;

  const focusableElements = ref.current?.querySelectorAll(
    "a[href], button:not([disabled]), textarea, input, select"
  );

  const firstElement = focusableElements?.[0] as HTMLElement;
  const lastElement = focusableElements?.[
    focusableElements.length - 1
  ] as HTMLElement;

  if (!event.shiftKey && document.activeElement === lastElement) {
    firstElement?.focus();
    return event.preventDefault();
  }

  if (event.shiftKey && document.activeElement === firstElement) {
    lastElement?.focus();
    event.preventDefault();
  }
};
