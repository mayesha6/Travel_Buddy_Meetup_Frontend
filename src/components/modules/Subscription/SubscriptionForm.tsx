/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { ISubscription } from "@/types/subscription";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createSubscription, updateSubscription } from "@/services/subscription/subscription.service";

// interface Props {
//   subscription?: ISubscription; // optional for create
// }

// export default function SubscriptionForm({ subscription }: Props) {
//   const [isPending, startTransition] = useTransition();

//   // Controlled form state
//   const [formData, setFormData] = useState({
//     name: subscription?.name || "",
//     price: subscription?.price || 0,
//     durationInDays: subscription?.durationInDays || 0,
//     description: subscription?.description || "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload: ISubscription = {
//       ...formData,
//       price: Number(formData.price),
//       durationInDays: Number(formData.durationInDays),
//       _id: subscription?._id, // optional for updates
//     };

//     startTransition(async () => {
//       try {
//         if (subscription) {
//           // Update existing
//           await updateSubscription(subscription._id!, payload);
//           toast.success("Subscription updated successfully!");
//         } else {
//           // Create new
//           await createSubscription(payload);
//           toast.success("Subscription created successfully!");
//           setFormData({ name: "", price: 0, durationInDays: 0, description: "" }); // reset form
//         }
//       } catch (error: any) {
//         toast.error(error?.message || "Operation failed");
//       }
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//       <Input
//         name="name"
//         placeholder="Name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//       />
//       <Input
//         name="price"
//         type="number"
//         placeholder="Price"
//         value={formData.price}
//         onChange={handleChange}
//         required
//       />
//       <Input
//         name="durationInDays"
//         type="number"
//         placeholder="Duration (days)"
//         value={formData.durationInDays}
//         onChange={handleChange}
//         required
//       />
//       <Textarea
//         name="description"
//         placeholder="Description"
//         value={formData.description}
//         onChange={handleChange}
//       />
//       <Button disabled={isPending} type="submit" className="w-full">
//         {isPending ? "Saving..." : subscription ? "Update Subscription" : "Create Subscription"}
//       </Button>
//     </form>
//   );
// }



interface Props {
  subscription?: ISubscription; // optional for create
  onSubmit?: (data: ISubscription) => Promise<void>; // optional callback
}

export default function SubscriptionForm({ subscription, onSubmit }: Props) {
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: subscription?.name || "",
    price: subscription?.price || 0,
    durationInDays: subscription?.durationInDays || 0,
    description: subscription?.description || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ISubscription = {
      ...formData,
      price: Number(formData.price),
      durationInDays: Number(formData.durationInDays),
      _id: subscription?._id,
    };

    startTransition(async () => {
      try {
        if (onSubmit) {
          await onSubmit(payload); // ✅ use the parent callback
        } else {
          // fallback to internal handling if no onSubmit provided
          if (subscription) {
            await updateSubscription(subscription._id!, payload);
            toast.success("Subscription updated successfully!");
          } else {
            await createSubscription(payload);
            toast.success("Subscription created successfully!");
            setFormData({ name: "", price: 0, durationInDays: 0, description: "" });
          }
        }
      } catch (error: any) {
        toast.error(error?.message || "Operation failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <Input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <Input name="durationInDays" type="number" placeholder="Duration (days)" value={formData.durationInDays} onChange={handleChange} required />
      <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <Button disabled={isPending} type="submit" className="w-full">
        {isPending ? "Saving..." : subscription ? "Update Subscription" : "Create Subscription"}
      </Button>
    </form>
  );
}
