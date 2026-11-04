export function SectionHeading({ index, title, id }: { index: string; title: string; id?: string }) {
  return (
    <div id={id} className="flex scroll-mt-24 items-baseline gap-6 border-t border-line pt-6">
      <span className="font-mono text-xs tracking-widest text-faint">{index}</span>
      <h2 className="font-display text-4xl tracking-tight sm:text-5xl">{title}</h2>
    </div>
  );
}
