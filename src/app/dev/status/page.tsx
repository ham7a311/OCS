import { notFound } from "next/navigation";
import { StatusPreview } from "@/components/sections/status-preview";

export default function StatusPreviewRoute() {
  if (process.env.NODE_ENV === "production") notFound();
  return <StatusPreview />;
}
