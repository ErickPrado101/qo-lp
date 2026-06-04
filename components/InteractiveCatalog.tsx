"use client";

import { useMemo, useState } from "react";

type BuilderSelections = {
  tipoSistema: string | null;
  nicho: string | null;
  estrutura: string | null;
  visual: string | null;
  assist: string[];
  modelo: string | null;
};

const SISTEMAS = ["Loja", "E-commerce", "Prestador de serviço"] as const;
const NICHOS: Record<(typeof SISTEMAS)[number], readonly string[]> = {
  Loja: ["Moda", "Alimentação", "Estética", "Tecnologia", "Barbearia", "Studio"],
  "E-commerce": ["Produtos físicos", "Produtos digitais", "Marketplace", "Dropshipping", "Cosméticos"],
  "Prestador de serviço": ["Agência", "Consultoria", "Design", "Marketing", "Social media", "Audiovisual"]
};
const ESTRUTURAS = [
  "Landing Page",
  "Site Institucional",
  "Loja Virtual",
  "Página de Captura",
  "Sistema Multi Página",
  "Portfólio Profissional"
] as const;
const VISUAIS = ["Premium escuro", "Futurista", "Minimalista", "Corporativo", "Urbano", "Luxo moderno"] as const;
const ASSIST = [
  "Social media",
  "Videomaker",
  "Publicidade presencial",
  "Branding",
  "Manual da marca",
  "Consultoria visual"
] as const;
const MODELOS = ["Minimal", "Luxury", "Bold"] as const;

function OptionButton({
  selected,
  children,
  onClick
}: {
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "group rounded-2xl border p-4 text-left text-sm transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 dark:focus-visible:outline-white/40 sm:p-5 " +
        (selected
          ? "border-black/15 bg-white/85 text-black shadow-[0_18px_60px_rgba(0,0,0,0.12)] dark:border-white/25 dark:bg-white/[0.08] dark:text-white"
          : "border-black/10 bg-white/70 text-black/80 hover:-translate-y-1 hover:border-black/25 hover:bg-white/90 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/85 dark:hover:border-white/20 dark:hover:bg-white/[0.07]")
      }
    >
      <div className="flex items-center justify-between gap-4">
        <span>{children}</span>
        <span
          className={
            "h-2.5 w-2.5 rounded-full transition " +
            (selected
              ? "bg-black/70 shadow-[0_0_18px_rgba(0,0,0,0.25)] dark:bg-white/80 dark:shadow-[0_0_18px_rgba(255,255,255,0.22)]"
              : "bg-black/20 group-hover:bg-black/35 dark:bg-white/15 dark:group-hover:bg-white/25")
          }
        />
      </div>
    </button>
  );
}

