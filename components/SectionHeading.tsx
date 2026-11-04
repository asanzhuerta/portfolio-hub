export function SectionHeading({ index, title, id }: { index: string; title: string; id?: string }) {
  return (
    <div id={id} data-reveal className="flex scroll-mt-24 items-baseline gap-4">
      <span className="font-mono text-xs text-accent">{index}</span>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}
