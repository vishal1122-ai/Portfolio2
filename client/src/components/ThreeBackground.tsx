import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import {
  ThreeAnimationManager,
  type AnimationType,
} from "@/lib/three-animations";

interface ThreeBackgroundProps {
  currentAnimation: AnimationType;
  onAnimationChange: (animation: AnimationType) => void;
}

export default function ThreeBackground({
  currentAnimation,
  onAnimationChange,
}: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationManagerRef = useRef<ThreeAnimationManager | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (containerRef.current && !animationManagerRef.current) {
      animationManagerRef.current = new ThreeAnimationManager(
        containerRef.current
      );
    }

    return () => {
      if (animationManagerRef.current) {
        animationManagerRef.current.dispose();
        animationManagerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (animationManagerRef.current) {
      animationManagerRef.current.setTheme(theme === "dark");
    }
  }, [theme]);

  useEffect(() => {
    if (animationManagerRef.current) {
      animationManagerRef.current.switchAnimation(currentAnimation);
    }
  }, [currentAnimation]);

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* Matrix Rain CSS Effect */}
      <MatrixRain visible={currentAnimation === "matrix"} />

      {/* Morphing Blobs */}
      <div className="morphing-blob absolute top-1/4 left-1/4 w-96 h-96 rounded-full"></div>
      <div
        className="morphing-blob absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
        style={{ animationDelay: "-4s" }}
      ></div>
    </>
  );
}

function MatrixRain({ visible }: { visible: boolean }) {
  useEffect(() => {
    if (!visible) return;

    const container = document.getElementById("matrixRain");
    if (!container) return;

    container.innerHTML = "";

    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    for (let i = 0; i < 50; i++) {
      const char = document.createElement("div");
      char.className = "matrix-char";
      char.textContent = chars[Math.floor(Math.random() * chars.length)];
      char.style.left = Math.random() * 100 + "%";
      char.style.animationDelay = Math.random() * 5 + "s";
      char.style.animationDuration = Math.random() * 10 + 10 + "s";
      container.appendChild(char);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [visible]);

  return <div className="matrix-rain" id="matrixRain" />;
}
