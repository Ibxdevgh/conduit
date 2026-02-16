import Link from 'next/link';

export function Footer() {
  return (
    <footer className="pt-8 pb-0">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Footer card */}
        <div className="card px-10 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-6 h-6 rounded-full border border-accent/40 flex items-center justify-center bg-gradient-to-br from-accent/15 to-transparent">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <span className="text-[15px] font-semibold">Conduit</span>
              </div>
              <p className="text-[13px] text-muted leading-relaxed">
                Conduit and let AI agents handle your payments autonomously.
              </p>
            </div>

            {/* Links columns */}
            {[
              {
                title: 'Main Page',
                links: [
                  { label: 'Home', href: '/' },
                  { label: 'About', href: '#how-it-works' },
                  { label: 'Features', href: '#features' },
                  { label: 'Demo', href: '/demo' },
                ],
              },
              {
                title: 'Quick Links',
                links: [
                  { label: 'Protocol', href: '#protocol' },
                  { label: 'UCP Standard', href: '#' },
                  { label: 'API Docs', href: '#' },
                  { label: 'SDK', href: '#' },
                ],
              },
              {
                title: 'Others',
                links: [
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms', href: '#' },
                  { label: 'Changelog', href: '#' },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <span className="text-[14px] font-semibold block mb-5">
                  {col.title}
                </span>
                <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-[13px] text-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border pt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[13px] text-muted">
              &copy; 2026 Conduit Protocol
            </span>
            <div className="flex items-center gap-5">
              {/* Social icons */}
              {['X', 'GH', 'DC'].map((s) => (
                <span key={s} className="w-8 h-8 rounded-full border border-border-2 flex items-center justify-center text-[10px] text-muted hover:text-foreground hover:border-muted-2 transition-colors cursor-pointer">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Spacing below card */}
        <div className="h-8" />
      </div>
    </footer>
  );
}
