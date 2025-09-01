import { useRouter } from "next/navigation";

export default function BottonPanel() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center ">
      <button
        className="bg-emerald-600 my-12 hover:bg-emerald-400 font-extrabold text-white px-7 py-5 rounded-lg transition"
        onClick={() => router.push(`/private/panel`)}
      >
        Inicio
      </button>
    </div>
  );
}
