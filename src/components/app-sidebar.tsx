import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
// import { Button } from "./ui/button"
// import { TeamSwitcher } from "./team-switcher"
import { TeamSwitcher } from "./team-switcher-n"
import { NavUser } from "./nav-user"
import { NavCompany } from "./nav-company"
import { Link } from "react-router-dom"

// This is sample data.
const data = {
  company: {
    name: "Aktas Software",
    // logo: GalleryVerticalEnd,
    avatar: "/university.jpg",
    plan: "Open Source University",
  },
  user: {
    name: "Abubakar Yussuf",
    email: "m@example.com",
    avatar: "/user.jpg",
  },
  // teams: [
  //   {
  //     name: "Aktas Software",
  //     logo: GalleryVerticalEnd,
  //     avatar: "/university.jpg",
  //     plan: "Open Source University",
  //   },
  
  // ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Command,
      isActive: true,
    },
    {
      title: "Staff Management",
      url: "#",
      icon: SquareTerminal,
      // isActive: true,
      items: [
        {
          title: "All Users",
          url: "/users",
        },
        {
          title: "Admins",
          url: "/admins",
        },
        {
          title: "Developers",
          url: "/developers",
        },
        {
          title: "Projects",
          url: "/projects",
        },
        {
          title: "Project Management",
          url: "/project-management",
        },
        {
          title: "Project Reports",
          url: "/project-report",
        },
      ],
    },
    {
      title: "Food Management",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "All Foods",
          url: "/foods",
        },
        {
          title: "Ordered Foods",
          url: "/ordered-foods",
        },
        {
          title: "Finished Foods",
          url: "/finished-foods",
        },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavCompany company={data.company} />
       
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavMain items={data.navMain}  />
      
      
      </SidebarContent>
      <SidebarFooter>
       
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
