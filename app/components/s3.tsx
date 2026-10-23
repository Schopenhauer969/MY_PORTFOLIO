"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Skills from "./skill";
import Html from "../assets/html.png";
import Css from "../assets/css.jpg";
import Js from "../assets/js.jpg";
import Java from "../assets/java.png";
import C from "../assets/c.png";
import Cpp from "../assets/cpp.png";
import Csharp from "../assets//Csharp_Logo.png";
import React from "../assets/React-icon.svg.webp";
import Angular from "../assets/ngularr.png";
import Vue from "../assets/Vue.js.webp";
import Type from "../assets/typescript-2.png";

const skillImages = [
  { src: Html, name: "HTML" },
  { src: Css, name: "CSS" },
  { src: Js, name: "JavaScript" },
  { src: Java, name: "Java" },
  { src: React, name: "React" },
  { src: Angular, name: "Angular" },
  { src: Vue, name: "Vue" },
  { src: C, name: "C" },
  { src: Cpp, name: "Cpp" },
  { src: Csharp, name: "Csharp" },
  { src: Type, name: "Type" },
];

const S3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
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

  // Slideshow timer (pauses when off-screen)
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % skillImages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} id="skills" className="px-gutter py-section">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-10 lg:gap-10">
        {/* Left Column - Skills */}
        <div
          className={`w-full transition-all duration-700 ease-out lg:col-span-7 ${
            isVisible
              ? "translate-x-0 scale-100 opacity-100"
              : "-translate-x-12 scale-90 opacity-0"
          }`}
        >
          <Skills />
        </div>

        {/* Right Column - Image Slideshow */}
        <div className="flex w-full items-center justify-center lg:col-span-3">
          <div className="relative flex aspect-square w-full max-w-72 items-center justify-center overflow-hidden">
            {skillImages.map((image, index) => {
              const isActive = currentImage === index;
              return (
                <div
                  key={image.name}
                  aria-hidden={!isActive}
                  className={`absolute w-5/6 transition-all duration-700 ease-out ${
                    isActive
                      ? "pointer-events-auto translate-x-0 scale-100 opacity-100"
                      : "pointer-events-none translate-x-12 scale-90 opacity-0"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={`${image.name} logo`}
                    className="rounded-3xl object-contain shadow-lg"
                    priority={index === 0}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default S3;
