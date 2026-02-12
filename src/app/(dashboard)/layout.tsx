import Link from "next/link";

const menu = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/cadastros", label: "Cadastros" },
  { href: "/financeiro", label: "Financeiro" },
  { href: "/vendas", label: "Vendas" },
  { href: "/pix", label: "PIX" },
  { href: "/fiscal", label: "Fiscal" },
  { href: "/estoque", label: "Estoque" },
  { href: "/whatsapp", label: "WhatsApp" },
  { href: "/notificacoes", label: "Notificações" },
  { href: "/configuracoes", label: "Configurações" }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-8 pt-4">
      <header className="card mb-4 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">ERPsb</h1>
          <Link href="/onboarding" className="rounded-md bg-teal-700 px-3 py-1.5 text-sm font-medium text-white">
            Wizard 2min
          </Link>
        </div>

        <nav className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">
          {menu.map((item) => (
            <Link key={item.href} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-center" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {children}
    </div>
  );
}
