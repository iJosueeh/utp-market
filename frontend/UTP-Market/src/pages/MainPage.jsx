import React from "react";
import Navbar from "../components/common/Navbar";
import FAQList from "../components/a/FAQList";
import Footer from "../components/common/Footer";


export default function MainPage() {
    return (
        <>
            <div className="main-page container-fluid px-0">
                <div className="px-3">
                    <Navbar />
                    <header className="main-header">
                    </header>

                    <main className="content mt-5">
                        <section className="bg-light py-5"> <FAQList /></section>
                    </main>


                    <Footer />
                    </div>
                </div>
            </>
            );
}