// import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import JoinUs from "../pages/JoinUs";
import TimeAndPlace from "../pages/TimeAndPlace";
import Backbone from "../pages/Backbone";
import AidOrganizations from "../pages/AidOrganizations";
import Contact from "../pages/Contact";
import Impressum from "../pages/Impressum";
import Datenschutz from "../pages/Datenschutz";
import Agb from "../pages/Agb";
import FormsInformation from "../pages/FormsInformation";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="join" element={<JoinUs />} />
          <Route path="forms-info" element={<FormsInformation />} />
          <Route path="timeAndLocation" element={<TimeAndPlace />} />
          <Route path="aidOrganizations" element={<AidOrganizations />} />
          <Route path="contact" element={<Contact />} />
          <Route path="imprint" element={<Impressum />} />
          <Route path="data-protection" element={<Datenschutz />} />
          <Route path="agb" element={<Agb />} />
          <Route path="§backbone" element={<Backbone />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
