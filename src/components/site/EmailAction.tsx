import { useState, useCallback } from "react";
import { Mail, Check, Copy, ExternalLink, ArrowUpRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics/posthog";

interface EmailActionProps {
  email: string;
  className?: string;
  variant?: "button" | "pill" | "inline" | "card";
  showIcon?: boolean;
  label?: string;
}

export function EmailAction({
  email,
  className = "",
  variant = "pill",
  showIcon = true,
  label,
}: EmailActionProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      // 1. Copy email to clipboard so it's guaranteed ready to paste
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = email;
          textArea.style.position = "fixed";
          textArea.style.left = "-9999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.warn("Failed to copy email:", err);
      }

      // 2. Track analytics
      trackEvent("outbound_email_clicked", {
        email,
        variant,
      });

      // 3. Trigger mailto client
      window.location.href = `mailto:${email}`;
    },
    [email, variant]
  );

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  if (variant === "inline") {
    return (
      <span className="relative inline-flex items-center gap-1.5 group">
        <a
          href={`mailto:${email}`}
          onClick={handleClick}
          title="Click to email (copies address automatically)"
          className={`inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-primary cursor-pointer ${className}`}
        >
          {showIcon && (
            copied ? (
              <Check className="size-3.5 text-emerald-500 shrink-0" />
            ) : (
              <Mail className="size-3.5 shrink-0" />
            )
          )}
          <span>{label || email}</span>
          <ArrowUpRight className="size-3 opacity-60 group-hover:opacity-100 transition-opacity" />
        </a>
        {copied && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-0.5 text-[10px] font-mono font-medium text-background shadow-md animate-in fade-in zoom-in-95 duration-150">
            Copied address!
          </span>
        )}
      </span>
    );
  }

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="inline-flex items-center rounded-full border border-border/80 bg-card/60 p-1 backdrop-blur-sm shadow-sm transition-all hover:border-foreground/30">
        <button
          type="button"
          onClick={handleClick}
          title="Click to open mail app & copy address"
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 hover:bg-foreground/5 cursor-pointer active:scale-95 ${className}`}
        >
          {showIcon && (
            copied ? (
              <Check className="size-4 text-emerald-500 animate-in zoom-in-50" />
            ) : (
              <Mail className="size-4 text-primary" />
            )
          )}
          <span>{copied ? "Copied address to clipboard!" : label || email}</span>
          <ArrowUpRight className="size-3.5 text-muted-foreground" />
        </button>

        <a
          href={gmailComposeUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open directly in Gmail web composer"
          className="inline-flex items-center gap-1 border-l border-border/60 px-2.5 py-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-r-full transition-colors"
        >
          <span>Gmail</span>
          <ExternalLink className="size-3" />
        </a>
      </div>

      {copied && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-mono text-emerald-500 animate-in fade-in duration-200">
          Ready to paste anywhere
        </span>
      )}
    </div>
  );
}
