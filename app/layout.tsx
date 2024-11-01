import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const metadata = {
  title: "Event Management System",
  description: "Manage your events efficiently.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
