import { Button } from "@/components/ui/button";

export const Newsletter = () => {
  return (
    <section className="bg-primary/5 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
        <p className="text-muted-foreground mb-6">
          Get the latest travel plans and buddy recommendations.
        </p>
        <div className="flex justify-center gap-3 max-w-lg mx-auto">
          <input
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </section>
  );
};
