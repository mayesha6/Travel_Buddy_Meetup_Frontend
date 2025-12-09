/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

const BASE_URL = "/subscription";

export const fetchSubscriptions = async () => {
  const res = await serverFetch.get(`${BASE_URL}`);
  if (!res.ok) throw new Error("Failed to fetch subscriptions");

  const json = await res.json();
  return json.data;
};

export const fetchSubscription = async (id: string) => {
  const res = await serverFetch.get(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch subscription");

  const json = await res.json();
  return json.data;
};

export const createSubscription = async (payload: any) => {
  const res = await serverFetch.post(`${BASE_URL}`, {
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create subscription");

  return await res.json();
};

export const updateSubscription = async (id: string, payload: any) => {
  const res = await serverFetch.patch(`${BASE_URL}/${id}`, {
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update subscription");

  return await res.json();
};

export const deleteSubscription = async (id: string) => {
  const res = await serverFetch.delete(`${BASE_URL}/${id}`);

  if (!res.ok) throw new Error("Failed to delete subscription");

  return await res.json();
};
