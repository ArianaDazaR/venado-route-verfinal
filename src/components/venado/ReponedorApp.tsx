import { useState, useEffect, useMemo } from "react";
import { Map, ClipboardList, Plus, History, User as UserIcon, Bell, Calendar, MapPin, Sparkles, CloudDownload, ChevronRight, Play, Store, ArrowLeft, Clock, Camera, CheckCircle2, Info, X, Tag, Sparkle, MessageSquare, ClipboardCheck, Check, LogOut } from "lucide-react";
import { useVenado, fmtDuration, fmtHMS, type Visit, type Task } from "@/lib/venado-store";
import { VenadoLogo } from "./VenadoLogo";

type Tab = "ruta" | "visitas" | "historial" | "perfil";

export function ReponedorApp() {
  const [tab, setTab] = useState<Tab>("ruta");
  const [activeVisit, setActiveVisit] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background pb-24">
      {activeVisit !== null ? (
        <VisitExecution visitId={activeVisit} onBack={() => setActiveVisit(null)} onComplete={() => { setActiveVisit(null); setTab("visitas"); }} />
      ) : (
        <>
          {tab === "ruta" && <MiRuta />}
          {tab === "visitas" && <Visitas onStart={id => setActiveVisit(id)} />}
          {tab === "historial" && <Historial />}
          {tab === "perfil" && <Perfil />}
        </>
      )}
      {activeVisit === null && <BottomNav tab={tab} setTab={setTab} />}
    </div>
  );
}

function Header() {
  const { userName } = useVenado();
  return (
    <div className="px-5 pt-6 pb-2 flex items-center justify-between">
      <VenadoLogo className="h-10 w-auto" />
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">¡Buenos días!</p>
          <p className="font-bold text-foreground">{userName}</p>
        </div>
        <button className="relative h-10 w-10 rounded-full flex items-center justify-center text-primary">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" />
        </button>
        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">JP</div>
      </div>
    </div>
  );
}

function DateChip() {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary text-sm font-medium">
        <Calendar className="h-4 w-4" />
        Lunes, 20 de mayo
      </div>
    </div>
  );
}

function MiRuta() {
  return (
    <div>
      <Header />
      <DateChip />
      <div className="px-5 mt-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-7 w-7 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Mi ruta de hoy</h2>
        </div>
        <p className="text-sm text-muted-foreground ml-9">Ruta más eficiente · 10 visitas programadas</p>

        <MapSim />

        <div className="mt-5 rounded-2xl bg-accent/60 p-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground">Ruta optimizada</h3>
            <p className="text-xs text-muted-foreground">Hemos calculado la ruta más eficiente para ahorrar tiempo y distancia.</p>
          </div>
          <button className="px-3 py-2 rounded-lg bg-card border border-border text-primary text-sm font-medium flex items-center gap-1">
            Ver detalle <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 rounded-2xl bg-accent/40 p-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CloudDownload className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground">Datos sincronizados</h3>
            <p className="text-xs text-muted-foreground">Última sincronización: Hoy 9:30 AM</p>
          </div>
          <ChevronRight className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}

function MapSim() {
  // Simulated map with 9 numbered pins along a path
  const pts = [
    [60, 130], [120, 60], [200, 70], [180, 130], [140, 175], [180, 200], [240, 165], [290, 90], [285, 50],
  ];
  const path = `M30 145 ${pts.map(p => `L${p[0]} ${p[1]}`).join(" ")} L320 130`;
  return (
    <div className="mt-4 rounded-2xl overflow-hidden border border-border bg-[oklch(0.96_0.02_140)] relative h-56">
      <svg viewBox="0 0 340 230" className="absolute inset-0 w-full h-full">
        {/* fake street grid */}
        <g stroke="oklch(0.88 0.02 140)" strokeWidth="6">
          <line x1="0" y1="50" x2="340" y2="50" />
          <line x1="0" y1="110" x2="340" y2="110" />
          <line x1="0" y1="170" x2="340" y2="170" />
          <line x1="60" y1="0" x2="60" y2="230" />
          <line x1="160" y1="0" x2="160" y2="230" />
          <line x1="240" y1="0" x2="240" y2="230" />
        </g>
        <g stroke="oklch(0.85 0.05 80)" strokeWidth="4">
          <line x1="0" y1="200" x2="340" y2="200" />
          <line x1="220" y1="0" x2="220" y2="230" />
        </g>
        <path d={path} stroke="oklch(0.55 0.2 260)" strokeWidth="4" fill="none" strokeDasharray="0" strokeLinecap="round" />
        <circle cx="30" cy="145" r="6" fill="oklch(0.36 0.18 265)" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r="11" fill="white" stroke="oklch(0.36 0.18 265)" strokeWidth="2.5" />
            <text x={p[0]} y={p[1] + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="oklch(0.36 0.18 265)">{i + 1}</text>
          </g>
        ))}
        <circle cx="320" cy="130" r="6" fill="oklch(0.2 0.05 265)" />
      </svg>
      <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-primary text-primary-foreground text-xs font-bold">Inicio</div>
      <div className="absolute top-[55%] right-3 px-2 py-1 rounded-md bg-primary text-primary-foreground text-xs font-bold">Fin</div>
    </div>
  );
}

