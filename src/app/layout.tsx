import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Palm Beach Basketball Club",
  description:
    "An exclusive men's basketball club built on character, integrity, and brotherhood.",
};

function Header() {
  return (
    <header className="border-b border-cream-dark">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-4 md:py-5 flex items-center justify-between">
        <a href="/" className="font-heading text-base md:text-xl tracking-wide text-charcoal shrink-0">
          <span className="font-bold">PBBC</span>
          <span className="hidden md:inline">
            {" "}<span className="font-bold">PALM BEACH</span>{" "}
            <span className="font-normal text-red">BASKETBALL CLUB</span>
          </span>
          <span className="md:hidden font-normal text-red"> CLUB</span>
        </a>
        <nav className="flex items-center gap-4 md:gap-8">
          <a
            href="/#principles"
            className="hidden sm:inline text-sm tracking-widest uppercase text-charcoal/70 hover:text-charcoal transition-colors"
          >
            Principles
          </a>
          <a
            href="/apply"
            className="bg-red text-cream text-xs md:text-sm tracking-widest uppercase px-4 md:px-6 py-2 md:py-2.5 hover:bg-red-dark transition-colors"
          >
            Apply
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-cream-dark bg-charcoal text-cream/60">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-heading text-lg text-cream">
              <span className="font-bold">PALM BEACH</span>{" "}
              <span className="text-gold">BASKETBALL CLUB</span>
            </p>
            <p className="mt-2 text-sm">Palm Beach, Florida</p>
          </div>
          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} Palm Beach Basketball Club</p>
            <p className="mt-1">Membership by invitation only.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
