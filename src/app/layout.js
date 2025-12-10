import "./globals.css";
import Footer from "./components/Footer";

export const metadata = {
  title: "Nightclub",
  description: "Have a good time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
        <Footer />
      </body>
    </html>
  );
}
