"use-client"
import { Features } from "@/components/blocks/features-11"
import HeroAgent from "@/components/blocks/heroAgentPHR"
import Navbar from "@/components/ui/nav"
import { Footerdemo } from "@/demo/fs"
import { GradientHeadingDemo } from "@/demo/gradientHeadDemo"
import dash from "@/components/blocks/Dashboard.png"
import {Bolt,CopyPlus,Layers2,Files} from 'lucide-react'

export const NovaPage=()=>{
    return(
        <div>
        <Navbar></Navbar>
         <HeroAgent
          heading="Meet Your AI Agents"
          description="Help candidates find and choose you faster. Empower your recruiters and managers — all with AI."
          image={dash}
          item={{
            label: "Nova",
            agents: [
              { label: "Maxi", to: "/maxi", icon: <Bolt size={16} className="opacity-60" /> },
              { label: "Prime HR", to: "/prime", icon: <CopyPlus size={16} className="opacity-60" /> },
              { label: "Optimus", to: "/optimus", icon: <Layers2 size={16} className="opacity-60" /> },
              { label: "Archie", to: "/archie", icon: <Files size={16} className="opacity-60" /> },
              { label: "Onix", to: "/onix", icon: <Files size={16} className="opacity-60" /> },
            ],
          }}></HeroAgent>
        <GradientHeadingDemo></GradientHeadingDemo>
        <Features></Features>
        <Footerdemo></Footerdemo>
        </div>
    )
}