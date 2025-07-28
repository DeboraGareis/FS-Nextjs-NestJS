"use client"

import Search from "@/components/Search";
import { useRouter } from "next/navigation";

export default function Panel() {
  const router = useRouter()
  return (
    <>
       
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-4">
  <button
    className="text-emerald-600 hover:bg-emerald-100 text-2xl font-extrabold px-7 py-5"
    onClick={() => router.push('/panel/notifications')}
  >
    + Nuevo producto
  </button>
  <button
    className="bg-emerald-600 hover:bg-emerald-400 text-2xl font-extrabold text-white px-7 py-5 rounded-lg transition"
    onClick={() => router.push('/panel/notifications')}
  >
    Ver mis productos
  </button>
</div>
<Search/>
    </div>
    </>
  );
}
