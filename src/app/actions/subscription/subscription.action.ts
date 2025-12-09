"use server";

import {
  createSubscription,
  deleteSubscription,
  updateSubscription,
} from "@/services/subscription/subscription.service";
import { revalidatePath } from "next/cache";

export async function createSubscriptionAction(form: FormData) {
  const payload = Object.fromEntries(form.entries());

  await createSubscription({
    name: payload.name as string,
    price: Number(payload.price),
    durationInDays: Number(payload.durationInDays),
    description: payload.description as string,
  });

  revalidatePath("/dashboard/admin/subscription");
}

export async function updateSubscriptionAction(id: string, form: FormData) {
  const payload = Object.fromEntries(form.entries());

  await updateSubscription(id, {
    name: payload.name as string,
    price: Number(payload.price),
    durationInDays: Number(payload.durationInDays),
    description: payload.description as string,
  });

  revalidatePath("/dashboard/admin/subscription");
}

export async function deleteSubscriptionAction(id: string) {
  await deleteSubscription(id);
  revalidatePath("/dashboard/admin/subscription");
}
