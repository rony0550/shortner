"use client";

import { useEffect, useRef, useState } from "react";
import {
  analytics,
  api,
  brand,
  cta,
  faq,
  features,
  footer,
  hero,
  heroSamples,
  nav,
  pricing,
  stats,
  steps,
  type IconName,
} from "@/lib/content";

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

const ICONS: Record<IconName, string> = {
  link: "M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5",
  chart: "M3 3v18h18M7 15l4-4 3 3 5-6",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
  qr: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM20 14v1M14 20h1M18 18h3v3h-3z",
  folder:
    "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  code: "m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14",
  check: "M5 12l5 5L20 7",
  plus: "M12 5v14M5 12h14",
  menu: "M4 7h16M4 12h16M4 17h16",
  x: "M6 6l12 12M18 6 6 18",
  arrow: "M5 12h14M13 6l6 6-6 6",
  copy: "M9 9h11v11H9zM5 15V5a1 1 0 0 1 1-1h10",
};

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen] as const;
}

function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value]);

  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

function useCopy() {
  const [copied, setCopied] = useState(false);
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      return false;
    }
  }
  return { copied, copy };
}

function SectionHead({ title, text }: { title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {text && (
        <p className="mt-5 max-w-xl text-base leading-7 text-dim sm:text-lg">
          {text}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-ink/85 backdrop-blur-xl"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-6">
        <a href="#" className="flex items-center gap-2.5" aria-label={brand.name}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ember text-white">
            <Icon name="link" className="h-4 w-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            {brand.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-dim lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-paper"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-lg px-4 py-2 text-sm text-dim transition-colors hover:text-paper sm:block">
            Log in
          </button>
          <a
            href="#shorten"
            className="rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-[#24352b]"
          >
            Get started
          </a>
          <button
            className="ml-1 rounded-lg p-2 text-dim hover:text-paper lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 pb-4 sm:px-6">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-t border-line py-3.5 text-dim transition-colors hover:text-paper"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Shortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { copied, copy } = useCopy();

  async function shortenUrl(e?: React.FormEvent) {
    e?.preventDefault();

    const value = url.trim();
    if (!value) {
      setError("Enter a URL to shorten.");
      return;
    }

    // Allow "example.com" without the protocol
    const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`;

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to shorten URL");

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!shortUrl) return;
    const ok = await copy(shortUrl);
    if (!ok) setError("Could not copy the link. Select it and copy manually.");
  }

  return (
    <div>
      <form
        onSubmit={shortenUrl}
        className="flex flex-col gap-2 rounded-2xl border border-line bg-ink2 p-2 shadow-2xl shadow-black/10 transition-colors focus-within:border-[rgba(15,122,67,0.5)] sm:flex-row"
      >
        <label htmlFor="url" className="sr-only">
          Long URL
        </label>
        <input
          id="url"
          type="text"
          inputMode="url"
          autoComplete="off"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={hero.placeholder}
          className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-4 text-paper outline-none placeholder:text-[#6d665c]"
        />
        <button
          type="submit"
          disabled={loading}
          className="group flex items-center justify-center gap-2 rounded-xl bg-ember px-7 py-4 font-semibold text-white transition hover:bg-[#0c6638] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              {hero.loading}
            </>
          ) : (
            <>
              {hero.button}
              <Icon
                name="arrow"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>
      </form>

      <div aria-live="polite">
        {error && (
          <p
            role="alert"
            className="pop mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {shortUrl && (
          <div className="pop mt-3 flex flex-col gap-4 rounded-2xl border border-[rgba(15,122,67,0.25)] bg-[rgba(15,122,67,0.06)] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm text-signal">
                <Icon name="check" className="h-4 w-4" />
                Link created
              </p>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block break-all text-lg font-semibold transition-colors hover:text-ember"
              >
                {shortUrl}
              </a>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-medium transition hover:bg-black/5"
              >
                <Icon name={copied ? "check" : "copy"} className="h-4 w-4" />
                {copied ? "Copied" : "Copy"}
              </button>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-ember px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0c6638]"
              >
                Open
              </a>
            </div>
          </div>
        )}
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-dim">
        {hero.perks.map((perk) => (
          <li key={perk} className="flex items-center gap-2">
            <Icon name="check" className="h-4 w-4 text-ember" />
            {perk}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The signature moment: a long URL collapses into a short one, on a loop. */
function LinkCollapse() {
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const sample = heroSamples[cycle % heroSamples.length];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),
      setTimeout(() => setPhase(2), 2400),
      setTimeout(() => {
        setPhase(0);
        setCycle((c) => c + 1);
      }, 5400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  const collapsed = phase >= 1;

  return (
    <div className="rounded-3xl border border-line bg-ink2 p-6 shadow-2xl shadow-black/10 sm:p-8">
      <p className="text-sm text-dim">Before</p>
      <div className="mt-2 overflow-hidden whitespace-nowrap font-code text-[13px] leading-6 [mask-image:linear-gradient(90deg,#000_82%,transparent)]">
        <span className={collapsed ? "text-paper" : "text-dim"}>
          https://{sample.host}
        </span>
        <span
          className="inline-grid align-top transition-[grid-template-columns,opacity] duration-700 ease-out"
          style={{
            gridTemplateColumns: collapsed ? "0fr" : "1fr",
            opacity: collapsed ? 0 : 1,
          }}
        >
          <span className="overflow-hidden text-dim">{sample.path}</span>
        </span>
      </div>

      <div className="my-6 h-px bg-[var(--line)]" />

      <p className="text-sm text-dim">After</p>
      <p
        className={`mt-2 font-code text-lg font-medium text-ember transition-all duration-500 sm:text-xl ${
          phase === 2 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {sample.slug}
      </p>

      <p
        className={`mt-6 flex items-center gap-2 text-sm text-signal transition-opacity duration-500 ${
          phase === 2 ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--signal)] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--signal)]" />
        </span>
        Tracking clicks
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section id="shorten" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="glow absolute left-[-120px] top-[-80px] h-[460px] w-[460px] rounded-full bg-[rgba(15,122,67,0.14)] blur-[120px]" />
        <div className="absolute right-[-160px] top-[260px] h-[360px] w-[360px] rounded-full bg-[rgba(15,122,67,0.06)] blur-[110px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-32 lg:pt-28">
        <div>
          <h1
            className="hero-in text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
            style={{ ["--i" as string]: 0 }}
          >
            {hero.titleTop}
            <br />
            <span className="text-dim">{hero.titleBottom}</span>
          </h1>

          <p
            className="hero-in mt-6 max-w-lg text-base leading-7 text-dim sm:text-lg sm:leading-8"
            style={{ ["--i" as string]: 1 }}
          >
            {hero.text}
          </p>

          <div
            className="hero-in mt-10 max-w-2xl"
            style={{ ["--i" as string]: 2 }}
          >
            <Shortener />
          </div>
        </div>

        <div className="hero-in" style={{ ["--i" as string]: 3 }}>
          <LinkCollapse />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

function Stats() {
  return (
    <section className="border-y border-line bg-ink2/60">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-5 py-9 sm:px-6 sm:py-12 ${
              i > 0 ? "sm:border-l sm:border-line" : ""
            } ${i % 2 === 1 ? "border-l border-line" : ""} ${
              i > 1 ? "border-t border-line sm:border-t-0" : ""
            }`}
          >
            <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {"text" in stat ? (
                stat.text
              ) : (
                <CountUp
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  prefix={"prefix" in stat ? stat.prefix : ""}
                />
              )}
            </dd>
            <dt className="mt-2 text-sm text-dim">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Features                                                            */
/* ------------------------------------------------------------------ */

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            title="Everything you need to manage your links."
            text="The tools you actually use, without the clutter of enterprise link platforms."
          />
        </div>

        <ul className="divide-y divide-[var(--line)] border-y border-line">
          {features.map((f) => (
            <li
              key={f.title}
              className="group flex gap-5 py-7 transition-colors sm:gap-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/5 text-dim transition-colors group-hover:bg-[rgba(15,122,67,0.12)] group-hover:text-ember">
                <Icon name={f.icon} />
              </span>
              <div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-1.5 max-w-md leading-7 text-dim">{f.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Analytics                                                           */
/* ------------------------------------------------------------------ */

function Bars({ series, ticks }: { series: number[]; ticks: string[] }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const max = Math.max(...series);

  return (
    <div ref={ref} className={seen ? "in-view" : ""}>
      <div className="flex h-48 items-end gap-2 sm:gap-3">
        {series.map((v, i) => (
          <div key={i} className="flex h-full flex-1 items-end">
            <div
              className="bar w-full rounded-t-md bg-gradient-to-t from-[rgba(15,122,67,0.25)] to-[var(--ember)]"
              style={{ height: `${(v / max) * 100}%`, ["--i" as string]: i }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-xs text-dim">
        {ticks.map((t, i) => (
          <span key={`${t}-${i}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function TopLinks() {
  const [ref, seen] = useInView<HTMLUListElement>(0.4);
  const max = Math.max(...analytics.topLinks.map((l) => l.clicks));

  return (
    <ul ref={ref} className="mt-8 space-y-5 border-t border-line pt-6">
      {analytics.topLinks.map((link) => (
        <li key={link.short}>
          <div className="flex items-baseline justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-code text-sm">{link.short}</p>
              <p className="truncate text-xs text-dim">{link.dest}</p>
            </div>
            <p className="shrink-0 text-sm font-semibold">
              {link.clicks.toLocaleString("en-US")}
            </p>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/5">
            <div
              className="h-full rounded-full bg-ember transition-[width] duration-1000 ease-out"
              style={{ width: seen ? `${(link.clicks / max) * 100}%` : "0%" }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Analytics() {
  const keys = Object.keys(analytics.ranges);
  const [range, setRange] = useState(keys[0]);
  const data = analytics.ranges[range];

  return (
    <section
      id="analytics"
      className="border-y border-line bg-ink2/60"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20 lg:py-32">
        <div>
          <SectionHead title="Know what happens after every click." text={analytics.text} />
          <ul className="mt-8 space-y-4">
            {analytics.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-dim">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(15,122,67,0.12)] text-ember">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-line bg-ink p-5 shadow-2xl shadow-black/10 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-dim">Total clicks</p>
              <p className="mt-1 text-4xl font-semibold tracking-tight">
                <CountUp key={range} value={data.total} />
              </p>
              <p className="mt-1 text-sm text-signal">{data.change} vs previous period</p>
            </div>

            <div
              role="tablist"
              aria-label="Date range"
              className="flex rounded-full border border-line p-1 text-sm"
            >
              {keys.map((k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={range === k}
                  onClick={() => setRange(k)}
                  className={`rounded-full px-3.5 py-1.5 transition-colors ${
                    range === k
                      ? "bg-paper font-medium text-ink"
                      : "text-dim hover:text-paper"
                  }`}
                >
                  {analytics.ranges[k].label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Bars key={range} series={data.series} ticks={data.ticks} />
          </div>

          <TopLinks />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

function HowItWorks() {
  const [ref, seen] = useInView<HTMLOListElement>(0.35);

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:py-32">
      <SectionHead title="From long to short in a few seconds." />

      <ol ref={ref} className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        <div
          className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-[var(--line)] transition-transform duration-[1400ms] ease-out md:block"
          style={{ transform: seen ? "scaleX(1)" : "scaleX(0)" }}
        />
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            <span
              className={`relative flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-700 ${
                seen
                  ? "border-[rgba(15,122,67,0.5)] bg-ink text-ember"
                  : "border-line bg-ink text-dim"
              }`}
              style={{ transitionDelay: `${i * 250}ms` }}
            >
              {i + 1}
            </span>
            <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 max-w-[16rem] leading-7 text-dim">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* API                                                                 */
/* ------------------------------------------------------------------ */

function ApiSection() {
  const [tab, setTab] = useState(0);
  const { copied, copy } = useCopy();
  const snippet = api.snippets[tab];

  return (
    <section id="api" className="border-y border-line bg-ink2/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-32">
        <div>
          <SectionHead title={api.title} text={api.text} />
          <button className="mt-8 flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition hover:bg-[#24352b]">
            {api.cta}
            <Icon name="arrow" className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-ink2">
          <div className="flex items-center justify-between border-b border-line pl-2 pr-3">
            <div role="tablist" className="flex">
              {api.snippets.map((s, i) => (
                <button
                  key={s.label}
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={`border-b-2 px-4 py-3 font-code text-xs transition-colors ${
                    tab === i
                      ? "border-ember text-paper"
                      : "border-transparent text-dim hover:text-paper"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => copy(snippet.code)}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-dim transition-colors hover:text-paper"
            >
              <Icon name={copied ? "check" : "copy"} className="h-3.5 w-3.5" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <pre
            key={tab}
            className="pop overflow-x-auto p-5 font-code text-[13px] leading-7 text-[#3b4a41]"
          >
            <code>{snippet.code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:py-32">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <SectionHead title={pricing.title} text={pricing.text} />

        <div className="flex w-fit rounded-full border border-line p-1 text-sm">
          {[false, true].map((isYearly) => (
            <button
              key={String(isYearly)}
              onClick={() => setYearly(isYearly)}
              aria-pressed={yearly === isYearly}
              className={`rounded-full px-4 py-2 transition-colors ${
                yearly === isYearly
                  ? "bg-paper font-medium text-ink"
                  : "text-dim hover:text-paper"
              }`}
            >
              {isYearly ? "Yearly" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {pricing.plans.map((plan) => {
          const price = yearly ? plan.yearly : plan.monthly;
          return (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-7 sm:p-9 ${
                plan.featured
                  ? "border-[rgba(15,122,67,0.4)] bg-[rgba(15,122,67,0.06)]"
                  : "border-line bg-ink2"
              }`}
            >
              {plan.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-ember px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}

              <h3 className={`text-lg font-semibold ${plan.featured ? "text-ember" : ""}`}>
                {plan.name}
              </h3>

              <p className="mt-5 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-tight">
                  {pricing.currency}
                  {price}
                </span>
                <span className="mb-2 text-sm text-dim">per month</span>
              </p>
              <p className="mt-1 h-5 text-xs text-dim">
                {yearly && plan.yearly > 0 ? "Billed yearly" : ""}
              </p>

              <p className="mt-4 leading-7 text-dim">{plan.text}</p>

              <button
                className={`mt-8 w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition active:scale-[0.99] ${
                  plan.featured
                    ? "bg-ember text-white hover:bg-[#0c6638]"
                    : "border border-line hover:bg-black/5"
                }`}
              >
                {plan.cta}
              </button>

              <ul className="mt-8 space-y-3.5">
                {plan.features.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-dim">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 lg:pb-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHead title="Questions people ask." />

        <div className="divide-y divide-[var(--line)] border-y border-line">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium"
                >
                  {item.q}
                  <Icon
                    name="plus"
                    className={`h-5 w-5 shrink-0 text-dim transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-ember" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-6 leading-7 text-dim">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA + Footer                                                        */
/* ------------------------------------------------------------------ */

function Cta() {
  return (
    <section className="px-5 pb-24 sm:px-6 lg:pb-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[rgba(15,122,67,0.25)] bg-[rgba(15,122,67,0.07)] px-6 py-16 sm:px-14 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[rgba(15,122,67,0.25)] blur-[100px]" />
        <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
              {cta.title}
            </h2>
            <p className="mt-4 text-dim">{cta.text}</p>
          </div>
          <a
            href="#shorten"
            className="group flex w-fit items-center gap-2 rounded-full bg-ember px-8 py-4 font-semibold text-white transition hover:bg-[#0c6638]"
          >
            {cta.button}
            <Icon
              name="arrow"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ember text-white">
                <Icon name="link" className="h-4 w-4" />
              </span>
              <span className="text-lg font-semibold">{brand.name}</span>
            </a>
            <p className="mt-4 max-w-xs leading-7 text-dim">{footer.text}</p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="font-semibold">{col.title}</p>
              <ul className="mt-4 space-y-3 text-sm text-dim">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="transition-colors hover:text-paper">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-line pt-8 text-sm text-dim">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-ink text-paper">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Analytics />
      <HowItWorks />
      <ApiSection />
      <Pricing />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}