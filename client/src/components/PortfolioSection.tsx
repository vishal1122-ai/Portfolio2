import { useState, useEffect } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
}

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const projects: Project[] = [
    {
      id: 0,
      title: "ScriptSentry – AI Contract Analyzer",
      description:
        "An AI-powered legal contract analyzer that identifies risky clauses, scores document safety, and offers red-flag summaries for freelancers and small businesses.",
      image: "publicassetsScriptSentry_Thumbnail.png", // Add this image to your public/assets folder
      technologies: [
        "React",
        "Node.js",
        "OpenAI API",
        "JWT",
        "AWS",
        "Tailwind CSS",
      ],
      category: "Web App",
      liveUrl: "https://script-sentry.onrender.com/", // <-- your deployed site URL
      githubUrl: "https://github.com/vishal1122-ai/ScriptSentry", // <-- your GitHub repo
    },
    {
      id: 2,
      title: "3D Portfolio Website",
      description:
        "An immersive 3D portfolio website built with Three.js and React. Features interactive 3D models, particle systems, and smooth scroll animations.",
      image:
        "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["Three.js", "React", "GSAP", "WebGL"],
      category: "3D Experience",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "SaaS Landing Page",
      description:
        "A high-converting SaaS landing page with advanced animations, micro-interactions, and optimized conversion funnels.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["React", "Framer Motion", "Tailwind CSS"],
      category: "Landing Page",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "Interactive Dashboard",
      description:
        "A data visualization dashboard with real-time charts, interactive elements, and responsive design for analytics platforms.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["React", "D3.js", "Chart.js", "WebSocket"],
      category: "Web App",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 5,
      title: "WebGL Particle System",
      description:
        "An interactive particle system built with WebGL and Three.js, featuring physics simulation and real-time user interaction.",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["Three.js", "WebGL", "GLSL", "Physics"],
      category: "3D Experience",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 6,
      title: "Corporate Website",
      description:
        "A professional corporate website with modern design, smooth animations, and optimized performance for business clients.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["React", "GSAP", "Tailwind CSS", "Next.js"],
      category: "Landing Page",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const categories = ["All", "Web App", "Landing Page", "3D Experience"];

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.gsap) {
        const { gsap, ScrollTrigger } = window;

        // Simple fade-in for portfolio cards
        gsap.utils
          .toArray(".portfolio-card")
          .forEach((card: any, index: number) => {
            gsap.fromTo(
              card,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.4,
                delay: index * 0.03,
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [filteredProjects]);

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Work</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of selected projects demonstrating expertise in modern
            web technologies and creative design.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-gray-100 dark:bg-dark-card p-1 rounded-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-electric text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:text-electric"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="portfolio-card group">
              <div className="portfolio-card-inner">
                {/* Front Face */}
                <div className="portfolio-card-front bg-white dark:bg-dark-card shadow-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 bg-electric/10 text-electric rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Back Face */}
                <div className="portfolio-card-back bg-gradient-to-br from-electric to-neon text-white">
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        {project.title}
                      </h3>
                      <p className="text-sm mb-4 opacity-90">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/20 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <a
                        href={project.liveUrl}
                        className="flex-1 bg-white/20 hover:bg-white/30 py-2 px-4 rounded-lg text-center transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Live Site
                      </a>
                      <a
                        href={project.githubUrl}
                        className="flex-1 bg-white/20 hover:bg-white/30 py-2 px-4 rounded-lg text-center transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-github mr-2"></i>
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
