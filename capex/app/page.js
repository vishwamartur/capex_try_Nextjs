// app/pages/page.js

import React from "react";
import Layout from "@/app/components/Layout";
import ProductAvailability from "./components/ProductAvailability";
import ProductReservation from "./components/ProductReservation";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import AdminPanel from "./components/AdminPanel";
import ClientPanel from "./components/ClientPanel";

const Page = () => {
  return (
    <Layout>
      <Navbar />
      <h1>Welcome to the Capex Item Reservation Website!</h1>
      <SearchBar />
      <ProductAvailability />
      <ProductReservation />
      <AdminPanel />
      <ClientPanel />
    </Layout>
  );
};

export default Page;
