"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const destinations = [
  { name: "Bali", img: "https://res.cloudinary.com/dtb6o7zzr/image/upload/v1765415013/beautiful-wide-shot-eiffel-tower-paris-surrounded-by-water-with-ships-colorful-sky_lvjqnl.jpg" },
  { name: "Paris", img: "https://res.cloudinary.com/dtb6o7zzr/image/upload/v1765415013/beautiful-wide-shot-eiffel-tower-paris-surrounded-by-water-with-ships-colorful-sky_lvjqnl.jpg" },
  { name: "Nepal", img: "https://res.cloudinary.com/dtb6o7zzr/image/upload/v1765415013/beautiful-wide-shot-eiffel-tower-paris-surrounded-by-water-with-ships-colorful-sky_lvjqnl.jpg" },
  { name: "Bangkok", img: "https://res.cloudinary.com/dtb6o7zzr/image/upload/v1765415013/beautiful-wide-shot-eiffel-tower-paris-surrounded-by-water-with-ships-colorful-sky_lvjqnl.jpg" },
];

export const PopularDestinations = () => {
  return (
    <section className="bg-linear-to-r from-blue-50 to-white">
      <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Popular Destinations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {destinations.map((place) => (
          <motion.div
            key={place.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition"
          >
            <Image
              src={place.img}
              alt={place.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center font-medium text-lg">
              {place.name}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </section>
  );
};