function Visitas({ onStart }: { onStart: (id: number) => void }) {
  const { visits } = useVenado();
  const completed = visits.filter(v => v.estado === "completada").length;
  return (
    <div>
      <Header />
      <DateChip />
      <div className="px-5 mt-5">
        <div className="rounded-2xl bg-card border border-border p-4 grid grid-cols-3 gap-2">
          <Stat icon={<Map className="h-5 w-5" />} label="Distancia total" value="18.6 km" />
          <Stat icon={<Clock className="h-5 w-5" />} label="Tiempo estimado" value="4h 15m" />
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Progreso del día</p>
            <p className="text-xl font-bold text-foreground"><span className="text-primary">{completed}</span> / 10</p>
            <div className="flex gap-1 mt-1 justify-center">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={`h-2 w-2 rounded-sm ${i < completed ? "bg-primary" : "bg-border"}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">Mis visitas de hoy</h2>
            </div>
            <p className="text-xs text-muted-foreground ml-8">Tienes {visits.length} visitas programadas</p>
          </div>
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-3 -mx-5 px-5 snap-x">
          {visits.map(v => <VisitCard key={v.id} v={v} onStart={onStart} />)}
        </div>

        <div className="rounded-xl bg-accent/50 p-3 flex items-center gap-3 mt-2">
          <Info className="h-5 w-5 text-primary shrink-0" />
          <p className="text-xs text-muted-foreground flex-1">Completa todas tus microtareas y sube evidencia en cada visita para alcanzar el 100% de cumplimiento.</p>
          <ChevronRight className="h-4 w-4 text-primary" />
        </div>
      </div>
    </div>
  );
}

function VisitCard({ v, onStart }: { v: Visit; onStart: (id: number) => void }) {
  const locked = v.estado === "bloqueada";
  const done = v.estado === "completada";
  const active = v.estado === "disponible" || v.estado === "en_curso";
  return (
    <div className={`shrink-0 w-64 rounded-2xl border p-4 snap-start ${active ? "border-primary bg-card shadow-lg shadow-primary/10" : "border-border bg-card"} ${locked ? "opacity-60" : ""}`}>
      <div className="flex items-center justify-between">
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{v.id}</div>
        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center"><Store className="h-4 w-4 text-primary" /></div>
      </div>
      <h3 className="font-bold text-lg mt-3 leading-tight">{v.cliente}</h3>
      <div className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <div>{v.direccion}<br />{v.ciudad}</div>
      </div>
      <div className="mt-3 inline-block px-2 py-1 rounded-md bg-accent text-primary text-xs font-medium">Visita {v.id} de 10</div>
      {active && !done && (
        <button onClick={() => onStart(v.id)} className="mt-3 w-full h-10 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2">
          <Play className="h-4 w-4 fill-current" /> {v.estado === "en_curso" ? "Continuar" : "Iniciar visita"}
        </button>
      )}
      {done && (
        <div className="mt-3 w-full h-10 rounded-xl bg-success/15 text-success font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Completada
        </div>
      )}
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto h-10 w-10 rounded-full bg-accent flex items-center justify-center text-primary">{icon}</div>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
      <p className="text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}

// ============ VISIT EXECUTION ============

function VisitExecution({ visitId, onBack, onComplete }: { visitId: number; onBack: () => void; onComplete: () => void }) {
  const { visits, startVisit, startTask, completeTask, completeVisit } = useVenado();
  const visit = visits.find(v => v.id === visitId)!;
  const [tick, setTick] = useState(0);
  const [cameraTaskId, setCameraTaskId] = useState<number | null>(null);
  const [inventoryOpen, setInventoryOpen] = useState(false);

  useEffect(() => {
    if (visit.estado !== "en_curso") startVisit(visitId);
  }, []);

  useEffect(() => {
    const i = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(i);
  }, []);

  const totalElapsed = visit.inicio ? Math.floor((Date.now() - visit.inicio) / 1000) : 0;
  const completedCount = visit.tareas.filter(t => t.estado === "completada").length;

  useEffect(() => {
    if (completedCount === 5 && visit.estado === "en_curso") {
      completeVisit(visitId);
      setTimeout(onComplete, 600);
    }
  }, [completedCount]);

  const handleTakePhoto = (taskId: number) => {
    setCameraTaskId(taskId);
    setTimeout(() => {
      completeTask(visitId, taskId, "/photo-evidence.jpg");
      setCameraTaskId(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="px-5 pt-6 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="h-10 w-10 rounded-full flex items-center justify-center text-foreground">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <VenadoLogo className="h-9 w-auto" />
        <div className="flex items-center gap-2">
          <button className="relative h-10 w-10 rounded-full flex items-center justify-center text-primary">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" />
          </button>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-sm">JP</div>
        </div>
      </div>

      <div className="px-5 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-black tracking-tight">EJECUCIÓN DE TAREAS</h1>
          <p className="text-sm text-muted-foreground">{visit.cliente} ({visit.codigo})</p>
        </div>
        <div className="rounded-xl bg-accent px-3 py-2 flex items-center gap-2 shrink-0">
          <Clock className="h-6 w-6 text-primary" />
          <div>
            <p className="text-lg font-bold text-primary leading-none font-mono">{fmtHMS(totalElapsed)}</p>
            <p className="text-[10px] text-muted-foreground">Tiempo de visita</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <div className="rounded-2xl bg-card border border-border p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progreso de tareas</span>
            <span className="text-foreground font-medium">{completedCount} de 5 completadas</span>
          </div>
          <div className="flex gap-1.5">
            {visit.tareas.map(t => (
              <div key={t.id} className={`h-2 flex-1 rounded-full ${t.estado === "completada" ? "bg-primary" : t.estado === "en_curso" ? "bg-primary/40" : "bg-border"}`} />
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {visit.tareas.map(t => (
            <TaskCard key={t.id} task={t} onStart={() => startTask(visitId, t.id)} onComplete={() => completeTask(visitId, t.id)}
              onTakePhoto={() => handleTakePhoto(t.id)} onOpenInventory={() => { startTask(visitId, t.id); setInventoryOpen(true); }} />
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-accent/50 p-4 flex items-center gap-3">
          <Sparkle className="h-6 w-6 text-warning" />
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">Completa las 5 tareas para finalizar la visita</p>
            <p className="text-xs text-muted-foreground">El tiempo se registra automáticamente por tarea.</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 bg-background border-t border-border p-3 z-10">
        <button onClick={() => {
          const next = visit.tareas.find(t => t.estado !== "completada");
          if (next) handleTakePhoto(next.id);
        }} className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2">
          <Camera className="h-5 w-5" /> Tomar evidencia general
        </button>
      </div>

      {cameraTaskId !== null && <CameraMockup />}
      {inventoryOpen && <InventorySheet onSave={() => {
        const t5 = visit.tareas.find(t => t.id === 5);
        if (t5) completeTask(visitId, 5);
        setInventoryOpen(false);
      }} onClose={() => setInventoryOpen(false)} />}
    </div>
  );
}

const taskIcon = (id: number) => {
  if (id === 1) return <Store className="h-7 w-7 text-primary" />;
  if (id === 2) return <Tag className="h-7 w-7 text-primary" />;
  if (id === 3) return <Sparkle className="h-7 w-7 text-primary" />;
  if (id === 4) return <MessageSquare className="h-7 w-7 text-primary" />;
  return <ClipboardCheck className="h-7 w-7 text-primary" />;
};

function TaskCard({ task, onStart, onComplete, onTakePhoto, onOpenInventory }: { task: Task; onStart: () => void; onComplete: () => void; onTakePhoto: () => void; onOpenInventory: () => void }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (task.estado === "en_curso") {
      const i = setInterval(() => setTick(t => t + 1), 1000);
      return () => clearInterval(i);
    }
  }, [task.estado]);
  const elapsed = task.inicio && task.estado === "en_curso" ? Math.floor((Date.now() - task.inicio) / 1000) : task.duracionSegundos;

  return (
    <div className="rounded-2xl bg-card border border-border p-4">
      <div className="flex items-start gap-3">
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${task.estado === "completada" ? "bg-primary text-primary-foreground" : task.estado === "en_curso" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{task.id}</div>
        <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center shrink-0">{taskIcon(task.id)}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground leading-tight">{task.nombre}</h3>
          <p className="text-xs text-muted-foreground mt-1">{task.descripcion}</p>
        </div>
        <div className="text-right shrink-0">
          {task.estado === "completada" && (
            <>
              <div className="flex items-center gap-1 text-success font-medium text-sm"><CheckCircle2 className="h-4 w-4" /> Completada</div>
              <div className="mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-success/10 text-success text-xs"><Clock className="h-3 w-3" /> {fmtDuration(task.duracionSegundos)} min</div>
            </>
          )}
          {task.estado === "en_curso" && (
            <>
              <div className="flex items-center gap-1 text-primary font-medium text-sm"><Clock className="h-4 w-4" /> En curso</div>
              <div className="mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono">{fmtDuration(elapsed)}</div>
            </>
          )}
          {task.estado === "pendiente" && (
            <div className="flex items-center gap-1 text-muted-foreground text-sm"><Clock className="h-4 w-4" /> Pendiente</div>
          )}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {task.requiereFoto ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-primary text-xs font-medium"><Camera className="h-3.5 w-3.5" /> Evidencia requerida</div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/60 text-muted-foreground text-xs"><Info className="h-3.5 w-3.5" /> Sin evidencia requerida</div>
        )}
        {task.estado !== "completada" && (
          <>
            {task.estado === "pendiente" && task.id !== 5 && (
              <button onClick={onStart} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1">
                <Play className="h-3 w-3 fill-current" /> Iniciar
              </button>
            )}
            {task.id === 5 && (
              <button onClick={onOpenInventory} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold">Abrir inventario</button>
            )}
            {task.requiereFoto && task.estado === "en_curso" && (
              <button onClick={onTakePhoto} className="px-3 py-1.5 rounded-lg border border-primary text-primary text-xs font-medium flex items-center gap-1">
                <Camera className="h-3.5 w-3.5" /> Tomar foto
              </button>
            )}
            {!task.requiereFoto && task.estado === "en_curso" && task.id !== 5 && (
              <button onClick={onComplete} className="px-3 py-1.5 rounded-lg border border-success text-success text-xs font-medium">Marcar completa</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function CameraMockup() {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center text-white">
      <div className="border-2 border-white/40 w-72 h-96 rounded-2xl flex items-center justify-center relative">
        <div className="absolute top-3 left-3 h-3 w-3 border-t-2 border-l-2 border-white" />
        <div className="absolute top-3 right-3 h-3 w-3 border-t-2 border-r-2 border-white" />
        <div className="absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-white" />
        <div className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-white" />
        <Camera className="h-16 w-16 text-white animate-pulse" />
      </div>
      <p className="mt-4 text-sm">Capturando evidencia...</p>
      <div className="mt-6 h-16 w-16 rounded-full border-4 border-white flex items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-white animate-pulse" />
      </div>
    </div>
  );
}

function InventorySheet({ onSave, onClose }: { onSave: () => void; onClose: () => void }) {
  const cats = ["Salsas, culinarias, postres y cereales", "Panadería y pastelería", "Bebidas", "Cuidado personal y del hogar"];
  const [cat, setCat] = useState(2);
  const products = [
    { name: "Frussion", qty: 50 },
    { name: "De la granja", qty: 0 },
    { name: "Casa del Camba", qty: 0 },
  ];
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [qty, setQty] = useState<Record<string, number>>(Object.fromEntries(products.map(p => [p.name, p.qty])));

  return (
    <div className="fixed inset-0 z-40 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full bg-card rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="mx-auto h-1.5 w-12 rounded-full bg-border" />
        <div className="mt-4 flex items-start gap-3">
          <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center"><ClipboardCheck className="h-6 w-6 text-primary" /></div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">Toma de inventario</h3>
            <p className="text-xs text-muted-foreground">Anota lo que necesitas reponer durante tu visita.</p>
          </div>
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {cats.map((c, i) => (
            <button key={i} onClick={() => setCat(i)} className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium border ${cat === i ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground"}`}>{c}</button>
          ))}
        </div>

        <p className="mt-4 text-xs font-bold tracking-wider text-primary">{cats[cat].toUpperCase()}</p>
        <div className="mt-2 rounded-xl border border-border divide-y divide-border">
          {products.map(p => (
            <div key={p.name} className="flex items-center gap-3 p-3">
              <input type="checkbox" checked={!!checked[p.name]} onChange={e => setChecked(c => ({ ...c, [p.name]: e.target.checked }))} className="h-5 w-5 rounded accent-primary" />
              <span className="flex-1 text-sm">{p.name}</span>
              <input type="number" value={qty[p.name] || ""} onChange={e => setQty(q => ({ ...q, [p.name]: Number(e.target.value) }))} className="w-16 h-9 rounded border border-border bg-card text-right pr-2 text-sm" />
              <span className="text-xs text-muted-foreground w-6">qt.</span>
            </div>
          ))}
        </div>

        <button onClick={onSave} className="mt-5 w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="h-5 w-5" /> Guardar inventario
        </button>
      </div>
    </div>
  );
}

