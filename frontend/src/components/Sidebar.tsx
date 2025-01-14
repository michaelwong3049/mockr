"use client";
import { useState, useEffect } from "react";

import { Button } from "./ui/button";

export default function Sidebar() {
    const [currentPage, setCurrentPage] = useState<string | null>();

    //add a button to show/hide the sidebar
    return(
        <div className="flex flex-col border p-4 w-3/12 mt-40">
            <Button className={`!border-none mb-4 h-20 rounded-[25px] text-2xl hover:bg-indigo-400 ${
                currentPage === "home" ? "bg-indigo-400 text-white" : "bg-indigo-100 text-black"
            }`} variant="noborder" onClick={() => setCurrentPage("home") }>
                Home
            </Button>
            <Button className={`mb-4 h-20 rounded-[25px] text-2xl hover:bg-indigo-400 ${
                currentPage === "practice" ? "bg-indigo-400 text-white" : "bg-indigo-100 text-black"
            }`} variant="noborder"onClick={() => setCurrentPage("practice")}>
                Practice
            </Button>
            <Button className={`mb-4 h-20 rounded-[25px] text-2xl hover:bg-indigo-400 ${
                currentPage === "company" ? "bg-indigo-400 text-white" : "bg-indigo-100 text-black"
            }`} variant="noborder" onClick={() => setCurrentPage("company")}>
                Company
            </Button>
        </div>
    )
}