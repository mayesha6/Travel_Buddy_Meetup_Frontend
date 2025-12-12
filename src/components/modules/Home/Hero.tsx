"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="bg-linear-to-r from-blue-50 to-white">
      <div className="min-h-[60vh] flex flex-col md:flex-row items-center justify-between container mx-auto px-6 py-10 gap-3">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Find Your Perfect <span className="text-primary">Travel Buddy</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Connect with travelers heading to the same destination. Plan trips,
          share adventures, and create memories.
        </p>
        <div className="mt-6 flex gap-4">
          <Button asChild>
            <Link href="/explore">Find Buddy</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/travel-plans/add">Create Travel Plan</Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-10 md:mt-0"
      >
        <Image src="https://res.cloudinary.com/dtb6o7zzr/image/upload/v1765413924/woman-hand-holding-camera-standing-top-rock-nature-travel-concept_j8z5fu.jpg" alt="Travel" width={700} height={700} />
      </motion.div>
    </div>
    </section>
    
  );
};
