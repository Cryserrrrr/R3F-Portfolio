export type Work = { 
  experiences: WorkItem[],
  projects: WorkItem[],
  shaders: WorkItem[]
}

export type WorkItem = {
  title: string,
  image: string,
  link: string | null,
  github: string
}

const work: Work = {
  experiences: [
    {
      title: "Solar System",
      image: "/images/solar-system.png",
      link: "https://solar-system-ecru-two.vercel.app/",
      github: "https://github.com/Cryserrrrr/solarSystem"
    },
  ],
  projects: [
    {
      title: "Openai",
      image: "/images/openai.png",
      link: null,
      github: "https://github.com/Cryserrrrr/openAi-interface?tab=readme-ov-file"
    },
    {
      title: "Minecraft-CV",
      image: "/images/minecraft.png",
      link: "https://minecraft-cv.vercel.app/",
      github: "https://github.com/Cryserrrrr/minecraftCv"
    },
    {
      title: "Portfolio",
      image: "/images/portfolio.png",
      link: null,
      github: "https://github.com/Cryserrrrr/R3F-Portfolio"
    }
  ],
  shaders: []
}

export default work