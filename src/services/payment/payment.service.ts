/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

const BASE_URL = "/payment";

// Create Payment Intent
export const createPaymentIntent = async (subscriptionId: string, amount: number) => {
  const res = await serverFetch.post(`${BASE_URL}/create-intent/${subscriptionId}`, {
    body: JSON.stringify({ amount }),
  });

  if (!res.ok) throw new Error("Failed to create payment intent");
  return res.json();
};

// Validate Payment (if needed)
export const validatePayment = async (data: any) => {
  const res = await serverFetch.post(`${BASE_URL}/validate`, { body: JSON.stringify(data) });
  if (!res.ok) throw new Error("Payment validation failed");
  return res.json();
};

// Get Invoice URL
export const getInvoice = async (paymentId: string) => {
  const res = await serverFetch.get(`${BASE_URL}/invoice/${paymentId}`);
  if (!res.ok) throw new Error("Failed to get invoice");
  return res.json();
};
