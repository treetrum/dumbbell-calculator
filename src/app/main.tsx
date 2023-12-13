"use client";

import React, { useState } from "react";
import { v1 } from "uuid";

interface Plate {
    weight: number;
    id: string;
}

const availablePlateWeights = [0.5, 1.25, 2.5, 5].sort((a, b) => b - a);
const availablePlates: Plate[] = availablePlateWeights.map((weight) => ({
    weight,
    id: v1(),
}));
const handleWeight = 1.5;

const plateGridStyles: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
};

const plateButtonStyles: React.CSSProperties = {
    width: 60,
    height: 60,
    fontSize: "0.75rem",
    fontWeight: "bold",
    border: "2px solid",
    borderColor: "hsl(0, 0%, 85%)",
    borderRadius: 12,
    backgroundColor: "hsl(0, 0%, 95%)",
};

const activeButtonStyles: React.CSSProperties = {
    borderColor: "black",
};

const plateCombinations = (() => {
    const combinations: Plate[][] = [];
    const recurse = (plates: Plate[], usedPlates: Plate[] = []) => {
        if (plates.length === 0) {
            combinations.push(usedPlates);
            return;
        }
        const [plate, ...rest] = plates;
        recurse(rest, [...usedPlates, plate]);
        recurse(rest, usedPlates);
    };
    recurse(availablePlates);
    return combinations;
})();

// Used to create a unique ID for each combination of plates. Disregards IDs and only looks at weight
const createIdentity = (plates: Plate[]) => {
    return JSON.stringify(
        plates.sort((a, b) => b.weight - a.weight).map((p) => p.weight)
    );
};

// We need to remove any combinations that are essentially the same value. If any of the combinations contain the exact set of numbers, we only need to represent it once (even if the plates have different ID's)
const uniquePlateCombinations = plateCombinations
    .reduce<Plate[][]>((acc, curr) => {
        if (acc.map(createIdentity).includes(createIdentity(curr))) {
            return acc;
        }
        return [...acc, curr];
    }, [])
    .sort((a, b) => {
        const aWeight = a.reduce((acc, curr) => acc + curr.weight, 0);
        const bWeight = b.reduce((acc, curr) => acc + curr.weight, 0);
        return bWeight - aWeight;
    });

export const Main = () => {
    const [usedPlates, setUsedPlates] = useState<Plate[]>(availablePlates);

    const singleDumbbellWeight = usedPlates.reduce(
        (acc, plate) => acc + plate.weight * 2,
        handleWeight
    );

    return (
        <div style={{ padding: 16, maxWidth: 800, margin: "0 auto" }}>
            <h1>Plate calculator</h1>
            <div style={{ marginTop: 16, marginBottom: 8 }}>
                <h3>Available plates</h3>
                <p>Click to add plates</p>
            </div>
            <div style={plateGridStyles}>
                {availablePlates.map((plate) => (
                    <button
                        disabled={usedPlates
                            .map((p) => p.id)
                            .includes(plate.id)}
                        style={plateButtonStyles}
                        key={plate.id}
                        onClick={() => setUsedPlates((old) => [...old, plate])}
                    >
                        {plate.weight}
                    </button>
                ))}
            </div>
            <div style={{ marginTop: 16, marginBottom: 8 }}>
                <h3>Used plates</h3>
                <p>Click to remove plates</p>
            </div>
            <div style={plateGridStyles}>
                {usedPlates
                    .sort((a, b) => b.weight - a.weight)
                    .map((plate) => (
                        <button
                            style={plateButtonStyles}
                            key={plate.id}
                            onClick={() => {
                                setUsedPlates((old) =>
                                    old.filter((p) => p.id !== plate.id)
                                );
                            }}
                        >
                            {plate.weight}
                        </button>
                    ))}
            </div>
            <div style={{ marginTop: 8 }}>
                <h4>1x Dumbbell: {singleDumbbellWeight}kg</h4>
                <h4>2x Dumbbell: {singleDumbbellWeight * 2}kg</h4>
            </div>
            <h3 style={{ marginTop: 16, marginBottom: 8 }}>Presets</h3>
            <div style={plateGridStyles}>
                {uniquePlateCombinations
                    .filter((c) => c.length != 0)
                    .map((combination) => {
                        const singleDumbbellWeight = combination.reduce(
                            (acc, curr) => acc + curr.weight * 2,
                            handleWeight
                        );
                        const isActive =
                            JSON.stringify(
                                combination.sort((a, b) => b.weight - a.weight)
                            ) ===
                            JSON.stringify(
                                usedPlates.sort((a, b) => b.weight - a.weight)
                            );
                        return (
                            <button
                                key={singleDumbbellWeight}
                                style={{
                                    ...plateButtonStyles,
                                    ...(isActive
                                        ? activeButtonStyles
                                        : undefined),
                                }}
                                onClick={() => {
                                    setUsedPlates(combination);
                                }}
                            >
                                {singleDumbbellWeight}kg
                                <br />({singleDumbbellWeight * 2}
                                kg)
                            </button>
                        );
                    })}
            </div>
        </div>
    );
};
