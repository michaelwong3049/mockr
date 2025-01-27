"use client";
import { useSearchParams } from "next/navigation";

export default function PracitceTopic() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  return(
    <div className="w-full flex justify-center mt-4">
      <p className="font-bold text-3xl">{title}</p>
    </div>
  )
}
