import React from "react";
import ReactDOM from "react-dom/client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./index.css";
import Showroom from "./components/Showroom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import House from "./components/House";
import Playground from "./components/Playground";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/showroom" element={<Showroom />} />
        <Route path="/house" element={<House />} />
        <Route path="/" element={<Playground />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
