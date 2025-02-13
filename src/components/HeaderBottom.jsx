import * as React from "react";
import Nav from "./Nav";

const HeaderBottom = React.forwardRef(({ isSticky, topOffset, scrollY }, ref) => {
  return (
    <div
      ref={ref}
      className={`header--bottom ${isSticky ? "sticky" : ""}`}
      style={{
        top: isSticky ? `${topOffset}px` : "auto",
        transform: isSticky ? "none" : `translateY(-${scrollY}px)`,
      }}
    >
      <h2>Header Bottom</h2>
      <Nav />
    </div>
  );
});

export default HeaderBottom;
