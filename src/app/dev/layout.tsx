import { notFound } from "next/navigation";

/** Working pages for building and capturing assets. Never served in production. */
export default function DevLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound();
  return children;
}