export function InteractiveCatalog() {
  const [sel, setSel] = useState<BuilderSelections>({
    tipoSistema: null,
    nicho: null,
    estrutura: null,
    visual: null,
    assist: [],
    modelo: null
  });

  const whatsappHref = useMemo(() => {
    const msg =
      `Olá! Quero montar meu sistema com a Quality Originals:%0A` +
      `- Tipo de sistema: ${encodeURIComponent(sel.tipoSistema ?? "(não definido)")}%0A` +
      `- Nicho: ${encodeURIComponent(sel.nicho ?? "(não definido)")}%0A` +
      `- Estrutura digital: ${encodeURIComponent(sel.estrutura ?? "(não definido)")}%0A` +
      `- Estrutura visual: ${encodeURIComponent(sel.visual ?? "(não definido)")}%0A` +
      `- Assistência: ${encodeURIComponent(sel.assist.length ? sel.assist.join(", ") : "(nenhuma)")}%0A` +
      `- Modelo base: ${encodeURIComponent(sel.modelo ?? "(não definido)")}%0A%0A` +
      `Pode me orientar nos próximos passos?`;

    return `https://wa.me/5527933002825?text=${msg}`;
  }, [sel.assist, sel.estrutura, sel.modelo, sel.nicho, sel.tipoSistema, sel.visual]);

  const progress = useMemo(() => {
    let done = 0;
    if (sel.tipoSistema) done += 1;
    if (sel.nicho) done += 1;
    if (sel.estrutura) done += 1;
    if (sel.visual) done += 1;
    if (sel.assist.length) done += 1;
    if (sel.modelo) done += 1;
    return Math.round((done / 6) * 100);
  }, [sel.assist.length, sel.estrutura, sel.modelo, sel.nicho, sel.tipoSistema, sel.visual]);

  const nichosDisponiveis = sel.tipoSistema ? NICHOS[sel.tipoSistema as (typeof SISTEMAS)[number]] : [];

  return (
    <div className="mt-10">
      <div className="glass rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-black/70 dark:text-white/70">
              QUALITY ORIGINALS · Sistema Interativo de Construção Empresarial
            </div>
            <div className="mt-2 text-sm text-black/65 dark:text-white/65">
              O fluxo aparece de forma fragmentada para baixo conforme você seleciona cada resposta.
            </div>
          </div>
        </div>

        <div className="mt-5 h-2 w-full overflow-hidden rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-black/40 transition-all dark:bg-white/60"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-6 space-y-8">
          <section id="tipo-sistema">
            <h3 className="text-2xl font-extrabold uppercase tracking-[-0.04em] text-black/90 dark:text-white">
              1 · Tipo de sistema
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65 dark:text-white/65 md:text-base">
              Escolha a base principal: loja, ecommerce ou prestação de serviço.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SISTEMAS.map((opt) => (
                <OptionButton
                  key={opt}
                  selected={sel.tipoSistema === opt}
                  onClick={() => setSel((s) => ({ ...s, tipoSistema: opt, nicho: null, estrutura: null, visual: null, modelo: null }))}
                >
                  {opt}
                </OptionButton>
              ))}
            </div>
          </section>

          {sel.tipoSistema ? (
            <section id="nicho-atuacao">
              <h3 className="text-2xl font-extrabold uppercase tracking-[-0.04em] text-black/90 dark:text-white">
                2 · Nicho de atuação
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65 dark:text-white/65 md:text-base">
                Selecione o nicho que representa melhor o seu posicionamento.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {nichosDisponiveis.map((opt) => (
                  <OptionButton key={opt} selected={sel.nicho === opt} onClick={() => setSel((s) => ({ ...s, nicho: opt }))}>
                    {opt}
                  </OptionButton>
                ))}
              </div>
            </section>
          ) : null}

          {sel.nicho ? (
            <section id="estrutura-digital">
              <h3 className="text-2xl font-extrabold uppercase tracking-[-0.04em] text-black/90 dark:text-white">
                3 · Estrutura digital
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65 dark:text-white/65 md:text-base">
                Defina o formato principal do seu projeto digital.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {ESTRUTURAS.map((opt) => (
                  <OptionButton key={opt} selected={sel.estrutura === opt} onClick={() => setSel((s) => ({ ...s, estrutura: opt }))}>
                    {opt}
                  </OptionButton>
                ))}
              </div>
            </section>
          ) : null}

          {sel.estrutura ? (
            <section id="estrutura-visual">
              <h3 className="text-2xl font-extrabold uppercase tracking-[-0.04em] text-black/90 dark:text-white">
                4 · Estrutura visual
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65 dark:text-white/65 md:text-base">
                Escolha a direção estética da sua marca digital.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {VISUAIS.map((opt) => (
                  <OptionButton key={opt} selected={sel.visual === opt} onClick={() => setSel((s) => ({ ...s, visual: opt }))}>
                    {opt}
                  </OptionButton>
                ))}
              </div>
            </section>
          ) : null}

          {sel.visual ? (
            <section id="assistencia-criativa">
              <h3 className="text-2xl font-extrabold uppercase tracking-[-0.04em] text-black/90 dark:text-white">
                5 · Assistência criativa
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65 dark:text-white/65 md:text-base">
                Selecione os serviços complementares que você deseja incluir.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {ASSIST.map((opt) => {
                  const selected = sel.assist.includes(opt);
                  return (
                    <OptionButton
                      key={opt}
                      selected={selected}
                      onClick={() =>
                        setSel((s) => ({
                          ...s,
                          assist: selected ? s.assist.filter((x) => x !== opt) : [...s.assist, opt]
                        }))
                      }
                    >
                      {opt}
                    </OptionButton>
                  );
                })}
              </div>
            </section>
          ) : null}

          {sel.visual ? (
            <section id="modelo-base">
              <h3 className="text-2xl font-extrabold uppercase tracking-[-0.04em] text-black/90 dark:text-white">
                6 · Modelo visual editável
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65 dark:text-white/65 md:text-base">
                Escolha o modelo base para carregar sua pré-visualização inicial.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {MODELOS.map((opt) => (
                  <OptionButton key={opt} selected={sel.modelo === opt} onClick={() => setSel((s) => ({ ...s, modelo: opt }))}>
                    {opt}
                  </OptionButton>
                ))}
              </div>
            </section>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() =>
                setSel({
                  tipoSistema: null,
                  nicho: null,
                  estrutura: null,
                  visual: null,
                  assist: [],
                  modelo: null
                })
              }
              className="rounded-2xl border border-black/10 bg-white/70 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-black/70 transition hover:border-black/25 hover:bg-white/90 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-black/45"
            >
              Recomeçar fluxo
            </button>

            <a className="btn-primary" href={whatsappHref} target="_blank" rel="noreferrer">
              Enviar para nosso agente
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
