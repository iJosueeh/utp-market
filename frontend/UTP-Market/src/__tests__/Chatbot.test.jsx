import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Chatbot from '../pages/features/chatbot/Chatbot';
import * as ChatbotUtils from '../utils/Chatbot.js';

// Mock the generateResponse function
vi.mock('../utils/Chatbot.js', () => ({
  generateResponse: vi.fn(),
}));

window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('Componente Chatbot', () => {
  it('debería renderizar el FAB del chatbot', () => {
    render(<Chatbot />);
    const fab = screen.getByRole('button', { name: /open chat/i });
    expect(fab).not.toBeNull();
  });

  it('debería abrir la ventana de chat al hacer clic en el FAB', () => {
    const { container } = render(<Chatbot />);
    const fab = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(fab);
    
    const chatContainer = container.querySelector('.chatbot-widget-container');
    expect(chatContainer).toHaveClass('open');
  });

  it('debería cerrar la ventana de chat al hacer clic en el botón de cerrar', () => {
    const { container } = render(<Chatbot />);
    const fab = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(fab);

    const closeButton = screen.getByRole('button', { name: /close chat/i });
    fireEvent.click(closeButton);

    const chatContainer = container.querySelector('.chatbot-widget-container');
    expect(chatContainer).not.toHaveClass('open');
  });

  it('debería permitir escribir un mensaje y enviarlo', async () => {
    ChatbotUtils.generateResponse.mockResolvedValue('Esta es una respuesta de prueba.');
    
    render(<Chatbot />);
    const fab = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(fab);

    const input = screen.getByPlaceholderText(/Escribe tu mensaje.../i);
    const sendButton = screen.getByRole('button', { name: /send message/i });

    fireEvent.change(input, { target: { value: 'Hola, bot!' } });
    expect(input.value).toBe('Hola, bot!');

    fireEvent.click(sendButton);

    await waitFor(() => {
      const userMessage = screen.getByText('Hola, bot!');
      expect(userMessage).not.toBeNull();
    });

    await waitFor(() => {
      const botResponse = screen.getByText('Esta es una respuesta de prueba.');
      expect(botResponse).not.toBeNull();
    });
  });
});