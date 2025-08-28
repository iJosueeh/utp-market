import React from "react";
import Navbar from "../components/common/Navbar";
import FAQList from "../pages/features/faq/FAQList";

export default function MainPage() {
    return (
        <>
        <div className="main-page container-fluid">
            <Navbar />
            <header className="main-header">
            </header>

            <main className="content">
             <section className="bg-light py-5"> <FAQList /></section>  
            </main>

            <footer className="main-footer">
                
            </footer>
        </div>
        </>
    );
}