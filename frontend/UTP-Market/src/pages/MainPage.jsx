import React from "react";
import Navbar from "../components/common/Navbar";
import FAQList from "../components/a/FAQList";



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

            <footer className="main-footer">
                
            </footer>
        </div>
        </>
    );
}