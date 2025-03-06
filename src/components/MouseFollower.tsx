
import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-0 transition-transform duration-200 ease-out"
      style={{
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(146, 103, 255, 0.5) 0%, rgba(146, 103, 255, 0) 70%)",
        transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
      }}
    ></div>
  );
};
