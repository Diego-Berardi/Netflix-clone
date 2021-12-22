import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";
import RowContainer from "../components/RowContainer";
import Footer from "../components/Footer";

const TypePage = () => {
  const { setShowMobileMenu } = useGlobalContext();
  const { type } = useParams();

  useEffect(() => {
    setShowMobileMenu(false);
  }, [type]);

  return (
    <>
      <Header />
      <MobileMenu />
      <RowContainer pageValue={type ? type : "all"} />
      <Footer />
    </>
  );
};

export default TypePage;
