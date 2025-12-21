"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MessageCircle, Calendar } from "lucide-react"; // icons


const steps = [
  {
    title: "Create Your Profile",
    desc: "Share your interests, location, and travel preferences.",
    icon: <CheckCircle className="w-12 h-12 text-blue-500 mb-4 animate-bounce" />,
  },
  {
    title: "Post or Search Trips",
    desc: "Explore travel plans or create your own.",
    icon: <MessageCircle className="w-12 h-12 text-green-500 mb-4 animate-bounce" />,
  },
  {
    title: "Match & Travel",
    desc: "Connect with travelers and enjoy shared adventures.",
    icon: <Calendar className="w-12 h-12 text-purple-500 mb-4 animate-bounce" />,
  },
];

export const HowItWork = () => {
  return (
    <section className="bg-linear-to-r from-white to-blue-50 dark:from-zinc-800 dark:to-zinc-900 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-8 text-center animate-fadeInDown">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="flex flex-col h-full p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500">
                <CardContent className="text-center">
                  <span className="w-full flex items-center justify-center">{step.icon}</span>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative floating shapes */}
      {/* <div className="absolute top-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div> */}
    </section>
  );
};
