import { ImageResponse } from "next/og";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

// Generated at build time to out/og.png — shared OpenGraph/Twitter image.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0E0E10",
          color: "#F6F3EE",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 44, height: 44, background: "#F6F3EE" }} />
          <div style={{ fontSize: 30, letterSpacing: 10, fontWeight: 700 }}>BADFLY</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -2, fontWeight: 600, maxWidth: 980 }}>
            Custom Apparel Manufacturing for European Brands
          </div>
          <div style={{ fontSize: 28, color: "rgba(246,243,238,0.65)" }}>
            Designed with your brand. Manufactured with our expertise.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "rgba(246,243,238,0.55)" }}>
          <span>Private Label · Uniforms · Corporate Apparel</span>
          <span style={{ color: "#C96A40" }}>Produced in Türkiye · Delivered across Europe</span>
        </div>
      </div>
    ),
    size,
  );
}
