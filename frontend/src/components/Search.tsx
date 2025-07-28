"use client";
import { ChangeEvent, FormEvent } from "react";
export default function Search() {

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        throw new Error("Function not implemented.");
    }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md">
      <input
        type="text"
        onChange={handleInputChange}
        className="flex-grow px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
      /><span role="img" aria-label="search" className="text-2xl" >🔍</span>
    </form>
  );
}