// ============ HISTORIAL ============

function Historial() {
  const { visits } = useVenado();
  const done = visits.filter(v => v.estado === "completada");
  return (
    <div>
      <Header />
      <div className="px-5 mt-4">
        <h1 className="text-2xl font-bold">Historial de visitas</h1>
        <p className="text-sm text-muted-foreground">Revisa tus actividades anteriores y el desempeño registrado.</p>

        {done.length === 0 && (
          <div className="mt-10 text-center text-muted-foreground text-sm">Aún no has completado visitas hoy.<br />Inicia una visita para verla aquí.</div>
        )}

        <div className="mt-5 space-y-4">
          {done.map(v => <HistoryCard key={v.id} v={v} />)}
        </div>
      </div>
    </div>
  );
}

function HistoryCard({ v }: { v: Visit }) {
  const total = v.tareas.reduce((s, t) => s + t.duracionSegundos, 0);
  const totalMin = Math.max(1, Math.round(total / 60));
  const eficiencia = Math.min(99, Math.round((30 / Math.max(totalMin, 1)) * 97));
  const fmt = (ts: number | null) => ts ? new Date(ts).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }) : "--";
  return (
    <div className="rounded-2xl bg-card border border-border p-4">
      <div className="flex items-start gap-3">
        <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center"><Store className="h-7 w-7 text-primary-foreground" /></div>
        <div className="flex-1">
          <h3 className="font-bold text-lg leading-tight">{v.cliente}</h3>
          <p className="text-xs text-muted-foreground">Código: {v.codigo}</p>
          <div className="mt-2 flex gap-2">
            <span className="px-2 py-0.5 rounded-md bg-accent text-primary text-xs font-medium">{v.tipo.toUpperCase()}</span>
            <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs">Zona: La Paz</span>
          </div>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <div className="flex items-center gap-1 justify-end"><Calendar className="h-3 w-3" /> Hoy</div>
          <div>Inicio: {fmt(v.inicio)}</div>
          <div>Fin: {fmt(v.fin)}</div>
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Resumen de tareas</span>
          <span className="text-primary font-medium">5 de 5 tareas completadas</span>
        </div>
        <div className="space-y-2">
          {v.tareas.map(t => (
            <div key={t.id} className="flex items-center gap-3 text-sm">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{t.id}</div>
              <span className="flex-1 truncate">{t.nombre}</span>
              <span className="text-xs text-muted-foreground"><Clock className="h-3 w-3 inline" /> {fmtDuration(t.duracionSegundos)} min</span>
              <Check className="h-4 w-4 text-success" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 border-t border-border pt-3">
        <SummaryStat label="Tiempo total" value={`${totalMin} min`} sub="Promedio 30 min" />
        <SummaryStat label="Tareas" value="5/5" sub="100%" />
        <SummaryStat label="Eficiencia" value={`${eficiencia}%`} sub="Muy buena" />
        <SummaryStat label="Calidad" value="A" sub="¡Excelente!" />
      </div>
    </div>
  );
}

function SummaryStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="text-center">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="text-lg font-bold text-primary">{value}</p>
      <p className="text-[10px] text-muted-foreground">{sub}</p>
    </div>
  );
}

