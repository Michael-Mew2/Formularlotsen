import * as React from "react";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";

export default function StickyHeader() {
  const [isSticky, setIsSticky] = React.useState(false);
  const [topOffset, setTopOffset] = React.useState(0);
  const [scrollY, setScrollY] = React.useState(0);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const headerTopRef = React.useRef(null);
  const headerBottomRef = React.useRef(null);

  React.useEffect(() => {
    const headerTop = headerTopRef.current;
    const headerBottom = headerBottomRef.current;

    if (!headerTop || !headerBottom) return;

    setTopOffset(headerTop.offsetHeight); // Speichert die Höhe von HeaderTop

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      const bottomOffset = window.innerHeight - headerBottom.offsetHeight; // Startpunkt für HeaderBottom

      if (currentScrollY >= bottomOffset - headerTop.offsetHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Für den Scrolleffekt vom Top-Header:
      if (currentScrollY > 20) {
        // wert je nach bedarf anpassbar
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="header">
      <HeaderTop ref={headerTopRef} isScrolled={isScrolled} />
      <HeaderBottom
        ref={headerBottomRef}
        isSticky={isSticky}
        topOffset={topOffset}
        scrollY={scrollY}
      />
    </header>
  );
}
