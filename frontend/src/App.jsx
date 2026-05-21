import { useState } from "react";

// ── icons ──────────────────────────────────────────────────────────────────────
const TrophyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4a2 2 0 0 1-2-2V5h4"/><path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/>
    <path d="M12 17v4"/><path d="M8 21h8"/>
    <path d="M6 5h12v6a6 6 0 0 1-12 0V5Z"/>
  </svg>
);
const PuzzleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-3.408 0l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.567a2.404 2.404 0 0 1 0-3.408l1.611-1.611a.979.979 0 0 1 .837-.276c.47.07.802.48.968.925a2.5 2.5 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.61a2.404 2.404 0 0 1 3.408 0l1.568 1.568c.23.23.556.338.878.29.493-.074.84-.504 1.019-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <path d="M12 9v4"/><path d="M12 17h.01"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);
const BulbIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
    <path d="M9 18h6"/><path d="M10 22h4"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
);
const DotIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="5" fill="#7C3AED"/>
  </svg>
);
const UploadIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const JDIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

// ── helpers ────────────────────────────────────────────────────────────────────
function parseResponse(text) {
  const section = (label) => {
    const re = new RegExp(`${label}[:\\s]*([\\s\\S]*?)(?=\\n[A-Z][^\\n]*:|$)`, "i");
    const m = text.match(re);
    if (!m) return [];
    return m[1].trim().split("\n")
      .map(l => l.replace(/^[-*•\d.]+\s*/, "").trim())
      .filter(Boolean);
  };
  const scoreMatch = text.match(/ATS\s*Score[:\s]*(\d+)/i);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
  return {
    score,
    missingSkills: section("Missing Skills"),
    improvements:  section("Improvements"),
    strengths:     section("Strengths"),
    weaknesses:    section("Weaknesses"),
    bestRoles:     section("Best(?:\\s+Match)?\\s+Roles"),
  };
}

function scoreColor(s) {
  if (s >= 80) return "#7C3AED";
  if (s >= 60) return "#F59E0B";
  return "#EF4444";
}
function scoreLabel(s) {
  if (s >= 80) return { text: "Good Match!", sub: "Your resume is well-optimised for ATS systems.", color: "#16A34A" };
  if (s >= 60) return { text: "Average Match", sub: "Some improvements needed.", color: "#F59E0B" };
  return { text: "Needs Work", sub: "Significant improvements required.", color: "#EF4444" };
}

function CircleScore({ score }) {
  const r = 54, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const col = scoreColor(score);
  const lbl = scoreLabel(score);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 16 }}>
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#E9D5FF" strokeWidth="10"/>
        <circle cx="65" cy="65" r={r} fill="none" stroke={col} strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={circ / 4}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
        <text x="65" y="60" textAnchor="middle" fontSize="28" fontWeight="bold" fill={col}>{score}</text>
        <text x="65" y="78" textAnchor="middle" fontSize="12" fill="#9CA3AF">/100</text>
      </svg>
      <div>
        <p style={{ color: lbl.color, fontWeight: 700, fontSize: 18, margin: 0 }}>{lbl.text}</p>
        <p style={{ color: "#6B7280", fontSize: 14, marginTop: 6, maxWidth: 180 }}>{lbl.sub}</p>
      </div>
    </div>
  );
}

function Card({ num, title, icon, children, accent = "#7C3AED" }) {
  return (
    <div style={{
      background: "white", borderRadius: 20, padding: "24px 26px",
      boxShadow: "0 2px 16px rgba(124,58,237,0.08)", border: "1px solid #F3E8FF",
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%", background: accent, color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: 15, flexShrink: 0,
        }}>{num}</div>
        <h3 style={{ margin: 0, color: "#4B0082", fontSize: 19, fontWeight: 700 }}>{title}</h3>
        <div style={{ marginLeft: "auto", color: accent, opacity: 0.5 }}>{icon}</div>
      </div>
      {children}
    </div>
  );
}

function BulletList({ items, type = "dot" }) {
  if (!items.length) return <p style={{ color: "#9CA3AF", fontSize: 14, marginTop: 12 }}>None found.</p>;
  return (
    <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: "#374151", lineHeight: 1.5 }}>
          <span style={{ flexShrink: 0, marginTop: 3 }}>
            {type === "check" && (
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#16A34A", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <CheckIcon/>
              </span>
            )}
            {type === "x" && (
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#EF4444", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <XIcon/>
              </span>
            )}
            {type === "dot" && <DotIcon/>}
            {type === "bullet" && <span style={{ color: "#C084FC", fontSize: 18 }}>•</span>}
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

