import Logo from "@/assets/logo.png";
import { navMenuItems } from "@/data/landing.data";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <footer
      className="bg-white border-t border-border py-12"
      aria-label="Footer"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6 mb-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Linknest Logo" className="size-8" />
              <span className="font-heading font-bold text-xl text-foreground">
                Link<span className="text-primary">Nest</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The smarter link-in-bio tool with transparent analytics.
            </p>
          </div>

          <div className="flex gap-4">
            {navMenuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} LinkNest. All rights reserved.
          </p>
          <div className="flex gap-4 *:text-foreground *:transition-all *:hover:-translate-y-1">
            <a
              href="https://www.linkedin.com/in/eddiedev14/"
              target="_blank"
              className="hover:text-blue-500"
            >
              <BsLinkedin size={18} />
            </a>
            <a
              href="https://github.com/eddiedev14/linknest"
              target="_blank"
              className="hover:text-black"
            >
              <BsGithub size={18} />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            Made with <span className="text-primary">♥</span> for creators
            everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
