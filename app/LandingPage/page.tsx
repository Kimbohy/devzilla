import React from "react";
import LandingPage from "@/components/LandingPage";
import Entraide from "@/components/Entraide";
import DiscoverDomaine from "@/components/DiscoverDomaine";
import Invitation from "@/components/Invitation";
import Footer from "@/components/Footer";
const Page = () => {
  return (
    <div>
      <LandingPage />
      <Entraide />
      <DiscoverDomaine />
      <Invitation />
      <Footer />
    </div>
  );
};

export default Page;
