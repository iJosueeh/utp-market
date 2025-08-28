import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import FAQCard from '../components/a/FAQCard';

afterEach(cleanup);

describe('FAQCard', () => {
  const mockQuestion = "Test Question?";
  const mockAnswer = "Test Answer.";

  it('should render the question', () => {
    render(<FAQCard question={mockQuestion} answer={mockAnswer} />);
    expect(screen.getByText(mockQuestion)).not.toBeNull();
  });

  it('should not display the answer by default', () => {
    render(<FAQCard question={mockQuestion} answer={mockAnswer} />);
    expect(screen.queryByText(mockAnswer)).toBeNull();
  });

  it('should display the answer when clicked', () => {
    render(<FAQCard question={mockQuestion} answer={mockAnswer} />);
    
    const card = screen.getByText(mockQuestion).closest('div.list-group-item');
    fireEvent.click(card);

    expect(screen.getByText(mockAnswer)).not.toBeNull();
  });

  it('should hide the answer when clicked twice', () => {
    render(<FAQCard question={mockQuestion} answer={mockAnswer} />);
    
    const card = screen.getByText(mockQuestion).closest('div.list-group-item');
    
    // First click to show
    fireEvent.click(card);
    expect(screen.getByText(mockAnswer)).not.toBeNull();
    
    // Second click to hide
    fireEvent.click(card);
    expect(screen.queryByText(mockAnswer)).toBeNull();
  });
});
