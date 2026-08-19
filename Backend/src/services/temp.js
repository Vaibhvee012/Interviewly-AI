const resume = `
Priya Nair
Pune, India
priya.nair@email.com
+91 9123456780
LinkedIn: linkedin.com/in/priyanair
GitHub: github.com/priyanair

PROFESSIONAL SUMMARY
Frontend-leaning Full Stack Developer with 2.5+ years of experience building responsive web applications and internal tools.

TECHNICAL SKILLS
Languages: JavaScript, TypeScript
Frontend: React.js, Next.js, Redux, Tailwind CSS
Backend: Node.js, Express.js
Database: PostgreSQL, Prisma
DevOps & Tools: Git, GitHub Actions, Vercel, Postman
Concepts: REST APIs, JWT Authentication, Component-driven design

WORK EXPERIENCE

Frontend Developer
Nimbus Softwares | Mar 2022 – Present
- Built and maintained a customer-facing dashboard used by 5,000+ monthly users.
- Migrated legacy class components to functional components with hooks, reducing bundle size by 18%.
- Collaborated with designers to implement a component library in Tailwind CSS.
- Integrated REST APIs and handled auth flows using JWT.

Junior Web Developer
CodeCrafters Pvt Ltd | Jul 2020 – Feb 2022
- Developed landing pages and internal admin panels using React and Express.
- Fixed cross-browser UI bugs and improved page load performance.

EDUCATION
B.Tech in Information Technology
Pune Institute of Technology | 2016 – 2020
`

const selfDescription = `
I'm a full stack developer with about 2.5 years of experience, mostly leaning frontend but comfortable across the stack with React and Node.js. I started out doing mostly UI work — landing pages, admin panels, that kind of thing — and over time moved into more product-focused work where I owned entire features from API integration to the final UI polish.

Most of my recent work has been on a customer-facing dashboard used by a few thousand people every month. That project taught me a lot about performance — things like code splitting, memoization, and cutting down unnecessary re-renders once the data started getting heavier. I also led the migration of a big chunk of our legacy class components to functional components with hooks, which ended up shrinking our bundle size noticeably and made the codebase a lot easier to onboard new devs onto.

On the backend side, I've mostly worked with Node.js and Express, building and consuming REST APIs, handling authentication with JWT, and doing basic query optimization when things started getting slow. I wouldn't call myself a backend specialist yet, but I'm comfortable enough to build a full feature end-to-end without needing someone else to hand me an API.

I care a lot about component structure and keeping things maintainable — I've spent a fair amount of time setting up a shared component library in Tailwind CSS so the team isn't rebuilding the same button or modal five different ways. I also enjoy the process of turning a rough Figma design into something pixel-accurate and responsive.

I have some exposure to CI/CD through GitHub Actions and have deployed projects on Vercel, but I haven't owned a full deployment pipeline by myself, so that's an area I'd like to get stronger in. Same with testing — I write unit and integration tests when the team asks for them, but it's not something I've made a habit of on my own yet.

Right now I'm looking for a role where I can grow into a more balanced full stack position — take on more backend ownership, work with a slightly bigger and more complex codebase, and get better at the parts of the job I haven't had as much hands-on time with, like testing discipline and deployment.
`

const jobDescription = `
Position: Full Stack Developer (React / Node.js)

Location: Remote / Pune

We are looking for a Full Stack Developer with a strong frontend foundation in React and working knowledge of Node.js to help build and scale our internal product suite.

Responsibilities:
- Build responsive, accessible UI components using React and Tailwind CSS.
- Develop and consume REST APIs built with Node.js and Express.
- Collaborate closely with designers to translate mockups into production UI.
- Improve frontend performance and maintain component libraries.
- Participate in code reviews and contribute to technical decisions.
- Write unit and integration tests for critical UI flows.

Required Skills:
- 2+ years experience in frontend development with React.
- Working knowledge of Node.js and REST API integration.
- Experience with state management (Redux, Context, or similar).
- Familiarity with Git-based workflows and CI/CD basics.
- Good understanding of responsive design and cross-browser compatibility.

Nice to Have:
- Experience with Next.js.
- Exposure to PostgreSQL or another relational database.
- Basic understanding of deployment pipelines (GitHub Actions, Vercel).
`

module.exports = {
    resume,selfDescription,jobDescription
}