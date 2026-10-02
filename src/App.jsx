import { useEffect, useRef, useState } from "react";
import {
  motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll,
} from "framer-motion";
import { Github, Linkedin, Mail, Download, Trophy, ExternalLink, MessageCircle, X } from "lucide-react";
import felipe from "./assets/img/felipe.jpg";
import hackathon from "./assets/img/hackathon.jpg";
import achei1 from "./assets/img/achei1.jpg";
import achei2 from "./assets/img/achei2.jpg";
import achei3 from "./assets/img/achei3.jpg";
import creperia from "./assets/img/creperia.jpg";
import bot from "./assets/img/bot.jpg";
import somConquista from "./assets/audio/conquista.mp3";

const LINKS = {
  github: "https://github.com/Felpzzcr7", 
  linkedin: "https://www.linkedin.com/in/felipeleandroc",
  email: "felipinholeandro0@gmail.com",
  cv: "/curriculo.pdf",
  whatsapp: "https://wa.me/5512988244925"
};
const STATS = [["REACT", 82], ["TS", 76], ["JAVA", 70], ["C", 64], ["SQL", 68], ["GIT", 74]];
const TEAM = [
  ["Luís Perossi", "https://www.linkedin.com/in/luisperossi/pt/"],
  ["Rafael Kenji Obara", "https://www.linkedin.com/in/rafaelknji/"],
  ["Mateus Fonseca", "https://www.linkedin.com/in/mateus-fonseca-souza/pt/"],
];
const BAG = [
  ["Código", "text-cyan", ["JavaScript", "TypeScript", "React", "Node", "Java", "POO", "C", "Python", "HTML", "CSS"]],
  ["Dados", "text-mint", ["SQL", "MySQL"]],
  ["Ferramentas", "text-pink", ["Git", "Figma", "VS Code", "Vercel", "Cloudflare"]],
];
const TIMELINE = [
  { when: "2026", title: "3º lugar no Hackathon IFSP Caraguatatuba", where: "Equipe Pedra da Freira · 30 horas de projeto", c: "#ff3d81", trophy: true },
  { when: "2025 – 2027", title: "Tecnologia em Análise e Desenvolvimento de Sistemas", where: "IFSP · Caraguatatuba, SP · cursando", c: "#22e4ff" },
  { when: "2022 – 2024", title: "Técnico em Serviços Jurídicos", where: "Idalina da Amaral Graça · Ubatuba, SP · formado", c: "#8b5cf6" },
  { when: "2020 – atual", title: "Vendedor ambulante", where: "Ubatuba, SP · atendimento e negociação direta", c: "#34f5a0" },
  { when: "2019 – 2020", title: "Vendedor de motos", where: "Diego Motos · Ubatuba, SP", c: "#ffb020" },
];

/* ===== UTILITÁRIOS ===== */
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: "easeOut" }}>
    {children}
  </motion.div>
);

const H2 = ({ children, sub }) => (
  <Reveal className="mb-12">
    <h2 className="font-display text-6xl md:text-8xl font-black uppercase leading-[0.9] text-white">{children}</h2>
    {sub && <p className="mt-4 max-w-md text-slate-400">{sub}</p>}
  </Reveal>
);

function Magnetic({ children, className, href, download }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 14 }), sy = useSpring(y, { stiffness: 200, damping: 14 });
  return (
    <motion.a ref={ref} href={href} download={download} style={{ x: sx, y: sy }} whileTap={{ scale: 0.95 }} className={className}
      onMouseMove={(e) => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.3); y.set((e.clientY - r.top - r.height / 2) * 0.3); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.a>
  );
}

function Glow({ color, children, className = "" }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} style={{ "--c": color }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); }}
      className={`group relative overflow-hidden rounded-3xl bg-white/10 p-px ${className}`}>
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(320px circle at var(--mx) var(--my), var(--c), transparent 70%)" }} />
      <div className="relative h-full rounded-[23px] bg-panel">{children}</div>
    </motion.div>
  );
}

