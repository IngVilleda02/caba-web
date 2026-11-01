import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <p className="text-[17px] font-semibold text-caba-600">Error 404</p>
      <h1 className="mt-2 text-[40px] font-semibold text-ink">Esta página no existe.</h1>
      <Link href="/" className="btn btn-primary mt-8">Volver al inicio</Link>
    </main>
  );
}
