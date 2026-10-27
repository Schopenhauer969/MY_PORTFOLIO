"use client";

import { useEffect, useRef, useState } from "react";
import Project from "./project";

const Section4 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }, // Low threshold so mobile screens trigger the animation reliably
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`w-full transition-[opacity,translate,scale] duration-700 ease-out motion-reduce:transition-none ${
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-8"
          }`}
        >
          <Project />
        </div>
      </div>
    </section>
  );
};

export default Section4;
