import "./globals.css";
import Navbar from "./navbar/Navbar";
import Footer from "./navbar/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="bg-linear-to-t from-white to-emerald-100">
            <UserProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </UserProvider>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
