import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col justify-center gap-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-faint">Error 404</p>
      <h1 className="font-display text-6xl tracking-tight sm:text-8xl">
        Aquí no hay <em className="text-muted">nada</em>.
      </h1>
      <Link href="/" className="w-fit font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground">
        ← Volver al inicio
      </Link>
    </div>
  );
}
