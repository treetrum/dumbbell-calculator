import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Plate Calculator",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="shortcut icon"
                    href="favicon.png"
                    type="image/x-icon"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