// ============ PERFIL ============

function Perfil() {
  const { userName, logout } = useVenado();
  return (
    <div>
      <Header />
      <div className="px-5 mt-6 flex flex-col items-center">
        <div className="h-28 w-28 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-3xl font-bold">JP</div>
        <h2 className="mt-3 text-xl font-bold">{userName}</h2>
        <p className="text-sm text-muted-foreground">Reponedor · Ruta Norte</p>
        <span className="mt-1 px-3 py-1 rounded-full bg-success/15 text-success text-xs font-medium">En ruta</span>
      </div>
      <div className="px-5 mt-6 space-y-2">
        {[
          ["Código", "RV-1234"],
          ["Teléfono", "+591 70000000"],
          ["Correo", "juan.perez@venadoroute.com"],
          ["Inicio de jornada", "7:30 a. m."],
          ["Última sincronización", "Hoy 9:30 AM"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-card border border-border p-3 flex justify-between text-sm">
            <span className="text-muted-foreground">{k}</span>
            <span className="font-medium text-foreground">{v}</span>
          </div>
        ))}
        <button onClick={logout} className="mt-4 w-full h-12 rounded-xl bg-destructive/10 text-destructive font-bold flex items-center justify-center gap-2">
          <LogOut className="h-4 w-4" /> Cerrar sesión
        </button>
      </div>
    </div>
  );
}

