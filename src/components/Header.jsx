import * as React from "react";

export default function StickyHeader() {
  const [isSticky, setIsSticky] = React.useState(false);
  const [topOffset, setTopOffset] = React.useState(0);
  const [scrollY, setScrollY] = React.useState(0);

  const headerTopRef = React.useRef(null);
  const headerBottomRef = React.useRef(null);

  React.useEffect(() => {
    const headerTop = headerTopRef.current;
    const headerBottom = headerBottomRef.current;

    if (!headerTop || !headerBottom) return;

    setTopOffset(headerTop.offsetHeight); // Speichert die Höhe von header--top

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      const bottomOffset = window.innerHeight - headerBottom.offsetHeight; // Startpunkt für header--bottom

      if (currentScrollY >= bottomOffset - headerTop.offsetHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="header">
      <div ref={headerTopRef} className="header--top">
        <h1>Header Top</h1>
      </div>
      <div
        ref={headerBottomRef}
        className={`header--bottom ${isSticky ? "sticky" : ""}`}
        style={{
          top: isSticky ? `${topOffset}px` : "auto",
          transform: isSticky ? "none" : `translateY(-${scrollY}px)`,
        }}
      >
        <h2>Header Bottom</h2>
      </div>
    </header>
  );
}
