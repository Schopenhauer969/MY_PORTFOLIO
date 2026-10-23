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
];

export default function ProjectShowcase() {
  return (
    <section className="mx-auto max-w-7xl">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-200 text-indigo-600 ring-1 ring-inset ring-indigo-500/20 mb-4">
          Portfolio
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Featured{" "}
          <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          A selection of recent technical work demonstrating full-stack
          architecture, clean design, and performance optimization.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),24rem))] justify-center gap-8">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden ring-1 ring-gray-400 shadow-sm hover:shadow-xl hover:shadow-indigo-300/10 transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Image Preview Container */}
            <div className="relative w-full overflow-hidden bg-slate-200">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Card Content */}
            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200">
                {project.title}
              </h3>

              <p className="mt-2.5 text-slate-600 text-sm leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Skill Badges */}
              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-200 rounded-lg ring-1 ring-inset ring-slate-500/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links & CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors group/link"
                >
                  Live Demo
                  <svg
                    className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Source Code
                  <svg
                    className="w-4 h-4 ml-1.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
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
          </article>
        ))}
      </div>
    </section>
  );
}
