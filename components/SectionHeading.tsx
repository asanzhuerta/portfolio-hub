/** Put the anchor `id` on the surrounding <section>: this heading moves while it reveals. */
export function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div data-reveal className="flex items-baseline gap-4">
      <span className="font-mono text-xs text-accent">{index}</span>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}
