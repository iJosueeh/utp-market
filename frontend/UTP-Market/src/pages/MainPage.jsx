import React from "react";
import Navbar from "../components/common/Navbar";
import FAQList from "../components/a/FAQList";
import Footer from "../components/common/Footer";


export default function MainPage() {
    return (
        <>
        <div className="main-page">
            <Navbar />
            <header className="main-header">
                  
                    
                      
            </header>

            <main className="content">
             <section className="bg-light py-5"> <FAQList /></section>  
            </main>

            
            <Footer/>
            
        </div>
        </>
    );
}