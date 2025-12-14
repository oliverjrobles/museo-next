import "./globals.css";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/auth/AuthProvider";

export const metadata = {
  title: "Nightclub",
  description: "Have a good time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
