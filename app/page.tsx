"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function shortenUrl() {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL");
      }

      setShortUrl(data.shortUrl);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-xl">
              🔗
            </div>

            <span className="text-xl font-bold tracking-tight">
              Shortly
            </span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-gray-400 sm:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-white">
              How it works
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
          </div>

          <a
            href="#shorten"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/15"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="shorten"
        className="relative"
      >
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-24 text-center sm:pt-32">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
            <span>🚀</span>
            Simple & Powerful URL Shortener
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Make your links
            <span className="block text-orange-500">
              shorter & smarter.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-400 sm:text-xl">
            Transform long, complicated URLs into short, clean,
            memorable links. Fast, simple, and built for everyone.
          </p>

          {/* URL Input */}
          <div className="mt-10 w-full max-w-2xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/20 sm:flex-row">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    shortenUrl();
                  }
                }}
                placeholder="Paste your long URL..."
                className="min-w-0 flex-1 rounded-xl bg-transparent px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:bg-white/5"
              />

              <button
                onClick={shortenUrl}
                disabled={loading}
                className="rounded-xl bg-orange-500 px-7 py-4 font-semibold transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Shortening..." : "Shorten URL"}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="mt-4 text-sm text-red-400">
                {error}
              </p>
            )}

            {/* Short URL Result */}
            {shortUrl && (
              <div className="mt-5 rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-left">
                <p className="text-sm text-gray-400">
                  Your short URL
                </p>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all font-semibold text-orange-400 hover:underline"
                  >
                    {shortUrl}
                  </a>

                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(shortUrl)
                    }
                    className="shrink-0 rounded-lg bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
                  >
                    📋 Copy Link
                  </button>
                </div>
              </div>
            )}

            <p className="mt-4 text-sm text-gray-500">
              Free to use • Fast • Simple • No registration required
            </p>
          </div>

          {/* Trust */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
            <span>✓ Instant shortening</span>
            <span>✓ Easy to share</span>
            <span>✓ Click tracking</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
          <div className="px-6 py-8 text-center">
            <p className="text-2xl font-bold">1M+</p>
            <p className="mt-1 text-sm text-gray-500">
              Links Ready
            </p>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-2xl font-bold">99.9%</p>
            <p className="mt-1 text-sm text-gray-500">
              Uptime
            </p>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-2xl font-bold">Fast</p>
            <p className="mt-1 text-sm text-gray-500">
              Redirects
            </p>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-2xl font-bold">Free</p>
            <p className="mt-1 text-sm text-gray-500">
              To Use
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="mx-auto max-w-6xl px-6 py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Features
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Everything you need for better links
          </h2>

          <p className="mt-4 text-gray-400">
            A simple tool with powerful features designed to make
            sharing links easier.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/[0.05]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl">
              🔗
            </div>

            <h3 className="mt-6 text-lg font-semibold">
              Short Links
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              Turn long and complicated URLs into short,
              memorable links that are easy to share.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/[0.05]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl">
              📊
            </div>

            <h3 className="mt-6 text-lg font-semibold">
              Track Clicks
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              Keep track of how many times your shortened links
              are visited.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/[0.05]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl">
              ⚡
            </div>

            <h3 className="mt-6 text-lg font-semibold">
              Fast Redirect
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              Quickly send visitors from your short link to the
              original destination.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/[0.05]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl">
              📱
            </div>

            <h3 className="mt-6 text-lg font-semibold">
              Mobile Friendly
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              Create and share short links from any device with
              a responsive interface.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/[0.05]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl">
              🔒
            </div>

            <h3 className="mt-6 text-lg font-semibold">
              Reliable
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              Your links are stored safely and can be accessed
              whenever you need them.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/[0.05]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl">
              ✨
            </div>

            <h3 className="mt-6 text-lg font-semibold">
              Simple Experience
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              No complicated settings. Paste your URL, shorten it,
              and start sharing.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="border-y border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Shorten your URL in seconds
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-lg font-bold">
                1
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Paste your URL
              </h3>

              <p className="mt-2 text-gray-400">
                Copy your long URL and paste it into the input box.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-lg font-bold">
                2
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Click Shorten
              </h3>

              <p className="mt-2 text-gray-400">
                Our system creates a unique short link instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-lg font-bold">
                3
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Share & Track
              </h3>

              <p className="mt-2 text-gray-400">
                Copy your new link and share it anywhere you want.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="px-6 py-24">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-orange-500/20 bg-orange-500/10 px-6 py-16 text-center sm:px-12">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
              Start Today
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
              Your long URL deserves
              <span className="text-orange-500">
                {" "}a shorter life.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-gray-400">
              Create clean, shareable links in seconds. No
              complicated setup. Just paste and shorten.
            </p>

            <a
              href="#shorten"
              className="mt-8 inline-flex rounded-xl bg-orange-500 px-7 py-4 font-semibold transition hover:bg-orange-600"
            >
              Shorten a URL →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-sm">
              🔗
            </div>

            <span className="font-semibold">
              Shortly
            </span>
          </div>

          <p className="text-sm text-gray-600">
            Built with Next.js 🚀
          </p>

          <p className="text-sm text-gray-600">
            © 2026 Shortly
          </p>
        </div>
      </footer>
    </main>
  );
}