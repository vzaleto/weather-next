import "./globals.css";
import {WeatherProvider} from "@/app/context/WeatherContext";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body

      >
      <WeatherProvider>
        {children}
      </WeatherProvider>
      </body>
    </html>
  );
}
