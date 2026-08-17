export const FooterAttribution = () => {
  return (
    <div className="mt-12 flex flex-col items-center gap-1.5">
      <p className="text-xs text-muted-foreground">
        Powered by{" "}
        <a href="/" className="font-semibold text-primary hover:underline underline-offset-2">
          LinkNest
        </a>
      </p>
      <a
        href="/signup"
        className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
      >
        Create your own free page
      </a>
    </div>
  );
};
