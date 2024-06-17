import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Provider from "./Provider";
import LayoutComp from "@/components/Layouts/LayoutComp";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vibing - Simplify Task Management and Stay Organized",
  description: "Stay organized and have fun with Vibing, the simple and customizable activity and task board. Effortlessly manage tasks and stay on top of your to-do list.",
  keywords: "Vibing, tasks, task management, organization, productivity, to-do list, activity board, planning tool, task planner, task organizer"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`custom-font`}>
        <Provider>
          <LayoutComp>{children}</LayoutComp>
        </Provider>
        <SpeedInsights />
      </body>
    </html>
  );
}
