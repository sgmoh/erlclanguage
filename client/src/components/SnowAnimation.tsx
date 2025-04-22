import { useEffect, useRef } from "react";
import { createSnowflake } from "@/lib/utils";

export default function SnowAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Create snowflakes
    const snowflakes = Array.from({ length: Math.floor(window.innerWidth / 20) }, createSnowflake);

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update snowflakes
      snowflakes.forEach((flake, index) => {
        // Draw snowflake
        ctx.save();
        ctx.font = `${flake.size}px Arial`;
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.translate(flake.x * canvas.width / 100, flake.y);
        ctx.rotate((flake.rotation * Math.PI) / 180);
        ctx.fillText("❄", 0, 0);
        ctx.restore();

        // Update snowflake position for next frame
        flake.y += flake.speed;
        flake.rotation += flake.rotationSpeed;

        // Reset snowflake when it goes off screen
        if (flake.y > canvas.height + 20) {
          snowflakes[index] = {
            ...createSnowflake(),
            y: -10, // Start again from top
          };
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ backgroundColor: "transparent" }}
    />
  );
}
