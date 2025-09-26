import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import HeroAU from "./HeroAU";
import PhilosophySection from "./PhilosophySection";
import ObjectivesSection from "./ObjectivesSection";

export default function AUPage() {
  return (
    <div className="container-fluid px-0">
      {/* Navbar */}
      <Navbar />


      {/* Contenido */}
      <main className="content py-5">
        {/* Hero About Us */}
        <section >
          <HeroAU />
        </section>

        {/* Filosofía */}
        <section className=" py-5 mt-5">
          <PhilosophySection />
        </section>

        {/* Objetivos */}
        <section className="py-5 mt-5">
          <ObjectivesSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

