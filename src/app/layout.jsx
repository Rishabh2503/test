import RootLayout from "@/components/RootLayout";
import "./globals.css";

export const metadata = {
  title: {
    template: "bino",
    default: "bino",
  },
};

export default function Layout({ children }) {
  return (
    <html
      lang="en"
      className="h-full bg-sky-500 text-base antialiased text-neutral-100"
    >
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
