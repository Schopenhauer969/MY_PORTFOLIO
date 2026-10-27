"use client";

import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
  category: string;
  barColor: string;
}

const skillsData: Skill[] = [
  {
    name: "TypeScript & JavaScript (ES6+)",
    level: 85,
    category: "Core Language",
    barColor: "bg-blue-500",
  },
  {
    name: "React 19 & Next.js (App Router)",
    level: 88,
    category: "Framework",
    barColor: "bg-cyan-500",
  },
  {
    name: "Tailwind CSS v4 & DaisyUI",
    level: 92,
    category: "Styling & UI",
    barColor: "bg-teal-500",
  },
  {
    name: "State & Async Data (Zustand / TanStack Query)",
    level: 80,
    category: "Data & State",
    barColor: "bg-indigo-500",
  },
  {
    name: "Build Tools & Bundlers (Vite / ESBuild)",
    level: 82,
    category: "Tooling",
    barColor: "bg-emerald-500",
  },
  {
    name: "UI Motion & Interactivity (Framer Motion)",
    level: 78,
    category: "Animation",
    barColor: "bg-amber-500",
  },
];

const SkillBarItem = ({
  skill,
  isVisible,
  delay,
}: {
  skill: Skill;
  isVisible: boolean;
  delay: number;
}) => {
  // The animation writes straight to the DOM from requestAnimationFrame
  // instead of calling setState ~60x/second, so React never re-renders
  // while the bars fill (smoother, far less main-thread work).
  const barRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const label = valueRef.current;
    if (!bar || !label) return;

    const paint = (value: number) => {
      bar.style.width = `${value}%`;
      label.textContent = `${Math.floor(value)}%`;
    };

    if (!isVisible) {
      paint(0);
      return;
    }

    let animationFrameId = 0;
    let startTimestamp: number | null = null;

    const duration = 1800;

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;

      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      const easeProgress = 1 - Math.pow(1 - progress, 3);

      paint(progress < 1 ? easeProgress * skill.level : skill.level);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const delayTimer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, delay);

    // When the section leaves the screen, stop and reset so it replays on re-entry.
    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(animationFrameId);
      paint(0);
    };
  }, [isVisible, skill.level, delay]);

  return (
    <div className="flex flex-col gap-2.5">
      {/* Name + Percentage */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="text-sm font-semibold text-slate-800 sm:truncate">
            {skill.name}
          </span>

          <span className="hidden shrink-0 rounded-md bg-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-500 sm:inline-block">
            {skill.category}
          </span>
        </div>

        <span
          ref={valueRef}
          className="shrink-0 font-mono text-sm font-bold text-slate-700"
        >
          0%
        </span>
      </div>

      {/* Bar */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-300">
        <div
          ref={barRef}
          className={`h-full w-0 rounded-full ${skill.barColor}`}
        />
      </div>
    </div>
  );
};

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white">
      <div className="flex w-full max-w-7xl flex-col gap-7">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Technical Proficiency
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Frontend specialization & modern web development stack
          </p>
        </div>

        {/* ONE BOX */}
        <div className="w-full rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-6">
            {skillsData.map((skill, index) => (
              <SkillBarItem
                key={skill.name}
                skill={skill}
                isVisible={isVisible}
                delay={index * 120}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
