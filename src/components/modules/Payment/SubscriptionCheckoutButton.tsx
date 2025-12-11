// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { createPaymentIntent } from "@/services/payment/payment.service";

// interface Props {
//   subscriptionId: string;
//   amount: number;
// }

// export default function SubscriptionCheckoutButton({ subscriptionId, amount }: Props) {
//   const handlePayment = async () => {
//     if (!subscriptionId) {
//       toast.error("Subscription ID not found");
//       return;
//     }

//     try {
//       const res = await createPaymentIntent(subscriptionId, amount);
      
//       window.location.href = res.data.paymentUrl;
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err.message || "Payment failed");
//     }
//   };

//   return <Button size="sm" onClick={handlePayment}>Buy</Button>;
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createPaymentIntent } from "@/services/payment/payment.service";
import { useRouter } from "next/navigation";
import { getCookie } from "@/services/auth/tokenHandler";

interface Props {
  subscriptionId: string;
  amount: number;
}

export default function SubscriptionCheckoutButton({ subscriptionId, amount }: Props) {
  const router = useRouter();

  const handlePayment = async () => {
    const token = getCookie("accessToken");
    if (!token) {
      toast.error("You must log in first");

      const redirectUrl = `/login?redirect=/dashboard/subscription/${subscriptionId}/checkout`;

      router.push(redirectUrl);
      return;
    }

    try {
      const res = await createPaymentIntent(subscriptionId, amount);
      window.location.href = res.data.paymentUrl;
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Payment failed");
    }
  };

  return <Button size="sm" onClick={handlePayment}>Buy</Button>;
}

