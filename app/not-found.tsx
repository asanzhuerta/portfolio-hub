import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 pt-16">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="text-2xl font-semibold">Esta página no existe.</h1>
      <Link href="/" className="font-mono text-sm text-accent hover:underline">
        ← volver al inicio
      </Link>
    </div>
  );
}
