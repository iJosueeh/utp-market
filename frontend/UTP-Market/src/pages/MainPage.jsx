import React from "react";
import Navbar from "../components/common/Navbar";
import FAQList from "../pages/features/faq/FAQList";
import Footer from "../components/common/Footer";
import Hero from "../pages/features/hero/Hero";
import Emprendimiento from "../pages/features/Materiales/Emprendimiento";
import Reseñas from "../pages/features/Materiales/Reseñas";
import CardProfileTeam from "../pages/features/CardProfileTeam";
import Contacto from "../pages/features/contacto/contacto";
export default function MainPage() {
    return (
        <>
            <div className="main-page container-fluid px-0">
                <div>
                    <Navbar />
                    <header className="main-header">
                    </header>
                       <Hero />

                    <main className="content">
                        <section className="bg-white ">
                        <Emprendimiento />
                            </section>
                        <section className="bg-black py-5 mt-5">
                           <Reseñas />
                        </section>

                        <section className="bg-light py-5 mt-5">
                            <FAQList />
                        </section>  
                        <section className="bg-danger py-5 mt-5">
                            <CardProfileTeam />
                        </section>  
                    </main>
                    <Contacto/>

                    <Footer />
                    </div>
                </div>
            </>
            );
}
