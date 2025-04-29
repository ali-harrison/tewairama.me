// src/sections/Projects.tsx
import React from 'react'
import '../styles/projects.css'

const projects = [
  {
    title: 'TODO App',
    link: 'https://github.com/ali-harrison/Full-Stack-demo',
    date: 'March 2024',
    description:
      'Built to practice full-stack development using React Query and SQLite.',
  },
  {
    title: 'DreamFest',
    link: 'https://github.com/ali-harrison/Client-Side-App',
    date: 'February 2024',
    description:
      'A client project connecting frontend UI to database functionality.',
  },
  {
    title: 'Pupparazi',
    link: 'https://github.com/ali-harrison/JSON-API-routes',
    date: 'January 2024',
    description:
      'Workshop project to develop a RESTful API using Express and async operations.',
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
