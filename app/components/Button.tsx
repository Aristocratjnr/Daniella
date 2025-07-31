import styled from 'styled-components';

interface ButtonProps {
  $randomleft: string;
  $randomtop: string;
  $hasstarted: boolean;
}

const Button = styled.button<ButtonProps>`
  position: ${({ $hasstarted }) => ($hasstarted ? 'fixed' : 'relative')};
  transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  left: ${({ $hasstarted, $randomleft }) => ($hasstarted ? $randomleft : 'auto')};
  top: ${({ $hasstarted, $randomtop }) => ($hasstarted ? $randomtop : 'auto')};
  transform: ${({ $hasstarted }) => ($hasstarted ? 'translate(-50%, -50%)' : 'none')};
  z-index: 10;
  background-color: #ff6b6b;
  color: white;
  border: 2px solid #ff9e9e;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  white-space: nowrap;
  user-select: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  
  /* Glow effect on hover/focus */
  &:hover, &:focus {
    box-shadow: 0 0 15px rgba(255, 107, 107, 0.6);
    transform: ${({ $hasstarted }) => ($hasstarted ? 'translate(-50%, -50%) scale(1.05)' : 'scale(1.05)')};
  }
  
  &:active {
    transform: ${({ $hasstarted }) => ($hasstarted ? 'translate(-50%, -50%) scale(0.95)' : 'scale(0.95)')};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    min-width: 120px;
    text-align: center;
    position: ${({ $hasstarted }) => ($hasstarted ? 'fixed' : 'relative')};
    transform: ${({ $hasstarted }) => ($hasstarted ? 'translate(-50%, 0)' : 'none')};
    left: ${({ $hasstarted, $randomleft }) => ($hasstarted ? $randomleft : 'auto')};
    top: ${({ $hasstarted, $randomtop }) => ($hasstarted ? $randomtop : 'auto')};
    z-index: 20;
    
    /* Make sure the button is always visible on mobile */
    opacity: ${({ $hasstarted }) => ($hasstarted ? '1' : '1')} !important;
    pointer-events: auto !important;
    
    &:hover, &:focus {
      transform: ${({ $hasstarted }) => ($hasstarted ? 'translate(-50%, 0) scale(1.05)' : 'scale(1.05)')};
    }
    
    &:active {
      transform: ${({ $hasstarted }) => ($hasstarted ? 'translate(-50%, 0) scale(0.95)' : 'scale(0.95)')};
    }
  }
`;

export default Button;
