"use client";

import { useEffect, useRef, useState } from "react";
import Skills from "./skill";

const S3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll animation
  // (low threshold so tall mobile layouts still trigger reliably)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="px-gutter py-section lg:pb-50"
    >
      <div className="mx-auto w-full max-w-7xl items-center gap-8 lg:grid-cols-10 lg:gap-10 lg:w-10000">
        {/* Left Column - Skills */}
        <div
          className={`w-full transition-[opacity,translate,scale] duration-700 ease-out motion-reduce:transition-none lg:col-span-7 ${
            isVisible
              ? "translate-x-0 scale-100 opacity-100"
              : "-translate-x-12 scale-90 opacity-0"
          }`}
        >
          <Skills />
        </div>
      </div>
    </section>
  );
};

export default S3;
