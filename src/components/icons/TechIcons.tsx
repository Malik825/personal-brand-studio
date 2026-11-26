import type { SVGProps } from "react";

export function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" {...props}>
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 180" fill="none" {...props}>
      <circle cx="90" cy="90" r="90" fill="currentColor" />
      <path
        d="M149.508 157.438L69.141 54H54V125.972H65.986V69.214L138.835 163.664C142.548 161.795 146.113 159.712 149.508 157.438Z"
        fill="var(--background, #000)"
      />
      <rect x="115" y="54" width="12" height="72" fill="var(--background, #000)" />
    </svg>
  );
}

export function TypeScriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 128 128" fill="none" {...props}>
      <rect width="128" height="128" rx="20" fill="#3178C6" />
      <path
        d="M72.16 88.08V79.28C74.68 81.36 77.4 82.88 80.32 83.84C83.24 84.8 86.2 85.28 89.2 85.28C92.48 85.28 95.04 84.64 96.88 83.36C98.72 82.08 99.64 80.24 99.64 77.84C99.64 75.84 98.92 74.24 97.48 73.04C96.04 71.84 93.44 70.68 89.68 69.56C84.32 67.96 80.24 66.08 77.44 63.92C74.64 61.76 73.24 58.48 73.24 54.08C73.24 50 74.8 46.72 77.92 44.24C81.04 41.76 85.32 40.52 90.76 40.52C94.04 40.52 97.2 41.08 100.24 42.2C103.28 43.32 105.84 44.92 107.92 47L101.44 54.72C99.44 53.04 97.32 51.84 95.08 51.12C92.84 50.4 90.72 50.04 88.72 50.04C86.08 50.04 84 50.56 82.48 51.6C80.96 52.64 80.2 54.12 80.2 56.04C80.2 57.8 80.88 59.2 82.24 60.24C83.6 61.28 86.08 62.36 89.68 63.48C95.2 65.16 99.4 67.12 102.28 69.36C105.16 71.6 106.6 74.96 106.6 79.44C106.6 83.76 104.92 87.2 101.56 89.76C98.2 92.32 93.52 93.6 87.52 93.6C84.24 93.6 80.84 92.96 77.32 91.68C73.8 90.4 72.08 89.2 72.16 88.08ZM47.64 51.88H62.92V92.36H52.12V51.88H36.84V42H62.92V51.88H47.64Z"
        fill="white"
      />
    </svg>
  );
}

export function AngularIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 250 250" fill="none" {...props}>
      <polygon points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2" fill="#E23237" />
      <polygon points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 203.9,186.3 218.1,63.2" fill="#B52E31" />
      <path d="M125,52.1L66.8,182.6H89.2L101,153.4H125H149L160.8,182.6H183.2L125,52.1ZM141.4,134.8H125H108.6L125,95.1L141.4,134.8Z" fill="#FFFFFF" />
    </svg>
  );
}

export function TailwindIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
        fill="#38BDF8"
      />
    </svg>
  );
}

export function NodejsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M16 2.5L3.5 9.7V24.3L16 31.5L28.5 24.3V9.7L16 2.5Z"
        fill="#539E43"
      />
      <path
        d="M16 4.5L26.5 10.7V23.3L16 29.5L5.5 23.3V10.7L16 4.5Z"
        fill="#333333"
      />
      <path
        d="M16 11V21M11 13.5L16 11L21 13.5V18.5L16 21L11 18.5V13.5Z"
        stroke="#539E43"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SupabaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M13.4 2.5L2.8 14.8C2.3 15.4 2.7 16.3 3.5 16.3H11.5L10.6 21.5C10.5 22.1 11.3 22.5 11.7 22L22.3 9.7C22.8 9.1 22.4 8.2 21.6 8.2H13.6L14.5 3C14.6 2.4 13.8 2 13.4 2.5Z"
        fill="#3ECF8E"
      />
    </svg>
  );
}

export function PostgresIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.21 4 16.18 4.9 17.59 6.36C17.18 6.75 16.36 7.42 15.5 8C14.64 8.58 13.84 9.07 13.5 9.29C13.25 9.05 12.72 8.61 12 8.61C10.89 8.61 10 9.5 10 10.61C10 11.23 10.28 11.78 10.73 12.14C10.45 12.37 10 12.75 9.5 13.25C9 13.75 8.5 14.33 8.16 14.82C7.82 14.45 7.6 13.95 7.6 13.4C7.6 12.3 8.35 11.37 9.38 11.08C9.46 10.74 9.5 10.38 9.5 10C9.5 7.24 7.26 5 4.5 5C4.33 5 4.16 5.01 4 5.03C5.87 4.38 8.84 4 12 4Z"
        fill="#336791"
      />
    </svg>
  );
}

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.88a1.63 1.63 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62Z" />
    </svg>
  );
}

export function GmailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="#EA4335" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Helper to match any technology string to its authentic icon.
 */
export function getTechIcon(name: string, className = "size-4") {
  const n = name.toLowerCase();
  if (n.includes("react native")) return <ReactIcon className={className} />;
  if (n.includes("react")) return <ReactIcon className={className} />;
  if (n.includes("next")) return <NextjsIcon className={className} />;
  if (n.includes("typescript")) return <TypeScriptIcon className={className} />;
  if (n.includes("angular")) return <AngularIcon className={className} />;
  if (n.includes("tailwind")) return <TailwindIcon className={className} />;
  if (n.includes("node")) return <NodejsIcon className={className} />;
  if (n.includes("supabase")) return <SupabaseIcon className={className} />;
  if (n.includes("postgres")) return <PostgresIcon className={className} />;
  if (n.includes("github")) return <GithubIcon className={className} />;
  if (n.includes("linkedin")) return <LinkedinIcon className={className} />;
  return null;
}
