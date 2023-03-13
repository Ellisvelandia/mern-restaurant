import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

const App = () => {
  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;
