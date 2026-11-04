"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Builds the mailto link in the browser so the address is not in the HTML. */
export function EmailLink({
  user,
  domain,
  className,
  children,
}: {
  user: string;
  domain: string;
  className?: string;
  children: React.ReactNode;
}) {
  const href = useSyncExternalStore(
    subscribe,
    () => `mailto:${user}@${domain}`,
    () => undefined,
  );

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
