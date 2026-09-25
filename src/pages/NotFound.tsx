import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function NotFound() {
  return (
    <main className="px-3 pb-6 pt-10 sm:px-5">
      <div className="clay-card mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-[calc(var(--radius)+0.8rem)] p-12 text-center">
        <span className="clay-blob flex size-20 items-center justify-center bg-peach">
          <Sparkles className="size-8 text-charcoal/60" aria-hidden />
        </span>
        <h1 className="font-display text-4xl font-semibold text-charcoal">404</h1>
        <p className="max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
          This page wandered off the shelf. Let's get you back to the good
          stuff — Korean beauty awaits.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild className="clay-btn h-12 px-7 text-sm font-bold">
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild variant="ghost" className="clay-btn-soft h-12 px-6 text-sm font-semibold">
            <Link to="/shop">Browse the shop</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