/* ===== HERO: carta de jogador ===== */
function PlayerCard() {
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 }), sry = useSpring(ry, { stiffness: 150, damping: 15 });
  const sheen = useTransform(sry, [-15, 15], ["0%", "100%"]);
  return (
    <div style={{ perspective: 900 }} className="relative mx-auto w-[300px] sm:w-[340px]">
      <motion.div
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); ry.set(((e.clientX - r.left) / r.width - 0.5) * 30); rx.set(-((e.clientY - r.top) / r.height - 0.5) * 30); }}
        onMouseLeave={() => { rx.set(0); ry.set(0); }}
        initial={{ opacity: 0, y: 60, rotate: 6 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.5, duration: 0.9, type: "spring" }}
        style={{ rotateX: srx, rotateY: sry }}
        className="relative rounded-[28px] bg-gradient-to-br from-cyan via-vio to-pink p-[3px] shadow-[0_0_60px_-10px_#8b5cf6]">
        <div className="relative overflow-hidden rounded-[25px] bg-ink">
          <img src={felipe} alt="Felipe" className="h-[330px] w-full object-cover object-[50%_25%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          <div className="absolute left-4 top-3 font-display text-white">
            <p className="text-6xl font-black leading-none">78</p>
            <p className="text-lg font-bold text-cyan">DEV</p>
          </div>
          <div className="absolute right-4 top-4 rounded-md bg-mint px-2 py-1 font-pixel text-[9px] text-ink">SP</div>
          <div className="relative -mt-16 px-5 pb-5">
            <p className="text-center font-display text-4xl font-black uppercase text-white">Felipe Leandro</p>
            <div className="mt-3 grid grid-cols-3 gap-x-3 gap-y-1 border-t border-white/15 pt-3 font-display text-xl">
              {STATS.map(([k, v]) => (
                <p key={k} className="text-white">{v} <span className="text-sm text-slate-400">{k}</span></p>
              ))}
            </div>
          </div>
          <motion.div className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{ backgroundImage: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,.55) 50%, transparent 70%)", backgroundSize: "250% 100%", backgroundPositionX: sheen }} />
        </div>
      </motion.div>
      {[["🛹 skate", "-left-6 top-14 -rotate-12 bg-cyan"], ["🎮 games", "-right-6 top-52 rotate-6 bg-pink"], ["⚽ futebol", "-left-3 bottom-8 rotate-3 bg-mint"]].map(([t, c], i) => (
        <motion.span key={t} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 + i * 0.15, type: "spring" }}
          className={`absolute ${c} rounded-lg px-3 py-1.5 font-display text-xl font-extrabold uppercase text-ink shadow-lg`}>{t}</motion.span>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-24">
      <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-vio/30 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-pink/25 blur-[120px]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 md:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-pixel text-[10px] leading-relaxed text-mint">
            PLAYER 1 · UBATUBA, SP
          </motion.p>
          <h1 className="mt-4 font-display font-black uppercase leading-[0.82]">
            <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="block text-[26vw] text-white md:text-[10rem]">Felipe</motion.span>
            <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.7 }} className="stroke block text-[20vw] md:text-[7.5rem]">Leandro</motion.span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-8 max-w-md text-lg text-slate-300">
            Estudante de Análise e Desenvolvimento de Sistemas no IFSP e desenvolvedor front-end. Fora do código, você me encontra de skate, no videogame ou jogando bola.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-10 flex flex-wrap gap-4">
            <Magnetic href={LINKS.cv} download className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan via-vio to-pink px-7 py-3.5 font-bold text-white shadow-[0_0_34px_-4px_#8b5cf6] transition-shadow hover:shadow-[0_0_50px_0_#22e4ff]">
              <Download size={18} className="animate-bounce" /> Baixar currículo
            </Magnetic>
            <a href="#projetos" className="rounded-full border border-white/20 px-7 py-3.5 font-semibold transition-colors hover:border-cyan hover:text-cyan">Ver projetos</a>
          </motion.div>
        </div>
        <PlayerCard />
      </div>
    </section>
  );
}

