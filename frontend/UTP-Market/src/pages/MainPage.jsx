import React from "react";
import Navbar from "../components/common/Navbar";
import FAQList from "../pages/features/faq/FAQList";
import CardProfileTeam from "../pages/features/CardProfileTeam";
export default function MainPage() {
    return (
        <>
            <div className="main-page container-fluid px-0">
                <div>
                    <Navbar />
                    <header className="main-header">
                    </header>

                    <main className="content">
                        <section className="bg-light py-5 mt-5">
                            <FAQList />
                        </section>  
                        <section className="bg-danger py-5 mt-5">
                            <CardProfileTeam />
                        </section>  
                    </main>

                    <footer className="main-footer">
                    </footer>
                </div>
            </div>
        </>
    );
}
