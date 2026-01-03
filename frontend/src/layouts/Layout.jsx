import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isSearch = location.pathname.startsWith("/search");

  return (
    <div className=" flex flex-col min-h-screen py-1 w-full ">
      <Header/>
      {isHome && <Hero />}
      {(isHome || isSearch) && (
        <div
          className={`container mx-auto px-4 ${
            isHome ? "-mt-2 md:-mt-1" : "mt-8"
          }`}
        >
          <SearchBar key={isSearch ? "search-active" : "search-reset"} />
        </div>
      )}

      <div className="px-4 py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
