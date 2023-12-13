import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Plate Calculator",
        description: "Simple dumbbell weight calculator",
        display: "standalone",
    };
}
