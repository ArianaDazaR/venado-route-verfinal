import { createFileRoute } from "@tanstack/react-router";
import { VenadoProvider, useVenado } from "@/lib/venado-store";
import { Login } from "@/components/venado/Login";
import { ReponedorApp } from "@/components/venado/ReponedorApp";
import { SupervisorApp } from "@/components/venado/SupervisorApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Venado Route — Optimización inteligente de cobertura" },
      { name: "description", content: "PWA de gestión de rutas para reponedores y supervisores de Grupo Venado." },
    ],
  }),
  component: Index,
});

function Shell() {
  const { role } = useVenado();
  if (!role) return <Login />;
  if (role === "supervisor") return <SupervisorApp />;
  return <ReponedorApp />;
}

function Index() {
  return (
    <div className="mx-auto max-w-md min-h-screen bg-background shadow-2xl">
      <VenadoProvider>
        <Shell />
      </VenadoProvider>
    </div>
  );
}
