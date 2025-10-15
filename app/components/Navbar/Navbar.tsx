'use client';

import CardNav from './CardNav';
import type { CardNavItem } from './CardNav';

export default function Navbar() {
  const cardNavItems: CardNavItem[] = [
    {
      label: "About Me",
      bgColor: "#1f1f1f",
      textColor: "#fff",
      links: [
        { label: "Profile", href: "#about", ariaLabel: "View About Section" },
        { label: "Skills", href: "#skills", ariaLabel: "View Skills Section" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#2a2a2a",
      textColor: "#fff",
      links: [
        { label: "All Projects", href: "#projects", ariaLabel: "View All Projects" },
        { label: "Featured", href: "#projects", ariaLabel: "View Featured Projects" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#353535", 
      textColor: "#fff",
      links: [
        { label: "Get in Touch", href: "#contact", ariaLabel: "Contact Me" },
        { label: "Email", href: "#contact", ariaLabel: "Send Email" }
      ]
    }
  ];

  return (
    <CardNav
      logo="/logo.svg"
      logoAlt="Portfolio Logo"
      items={cardNavItems}
      baseColor="rgba(0, 0, 0, 0.8)"
      menuColor="#ffffff"
      buttonBgColor="#404040"
      buttonTextColor="#ffffff"
      ease="power3.out"
    />
  );
}
