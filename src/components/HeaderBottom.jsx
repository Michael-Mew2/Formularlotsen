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
      <Nav />
    </div>
  );
});

export default HeaderBottom;
