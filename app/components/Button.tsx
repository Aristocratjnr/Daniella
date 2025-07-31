import styled from 'styled-components';

interface ButtonProps {
  $randomleft: string;
  $randomtop: string;
  $hasstarted: boolean;
}

const Button = styled.button<ButtonProps>`
  position: ${({ $hasstarted }) => ($hasstarted ? 'fixed' : 'relative')};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  left: ${({ $hasstarted, $randomleft }) => ($hasstarted ? $randomleft : 'auto')};
  top: ${({ $hasstarted, $randomtop }) => ($hasstarted ? $randomtop : 'auto')};
  transform: ${({ $hasstarted }) => ($hasstarted ? 'translate(-50%, -50%)' : 'none')} !important;
  z-index: 10;
  will-change: transform;
  background: linear-gradient(145deg, #ff6b9d, #ff8e9e);
  color: white;
  border: 3px solid #d81b60;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  font-family: 'Dancing Script', cursive, sans-serif;
  font-size: 1.4rem;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  white-space: nowrap;
  user-select: none;
  min-width: 100px;
  text-align: center;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(145deg, #ffffff33, #ffffff00);
    border-radius: 45px;
    z-index: -1;
    transition: all 0.3s ease;
  }
  
  &:hover, &:focus {
    background: linear-gradient(145deg, #ff4785, #ff6b9d);
    border-color: #c2185b;
    transform: ${({ $hasstarted }) => ($hasstarted ? 'translate(-50%, -50%) scale(1.05)' : 'scale(1.05)')} !important;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    
    &::before {
      background: linear-gradient(145deg, #ffffff44, #ffffff11);
    }
  }
  
  &:active {
    transform: ${({ $hasstarted }) => ($hasstarted ? 'translate(-50%, -50%) scale(0.98)' : 'scale(0.98)')} !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.5rem;
    font-size: clamp(0.9rem, 2.8vw, 1.1rem);
    min-width: 100px;
    border-width: 2.5px;
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
