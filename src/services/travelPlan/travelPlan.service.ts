/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

const BASE = "/travel-plan";

export const getAllPlans = async (query?: Record<string, any>) => {
  const qs = query ? "?" + new URLSearchParams(query).toString() : "";
  const res = await serverFetch.get(`${BASE}${qs}`);
  if (!res.ok) throw new Error("Failed to fetch travel plans");
  return res.json();
};

export const getPlanById = async (id: string) => {
  const res = await serverFetch.get(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch plan");
  return res.json();
};

export const createPlan = async (payload: any) => {
  const res = await serverFetch.post(`${BASE}`, {
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create plan");
  return res.json();
};

export const updatePlan = async (id: string, payload: any) => {
  const res = await serverFetch.patch(`${BASE}/${id}`, {
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update plan");
  return res.json();
};

export const deletePlan = async (id: string) => {
  const res = await serverFetch.delete(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to delete plan");
  return res.json();
};

export const matchPlans = async (query?: Record<string, any>) => {
  const qs = query ? "?" + new URLSearchParams(query).toString() : "";
  const res = await serverFetch.get(`${BASE}/match${qs}`);
  if (!res.ok) throw new Error("Failed to match plans");
  return res.json();
};

export const createRequest = async (planId: string, message?: string) => {
  const res = await serverFetch.post(`${BASE}/${planId}/request`, {
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("Failed to create request");
  return res.json();
};

export const listRequests = async (planId: string) => {
  const res = await serverFetch.get(`${BASE}/${planId}/requests`);
  if (!res.ok) throw new Error("Failed to list requests");
  return res.json();
};
