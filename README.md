# Naratia

Naratia is a collaborative storytelling platform where users contribute to an ongoing narrative one paragraph at a time. Each new contribution is subject to community voting, and only the most-voted paragraph becomes the next part of the story. This mechanism ensures stories evolve collectively, driven by creativity and consensus.

## Features

* User authentication via Supabase (email/password and Google OAuth)
* Public story creation with genre tagging
* Paragraph-based contribution system with draft submission
* Community voting system to select the next paragraph
* Profile page showing user activity and contribution history
* Responsive design optimized for both desktop and mobile

## Tech Stack

* **Frontend:** Next.js (App Router), TypeScript, TailwindCSS
* **Backend:** Supabase (Database, Auth)
* **ORM:** Drizzle (for schema and migration management)
* **Hosting:** Vercel

## Development Status

This project is currently in its MVP development phase. The goal is to validate the idea of community-driven storytelling before expanding into advanced features such as branching stories, moderation, or gamification.

## Getting Started

1. Clone this repository
2. Install dependencies using your preferred package manager
3. Set up your `.env.local` with Supabase credentials
4. Run the development server with `npm run dev`

## License

This project is open source under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contribution

Contributions are welcome. Please note that all contributions are made voluntarily and fall under the project license. For contribution guidelines, refer to the `CONTRIBUTING.md` file (to be added).

---

Developed to explore community-driven narratives and the intersection between creativity and interaction.
