import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
    title: "Plate Calculator",
    description: "Simple dumbbell weight calculator",
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