function Bag() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <H2 sub="Tecnologias com que estudo, prototipo e publico.">Na mochila</H2>
      <div className="grid gap-5 md:grid-cols-[1.6fr_1fr_1fr]">
        {BAG.map(([t, col, items], i) => (
          <Reveal key={t} delay={i * 0.1}>
            <div className="h-full rounded-3xl border border-white/10 bg-panel/70 p-6">
              <h3 className={`font-display text-3xl font-extrabold uppercase ${col}`}>{t}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {items.map((s) => (
                  <motion.span key={s} whileHover={{ y: -3, scale: 1.06 }} className="cursor-default rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold">{s}</motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-5 rounded-3xl border border-white/10 bg-panel/70 p-6 text-slate-300">
        Comunicação clara e bom relacionamento com equipes e clientes, fruto de anos no atendimento direto. Inglês B1.
      </Reveal>
    </section>
  );
}

const Tag = ({ children, color }) => (
  <span className="rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: `${color}66`, color }}>{children}</span>
);

function Featured() {
  return (
    <Reveal>
      <Glow color="#ff3d81">
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-pink px-4 py-1.5 text-sm font-bold text-ink"><Trophy size={16} /> 3º lugar · Hackathon IFSP 2026</span>
            <h3 className="mt-5 font-display text-6xl font-black uppercase leading-none text-white">AcheiEscola</h3>
            <p className="mt-4 text-slate-300">
              Plataforma para dar transparência às vagas da rede municipal de ensino. Pais e responsáveis consultam vagas, acompanham a posição na fila, veem os critérios de atendimento e os documentos de matrícula. A Secretaria de Educação ganha uma visão consolidada para planejar a oferta.
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Minha parte: ideação das funcionalidades, front-end, protótipo no Figma, documentação e análise do código gerado com IA. Feito em cerca de 30 horas.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">{["React", "Cloudflare", "Figma"].map((t) => <Tag key={t} color="#ff3d81">{t}</Tag>)}</div>
            <p className="mt-6 text-sm text-slate-400">
              Equipe Pedra da Freira:{" "}
              {TEAM.map(([n, l], i) => (<span key={n}><a href={l} target="_blank" rel="noreferrer" className="text-cyan underline-offset-4 hover:underline">{n}</a>{i < 2 ? ", " : " e eu."}</span>))}
            </p>
          </div>
          <div className="relative min-h-[380px]">
            <motion.img whileHover={{ rotate: 0, scale: 1.04 }} src={achei1} alt="AcheiEscola: lista de escolas" className="absolute left-0 top-0 w-[38%] -rotate-6 rounded-2xl border border-white/20 shadow-2xl" />
            <motion.img whileHover={{ rotate: 0, scale: 1.04 }} src={achei2} alt="AcheiEscola: tela do app" className="absolute left-[30%] top-8 w-[38%] rotate-3 rounded-2xl border border-white/20 shadow-2xl" />
            <motion.img whileHover={{ rotate: 0, scale: 1.05 }} src={hackathon} alt="Equipe com as medalhas do Hackathon 2026" className="absolute bottom-0 right-0 w-[56%] rotate-2 rounded-2xl border-4 border-white shadow-2xl" />
          </div>
        </div>
      </Glow>
    </Reveal>
  );
}

function Card({ color, title, desc, tags, href, label, children }) {
  return (
    <Reveal className="h-full">
      <Glow color={color} className="h-full">
        <div className="flex h-full flex-col">
          <div className="overflow-hidden rounded-t-[23px] border-b border-white/10">{children}</div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-4xl font-black uppercase text-white">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">{tags.map((t) => <Tag key={t} color={color}>{t}</Tag>)}</div>
            {href && <a href={href} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold" style={{ color }}>{label} <ExternalLink size={14} /></a>}
          </div>
        </div>
      </Glow>
    </Reveal>
  );
}

function Projects() {
  const img = "h-48 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105";
  return (
    <section id="projetos" className="mx-auto max-w-6xl px-6 py-28">
      <H2 sub="Do hackathon ao que roda em produção.">Projetos</H2>
      <Featured />
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card color="#8b5cf6" title="DevTrack" desc="Dashboard full-stack com o histórico dos meus estudos: o que estudei, quanto tempo e como evoluí em cada tecnologia." tags={["React", "TypeScript", "SQL"]} href="https://dev-track-one-eta.vercel.app" label="Visitar o site">
          <div className="flex h-48 items-end gap-2 bg-gradient-to-br from-vio/30 to-transparent p-6">
            {[35, 60, 45, 80, 55, 95, 70].map((h, i) => (
              <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7 }} className="flex-1 rounded-t-md bg-gradient-to-t from-vio to-cyan" />
            ))}
          </div>
        </Card>
        <Card color="#22e4ff" title="Bot da Shopee" desc="Automação serverless: recebe um link de produto no Telegram e devolve o link de afiliado com a prévia da oferta." tags={["TypeScript", "Vercel", "Serverless"]} href="https://t.me/Felpzz_shopee_bot" label="Abrir @Felpzz_shopee_bot">
          <img src={bot} alt="Conversa com o bot no Telegram" className={img} />
        </Card>
        <Card color="#ffb020" title="Creperia Caiçara" desc="Site de uma creperia artesanal de Ubatuba, com cardápio, localização e identidade visual leve, inspirada no mar." tags={["React", "Vercel", "Figma"]} href="https://creperia-caicara.vercel.app/" label="Visitar o site">
          <img src={creperia} alt="Site da Creperia Caiçara" className={img} />
        </Card>
      </div>
    </section>
  );
}

function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  return (
    <section className="mx-auto max-w-3xl px-6 py-28">
      <H2 sub="Estudos, trabalho e a conquista mais recente.">Trajetória</H2>
      <div ref={ref} className="relative pl-12">
        <div className="absolute left-[15px] top-0 h-full w-0.5 bg-white/10" />
        <motion.div style={{ scaleY: scrollYProgress, transformOrigin: "top" }} className="absolute left-[15px] top-0 h-full w-0.5 bg-gradient-to-b from-pink via-vio to-mint shadow-[0_0_12px_#8b5cf6]" />
        {TIMELINE.map((t) => (
          <Reveal key={t.title} className="relative mb-10 last:mb-0">
            <span className="absolute -left-12 top-1 grid h-8 w-8 place-items-center rounded-full border-2 bg-ink" style={{ borderColor: t.c, boxShadow: `0 0 16px ${t.c}` }}>
              {t.trophy ? <Trophy size={14} color={t.c} /> : <i className="h-2.5 w-2.5 rounded-full" style={{ background: t.c }} />}
            </span>
            <p className="font-display text-2xl font-extrabold" style={{ color: t.c }}>{t.when}</p>
            <h3 className="text-lg font-bold text-white">{t.title}</h3>
            <p className="text-sm text-slate-400">{t.where}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const items = [[Github, "GitHub", LINKS.github], [Linkedin, "LinkedIn", LINKS.linkedin], [Mail, "E-mail", `mailto:${LINKS.email}`], [MessageCircle, "WhatsApp", LINKS.whatsapp]];
  return (
    <footer className="relative overflow-hidden px-6 pb-12 pt-28 text-center">
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-vio/25 to-transparent" />
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <p className="font-pixel text-[10px] text-mint">CONTINUAR?</p>
          <h2 className="mt-4 font-display text-7xl font-black uppercase leading-[0.85] text-white md:text-9xl">Bora <span className="stroke">conversar</span></h2>
          <p className="mx-auto mt-6 max-w-md text-slate-400">Aberto a estágios, projetos e trocas sobre desenvolvimento. Se for para falar de skate ou de jogo, também.</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap justify-center gap-3">
          {items.map(([Icon, l, h]) => (
            <motion.a key={l} href={h} target="_blank" rel="noreferrer" whileHover={{ y: -4, boxShadow: "0 0 28px -4px #ff3d81" }} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold transition-colors hover:border-pink">
              <Icon size={18} /> {l}
            </motion.a>
          ))}
        </Reveal>
        <p className="mt-16 text-xs text-slate-600">© {new Date().getFullYear()} Felipe Leandro Alves Costa · Ubatuba, SP</p>
      </div>
    </footer>
  );
}

function Achievement() {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const audio = new Audio(somConquista); 
    audio.preload = "auto";
    audio.volume = 0.4;

    const dispararConquista = (evento) => {
      if (evento.type === "scroll" && window.scrollY < 50) return;

      setShow(true);
  
      audio.play().catch(erro => console.log("Áudio bloqueado:", erro));
      
      window.removeEventListener("click", dispararConquista);
      window.removeEventListener("keydown", dispararConquista);
      window.removeEventListener("scroll", dispararConquista);
      window.removeEventListener("touchend", dispararConquista);
      
      setTimeout(() => setShow(false), 7000);
    };

    window.addEventListener("click", dispararConquista);
    window.addEventListener("keydown", dispararConquista);
    window.addEventListener("scroll", dispararConquista);
    window.addEventListener("touchend", dispararConquista);
    
    return () => {
      window.removeEventListener("click", dispararConquista);
      window.removeEventListener("keydown", dispararConquista);
      window.removeEventListener("scroll", dispararConquista);
      window.removeEventListener("touchend", dispararConquista);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ x: 400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 400, opacity: 0 }} transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-pink/60 bg-panel/95 p-4 shadow-[0_0_40px_-6px_#ff3d81] backdrop-blur">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-pink text-ink"><Trophy /></span>
          <div>
            <p className="font-pixel text-[8px] text-mint">CONQUISTA DESBLOQUEADA</p>
            <p className="mt-1 text-sm font-bold text-white">3º lugar no Hackathon IFSP 2026</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); setShow(false); }} aria-label="Fechar" className="ml-2 text-slate-400 hover:text-white"><X size={16} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="min-h-screen overflow-x-hidden">
      <Hero />
      <Bag />
      <Projects />
      <Timeline />
      <Contact />
      <Achievement />
    </motion.main>
  );
}