/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { createReview } from "@/services/reviews/review.service";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ReviewForm({
  planId,
  onSuccess,
}: {
  planId: string;
  onSuccess: () => void;
}) {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      await createReview(planId, rating, comment);
      toast.success("Review added!");
      onSuccess();
      setComment("");
      setRating(5);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review");
    }
  };

  return (
    <div className="border p-4 rounded mt-4">
      <h2 className="text-lg font-semibold mb-2">Leave a Review</h2>

      <label className="block mb-2 text-sm font-medium">Rating</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2 rounded"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      <label className="block mt-3 mb-2 text-sm font-medium">Comment</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border p-2 rounded w-full"
        rows={4}
      />

      <Button className="mt-3" onClick={handleSubmit}>
        Submit Review
      </Button>
    </div>
  );
}
