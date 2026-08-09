import { Star } from "lucide-react";

export function StarRating({
  rating,
  reviews,
  size = 14,
}: {
  rating: number;
  reviews?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={
              i <= Math.round(rating) ? "fill-accent text-accent" : "fill-muted text-muted"
            }
          />
        ))}
      </div>
      <span className="text-xs font-bold text-foreground">{rating.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-xs text-muted-foreground">({reviews.toLocaleString()})</span>
      )}
    </div>
  );
}
