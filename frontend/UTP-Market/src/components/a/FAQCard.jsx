import { useState } from "react";

export default function FAQCard({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="list-group-item mb-3 align-items-center bg-white border-0 border-bottom w-75 mx-auto px-3 py-2"
      onClick={() => setOpen(!open)}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex align-items-center">
        <h6 className="mb-0 text-danger flex-grow-1 text-start">{question}</h6>
        <span className="text-danger">{open ? "-" : "+"}</span>
      </div>
      {open && (
    <div className="mt-2 text-start">
          <p className="mb-0">{answer}</p>
        </div>
      )}
    </div>
  );
}
