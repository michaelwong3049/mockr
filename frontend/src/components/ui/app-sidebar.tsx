"use client";

import { Home, Dumbbell, Building, Target, BookOpen, Settings, User, LogOut, Code, Database, Brain, Zap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarNav,
    SidebarNavItem,
    SidebarNavButton,
    SidebarNavCollapsible,
    SidebarSeparator,
} from "@/components/ui/sidebar"

const LinkIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
)

const NetworkIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
)

const topics = [
    {
        title: "Arrays & Strings",
        url: "/elecmiccow/practice/arrays-strings",
        icon: Code,
        description: "Array manipulation and string operations"
    },
    {
        title: "Linked Lists",
        url: "/elecmiccow/practice/linked-lists", 
        icon: LinkIcon,
        description: "Linked list data structures"
    },
    {
        title: "Trees & Graphs",
        url: "/elecmiccow/practice/trees-graphs",
        icon: NetworkIcon,
        description: "Tree and graph algorithms"
    },
    {
        title: "Dynamic Programming",
        url: "/elecmiccow/practice/dynamic-programming",
        icon: Brain,
        description: "Dynamic programming problems"
    },
    {
        title: "System Design",
        url: "/elecmiccow/practice/system-design",
        icon: Building,
        description: "System design challenges"
    },
    {
        title: "Database",
        url: "/elecmiccow/practice/database",
        icon: Database,
        description: "Database and SQL problems"
    }
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                        <Target className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Mockr</h1>
                        <p className="text-xs text-gray-400">AI Interview Prep</p>
                    </div>
                </div>
            </SidebarHeader>
            
            <SidebarContent>
                <SidebarNav>
                    <SidebarNavItem>
                        <SidebarNavButton 
                            asChild
                            icon={<Home className="h-4 w-4" />}
                            isActive={pathname === "/"}
                            tooltip="Dashboard"
                        >
                            <Link href="/">Dashboard</Link>
                        </SidebarNavButton>
                    </SidebarNavItem>
                    
                    <SidebarNavItem>
                        <SidebarNavCollapsible 
                            title="Practice"
                            icon={<Dumbbell className="h-4 w-4" />}
                            defaultOpen={pathname.includes("/practice")}
                        >
                            {topics.map((topic) => (
                                <SidebarNavButton
                                    key={topic.title}
                                    asChild
                                    icon={<topic.icon className="h-3 w-3" />}
                                    isActive={pathname === topic.url}
                                    tooltip={topic.description}
                                >
                                    <Link href={topic.url}>{topic.title}</Link>
                                </SidebarNavButton>
                            ))}
                        </SidebarNavCollapsible>
                    </SidebarNavItem>
                </SidebarNav>
            </SidebarContent>
            
            <SidebarFooter>
                <SidebarSeparator />
                <SidebarNav>
                    <SidebarNavItem>
                        <SidebarNavButton 
                            icon={<User className="h-4 w-4" />}
                            tooltip="Profile"
                        >
                            Profile
                        </SidebarNavButton>
                    </SidebarNavItem>
                    
                    <SidebarNavItem>
                        <SidebarNavButton 
                            icon={<Settings className="h-4 w-4" />}
                            tooltip="Settings"
                        >
                            Settings
                        </SidebarNavButton>
                    </SidebarNavItem>
                    
                    <SidebarNavItem>
                        <SidebarNavButton 
                            icon={<LogOut className="h-4 w-4" />}
                            tooltip="Sign Out"
                        >
                            Sign Out
                        </SidebarNavButton>
                    </SidebarNavItem>
                </SidebarNav>
            </SidebarFooter>
        </Sidebar>
    )
}
