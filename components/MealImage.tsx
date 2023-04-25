import Image from "next/image";

interface MealImageProps {
    src?: string;
    alt?: string;
}

export default function MealImage({ src, alt}: MealImageProps) {
    return (
        <Image
            src={src || "/images/placeholder.png"}
            alt={alt || "Meal Image"}
            width={640}
            height={480}

        />
    );
}
