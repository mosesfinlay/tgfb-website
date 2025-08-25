export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-orange pl-4 md:pl-10 -ml-[calc(1rem+2px)] md:-ml-[calc(2.5rem+2px)]">
      <h3 className="text-foreground text-2xl font-bold">{children}</h3>
    </div>
  );
}
