import { Github, Linkedin, Instagram, Youtube, Mail } from "lucide-react";
import logo from "@/assets/binary-ten-logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/binaryten", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/company/binaryten", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/binaryten", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@binaryten", label: "YouTube" },
  ];

  return (
    <footer className="bg-card/50 border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={logo} alt="Binary Ten Logo" className="h-10 w-10" />
                <span className="text-xl font-bold text-gradient tracking-tight">Binary Ten</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Soluções inteligentes em automação e sistemas web. Tecnologia de ponta desenvolvida por especialistas.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#technologies" className="text-muted-foreground hover:text-primary transition-colors">
                    Tecnologias
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                    Serviços
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                    Projetos
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <div className="space-y-3 text-sm">
                <a
                  href="mailto:contato@binaryten.com.br"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  contato@binaryten.com.br
                </a>
                <p className="text-muted-foreground">
                  Segunda a Sexta<br />
                  9h às 18h
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:glow-primary transition-all"
                >
                  <social.icon className="w-5 h-5 text-primary" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center">
              © {currentYear} Binary Ten. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
