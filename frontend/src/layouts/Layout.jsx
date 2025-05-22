import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <Hero />
      <div className="container m-auto">
        <SearchBar />
      </div>

      <div className="container m-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
