'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Force page reload navigation - bypassing any routing issues
  const forceNavigate = (url: string) => {
    console.log('Attempting to navigate to:', url);
    window.location.href = url;
  };
  
  return (
    <>
      {/* Menu Button - LEFT SIDE */}
      <button 
        onClick={() => {
          console.log('Menu button clicked, isOpen:', !isOpen);
          setIsOpen(!isOpen);
        }} 
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',  // CHANGED from right to left
          zIndex: 9999999999,
          padding: '10px',
          backgroundColor: 'white',
          border: '2px solid black',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Panel - LEFT SIDE */}
      {isOpen && (
        <div 
  style={{
    position: 'fixed', 
    top: 0, 
    left: 0,
    width: '250px',
    height: '100vh',
    backgroundColor: 'white',
    boxShadow: '4px 0 10px rgba(0,0,0,0.2)',
    padding: '80px 20px 20px 20px',
    zIndex: 9999999999,  // Maximum z-index
    overflowY: 'auto',
    pointerEvents: 'auto',  // Force pointer events
    isolation: 'isolate',  // Create new stacking context
  }}
>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Home Button with Alert */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                alert('Home button clicked! Navigating...');
                console.log('Home button clicked');
                forceNavigate('/');
              }}
              style={{
                padding: '12px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px',
                width: '100%',
              }}
              type="button"
            >
              🏠 Home
            </button>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Phones button clicked');
                forceNavigate('/Categories/phones');
              }}
              style={{
                padding: '12px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px',
                width: '100%',
              }}
              type="button"
            >
              📱 Phones
            </button>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Marine World button clicked');
                forceNavigate('/Categories/marine-world');
              }}
              style={{
                padding: '12px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px',
                width: '100%',
              }}
              type="button"
            >
              🚤 Marine World
            </button>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Reviews button clicked');
                forceNavigate('/reviews');
              }}
              style={{
                padding: '12px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px',
                width: '100%',
              }}
              type="button"
            >
              ⭐ Reviews
            </button>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Contact button clicked');
                forceNavigate('/contact');
              }}
              style={{
                padding: '12px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px',
                width: '100%',
              }}
              type="button"
            >
              📞 Contact
            </button>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Order button clicked');
                forceNavigate('/order');
              }}
              style={{
                padding: '12px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px',
                width: '100%',
              }}
              type="button"
            >
              🛒 Order
            </button>
            
            {/* Test button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                alert('TEST BUTTON WORKS! Clicks ARE working!');
                console.log('Test button clicked');
              }}
              style={{
                padding: '12px',
                backgroundColor: '#ff0000',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px',
                marginTop: '20px',
                width: '100%',
              }}
              type="button"
            >
              🧪 TEST CLICK (Should Alert)
            </button>
          </div>
        </div>
      )}
    </>
  );
}