"use client";

import React, { useState } from "react";

const availablePlates = [0.5, 1.25, 2.5, 5].sort((a, b) => b - a);
const handleWeight = 1.5;

const plateGridStyles: React.CSSProperties = {
    display: "flex",
    gap: 8,
};

const plateButtonStyles: React.CSSProperties = {
    width: 80,
    height: 80,
    fontSize: "1rem",
    fontWeight: "bold",
};

export const Main = () => {
    const [usedPlates, setUsedPlates] = useState<number[]>([]);

    const singleDumbbellWeight = usedPlates.reduce(
        (acc, plate) => acc + plate * 2,
        handleWeight
    );

    return (
        <div style={{ padding: 16, maxWidth: 800, margin: "0 auto" }}>
            <h1>Plate calculator</h1>
            <h3 style={{ marginTop: 16, marginBottom: 8 }}>Available plates</h3>
            <div style={plateGridStyles}>
                {availablePlates.map((plate) => (
                    <button
                        disabled={usedPlates.includes(plate)}
                        style={plateButtonStyles}
                        key={plate}
                        onClick={() => setUsedPlates((old) => [...old, plate])}
                    >
                        {plate}
                    </button>
                ))}
            </div>
            <h3 style={{ marginTop: 16, marginBottom: 8 }}>Used plates</h3>
            <div style={plateGridStyles}>
                {usedPlates
                    .sort((a, b) => b - a)
                    .map((plate) => (
                        <button
                            style={plateButtonStyles}
                            key={plate}
                            onClick={() => {
                                setUsedPlates((old) =>
                                    old.filter((p) => p !== plate)
                                );
                            }}
                        >
                            {plate}
                        </button>
                    ))}
            </div>
            <div
                style={{ border: "1px solid black", padding: 8, marginTop: 16 }}
            >
                <h3>Single dumbbell weight: {singleDumbbellWeight}kg</h3>
                <h3>Total weight: {singleDumbbellWeight * 2}kg</h3>
            </div>
        </div>
    );
};
