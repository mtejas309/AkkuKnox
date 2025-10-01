import React, { useState, useEffect } from "react";
import { Circle } from "phosphor-react"; // Phosphor icon for timeline dots
import { Link } from "react-router-dom";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiMongodb,
  SiRedux,
  SiTailwindcss,
} from "react-icons/si";
import { motion } from "framer-motion";

function Welcome() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const experiences = [
    {
      title: "LMG 8 Tech | Front-End Developer",
      period: "Feb 2024 - Present",
      description:
        "Developed responsive web applications using React.js, integrated full CRUD operations, and connected front-end designs with back-end data for e-commerce platforms and dashboards—enhancing functionality, usability, and user engagement.",
      tech: [
        "React",
        "Tailwind CSS",
        "Material UI",
        "Apex Charts",
        "REST APIs",
        "CSS3",
      ],
      color: "blue",
    },
    {
      title: "Expanding to Full-Stack",
      period: "2025 - Ongoing",
      description:
        "Expanding expertise beyond front-end development to master back-end technologies, database management, and full-stack architecture. Building comprehensive applications with end-to-end functionality and deployment pipelines.",
      tech: [
        "Node.js",
        "Express",
        "MongoDB",
        "REST APIs",
        "Authentication",
        "Deployment",
      ],
      color: "purple",
    },
  ];

  const projects = [
    {
      name: "Atkins Réalis",
      stack: "ReactJS, NodeJS, MongoDB, JavaScript, CSS",
      desc: "Developed and implemented a procurement system using React, CSS, and JavaScript to streamline the acquisition of goods and services. Automated processes such as purchase requisitions, order creation, supplier management, and invoice processing to enhance efficiency and reduce errors. Integrated reporting tools to provide insights into procurement spending and supplier performance, and also developed the backend system.",
      link: null,
      category: "webApp",
    },
    {
      name: "LMG8 Feedback Web App",
      stack: "ReactJS, JavaScript, CSS",
      desc: "Developed a responsive feedback application for LMG8 Tech using React, featuring a modular admin portal for managing project details, client questions, and automated email notifications for review submissions.",
      link: null,
      category: "webApp",
    },
    {
      name: "Myhraki",
      stack: "ReactJS, JavaScript, CSS",
      desc: "Dynamic e-commerce platform built with React, enabling users to upload and sell boutique products. Designed an interactive Seller Dashboard, document pages, and logistics sections with full CRUD functionality for a seamless user experience and efficient platform management.",
      link: "https://myhraki.com",
      category: "ecommerce",
    },
    {
      name: "LMG8 Official Website",
      stack: "ReactJS, JavaScript, CSS",
      desc: "Built responsive websites using ReactJS, HTML, CSS, and JavaScript ensuring cross-device compatibility and an optimized user experience.",
      link: "https://www.lmg8.tech/",
      category: "website",
    },
  ];

  const works = [
    {
      title: "Responsive Web Design",
      description:
        "Created responsive websites using React and pure CSS with modern UI/UX principles",
      technologies: ["React", "CSS3", "HTML5", "JavaScript"],

      path: "/responsive", // 👈 Added
    },
    {
      title: "Dynamic Dashboard",
      description:
        "Built a comprehensive dashboard with React Redux for state management and interactive data visualization",
      technologies: ["React", "Redux", "Apex Charts", "Material UI"],

      path: "/dashboard", // 👈 Added
    },
    {
      title: "Interactive Floor Mapping",
      description:
        "An interactive floor plan management system that provides a visual interface for managing, booking, and monitoring office desks and workspaces in real-time. This web application helps organizations optimize their office space utilization through an intuitive map-based interface.",
      technologies: ["React"],

      path: "/intercativefloor", // 👈 Added
    },
  ];

  const renderProjects = (category) =>
    projects
      .filter((proj) => proj.category === category)
      .map((proj, index) => (
        <div
          key={proj.name}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          style={{
            transitionDelay: `${index * 100}ms`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              {proj.name}
            </h3>
            <p className="text-sm text-gray-500 mb-3">{proj.stack}</p>
            <p className="text-gray-700 mb-4">{proj.desc}</p>
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                View Project
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            )}
          </div>
        </div>
      ));

  const frontendSkills = [
    { name: "React", icon: SiReact },
    { name: "Redux", icon: SiRedux },
    { name: "JavaScript", icon: SiJavascript },
    { name: "HTML", icon: SiHtml5 },
    { name: "CSS", icon: SiCss3 },
    { name: "Tailwind", icon: SiTailwindcss },
  ];

  const backendSkills = [
    { name: "NodeJS", icon: SiNodedotjs },
    { name: "ExpressJS", icon: SiNodedotjs },
    { name: "MongoDB", icon: SiMongodb },
    { name: "REST API", icon: SiJavascript },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, y: -5, boxShadow: "0px 15px 25px rgba(0,0,0,0.1)" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <section className="py-16 px-4">
        <div className=" mx-auto">
          {/* Intro */}
          <div
            className={`text-center transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Heading with gradient shimmer */}
            <h1
              className="text-5xl md:text-6xl font-ysabeau mb-6 text-gray-800 leading-snug pb-1 font-sans 
             drop-shadow-lg"
            >
              Hey there! I'm Tejas 👋
            </h1>

            {/* Subheading with typewriter-like fade and underline animations */}
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-700 mb-6 animate-fade-in delay-200">
              I'm a{" "}
              <span className="font-semibold text-blue-600 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:bg-blue-300 after:animate-pulse">
                Front-End Magician
              </span>{" "}
              diving into the world of{" "}
              <span className="font-semibold text-purple-600 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:bg-purple-300 after:animate-pulse">
                Full-Stack Adventures
              </span>{" "}
              from vibrant Bengaluru. I craft beautiful, scalable, and
              responsive apps with{" "}
              <span className="font-semibold text-blue-600 animate-bounce">
                React ⚛️, Node.js 🟢, MongoDB 🍃
              </span>
              , making ideas come alive in the browser.
            </p>

            {/* Optional CTA animation */}
            <p className="text-gray-600 text-lg text-center mt-4 animate-bounce">
              Let's build something amazing together 🚀
            </p>

            {/* Buttons with hover glow */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in delay-500">
              <a
                href="#contact"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-blue-400/50 hover:shadow-lg"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200/50"
              >
                View Projects
              </a>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Skills
            </h2>
            <motion.div
              className="mt-16"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <motion.h3
                className="text-2xl font-semibold text-gray-700 mb-4"
                variants={sectionVariants}
              >
                Front-End
              </motion.h3>
              <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {frontendSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="bg-white p-4 rounded-xl shadow-sm cursor-pointer overflow-hidden"
                    variants={skillVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-center mb-2 gap-2">
                      <skill.icon size={24} className="text-blue-500" />
                      <span className="font-medium text-gray-700">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.h3
                className="text-2xl font-semibold text-gray-700 mb-4 mt-12"
                variants={sectionVariants}
              >
                Back-End
              </motion.h3>
              <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {backendSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="bg-white p-4 rounded-xl shadow-sm cursor-pointer overflow-hidden"
                    variants={skillVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-center mb-2 gap-2">
                      <skill.icon size={24} className="text-purple-500" />
                      <span className="font-medium text-gray-700">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Rest of your components remain the same */}
          {/* Experience */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Experience
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

              <div className="space-y-12 relative">
                {experiences.map((exp, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <div
                      key={exp.title}
                      className={`flex flex-col md:flex-row items-center md:justify-between ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className="md:w-1/2 md:px-4 md:text-center md:pr-8 mb-4 md:mb-0">
                        <h3
                          className={`text-lg font-semibold ${
                            exp.color === "blue"
                              ? "text-blue-700"
                              : "text-purple-700"
                          }`}
                        >
                          {exp.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{exp.period}</p>
                      </div>
                      <div className="relative">
                        <Circle
                          size={24}
                          weight="fill"
                          className={`${
                            exp.color === "blue"
                              ? "text-blue-600"
                              : "text-purple-600"
                          } bg-white rounded-full border-4 border-white shadow-md`}
                        />
                      </div>
                      <div className="md:w-1/2 md:px-4">
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                          <p className="text-gray-700">{exp.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {exp.tech.map((tech) => (
                              <span
                                key={tech}
                                className={`px-3 py-1 rounded-full text-xs ${
                                  exp.color === "blue"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-purple-100 text-purple-700"
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Projects */}
          <div id="projects" className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Projects
            </h2>

            {/* Web Applications */}
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Web Applications
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {renderProjects("webApp")}
            </div>

            {/* Websites */}
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Websites
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {renderProjects("website")}
            </div>

            {/* E-Commerce */}
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              E-Commerce
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {renderProjects("ecommerce")}
            </div>
          </div>

          {/* My Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              My Works
            </h2>
            <p className="text-center text-gray-500 mb-8 text-sm">
              (You can also find this work in the sidebar — feel free to click
              and explore my work anytime.)
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {works.map((work, index) => (
                <div
                  key={work.title}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                  }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">
                      {work.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{work.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {work.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div id="contact" className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Get In Touch
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              I'm currently looking for new opportunities. Whether you have a
              question or just want to say hi, I'll try my best to get back to
              you!
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm max-w-md mx-auto">
              <p className="text-gray-600 mb-4">
                📧{" "}
                <a
                  href="mailto:mtejas309@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  mtejas309@gmail.com
                </a>
              </p>
              <p className="text-gray-600 mb-6">
                📱{" "}
                <a
                  href="tel:+919901974627"
                  className="text-blue-600 hover:underline"
                >
                  +91-9901974627
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Welcome;
