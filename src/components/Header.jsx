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

    if (!headerTop) return;

    setTopOffset(headerTop.offsetHeight); // Speichert die Höhe von HeaderTop

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (headerBottom) {
        const bottomOffset = window.innerHeight - headerBottom.offsetHeight; // Startpunkt für HeaderBottom
        setIsSticky(currentScrollY >= bottomOffset - headerTop.offsetHeight);
      }

      // Für den Scrolleffekt vom Top-Header:
      // wert je nach bedarf anpassbar
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(isScrolled);

  return (
    <header className="header">
      <HeaderTop ref={headerTopRef} isScrolled={isScrolled} />
      {/* <HeaderBottom
        ref={headerBottomRef}
        isSticky={isSticky}
        topOffset={topOffset}
        scrollY={scrollY}
      />  */}
    </header>
  );
}
