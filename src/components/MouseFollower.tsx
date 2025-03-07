
import React, { useEffect } from "react";

const MouseFollower = () => {
  useEffect(() => {
    // Add hover effects to text elements on the landing page
    const textElements = document.querySelectorAll('.hover-color-text');
    
    const handleMouseEnter = (e: MouseEvent) => {
      const element = e.currentTarget as HTMLElement;
      // Apply random color from our theme palette
      const colors = [
        'text-primary',         // purple
        'text-accent',          // pink
        'text-blue-400',        // blue
        'text-teal-400',        // teal
        'text-amber-400'        // amber
      ];
      
      // Remove any existing color classes
      element.classList.remove(...colors);
      
      // Add a random color class
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      element.classList.add(randomColor, 'transition-colors', 'duration-300');
    };
    
    const handleMouseLeave = (e: MouseEvent) => {
      const element = e.currentTarget as HTMLElement;
      // Reset to original color
      element.classList.remove(
        'text-primary',
        'text-accent',
        'text-blue-400',
        'text-teal-400',
        'text-amber-400'
      );
    };
    
    textElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter as EventListener);
      element.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });
    
    return () => {
      textElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        element.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
    };
  }, []);

  return null; // No visual component needed
};

export default MouseFollower;
