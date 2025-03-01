
"use client";
import React, { useState } from "react";
import Breadcrumbs from "@/components/partials/Breadcrumbs";
import Header from "@/components/partials/Header";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Header
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={(state) => setSidebarOpen(state)}
      />

      <Breadcrumbs />

      <main
        className={`p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;