import "./globals.css";
import Navbar from "./navbar/Navbar";
import Footer from "./navbar/Footer";

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
        <div className="bg-linear-to-t from-CFFBEE to-03D396">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
