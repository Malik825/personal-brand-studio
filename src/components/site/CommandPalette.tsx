import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  FileText,
  FolderGit2,
  Mail,
  Linkedin,
  Github,
  Compass,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { site, projects as staticProjects, articles as staticArticles } from "@/content";

interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({ open: controlledOpen, onOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (val: boolean) => {
    if (isControlled && onOpenChange) {
      onOpenChange(val);
    } else {
      setInternalOpen(val);
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setOpen(false), 800);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="border-b border-border px-3 py-1">
        <CommandInput placeholder="Type a command, project, or article..." />
      </div>
      <CommandList className="max-h-[60vh] p-2 text-sm">
        <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
          No results found.
        </CommandEmpty>

        {/* Quick Navigation */}
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => navigate({ to: "/" }))}
            className="flex items-center justify-between rounded-md px-3 py-2.5 cursor-pointer aria-selected:bg-accent"
          >
            <div className="flex items-center gap-2.5">
              <Compass className="size-4 text-muted-foreground" />
              <span>Home</span>
            </div>
            <ArrowRight className="size-3.5 text-muted-foreground opacity-60" />
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate({ to: "/work" }))}
            className="flex items-center justify-between rounded-md px-3 py-2.5 cursor-pointer aria-selected:bg-accent"
          >
            <div className="flex items-center gap-2.5">
              <FolderGit2 className="size-4 text-muted-foreground" />
              <span>Selected Work</span>
            </div>
            <ArrowRight className="size-3.5 text-muted-foreground opacity-60" />
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate({ to: "/about" }))}
            className="flex items-center justify-between rounded-md px-3 py-2.5 cursor-pointer aria-selected:bg-accent"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="size-4 text-muted-foreground" />
              <span>About & Capabilities</span>
            </div>
            <ArrowRight className="size-3.5 text-muted-foreground opacity-60" />
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate({ to: "/writing" }))}
            className="flex items-center justify-between rounded-md px-3 py-2.5 cursor-pointer aria-selected:bg-accent"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="size-4 text-muted-foreground" />
              <span>Writing & Essays</span>
            </div>
            <ArrowRight className="size-3.5 text-muted-foreground opacity-60" />
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate({ to: "/contact" }))}
            className="flex items-center justify-between rounded-md px-3 py-2.5 cursor-pointer aria-selected:bg-accent"
          >
            <div className="flex items-center gap-2.5">
              <Mail className="size-4 text-muted-foreground" />
              <span>Contact</span>
            </div>
            <ArrowRight className="size-3.5 text-muted-foreground opacity-60" />
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-2" />

        {/* Projects */}
        <CommandGroup heading="Case Studies">
          {staticProjects.map((p) => (
            <CommandItem
              key={p.slug}
              value={`project ${p.title} ${p.category} ${p.stack.join(" ")}`}
              onSelect={() =>
                runCommand(() => navigate({ to: "/work/$slug", params: { slug: p.slug } }))
              }
              className="flex items-center justify-between rounded-md px-3 py-2.5 cursor-pointer aria-selected:bg-accent"
            >
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{p.title}</span>
                <span className="text-xs text-muted-foreground">
                  {p.category} · {p.year}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{p.role}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="my-2" />

        {/* Articles */}
        <CommandGroup heading="Articles & Essays">
          {staticArticles.map((a) => (
            <CommandItem
              key={a.slug}
              value={`article ${a.title} ${a.topic}`}
              onSelect={() =>
                runCommand(() => navigate({ to: "/writing/$slug", params: { slug: a.slug } }))
              }
              className="flex items-center justify-between rounded-md px-3 py-2.5 cursor-pointer aria-selected:bg-accent"
            >
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{a.title}</span>
                <span className="text-xs text-muted-foreground">
                  {a.topic} · {a.readingTime}
                </span>
              </div>
              <ArrowRight className="size-3.5 text-muted-foreground opacity-60" />
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="my-2" />

        {/* Actions */}
        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={copyEmail}
            className="flex items-center justify-between rounded-md px-3 py-2.5 cursor-pointer aria-selected:bg-accent"
          >
            <div className="flex items-center gap-2.5">
              {copied ? (
                <Check className="size-4 text-success" />
              ) : (
                <Copy className="size-4 text-muted-foreground" />
              )}
              <span>{copied ? "Copied to clipboard!" : `Copy Email (${site.email})`}</span>
            </div>
            <kbd className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
              Enter
            </kbd>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => window.open(site.linkedin, "_blank", "noopener,noreferrer"))
            }
            className="flex items-center justify-between rounded-md px-3 py-2.5 cursor-pointer aria-selected:bg-accent"
          >
            <div className="flex items-center gap-2.5">
              <Linkedin className="size-4 text-muted-foreground" />
              <span>LinkedIn Profile</span>
            </div>
            <ExternalLink className="size-3.5 text-muted-foreground opacity-60" />
          </CommandItem>
          {site.github && (
            <CommandItem
              onSelect={() =>
                runCommand(() => window.open(site.github, "_blank", "noopener,noreferrer"))
              }
              className="flex items-center justify-between rounded-md px-3 py-2.5 cursor-pointer aria-selected:bg-accent"
            >
              <div className="flex items-center gap-2.5">
                <Github className="size-4 text-muted-foreground" />
                <span>GitHub Repositories</span>
              </div>
              <ExternalLink className="size-3.5 text-muted-foreground opacity-60" />
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
      <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
        <span>Use ↑↓ arrows to navigate</span>
        <span>Press ESC to close</span>
      </div>
    </CommandDialog>
  );
}
