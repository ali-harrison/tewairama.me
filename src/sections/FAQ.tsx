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
          I use a variety of technologies including HTML, CSS, JavaScript,
          React, Node.js, Express, and databases like MongoDB. I'm also familiar
          with testing frameworks such as Jest and Enzyme, and I use version
          control with Git. Additionally, I work with tools and practices like
          Agile methodologies, pair programming, and continuous integration.
        </p>
      </li>
    </ul>
  </div>
)

export default FAQ
