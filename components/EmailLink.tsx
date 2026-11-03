"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Builds the mailto link in the browser so the address is not in the HTML. */
export function EmailLink({ user, domain, className }: { user: string; domain: string; className?: string }) {
  const href = useSyncExternalStore(
    subscribe,
    () => `mailto:${user}@${domain}`,
    () => undefined,
  );

  return (
    <a href={href} className={className}>
      email
    </a>
  );
}
