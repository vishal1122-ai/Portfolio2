import { useEffect } from "react";

export const useCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateCursor = () => {
      if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
      }
      requestAnimationFrame(updateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    updateCursor();

    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .portfolio-card, .testimonial-card');
    
    const handleMouseEnter = () => cursor?.classList.add('hover');
    const handleMouseLeave = () => cursor?.classList.remove('hover');

    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      hoverElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
};
