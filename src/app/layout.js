import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Provider from "./Provider";
import LayoutComp from "@/components/Layouts/LayoutComp";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vibing - Organize Tasks and Plan with Ease",
  description: "Stay organized and have fun with Vibing, the simple and customizable activity and task board. Effortlessly manage tasks and stay on top of your to-do list.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <LayoutComp>{children}</LayoutComp>
            
        </Provider>
        <SpeedInsights/>
      </body>
    </html>
  );
}
