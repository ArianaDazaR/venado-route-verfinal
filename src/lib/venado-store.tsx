import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Role = "supervisor" | "reponedor";

export interface Task {
  id: number;
  nombre: string;
  descripcion: string;
  requiereFoto: boolean;
  estado: "pendiente" | "en_curso" | "completada";
  inicio: number | null;
  fin: number | null;
  duracionSegundos: number;
  fotoUrl?: string;
}

export interface Visit {
  id: number;
  cliente: string;
  codigo: string;
  direccion: string;
  ciudad: string;
  tipo: string;
  estado: "bloqueada" | "disponible" | "en_curso" | "completada";
  inicio: number | null;
  fin: number | null;
  tareas: Task[];
}

const baseTasks = (): Task[] => [
  { id: 1, nombre: "Armado y mantenimiento de exhibiciones", descripcion: "Verifica y organiza la exhibición de productos.", requiereFoto: true, estado: "pendiente", inicio: null, fin: null, duracionSegundos: 0 },
  { id: 2, nombre: "Toma y actualización de precios", descripcion: "Verifica y actualiza los precios de los productos.", requiereFoto: false, estado: "pendiente", inicio: null, fin: null, duracionSegundos: 0 },
  { id: 3, nombre: "Limpieza y generación de espacios", descripcion: "Limpia y genera espacios en percha o estante.", requiereFoto: false, estado: "pendiente", inicio: null, fin: null, duracionSegundos: 0 },
  { id: 4, nombre: "Instalación y visualización de material POP", descripcion: "Instala y asegura la correcta visualización del material POP.", requiereFoto: true, estado: "pendiente", inicio: null, fin: null, duracionSegundos: 0 },
  { id: 5, nombre: "Toma de inventario", descripcion: "Verifica el inventario para asegurar la disponibilidad de producto.", requiereFoto: false, estado: "pendiente", inicio: null, fin: null, duracionSegundos: 0 },
];

const initialVisits = (): Visit[] => {
  const data = [
    { cliente: "Mayorista San José", codigo: "GV049", direccion: "Av. 6 de Marzo, #1234", tipo: "Mayorista" },
    { cliente: "Supermercado Los Andes", codigo: "GV050", direccion: "Av. Buenos Aires, #567", tipo: "Supermercado" },
    { cliente: "Distribuidora El Alba", codigo: "GV051", direccion: "Calle 25, #890", tipo: "Distribuidora" },
    { cliente: "Minimarket La Esquina", codigo: "GV052", direccion: "Av. Sucre, #321", tipo: "Minimarket" },
    { cliente: "Comercial Don Pepe", codigo: "GV053", direccion: "C. Murillo, #45", tipo: "Comercial" },
    { cliente: "Tienda La Paz", codigo: "GV054", direccion: "Av. Camacho, #112", tipo: "Tienda" },
    { cliente: "Mayorista Central", codigo: "GV055", direccion: "C. Comercio, #78", tipo: "Mayorista" },
    { cliente: "Mercado San Miguel", codigo: "GV056", direccion: "Av. Ballivián, #900", tipo: "Mercado" },
    { cliente: "Supermercado Andino", codigo: "GV057", direccion: "C. 21 de Calacoto, #15", tipo: "Supermercado" },
    { cliente: "Distribuidora Sur", codigo: "GV058", direccion: "Av. Hernando Siles, #220", tipo: "Distribuidora" },
  ];
  return data.map((d, i) => ({
    id: i + 1,
    ...d,
    ciudad: "La Paz, Bolivia",
    estado: i === 0 ? "disponible" : "bloqueada",
    inicio: null,
    fin: null,
    tareas: baseTasks(),
  }));
};

interface Ctx {
  role: Role | null;
  userName: string;
  login: (id: string, pwd: string) => boolean;
  logout: () => void;
  visits: Visit[];
  startVisit: (id: number) => void;
  startTask: (visitId: number, taskId: number) => void;
  completeTask: (visitId: number, taskId: number, fotoUrl?: string) => void;
  completeVisit: (visitId: number) => void;
}

const VenadoCtx = createContext<Ctx | null>(null);

export function VenadoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [userName, setUserName] = useState("");
  const [visits, setVisits] = useState<Visit[]>(initialVisits);

  const login = useCallback((id: string, pwd: string) => {
    if (id === "SV-1234" && pwd === "4321") { setRole("supervisor"); setUserName("Juan Pérez"); return true; }
    if (id === "RV-1234" && pwd === "1234") { setRole("reponedor"); setUserName("Juan Pérez"); return true; }
    return false;
  }, []);

  const logout = useCallback(() => { setRole(null); setVisits(initialVisits()); }, []);

  const startVisit = useCallback((id: number) => {
    setVisits(v => v.map(x => x.id === id ? { ...x, estado: "en_curso", inicio: Date.now() } : x));
  }, []);

  const startTask = useCallback((visitId: number, taskId: number) => {
    setVisits(v => v.map(x => x.id !== visitId ? x : {
      ...x,
      tareas: x.tareas.map(t => t.id === taskId && t.estado === "pendiente" ? { ...t, estado: "en_curso", inicio: Date.now() } : t),
    }));
  }, []);

  const completeTask = useCallback((visitId: number, taskId: number, fotoUrl?: string) => {
    setVisits(v => v.map(x => x.id !== visitId ? x : {
      ...x,
      tareas: x.tareas.map(t => {
        if (t.id !== taskId) return t;
        const inicio = t.inicio ?? Date.now() - 60000;
        const fin = Date.now();
        return { ...t, estado: "completada", inicio, fin, duracionSegundos: Math.max(1, Math.round((fin - inicio) / 1000)), fotoUrl: fotoUrl ?? t.fotoUrl };
      }),
    }));
  }, []);

  const completeVisit = useCallback((visitId: number) => {
    setVisits(v => v.map((x, idx) => {
      if (x.id === visitId) return { ...x, estado: "completada", fin: Date.now() };
      if (idx > 0 && v[idx - 1].id === visitId && x.estado === "bloqueada") return { ...x, estado: "disponible" };
      return x;
    }));
  }, []);

  return <VenadoCtx.Provider value={{ role, userName, login, logout, visits, startVisit, startTask, completeTask, completeVisit }}>{children}</VenadoCtx.Provider>;
}

export function useVenado() {
  const c = useContext(VenadoCtx);
  if (!c) throw new Error("VenadoProvider missing");
  return c;
}

export const fmtDuration = (s: number) => {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};
export const fmtHMS = (s: number) => {
  const h = Math.floor(s / 3600).toString().padStart(2, "0");
  const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${h}:${m}:${sec}`;
};
