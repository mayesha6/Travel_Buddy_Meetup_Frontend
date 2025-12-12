/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function ReviewList({ reviews }: { reviews: any[] }) {
  if (!reviews.length) return <p className="mt-4">No reviews yet.</p>;

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-lg font-semibold">Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id} className="border p-3 rounded shadow-sm">
          <p className="font-semibold">{review.reviewer?.name}</p>
          <p className="text-yellow-500">Rating: {review.rating} ⭐</p>
          <p className="text-sm mt-1">{review.comment}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
