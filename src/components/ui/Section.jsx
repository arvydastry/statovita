import { cn } from "@/lib/utils";

/** Section wrapper with consistent vertical rhythm and anchor id. */
export function Section({ id, className, children, ...rest }) {
  return (
    <section id={id} className={cn("relative scroll-mt-20 overflow-hidden py-20 sm:py-28 lg:py-32", className)} {...rest}>
      {children}
    </section>
  );
}
