import { serverFetch } from "@/lib/server-fetch";

const BASE_URL = "/review";

// Create a review
export const createReview = async (planId: string, rating: number, comment?: string) => {
  const res = await serverFetch.post(`${BASE_URL}`, {
    body: JSON.stringify({ planId, rating, comment }),
  });

  if (!res.ok) throw new Error("Failed to create review");
  return res.json();
};

// Get reviews by plan
export const getReviewsByPlan = async (planId: string) => {
  const res = await serverFetch.get(`${BASE_URL}/${planId}`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
};

// Update a review
export const updateReview = async (reviewId: string, rating: number, comment?: string) => {
  const res = await serverFetch.put(`${BASE_URL}/${reviewId}`, {
    body: JSON.stringify({ reviewId, rating, comment }),
  });
  if (!res.ok) throw new Error("Failed to update review");
  return res.json();
};

// Delete a review
export const deleteReview = async (reviewId: string) => {
  const res = await serverFetch.delete(`${BASE_URL}/${reviewId}`);
  if (!res.ok) throw new Error("Failed to delete review");
  return res.json();
};
