// src/sections/FAQ.tsx
import '../styles/faq.css' // Import the CSS file

const FAQ = () => (
  <div className="faq-container">
    <h2 className="faq-title">FAQ</h2>
    <ul className="faq-list">
      <li className="faq-item">
        <strong className="faq-question">Who are you?</strong>
        <p className="faq-answer">
          I'm Ali Harrison, a designer and developer from New Zealand,
          passionate about creating unique digital experiences.
        </p>
      </li>
      <li className="faq-item">
        <strong className="faq-question">What do you offer?</strong>
        <p className="faq-answer">
          I provide web design and development services, focusing on building
          engaging and user-friendly websites.
        </p>
      </li>
      <li className="faq-item">
        <strong className="faq-question">What technologies do you use?</strong>
        <p className="faq-answer">
          I use a wide range of technologies depending on the needs of the
          project. I'm not limited to a specific stack and enjoy learning and
          adapting to new tools. That said, I'm confident with modern JavaScript
          frameworks like React, Astro, and Next.js, and I’ve also worked with
          Node.js, Express, and various databases like PostgreSQL and MongoDB.
          I’m always open to picking up whatever tech best suits the problem.
        </p>
      </li>
    </ul>
  </div>
)

export default FAQ
