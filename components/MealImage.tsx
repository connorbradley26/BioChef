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
            fill
            className="object-cover shadow-xl rounded-xl"
            sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
        />
    );
}
