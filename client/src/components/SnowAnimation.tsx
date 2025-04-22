import { useEffect, useRef } from "react";
import { createSnowflake } from "@/lib/utils";

export default function BackgroundAnimation() {
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

    // Create a few snowflakes (much fewer than before)
    const snowflakes = Array.from({ length: Math.floor(window.innerWidth / 100) }, createSnowflake);

    // Animation loop
    let animationFrameId: number;

    const drawGrid = () => {
      const gridSize = 50;
      const lineWidth = 1;
      
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = lineWidth;

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the grid
      drawGrid();
      
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
        flake.y += flake.speed * 0.5; // Slower falling speed
        flake.rotation += flake.rotationSpeed;

        // Make snowflakes float slightly left and right
        flake.x += Math.sin(flake.y / 50) * 0.1;

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
