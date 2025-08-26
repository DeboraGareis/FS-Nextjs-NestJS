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
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="bg-linear-to-t from-white to-emerald-100">
            <Navbar />
            <UserProvider>
              <main>{children}</main>
            </UserProvider>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
