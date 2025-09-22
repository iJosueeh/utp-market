
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import HelpCenter from "./HelpDescription";
import FAQListAyuda from "./FAQListAyuda";
import HelpChat from "./HelpChat";

export default function HelpPage() {
  return (
    <div className="container-fluid px-0">
      {/* Navbar */}
      <Navbar />


      {/* Contenido */}
      <main className=" content py-5 " style={{ backgroundColor: "#a3002a", padding: "100px 0" }}>
        {/* Hero About Us */}
        <section  >
          <HelpCenter />
        </section>

        {/* Filosofía */}
        <section className="bg-white py-5 pb-5 ">
          <FAQListAyuda />
        </section>

        {/* Objetivos */}
        <section className="py-5 mt-5">
          <HelpChat />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );

}