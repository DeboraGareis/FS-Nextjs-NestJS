"use client";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { ClosedSession } from "../service/authService";
// import { useUser } from "@/context/UserContext";

const Navbar = () => {
  // const router = useRouter();
  // const { setUser } = useUser();
  const { sesion, setSesion } = useAuth();
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);

  //   const buscarUsuario = async () => {
  //     try {
  //       const res = await Me();

  //       if (!res) return router.push("/signin");
  //       if (isMounted) {
  //         router.push("/private/panel");
  //         setUser(res.userId);
  //         setSesion(true);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       router.push("/signin");
  //     }
  //   };
  //   buscarUsuario();
  // }, [setSesion, setUser, isMounted, router]);

  return (
    <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full h-18 bg-white shadow flex items-center justify-between">
      <div className=" relative flex items-center justify-between">
        <Image
          className="shadow-lg"
          src="/Stransparenteverde.png"
          alt="logo"
          width={85}
          height={38}
        />
        <p className="font-inter text-1E4137 text-2xl text-center text-shadow-lg/15 font-semibold ml-6">
          FlexiStore
        </p>
      </div>
      <div>
        {sesion ? (
          <span
            onClick={() => setSesion(false)}
            className="border-1 border-black rounded-2xl font-inter text-center text-sm py-1 px-2"
          >
            <Link href="/signin" onClick={() => ClosedSession()}>
              Cerrar Sesion
            </Link>
          </span>
        ) : (
          <>
            <span className="border-1 border-black rounded-2xl font-inter text-center text-sm py-1 px-2">
              <Link href="/signin">Iniciar Sesion</Link>
            </span>
            <span className="border-1 border-black bg-[#145B46] rounded-2xl font-inter text-center text-sm text-white py-1 px-2 ms-8">
              <Link href="/signup">Registrarse</Link>
            </span>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
