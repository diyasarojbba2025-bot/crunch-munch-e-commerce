import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/logo-mark.png";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" as const },
      { label: "Contact", to: "/contact" as const },
      { label: "Shop All", to: "/shop" as const },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQs", to: "/contact" as const },
      { label: "Shipping & Returns", to: "/contact" as const },
      { label: "Privacy Policy", to: "/about" as const },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-8 bg-cocoa text-cocoa-foreground">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" loading="lazy" width={512} height={512} className="h-10 w-10" />
            <span className="text-display text-2xl">Crunch & Munch</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed opacity-80">
            Snacks made for every craving — fresh, crispy and delivered to your door across India.
          </p>
          <div className="mt-5 flex gap-2.5">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Social media"
                className="grid h-10 w-10 place-items-center rounded-full bg-cocoa-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-base">{col.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm opacity-80">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="transition-opacity hover:opacity-100 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-base">Snack HQ</h3>
          <ul className="mt-4 space-y-2.5 text-sm opacity-80">
            <li>42 Crunch Street, Bengaluru 560001</li>
            <li>hello@crunchandmunch.in</li>
            <li>+91 98765 43210</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cocoa-foreground/15">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs opacity-70 sm:flex-row">
          <p>© {new Date().getFullYear()} Crunch & Munch Foods Pvt. Ltd.</p>
          <p>Made with lots of crunch in India.</p>
        </div>
      </div>
    </footer>
  );
}
