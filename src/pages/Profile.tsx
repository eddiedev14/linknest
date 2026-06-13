import { Button } from "@/shared/components/shadcn/button";
import { Input } from "@/shared/components/shadcn/input";
import { Label } from "@/shared/components/shadcn/label";
import { Separator } from "@/shared/components/shadcn/separator";
import { Textarea } from "@/shared/components/shadcn/textarea";

export function Profile() {
  return (
    <main
      className="flex-1 flex flex-col items-center py-10 px-4"
      aria-label="Edit your profile"
    >
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Page heading */}
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground tracking-tight">
            Your Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            This information will appear on your public link page.
          </p>
        </div>

        {/* Profile card */}
        <div className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm">
          {/* ── Banner ── */}
          <div
            className="relative h-32 w-full bg-primary"
            role="img"
            aria-label="Profile banner"
          >
            {/* Edit banner button */}
            <button
              type="button"
              className="absolute top-3 right-3 size-8 rounded-lg bg-black/20 hover:bg-black/35 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
              aria-label="Edit banner color"
            >
              {/* <Pencil size={13} aria-hidden="true" /> */}
            </button>
            {/* Hidden color picker */}
            <input
              type="color"
              defaultValue="#6366F1"
              className="sr-only"
              aria-hidden="true"
              tabIndex={-1}
            />

            {/* ── Avatar — centered on banner bottom edge ── */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-10">
              <div className="relative">
                {/* Avatar circle */}
                <div
                  className="size-20 rounded-full border-4 border-background bg-muted flex items-center justify-center overflow-hidden shadow-md"
                  aria-label="Profile photo"
                >
                  {/* <User
                      size={28}
                      className="text-muted-foreground"
                      aria-hidden="true"
                    /> */}
                </div>

                {/* Edit avatar button */}
                <button
                  type="button"
                  className="absolute -bottom-0.5 -right-0.5 size-6 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground shadow-sm transition-colors ring-2 ring-background"
                  aria-label="Change profile photo"
                >
                  {/* <Camera size={11} aria-hidden="true" /> */}
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  aria-label="Upload profile photo"
                />
              </div>
            </div>
          </div>

          {/* ── Form area — padded below banner + avatar ── */}
          <div className="px-6 pt-14 pb-8">
            <form className="flex flex-col gap-6" noValidate>
              <Separator />

              {/* Display Name */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="display-name"
                  className="text-sm font-medium text-foreground"
                >
                  Display Name
                </Label>
                <Input
                  id="display-name"
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  maxLength={50}
                  autoComplete="name"
                  className="h-11 rounded-xl text-sm"
                  aria-describedby="display-name-hint"
                />
                <p
                  id="display-name-hint"
                  className="text-xs text-muted-foreground"
                >
                  This is the name shown at the top of your public page.
                </p>
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="bio"
                    className="text-sm font-medium text-foreground"
                  >
                    Bio
                  </Label>
                  {/* <span
                      className={cn(
                        "text-xs tabular-nums transition-colors",
                        bio.length >= bioMaxLength
                          ? "text-destructive font-medium"
                          : "text-muted-foreground",
                      )}
                      aria-live="polite"
                    >
                      {bio.length}/{bioMaxLength}
                    </span> */}
                </div>
                <Textarea
                  id="bio"
                  placeholder="Tell your audience a little about yourself…"
                  maxLength={150}
                  rows={3}
                  className="resize-none rounded-xl text-sm min-h-22"
                  aria-describedby="bio-hint"
                />
                <p id="bio-hint" className="text-xs text-muted-foreground">
                  A short description shown below your name on your public page.
                </p>
              </div>

              {/* Save button */}
              <div className="flex justify-end pt-1">
                <Button
                  type="submit"
                  size="lg"
                  className="h-11 px-8 rounded-xl font-semibold text-sm gap-2 shadow-md shadow-primary/20 transition-all"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Public URL hint */}
        <div className="flex items-center gap-2 bg-accent/40 border border-accent rounded-xl px-4 py-3">
          <span
            className="size-2 rounded-full bg-primary shrink-0"
            aria-hidden="true"
          />
          <p className="text-xs text-foreground/70 leading-relaxed">
            Your public page is live at{" "}
            <a href="#" className="font-semibold text-primary hover:underline">
              getlinknest.vercel.app/u/yourname
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