// ============ BOTTOM NAV ============

function BottomNav({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const items: { k: Tab | "nueva"; label: string; icon: React.ReactNode }[] = [
    { k: "ruta", label: "Mi ruta", icon: <Map className="h-5 w-5" /> },
    { k: "visitas", label: "Visitas", icon: <ClipboardList className="h-5 w-5" /> },
    { k: "nueva", label: "Nueva visita", icon: <Plus className="h-6 w-6" /> },
    { k: "historial", label: "Historial", icon: <History className="h-5 w-5" /> },
    { k: "perfil", label: "Perfil", icon: <UserIcon className="h-5 w-5" /> },
  ];
  return (
    <div className="fixed bottom-0 inset-x-0 bg-card border-t border-border z-20">
      <div className="grid grid-cols-5 px-2 py-2 pb-3">
        {items.map(i => {
          if (i.k === "nueva") return (
            <div key="nueva" className="flex flex-col items-center justify-end">
              <button className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 -mt-6">
                <Plus className="h-7 w-7" />
              </button>
              <span className="text-[10px] text-muted-foreground mt-1">Nueva visita</span>
            </div>
          );
          const active = tab === i.k;
          return (
            <button key={i.k} onClick={() => setTab(i.k as Tab)} className={`flex flex-col items-center gap-1 py-1 ${active ? "text-primary" : "text-muted-foreground"}`}>
              {i.icon}
              <span className="text-[10px] font-medium">{i.label}</span>
              {active && <div className="h-0.5 w-6 bg-primary rounded-full" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
