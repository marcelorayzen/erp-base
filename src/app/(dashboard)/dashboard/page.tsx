export default function DashboardPage() {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <article className="card p-4">
        <h2 className="text-sm text-slate-500">Semáforo</h2>
        <p className="mt-2 text-2xl font-bold text-emerald-600">Verde</p>
      </article>
      <article className="card p-4">
        <h2 className="text-sm text-slate-500">Contas vencidas</h2>
        <p className="mt-2 text-2xl font-bold">0</p>
      </article>
      <article className="card p-4">
        <h2 className="text-sm text-slate-500">PIX do dia</h2>
        <p className="mt-2 text-2xl font-bold">R$ 0,00</p>
      </article>
    </section>
  );
}
