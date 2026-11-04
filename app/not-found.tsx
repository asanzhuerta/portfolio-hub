import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col justify-center gap-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-faint">Error 404</p>
      <h1 className="font-display text-5xl font-semibold tracking-[-0.03em] sm:text-7xl">
        Aquí no hay nada.
      </h1>
      <Link href="/" className="w-fit font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground">
        ← Volver al inicio
      </Link>
    </div>
  );
}
