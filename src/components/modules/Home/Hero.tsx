/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Find Your Perfect Travel Buddy",
    highlight: "Travel Buddy",
    description:
      "Connect with travelers heading to the same destination. Plan trips, share adventures, and create memories.",
    image:
      "https://res.cloudinary.com/dtb6o7zzr/image/upload/v1766095615/woman-hand-holding-camera-standing-top-rock-nature-travel-concept_ydonul.jpg",
  },
  {
    title: "Explore New Destinations Together",
    highlight: "New Destinations",
    description:
      "Discover hidden gems, meet new people, and travel smarter with trusted companions.",
    image:
      "https://res.cloudinary.com/dtb6o7zzr/image/upload/v1766095330/2_ruuvm3.jpg",
  },
  {
    title: "Plan Trips With Confidence",
    highlight: "Plan Trips",
    description:
      "Create travel plans, join others, and enjoy stress-free journeys worldwide.",
    image:
      "https://res.cloudinary.com/dtb6o7zzr/image/upload/v1766095330/1_qjyp1a.jpg",
  },
];

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    startAutoSlide();
  };

  const goToSlide = (i: number) => {
    setIndex(i);
    startAutoSlide();
  };

  const slide = slides[index];

  return (
    <section className="bg-linear-to-r from-blue-50 to-white dark:from-zinc-900 dark:to-zinc-800 overflow-hidden relative">
      <div className="min-h-[60vh] flex items-center container mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 w-full"
          >
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {slide.title.split(slide.highlight)[0]}
                <span className="text-primary">{slide.highlight}</span>
              </h1>

              <p className="mt-4 text-lg text-muted-foreground">
                {slide.description}
              </p>

              <div className="mt-6 flex gap-4">
                <Button asChild>
                  <Link href="/users">Find Buddy</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/travel-plan">Travel Plan</Link>
                </Button>
              </div>
            </div>

            <div className="mt-10 md:mt-0">
              <Image
                src={slide.image}
                alt="Travel"
                width={700}
                height={460}
                className="rounded-2xl shadow-lg"
                priority={true}
                fetchPriority="high"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={prevSlide}
        className="hidden xl:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg p-3 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden xl:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg p-3 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-3 w-3 rounded-full transition-all ${
              index === i
                ? "bg-primary scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
