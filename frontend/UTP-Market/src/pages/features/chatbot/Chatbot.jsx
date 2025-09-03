import React, { useState, useEffect, useRef } from 'react';
import { generateResponse } from '../../../utils/Chatbot.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../../assets/css/ChatbotWidget.css';

const BotAvatar = () => (
  <div className="position-relative">
    <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
      <i className="bi bi-robot fs-3 text-danger"></i>
    </div>
    <span 
      className="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle"
      style={{ width: '15px', height: '15px' }}>
    </span>
  </div>
);

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const getTimestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const [mensajes, setMensajes] = useState([]);
  const [entrada, setEntrada] = useState('');
  const [cargando, setCargando] = useState(false);
  const mensajesEndRef = useRef(null);

  const initializeChat = () => {
    setMensajes([
      {
        sender: 'bot',
        name: 'UTP - BOT',
        text: 'Hola',
        timestamp: getTimestamp()
      },
      {
        sender: 'bot',
        name: 'UTP - BOT',
        text: '👋 ¡Bienvenido a UTP Market!\nSoy tu asistente virtual y estoy aquí para ayudarte. 🚀\nPuedes:\nConsultar sobre compras y ventas.\nSaber cómo publicar un producto o servicio.\nObtener soporte con tu cuenta.\n✍ Escríbeme tu consulta y te responderé al instante.',
        timestamp: getTimestamp()
      }
    ]);
  }

  const toggleChat = () => {
    if (!isOpen && mensajes.length === 0) {
      initializeChat();
    }
    setIsOpen(!isOpen);
  }

  const scrollToBottom = () => {
    mensajesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if(isOpen) {
      scrollToBottom();
    }
  }, [mensajes, isOpen]);

  const enviarMensaje = async () => {
    if (entrada.trim() === '') return;

    const mensajeUsuario = { 
      sender: 'user', 
      name: 'Guest', 
      text: entrada, 
      timestamp: getTimestamp() 
    };
    setMensajes(prevMensajes => [...prevMensajes, mensajeUsuario]);
    setEntrada('');
    setCargando(true);

    const respuestaIA = await generateResponse(entrada);
    const mensajeBot = { 
      sender: 'bot', 
      name: 'UTP - BOT', 
      text: respuestaIA, 
      timestamp: getTimestamp() 
    };
    setMensajes(prevMensajes => [...prevMensajes, mensajeBot]);
    setCargando(false);
  };

  const manejarTeclaPresionada = (e) => {
    if (e.key === 'Enter') {
      enviarMensaje();
    }
  };

  return (
    <>
      <div className={`chatbot-widget-container ${isOpen ? 'open' : 'closed'}`}>
        <div className="card shadow-sm rounded-4 border-0 h-100 d-flex flex-column">
          
          {/* Header */}
          <div className="card-header bg-dark p-0 border-0" style={{borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem'}}>
            <div className="d-flex justify-content-between align-items-center p-2 text-white">
              <div>
                <i className="bi bi-three-dots"></i>
              </div>
              <h6 className="mb-0 fw-bold">Chatea con nosotros!</h6>
              <div>
                <i className="bi bi-dash-lg me-2" onClick={() => setIsOpen(false)} style={{cursor: 'pointer'}}></i>
                <i className="bi bi-x-lg" onClick={() => setIsOpen(false)} style={{cursor: 'pointer'}} role="button" aria-label="close chat"></i>
              </div>
            </div>
            <div className="d-flex align-items-center p-3 bg-white border-top border-bottom">
              <BotAvatar />
              <div className="ms-3">
                <h5 className="mb-0 fw-bold">UTP - BOT</h5>
                <p className="mb-0 text-muted small">Agente de soporte</p>
              </div>
              <div className="ms-auto">
                <button className="btn btn-light btn-sm border me-1"><i className="bi bi-hand-thumbs-up"></i></button>
                <button className="btn btn-light btn-sm border"><i className="bi bi-hand-thumbs-down"></i></button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="card-body d-flex flex-column" style={{ overflowY: 'auto', padding: '1rem', flexGrow: 1 }}>
            {mensajes.map((msg, index) => (
              <div key={index} className={`mb-3 ${msg.sender === 'user' ? 'align-self-end' : 'align-self-start'}`} style={{ maxWidth: '85%' }}>
                <div className="d-flex align-items-end mb-1">
                  {msg.sender === 'bot' && <i className="bi bi-robot fs-5 text-danger me-2"></i>}
                  <span className="fw-bold small">{msg.name}</span>
                  <span className="text-muted small ms-2">{msg.timestamp}</span>
                </div>
                <div className={`p-2 px-3 rounded-3 ${msg.sender === 'user' ? 'msgbg-primary text-white rounded-bottom-left-0' : 'bg-light text-dark rounded-bottom-start-0'}`}>
                  <p className="mb-0" style={{whiteSpace: 'pre-wrap'}}>{msg.text}</p>
                </div>
                {msg.sender === 'user' && <div className="text-muted small text-end mt-1">Leído</div>}
              </div>
            ))}
            {cargando && (
              <div className="d-flex justify-content-start mb-3">
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
              </div>
            )}
            <div ref={mensajesEndRef} />
          </div>

          {/* Footer */}
          <div className="card-footer d-flex p-3 border-0">
            <input
              type="text"
              className="form-control flex-grow-1 me-2 rounded-pill"
              placeholder="Escribe tu mensaje..."
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              onKeyPress={manejarTeclaPresionada}
              disabled={cargando}
            />
            <button
              className="btn btn-primary rounded-circle"
              onClick={enviarMensaje}
              disabled={cargando}
              style={{width: '40px', height: '40px'}} aria-label="send message">
                
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className="chatbot-fab" onClick={toggleChat} role="button" aria-label="open chat">
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-chat-dots'}`}></i>
      </div>
    </>
  );
}

export default Chatbot;
