// Projects section. Set `featured: true` to show a project in "Selected projects"; the rest go under "More projects".
// Put screenshots in src/assets and import them below.
import climbSafer from "../assets/climb-safer.png";
import spotifyProfiler from "../assets/potify-profiler.png";
import tcdFrontEnd from "../assets/tcd-front-end.png";
import tcdResume from "../assets/tcd-resume.png";
import linksSite from "../assets/links-site.png";
import v1Portfolio from "../assets/v1.portfolio.png";
import fyp from "../assets/fyp.png";

export const projects = [
  {
    title: "Weight Difference Rule Climbing Calculator",
    description:
      "Web app to calculate and show if a climber and belayer pairing is safe or not based on the weight difference rule observed by climbers. Works offline and can be installed on device like a native app. Used Cursor to generate some of the functionality and logic ideation.",
    image: climbSafer,
    alt: "Screenshot of Weight Difference Rule Climbing Calculator",
    stack: [
      "Next.js",
      "Tailwind CSS",
      "Shadcn/UI",
      "Typescript",
      "Zod",
      "Umami",
      "Log Rocket",
      "Cursor",
      "AI",
      "Dokploy",
    ],
    live: "https://climbsafe.thingsontheweb.my/",
    source: "https://github.com/xk2800/weight-difference-rule-climbing",
    featured: true,
  },
  {
    title: "Spotify Profiler",
    description:
      "Web app for visualizing personalized Spotify data. View your top artists, currently playing, saved playlists and more features coming soon.",
    image: spotifyProfiler,
    alt: "Screenshot of Spotify Profiler",
    stack: [
      "Next.js",
      "Tailwind CSS",
      "Shadcn/UI",
      "Typescript",
      "Spotify API",
    ],
    live: "https://spot-profile.xavierkhew.com/",
    source: "https://github.com/xk2800/spotify-nextjs",
    featured: true,
  },
  {
    title: "Tech Career Days 2021",
    description:
      "A static site for Tech Career Days 2021, a job fair hosted by IT Society MMU Cyberjaya. Used to present relevant information for the event.",
    image: tcdFrontEnd,
    alt: "Screenshot of Tech Career Days 2021",
    stack: ["HTML 5", "CSS", "Bootstrap", "Javascript"],
    live: "https://xk2800.github.io/TCD2021-website/",
    source: "https://github.com/xk2800/TCD2021-website",
  },
  {
    title: "Tech Career Days 2021 Resume Submission Portal",
    description:
      "A dynamic site for Tech Career Days 2021, a job fair hosted by IT Society MMU Cyberjaya. Used for job seekers to upload their resume where vetting is done by organisers and participating companies are able to view the approved resumes.",
    image: tcdResume,
    alt: "Screenshot of Tech Career Days 2021 Resume Submission Portal",
    stack: ["HTML 5", "CSS", "Bootstrap", "Javascript", "PHP", "MySQL"],
    source: "https://github.com/xk2800/Tech-Career-Days-2021-Web-Application",
  },
  {
    title: "Linktree Alternative",
    description: "My own rework and customised approach to Linktree.",
    image: linksSite,
    alt: "Screenshot of Linktree Alternative",
    stack: ["Next.js", "Tailwind CSS"],
    live: "https://xavierkhew-links.vercel.app/",
    source: "https://github.com/xk2800/links-next.js",
  },
  {
    title: "xavierkhew.com (v1)",
    description:
      "An old portfolio site built on classic tools such as HTML and CSS",
    image: v1Portfolio,
    alt: "Screenshot of v1 portfolio",
    stack: ["HTML 5", "CSS", "Bootstrap 5", "Javascript", "GSAP"],
    live: "https://v1.xavierkhew.com/",
    source: "https://github.com/xk2800/v1",
  },
  {
    title: "REXFoodipedia",
    description:
      "A complete F&B e-commerce platform, offering comprehensive features tailored for customers, staff, and owners. This project, led by me and involving a team of three, focused solely on website development.",
    image: fyp,
    alt: "Screenshot of REXFoodipedia",
    stack: ["HTML 5", "CSS", "Bootstrap", "Javascript", "PHP", "MySQL"],
  },
];
