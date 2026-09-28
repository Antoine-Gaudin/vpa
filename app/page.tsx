import About from "./components/About";
import BrandsScroller from "./components/BrandsScroller";
import CallTracker from "./components/CallTracker";
import Categories from "./components/Categories";
import ContactSection from "./components/ContactSection";
import DevisModal from "./components/DevisModal";
import Focus from "./components/Focus";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MobileBar from "./components/MobileBar";
import ProSection from "./components/ProSection";
import Reassurance from "./components/Reassurance";
import Reviews from "./components/Reviews";
import Steps from "./components/Steps";
import WhyUs from "./components/WhyUs";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="pt-[100px] md:pt-[116px]">
        <Hero />
        <Steps />
        <Reassurance />
        <BrandsScroller />
        <Reviews />
        <About />
        <Categories />
        <Focus />
        <WhyUs />
        <ProSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileBar />
      <DevisModal />
      <CallTracker />
    </>
  );
}
