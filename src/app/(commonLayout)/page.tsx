import { FeaturedTravelers } from "@/components/modules/Home/FeaturedTravelers";
import { Hero } from "@/components/modules/Home/Hero";
import { HowItWorks } from "@/components/modules/Home/HowItWork";
import { Newsletter } from "@/components/modules/Home/NewsLetter";
import { PopularDestinations } from "@/components/modules/Home/PopularDestination";
import { PopularPlans } from "@/components/modules/Home/PopularPlans";
import { Testimonials } from "@/components/modules/Home/Testimonial";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Travel Buddy - Find Your Perfect Partner</title>
        <meta
          name="description"
          content="The platform combines social networking and travel planning to enhance shared experiences and build a vibrant community of explorers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <PopularDestinations/>
        <HowItWorks/>
        <FeaturedTravelers/>
        <PopularPlans/>
        <Testimonials/>
        <Newsletter/>
      </main>
    </>
  );
}
