export function Footer() {
  return (
    <footer className="border-t px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-sm text-muted-foreground">
        <p>Built with Next.js, Tailwind CSS, and Groq AI</p>
        <p>&copy; {new Date().getFullYear()} PortfolioBuilder. All rights reserved.</p>
      </div>
    </footer>
  );
}
