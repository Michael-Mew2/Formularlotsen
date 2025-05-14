import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import JoinUs from "../pages/JoinUs";
import TimeAndPlace from "../pages/TimeAndPlace";
import Backbone from "../pages/Backbone";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="join" element={<JoinUs />} />
          <Route path="timeAndLocation" element={<TimeAndPlace />} />
          <Route path="§backbone" element={<Backbone />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
