import "./globals.css";
import Navbar from "./navbar/Navbar";
import Footer from "./navbar/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import { CarritoProvider } from "@/context/CarritoContext";
import { TokenProvider } from "@/context/TokenContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TokenProvider>
          <AuthProvider>
            <CarritoProvider>
              <div className="bg-linear-to-t from-white to-emerald-100">
                <UserProvider>
                  <Navbar />
                  <main>{children}</main>
                  <Footer />
                </UserProvider>
              </div>
            </CarritoProvider>
          </AuthProvider>
        </TokenProvider>
      </body>
    </html>
  );
}
