"use client";
import Breadcrumbs from '@/components/partials/Breadcrumbs';
import Header from '@/components/partials/Header';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>

      <Header />
      <Breadcrumbs />

      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;