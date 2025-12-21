import { Hero } from "@/components/modules/Home/Hero";
import { HowItWork } from "@/components/modules/Home/HowItWork";
import { Newsletter } from "@/components/modules/Home/NewsLetter";
import { PopularDestinations } from "@/components/modules/Home/PopularDestination";
import SubscriptionServer from "@/components/modules/Home/SubscriptionServer";
import TravelPlanServer from "@/components/modules/Home/TravelPlanServer";
import UserServer from "@/components/modules/Home/UserServer";
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
        <HowItWork/>
        <PopularDestinations/>
        <TravelPlanServer limit={3}/>
        <SubscriptionServer limit={3}/>
        <UserServer limit={3}/>
        <Newsletter/>
      </main>
    </>
  );
}
