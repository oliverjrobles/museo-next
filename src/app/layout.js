import "./globals.css";

export const metadata = {
  title: "Nightclub",
  description: "Have a good time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
