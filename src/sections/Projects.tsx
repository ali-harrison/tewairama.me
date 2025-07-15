// src/sections/Projects.tsx

import '../styles/projects.css'

const projects = [
  {
    title: 'Github Has been hacked',
    link: 'https://github.com/ali-harrison/Full-Stack-demo',
    date: 'July 2025',
    description:
      'Currently all my projects and old work on my github has been lost, working on getting it back!',
  },
]

const Projects = () => (
  <div className="projects-wrapper">
    {projects.map((project) => (
      <div className="project-entry" key={project.title}>
        <h2 className="project-title">
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </h2>
        <p className="project-meta">
          {project.date} / {project.description}
        </p>
      </div>
    ))}
  </div>
)

export default Projects
