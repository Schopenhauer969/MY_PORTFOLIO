"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

const projects = [
  {
    title: "AI Task Management Suite",
    description:
      "A modern, fast, and responsive Point of Sale (POS) web application built for seamless retail and business management. Designed with a sleek user interface and smooth animations, it provides an efficient checkout and administrative experience.",
    tags: ["React", "Jsx", "JavaScript", "Local Storage"],
    liveUrl: "https://point-of-sale-local.vercel.app",
    githubUrl: "https://github.com/Schopenhauer969/POINT_OF_SALE",
    image: "/pos.png",
  },
  {
    title: "Cosmetic Stock Controls",
    description:
      "A complete, working full-stack app: Node.js + Express + MongoDB (Mongoose) backend with a plain HTML/CSS/JS frontend. Every page (Categories, Inventory, Suppliers, Purchases, Sales) does real Create / Read / Update / Delete",
    tags: ["Javascript", "Express", "Node.js", "MongoDB"],
    liveUrl: "https://crud-stock-control-1.onrender.com",
    githubUrl: "https://github.com/Schopenhauer969/CRUD-Stock-Control",
    image: "/sale.png",
  },
  {
    title: "Cosmetic Stock Controls2",
    description:
      "A complete, working full-stack app: Node.js + Express + MongoDB (Mongoose) backend with a plain HTML/CSS/JS frontend. Every page (Categories, Inventory, Suppliers, Purchases, Sales) does real Create / Read / Update / Delete",
    tags: ["Javascript", "Express", "Node.js", "MongoDB"],
    liveUrl: "https://crud-stock-control-1.onrender.com",
    githubUrl: "https://github.com/Schopenhauer969/CRUD-Stock-Control",
    image: "/sale.png",
  },
  {
    title: "Cosmetic Stock Controls1",
    description:
      "A complete, working full-stack app: Node.js + Express + MongoDB (Mongoose) backend with a plain HTML/CSS/JS frontend. Every page (Categories, Inventory, Suppliers, Purchases, Sales) does real Create / Read / Update / Delete",
    tags: ["Javascript", "Express", "Node.js", "MongoDB"],
    liveUrl: "https://crud-stock-control-1.onrender.com",
    githubUrl: "https://github.com/Schopenhauer969/CRUD-Stock-Control",
    image: "/sale.png",
  },
];

/** How many projects are visible before the "Show more" toggle appears. */
const INITIAL_VISIBLE = 3;

/** "https://point-of-sale-local.vercel.app" -> "point-of-sale-local.vercel.app" */
function hostname(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

const btnBase =
  "inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3 text-sm font-semibold transition-[scale,box-shadow,background-color,color,filter] duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";

export default function ProjectShowcase() {
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridId = useId();

  const hasMore = projects.length > INITIAL_VISIBLE;
  const visible =
    hasMore && !expanded ? projects.slice(0, INITIAL_VISIBLE) : projects;
  const hiddenCount = projects.length - INITIAL_VISIBLE;

  function toggle() {
    const collapsing = expanded;
    setExpanded(!expanded);

    // After collapsing, bring the top of the list back into view so the
    // reader isn't left stranded far below the (now shorter) grid.
    if (collapsing) {
      requestAnimationFrame(() =>
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }

  return (
    <section className="mx-auto max-w-7xl lg:py-0 ">
      {/* Section Header */}
      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Featured{" "}
          <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="mt-4 px-6 text-base leading-relaxed text-slate-600 sm:text-lg lg:mt-2">
          A selection of recent technical work demonstrating full-stack
          architecture, clean design, and performance optimization.
        </p>
      </div>

      {/* Grid Layout */}
      <div
        ref={gridRef}
        id={gridId}
        className="flex scroll-mt-20 flex-wrap justify-center gap-6 sm:gap-8 lg:mb-0"
      >
        {visible.map((project, i) => {
          const extra = i >= INITIAL_VISIBLE; // revealed by "Show more"
          return (
            <div
              key={project.title}
              className={`w-full max-w-96 ${extra ? "animate-card-in" : ""}`}
              style={
                extra
                  ? { animationDelay: `${(i - INITIAL_VISIBLE) * 90}ms` }
                  : undefined
              }
            >
              <article className="group relative h-full bg-gray-300 rounded-2xl p-px transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/20 focus-within:shadow-2xl focus-within:shadow-indigo-500/20 motion-reduce:hover:translate-y-0">
                {/* Gradient border that fades in on hover / focus */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                />

                <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-white">
                  {/* Browser-style preview (whole image is a click target) */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="block"
                  >
                    {/* Fixed aspect ratio = no layout shift while loading */}
                    <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 384px"
                        className="transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </a>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className=" text-xl font-bold text-slate-900 transition-colors duration-200 group-hover:text-indigo-600">
                      {project.title}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {project.description}
                    </p>

                    {/* Skill Badges */}
                    <ul
                      className="mt-2 flex flex-wrap gap-1.5"
                      aria-label="Tech stack"
                    >
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-100"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    {/* Links: two equal, full-width buttons (44px+ tap targets) */}
                    <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 max-[22.5rem]:grid-cols-1 lg:mt-0">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} - live demo (opens in a new tab)`}
                        className={`${btnBase} bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/40 hover:brightness-110`}
                      >
                        Live Demo
                        <svg
                          className="size-4 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} - source code on GitHub (opens in a new tab)`}
                        className={`${btnBase} bg-white text-slate-800 ring-1 ring-slate-300 ring-inset hover:bg-slate-900 hover:text-white hover:ring-slate-900`}
                      >
                        Source Code
                        <svg
                          className="size-4 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {/* Show more / Show less - only rendered when there are more than 3 */}
      {hasMore && (
        <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12 lg:mb-20 ">
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls={gridId}
            className="group/btn inline-flex min-h-10 items-center gap-2.5 rounded-full bg-white px-7 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-300 transition-[scale,box-shadow,background-color,color] duration-200 ring-inset hover:bg-slate-900 hover:text-white hover:shadow-lg hover:ring-slate-900 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {expanded
              ? "Show less"
              : `Show ${hiddenCount} more project${hiddenCount > 1 ? "s" : ""}`}
            <svg
              className={`size-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <p className="text-xs text-slate-500" aria-live="polite">
            Showing {visible.length} of {projects.length} projects
          </p>
        </div>
      )}
    </section>
  );
}
