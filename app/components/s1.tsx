"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTypewriter } from "../hooks/useTypewriter";

import HengImage from "../assets/heng.jpg";
import AnImage from "../assets/an.jpg";

const images = [
  { src: HengImage, alt: "Ly Kimheng" },
  { src: AnImage, alt: "Anime profile" },
];
const HERO_SIZES = "(max-width: 1024px) 55vw, 420px";

const SWAP_EVERY_MS = 3000;
const SWAP_AT_MS = 200;
const GLITCH_FOR_MS = 450;

const S1 = () => {
  // ==========================================
  // TYPEWRITER
  // ==========================================

  const line1 = useTypewriter("welcome to my portfolio", 30, 0);
  const line2 = useTypewriter("Hi There,", 40, 800);
  const line3 = useTypewriter("I'm Ly Kimheng", 40, 1400);
  const line4 = useTypewriter("A Frontend Dev", 40, 2200);

  // ==========================================
  // REVEAL ON SCROLL
  // (observes the whole section so text and image always animate together,
  //  even when the image is below the fold on small screens)
  // ==========================================

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 },
    );

    const currentElement = sectionRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => observer.disconnect();
  }, []);

  // ==========================================
  // IMAGE SWAP + GLITCH
  // ==========================================

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let swapTimer: ReturnType<typeof setTimeout> | undefined;
    let glitchTimer: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      setIsGlitching(true);

      swapTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
      }, SWAP_AT_MS);

      glitchTimer = setTimeout(() => {
        setIsGlitching(false);
      }, GLITCH_FOR_MS);
    }, SWAP_EVERY_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(swapTimer);
      clearTimeout(glitchTimer);
    };
  }, []);

  // ==========================================
  // JSX
  // ==========================================

  return (
    <section
      ref={sectionRef}
      id="home"
      className="flex min-h-[calc(100svh-4rem)] w-full items-center justify-center px-gutter py-section"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10">
        {/* =====================================
            LEFT SIDE - TEXT
        ====================================== */}

        <div
          className={`flex w-full items-center justify-center transition-[opacity,translate,scale] duration-700 ease-out motion-reduce:transition-none ${
            isVisible
              ? "opacity-100 scale-100 translate-x-0"
              : "opacity-0 scale-90 -translate-x-20"
          }`}
        >
          <div className="w-full max-w-xl">
            <p className="mb-2 h-7 w-fit min-w-57 rounded whitespace-nowrap bg-blue-300 px-4 py-0.5 font-bold text-white shadow-[2px_2px_0] shadow-blue-400">
              {line1.text}
            </p>

            <h1 className="min-h-[3lh] text-4xl leading-none font-bold text-slate-500 sm:text-5xl xl:text-6xl">
              {line2.text}
              <br />

              {line3.text && (
                <>
                  I&apos;m{" "}
                  <span className="text-red-400">
                    {line3.text.replace("I'm ", "")}
                  </span>
                </>
              )}

              <br />

              <span className="text-slate-600">{line4.text}</span>
            </h1>

            <p className="mt-4 font-bold text-pretty text-slate-700">
              Frontend developer in training — turning designs into clean,
              accessible interfaces with React & modern CSS.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 sm:mt-10 sm:gap-5">
              <a
                href="#about"
                className="bg-amber-300 px-4 py-2 font-bold text-black/50 shadow-[4px_4px_0px] shadow-amber-400"
              >
                ABOUT ME
              </a>

              <a
                href="#contact"
                className="bg-amber-300 px-4 py-2 font-bold text-black/50 shadow-[4px_4px_0px] shadow-amber-400"
              >
                HIRING ME
              </a>
            </div>
          </div>
        </div>

        {/* =====================================
            RIGHT SIDE - IMAGE
        ====================================== */}

        <div
          className={`flex w-full items-center justify-center transition-[opacity,translate,scale] duration-700 ease-out motion-reduce:transition-none ${
            isVisible
              ? "opacity-100 scale-100 translate-x-0"
              : "opacity-0 scale-90 translate-x-10"
          }`}
        >
          {/* IMAGE CONTAINER (fluid size: ~256px on phones up to 420px) */}

          <div className="relative size-[clamp(16rem,55vw,26.25rem)]">
            {/* OUTER ROTATING CIRCLE */}

            <div className="animate-spin-slow absolute inset-[-18px] rounded-full border border-indigo-500/30" />

            {/* SECOND ROTATING CIRCLE */}

            <div className="absolute inset-[-8px] rounded-full border-2 border-indigo-500/50 shadow-[0_0_35px_rgba(99,102,241,0.45)]" />

            {/* DASHED CIRCLE */}

            <div className="animate-reverse-spin absolute inset-[-30px] rounded-full border border-dashed border-gray-500" />

            {/* IMAGE */}

            <div
              className={`relative h-full w-full overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-2xl ${
                isGlitching ? "animate-glitch" : ""
              }`}
            >
              {/* MAIN IMAGES - both stay mounted so the swap is instant
                  (no network request / flash when the picture changes) */}

              {images.map((img, i) => (
                <Image
                  key={img.alt}
                  src={img.src}
                  alt={i === currentIndex ? img.alt : ""}
                  aria-hidden={i === currentIndex ? undefined : true}
                  fill
                  sizes={HERO_SIZES}
                  loading="eager"
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className={`object-cover ${i === currentIndex ? "opacity-100" : "opacity-0"}`}
                />
              ))}

              {isGlitching && (
                <>
                  {/* RED GLITCH */}

                  <Image
                    src={images[currentIndex].src}
                    alt=""
                    fill
                    sizes={HERO_SIZES}
                    className="animate-glitch-red object-cover opacity-70 mix-blend-screen"
                  />

                  {/* BLUE GLITCH */}

                  <Image
                    src={images[currentIndex].src}
                    alt=""
                    fill
                    sizes={HERO_SIZES}
                    className="animate-glitch-blue object-cover opacity-70 mix-blend-screen"
                  />

                  {/* SCANLINES */}

                  <div className="glitch-lines pointer-events-none absolute inset-0" />

                  {/* NOISE */}

                  <div className="glitch-noise pointer-events-none absolute inset-0" />
                </>
              )}
            </div>

            {/* FLOATING CIRCLES */}

            <span className="absolute top-2 right-4 h-4 w-4 rounded-full bg-indigo-500 shadow-[0_0_20px_#6366f1]" />

            <span className="absolute bottom-8 left-0 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />

            <span className="absolute top-1/2 -left-8 h-2 w-2 rounded-full bg-pink-500 shadow-[0_0_20px_#ec4899]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default S1;
