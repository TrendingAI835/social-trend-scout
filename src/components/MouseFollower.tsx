
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Track mouse position
    window.addEventListener("mousemove", handleMouseMove);
    
    // Track hover state on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .trend-card');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseOver);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseOver);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
      style={{
        background: "radial-gradient(circle at center, rgba(15, 23, 42, 0.3) 0%, rgba(15, 23, 42, 0.8) 100%)",
      }}
    >
      {/* Main glow effect */}
      <motion.div
        className="absolute rounded-full bg-opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(155, 135, 245, 0.35) 0%, rgba(155, 135, 245, 0) 70%)",
          width: isHovering ? "800px" : "600px",
          height: isHovering ? "800px" : "600px",
          boxShadow: isHovering ? "0 0 80px 20px rgba(155, 135, 245, 0.3)" : "0 0 60px 10px rgba(155, 135, 245, 0.15)",
          willChange: "transform, width, height, box-shadow",
        }}
        animate={{
          x: mousePosition.x - (isHovering ? 400 : 300),
          y: mousePosition.y - (isHovering ? 400 : 300),
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 200,
          mass: 0.8,
        }}
      />
      
      {/* Secondary subtle glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(236, 72, 153, 0) 70%)",
          width: "400px",
          height: "400px",
          willChange: "transform",
        }}
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
          scale: isHovering ? 1.4 : 1,
        }}
        transition={{
          type: "spring",
          damping: 60,
          stiffness: 300,
          mass: 0.5,
        }}
      />
      
      {/* Small accent glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)",
          width: "200px",
          height: "200px",
          willChange: "transform",
        }}
        animate={{
          x: mousePosition.x - 100,
          y: mousePosition.y - 100,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 80,
          stiffness: 400,
          mass: 0.3,
        }}
      />
    </motion.div>
  );
};

export default MouseFollower;
