import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.organizationName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card. Rebuilt from the same tokens as the site rather than exported as
 * a static asset, so it cannot drift from the live design.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08080b",
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 18% 0%, rgba(232,162,74,0.12), transparent 62%)",
          padding: "72px",
          color: "#f4f3f1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              width: "44px",
              height: "44px",
              borderRadius: "8px",
              border: "1px solid #24242b",
              backgroundColor: "#111116",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "999px",
                border: "3px solid #9a99a5",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              letterSpacing: "0.16em",
              color: "#9a99a5",
            }}
          >
            OMAN COMPUTING SOCIETY
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 700,
              maxWidth: "900px",
            }}
          >
            Building the next generation of technology innovators.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              color: "#9a99a5",
              maxWidth: "800px",
            }}
          >
            A student-led technology community in Oman.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "18px",
            fontSize: "19px",
            letterSpacing: "0.12em",
            color: "#e8a24a",
          }}
        >
          <div style={{ display: "flex" }}>PROGRAMMING</div>
          <div style={{ display: "flex", color: "#3a3b4a" }}>/</div>
          <div style={{ display: "flex" }}>AI</div>
          <div style={{ display: "flex", color: "#3a3b4a" }}>/</div>
          <div style={{ display: "flex" }}>RESEARCH</div>
          <div style={{ display: "flex", color: "#3a3b4a" }}>/</div>
          <div style={{ display: "flex" }}>COLLABORATION</div>
        </div>
      </div>
    ),
    size,
  );
}
