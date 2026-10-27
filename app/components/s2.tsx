"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Gojo from "../assets/gojo.jpg";

const S2 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Observe the whole section (not just the image) so the text never fades
  // out while it is still on screen in the stacked mobile layout.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className=" px-gutter py-section">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 md:flex-row md:gap-12 lg:gap-20 lg:py-15">
        {/* Image */}
        <div className="flex w-full max-w-xs items-center justify-center md:w-[35%] md:max-w-none">
          <Image
            src={Gojo}
            alt="About Me photo"
            sizes="(max-width: 768px) 320px, 448px"
            className={`h-auto max-h-100 w-full object-cover transition-[opacity,translate,scale] duration-700 ease-out motion-reduce:transition-none ${
              isVisible
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-90 -translate-x-10"
            }`}
          />
        </div>

        {/* Text */}
        <div
          className={`flex w-full flex-col justify-center gap-4 transition-[opacity,translate,scale] duration-700 ease-out motion-reduce:transition-none md:w-[65%] ${
            isVisible
              ? "opacity-100 scale-100 translate-x-0"
              : "opacity-0 scale-90 translate-x-10"
          }`}
        >
          <h2 className="name font-bold text-red-400">ABOUT ME</h2>

          <p className="text-base leading-relaxed font-bold text-slate-700 sm:text-lg lg:text-xl">
            I&apos;m a third year Management Information System student at SETEC
            Institute seeking a frontend internship to grow my skills and
            contribute to real-world projects. I started building web pages in
            2024 and quickly fell in love with the craft of making things both
            beautiful and functional.
            <br />
            <br />I focus on clean code, responsive layouts, and accessible
            interfaces. Right now I&apos;m deepening my understanding of React
            and modern CSS and always learning something new every week.
          </p>
        </div>
      </div>
    </section>
  );
};

export default S2;