// ── main ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [file, setFile]         = useState(null);
  const [jd, setJd]             = useState("");
  const [drag, setDrag]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [data, setData]         = useState(null);
  const [error, setError]       = useState("");
  const [mode, setMode]         = useState("general"); // "general" | "jd"

  const handleUpload = async () => {
    if (!file) { alert("Please select a PDF first."); return; }
    if (mode === "jd" && !jd.trim()) { alert("Please paste a job description."); return; }
    setLoading(true); setError(""); setData(null);
    try {
      const fd = new FormData();
      fd.append("resume", file);
      if (mode === "jd") fd.append("job_description", jd);
      const res  = await fetch("http://127.0.0.1:5000/upload", { method: "POST", body: fd });
      const text = await res.text();
      setData(parseResponse(text));
    } catch (e) {
      setError("Could not reach the server. Make sure Flask is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type === "application/pdf") setFile(f);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F3ECFF", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* header */}
      <div style={{ textAlign: "center", padding: "50px 20px 30px" }}>
        <h1 style={{ fontSize: 52, fontWeight: 800, color: "#6D28D9", margin: 0, letterSpacing: -1 }}>
          AI Resume Analyzer
        </h1>
        <p style={{ color: "#6B7280", fontSize: 18, marginTop: 10 }}>
          Upload your resume and get AI-powered ATS analysis
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto 40px", padding: "0 20px" }}>

        {/* mode toggle */}
        <div style={{
          display: "flex", gap: 12, marginBottom: 20,
          background: "white", borderRadius: 16, padding: 8,
          boxShadow: "0 2px 12px rgba(124,58,237,0.08)",
          border: "1px solid #F3E8FF",
        }}>
          {["general", "jd"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: "12px 0", borderRadius: 10, border: "none",
              cursor: "pointer", fontWeight: 600, fontSize: 15, transition: "all .2s",
              background: mode === m ? "#7C3AED" : "transparent",
              color: mode === m ? "white" : "#6B7280",
            }}>
              {m === "general" ? "🔍 General Analysis" : "🎯 Match to Job Description"}
            </button>
          ))}
        </div>

        {/* upload box */}
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          style={{
            background: drag ? "#EDE9FE" : "white",
            border: `2px dashed ${drag ? "#7C3AED" : "#C084FC"}`,
            borderRadius: 22, padding: "28px 32px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 20, transition: "all .2s",
            boxShadow: "0 4px 24px rgba(124,58,237,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {file ? (
              <div style={{
                width: 52, height: 60, background: "#7C3AED", borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontSize: 11, fontWeight: 700, flexShrink: 0,
              }}>PDF</div>
            ) : (
              <div style={{ flexShrink: 0 }}><UploadIcon/></div>
            )}
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: "#6D28D9", fontSize: 16 }}>
                {file ? file.name : "Upload Resume PDF"}
              </p>
              <p style={{ margin: "4px 0 0", color: "#9CA3AF", fontSize: 13 }}>PDF Document</p>
              <label style={{
                display: "inline-block", marginTop: 8, cursor: "pointer",
                background: "#F3E8FF", color: "#7C3AED", borderRadius: 8,
                padding: "6px 14px", fontSize: 13, fontWeight: 600,
              }}>
                Choose File
                <input type="file" accept=".pdf" style={{ display: "none" }}
                  onChange={e => setFile(e.target.files[0])} />
              </label>
              {file && <span style={{ marginLeft: 10, color: "#6B7280", fontSize: 13 }}>{file.name}</span>}
            </div>
          </div>

          <button onClick={handleUpload} disabled={loading} style={{
            background: loading ? "#A78BFA" : "#7C3AED", color: "white", border: "none",
            padding: "14px 28px", borderRadius: 14, fontSize: 16, fontWeight: 600,
            cursor: loading ? "wait" : "pointer", display: "flex", alignItems: "center",
            gap: 8, flexShrink: 0, transition: "background .2s",
          }}>
            {loading ? (
              <>
                <span style={{
                  display: "inline-block", width: 16, height: 16,
                  border: "2px solid white", borderTop: "2px solid transparent",
                  borderRadius: "50%", animation: "spin 0.7s linear infinite",
                }}/>
                Analyzing…
              </>
            ) : (
              <>{mode === "jd" ? "🎯" : "🔍"} Analyze Resume</>
            )}
          </button>
        </div>

        {/* job description textarea — only shown in JD mode */}
        {mode === "jd" && (
          <div style={{
            marginTop: 16, background: "white", borderRadius: 20,
            padding: "22px 26px", border: "1px solid #F3E8FF",
            boxShadow: "0 2px 16px rgba(124,58,237,0.08)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", background: "#7C3AED",
                display: "flex", alignItems: "center", justifyContent: "center", color: "white",
              }}>
                <JDIcon/>
              </div>
              <h3 style={{ margin: 0, color: "#4B0082", fontSize: 17, fontWeight: 700 }}>
                Paste Job Description
              </h3>
              <span style={{
                marginLeft: "auto", background: "#F3E8FF", color: "#7C3AED",
                fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20,
              }}>Required for JD Match</span>
            </div>
            <textarea
              value={jd}
              onChange={e => setJd(e.target.value)}
              placeholder="Paste the full job description here — role requirements, required skills, responsibilities, qualifications…"
              rows={7}
              style={{
                width: "100%", boxSizing: "border-box",
                border: "1.5px solid #E9D5FF", borderRadius: 12,
                padding: "14px 16px", fontSize: 14, color: "#374151",
                fontFamily: "'Segoe UI', sans-serif", resize: "vertical",
                outline: "none", lineHeight: 1.6,
                transition: "border .2s",
              }}
              onFocus={e => e.target.style.borderColor = "#7C3AED"}
              onBlur={e => e.target.style.borderColor = "#E9D5FF"}
            />
            <p style={{ margin: "8px 0 0", color: "#9CA3AF", fontSize: 13 }}>
              {jd.length > 0 ? `${jd.length} characters · ` : ""}
              The more detail you provide, the more accurate the match score.
            </p>
          </div>
        )}

        {error && (
          <p style={{ color: "#EF4444", textAlign: "center", marginTop: 12, fontSize: 14 }}>{error}</p>
        )}
      </div>

      {/* results */}
      {data && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 60px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 32 }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #C084FC)" }}/>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6D28D9", fontWeight: 700, fontSize: 24 }}>
              <span>{mode === "jd" ? "🎯" : "📊"}</span>
              {mode === "jd" ? "JD Match Analysis" : "Resume Analysis"}
            </div>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #C084FC)" }}/>
          </div>

          {/* JD match badge */}
          {mode === "jd" && (
            <div style={{
              marginBottom: 22, background: "#EDE9FE", borderRadius: 14,
              padding: "12px 20px", border: "1px solid #C4B5FD",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>🎯</span>
              <p style={{ margin: 0, color: "#5B21B6", fontSize: 14, fontWeight: 500 }}>
                This analysis is tailored to match your resume against the provided job description.
                The ATS score reflects how well you match <strong>this specific role</strong>.
              </p>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 22 }}>
            <Card num="1" title="ATS Score" icon={<TrophyIcon/>}>
              <CircleScore score={data.score}/>
            </Card>
            <Card num="2" title="Missing Skills" icon={<PuzzleIcon/>}>
              <BulletList items={data.missingSkills} type="bullet"/>
            </Card>
            <Card num="3" title="Improvements" icon={<ArrowIcon/>}>
              <BulletList items={data.improvements} type="bullet"/>
            </Card>
            <Card num="4" title="Strengths" icon={<ShieldIcon/>}>
              <BulletList items={data.strengths} type="check"/>
            </Card>
            <Card num="5" title="Weaknesses" icon={<AlertIcon/>}>
              <BulletList items={data.weaknesses} type="x"/>
            </Card>
            <Card num="6" title="Best Match Roles" icon={<BriefcaseIcon/>}>
              <BulletList items={data.bestRoles} type="dot"/>
            </Card>
          </div>

          <div style={{
            marginTop: 28, background: "white", borderRadius: 16, padding: "16px 24px",
            display: "flex", alignItems: "center", gap: 12,
            boxShadow: "0 2px 12px rgba(124,58,237,0.07)", border: "1px solid #F3E8FF",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", background: "#7C3AED",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, color: "white",
            }}>
              <BulbIcon/>
            </div>
            <p style={{ margin: 0, color: "#374151", fontSize: 15 }}>
              <strong style={{ color: "#6D28D9" }}>Pro Tip: </strong>
              {mode === "jd"
                ? "Tailor your resume to mirror the exact keywords and phrases from the job description to boost your ATS score."
                : "Keep learning and building projects. Quantify your achievements and tailor your resume for each role."}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        textarea::placeholder { color: #C4B5FD; }
      `}</style>
    </div>
  );
}