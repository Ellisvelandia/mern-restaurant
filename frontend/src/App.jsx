import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components";
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
        <Outlet />
      </main>
    </>
  );
};

export default App;
