![alt text](https://github.com/user-attachments/assets/21ee12ce-f202-4fdd-9c94-8eaaddded417)

# xavierkhew.com

The personal portfolio of Xavier Khew, at [xavierkhew.com](https://xavierkhew.com). It's a static [Astro](https://astro.build) site with its content managed in [Sanity](https://www.sanity.io).

## How it works

```
Sanity Studio ──publish──▶ Sanity Content Lake ──fetched at build time──▶ astro build ──▶ static HTML
```

Content is fetched **only when the site builds**. Visitors get static files, and their browsers never request anything from Sanity, so using a CMS adds no loading time. Images stored in Sanity are downloaded and optimized by Astro during the build, then served with the site.

This also means a published change appears only after a rebuild.

## Tech stack

| Area | Tools |
|---|---|
| Framework | Astro 7, static output, with view transitions |
| Styling | Tailwind CSS 4 (through `@tailwindcss/vite`), `tailwindcss-animate` |
| Font | Lexend Deca, self-hosted through Fontsource |
| Icons | Lucide, plus inline SVGs |
| CMS | Sanity Studio 6, with drag-to-reorder from `@sanity/orderable-document-list` |
| Content fetching | `@sanity/client` (GROQ), `@portabletext/to-html` for rich text |
| SEO | `astro-seo` |
| Analytics | Google Analytics (run through Partytown) and a self-hosted Umami |
| UI components | React, Radix UI and shadcn/ui, used by some components and the older `homes` page |
| Hosting | GitHub Pages for the site; Docker and nginx on Dokploy for the Studio and a test build of the site |

## Pages

| Route | Page |
|---|---|
| `/` | Home: about, experience, projects, skills and contact |
| `/archive/` | Project archive |
| `/links/` | Social and contact links |
| `/homes/` | An older version of the home page |
| 404 | Not found page |

## Project structure

```
├── src/
│   ├── components/
│   │   └── sections/      # One component per home page section
│   ├── layouts/           # Page shell, SEO tags and analytics
│   ├── lib/sanity.ts      # All Sanity queries
│   ├── pages/             # Routes
│   └── styles/
├── studio/                # Sanity Studio, a separate app with its own dependencies
│   ├── schemaTypes/       # Content models
│   ├── seed/              # Data used for the initial import
│   └── Dockerfile         # Studio image
├── docs/                  # Guides
├── Dockerfile             # Site image
└── .github/workflows/     # GitHub Pages deployment
```

## Running locally

You need [Node.js](https://nodejs.org) 22.23.4 or later (CI and Docker use Node 24), [Bun](https://bun.sh) for the site, npm for the Studio, and a Sanity project.

### Site

```bash
bun install
cp .env.example .env    # then set SANITY_PROJECT_ID
bun run dev
```

| Command | What it does |
|---|---|
| `bun run dev` | Starts the development server |
| `bun run build` | Builds the site into `dist/` |
| `bun run preview` | Serves the built site locally |

### Studio

```bash
cd studio
npm install
cp .env.example .env    # then set SANITY_STUDIO_PROJECT_ID
npm run dev             # http://localhost:3333
```

To sign in, you need an account with access to the Sanity project. `http://localhost:3333` must be listed in the project's CORS origins, with credentials allowed.

### Environment variables

| Variable | Used by | Required | Default |
|---|---|---|---|
| `SANITY_PROJECT_ID` | Site | Yes | none |
| `SANITY_DATASET` | Site | No | `production` |
| `SANITY_STUDIO_PROJECT_ID` | Studio | Yes | none |
| `SANITY_STUDIO_DATASET` | Studio | No | `production` |

The site reads the dataset without a token, so the dataset must be public. Don't store anything private in it.

### Setting up a new Sanity project

The code expects its content to exist already. The build fails if the Profile, Navigation or Links page document is missing or incomplete. The files in `studio/seed/` cover only some of the content, so they aren't enough to set up an empty project.

## Editing content

| In the Studio | Controls |
|---|---|
| Navigation & section order | Order of the home page sections and sidebar links (drag, then publish), and the link labels |
| Experience | Work history, newest first by start date |
| Projects | Home page projects. Drag to reorder; **Featured** puts a project under "Selected projects" |
| Skills | Skill groups. Skills can be dragged within a group; the order of the groups is fixed |
| Project archive | Entries on `/archive/`, ordered by sort year |
| Profile | About text and contact details |

The intro, footer, `/links/` page and other page text are still in the code.

To add a home page section, see [Adding a new home page section](docs/adding-a-section.md).

## Deployment

### GitHub Pages (live site)

[`deploy.yml`](.github/workflows/deploy.yml) builds and deploys the site on every push to `redesign/2026`, and can also be run manually. It needs a repository **variable** named `SANITY_PROJECT_ID` (under Settings → Secrets and variables → Actions → Variables).

Publishing in Sanity doesn't start this workflow by itself. After a content change, run it manually or set up a webhook that triggers it.

### Dokploy (Studio and test site)

Each is a separate application that uses the Dockerfile build type. The values below are **build-time** arguments.

| App | Dockerfile | Context path | Build arguments | Port |
|---|---|---|---|---|
| Studio | `studio/Dockerfile` | `studio` | `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET` | 80 |
| Site | `Dockerfile` | `.` | `SANITY_PROJECT_ID`, `SANITY_DATASET` | 80 |

- Add the hosted Studio's URL to the Sanity project, either by registering the Studio or by adding a CORS origin with credentials allowed.
- Redeploy the Studio after changing a schema or its configuration.
- If a rebuilt site still shows old content, Docker may have reused a cached build step. Turn on **Clean Cache** for the site app.

### Rebuilding the test site on publish

Create a webhook in Sanity that sends a `POST` request to the site app's Dokploy webhook URL. Keep that URL secret, and turn on **Auto Deploy** for the app.

| Setting | Value |
|---|---|
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | `_type in ["experience", "profile", "archiveEntry", "project", "skillGroup", "navigation"]` |
| Projection | `{"ref": "refs/heads/<branch the app deploys>"}` |
| HTTP header | `x-github-event: push` |

The header and the exact branch name are both required; without them, Dokploy replies `Branch Not Match`.
