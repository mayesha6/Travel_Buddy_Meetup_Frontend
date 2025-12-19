"use client";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Create Your Profile",
    desc: "Share your interests, location, and travel preferences.",
  },
  {
    title: "Post or Search Trips",
    desc: "Explore travel plans or create your own.",
  },
  {
    title: "Match & Travel",
    desc: "Connect with travelers and enjoy shared adventures.",
  },
];

export const HowItWorks = () => {
  return (
      <section className="bg-linear-to-r from-white to-blue-50 dark:from-zinc-800 dark:to-zinc-900">
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl shadow-sm bg-background"
            >
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
