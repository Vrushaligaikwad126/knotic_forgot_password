import { useState } from "react";

const BirdSVG = () => <img src="/assets/bird.svg" alt="" />;      
const YachtTopSVG = () => <img src="/assets/topYacht.svg" alt="" />; 
const LineSVG = () => <img src="/assets/line.svg" alt="" />;        
const TreeSVG = () => <img src="/assets/tree.svg" alt="" />;       
const ShipSVG = () => <img src="/assets/ship.svg" alt="" />;       
const FishSVG = () => <img src="/assets/fish.svg" alt="" />;        
const LockSVG = () => <img src="/assets/lock.svg" alt="" />;      

const EyeSVG = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffSVG = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);

// ── Reusable decorated right panel ───────────────────────────────────────────
function RightPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        padding: "60px 16px 40px",
      }}
    >
      {/* Bird — top left */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 0,
          padding: 4,
          zIndex: 1,
        }}
      >
        <BirdSVG />
      </div>

      {/* Yacht + line — top right */}
      <div
        style={{
          position: "absolute",
          top: 32,
          right: 0,
          padding: 4,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <YachtTopSVG />
        <LineSVG />
      </div>

      {/* Tree — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: 4,
          zIndex: 1,
        }}
      >
        <TreeSVG />
      </div>

      {/* Ship — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: 4,
          zIndex: 1,
        }}
      >
        <ShipSVG />
      </div>

      {/* Fish center */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      >
        <FishSVG size={24} />
      </div>

      {/* Fish bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      >
        <FishSVG size={18} />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 440,
          padding: "0 32px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Left panel — teal gradient (no Login.png in standalone) ──────────────────
function LeftPanel() {
  return (
    <div
      id="left-panel"
      style={{
        display: "none", 
        width: "50%",
        position: "relative", // relative
        overflow: "hidden", // overflow-hidden
      }}
    >
      <img
        src="/assets/Login.png"
        alt="Cruise Ship"
        style={{
          position: "absolute", // absolute
          inset: 0, // top:0, left:0, right:0, bottom:0
          width: "100%",
          height: "100%",
          objectFit: "cover", // object-cover
        }}
      />
    </div>
  );
}

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const getStrength = (pwd: string) => {
    if (pwd.length === 0) return { label: "", color: "", width: "0%" };
    if (pwd.length < 6)
      return { label: "Weak", color: "#ef4444", width: "33%" };
    if (pwd.length < 10 || !/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd))
      return { label: "Medium", color: "#f59e0b", width: "66%" };
    return { label: "Strong", color: "#1BAAB3", width: "100%" };
  };

  const strength = getStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!password || !confirm) return setError("All fields are required");
    if (password !== confirm) return setError("Passwords do not match");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");
    try {
      setLoading(true);
      const response = await fetch(
        "https://ioweb3.io/knotiqapi/user/passwordReset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword: password }),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // shared styles
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 40px 14px 48px",
    border: "1px solid #1BAAB3",
    borderRadius: 8,
    background: "transparent",
    fontSize: 14,
    fontFamily: "'Albert Sans', sans-serif",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const floatingLabelStyle: React.CSSProperties = {
    position: "absolute",
    left: 48,
    top: 0,
    transform: "translateY(-50%)",
    background: "linear-gradient(135deg, #f9fafb, #ffffff)",
    padding: "0 8px",
    zIndex: 10,
    pointerEvents: "none",
    fontSize: 13,
    fontWeight: 700,
    color: "#1BAAB3",
    fontFamily: "'Albert Sans', sans-serif",
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
  };

  const eyeBtnStyle: React.CSSProperties = {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#9ca3af",
    display: "flex",
    alignItems: "center",
    padding: 0,
  };

  const submitBtnStyle: React.CSSProperties = {
    width: "100%",
    background: "#1BAAB3",
    color: "#ffffff",
    fontFamily: "'Albert Sans', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "14px",
    border: "none",
    borderRadius: 2,
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.5 : 1,
    boxShadow: "0 4px 16px rgba(27,170,179,0.3)",
    transition: "all 0.2s",
    marginTop: 8,
  };

  // ── Invalid token ────────────────────────────────────────────────────────
  if (!token) {
    return (
      <>
        <GlobalStyles />
        <div style={{ minHeight: "100vh", display: "flex" }}>
          <LeftPanel />
          <RightPanel>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "#fef2f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#1BAAB3",
                  fontFamily: "'Albert Sans',sans-serif",
                  marginBottom: 8,
                }}
              >
                Invalid Link
              </h1>
              <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6 }}>
                This reset link is invalid or has expired.
                <br />
                Please request a new one.
              </p>
            </div>
          </RightPanel>
        </div>
      </>
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (success) {
    return (
      <>
        <GlobalStyles />
        <div style={{ minHeight: "100vh", display: "flex" }}>
          <LeftPanel />
          <RightPanel>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "#f0fdf4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#1BAAB3",
                  fontFamily: "'Albert Sans',sans-serif",
                  marginBottom: 8,
                }}
              >
                Password Reset!
              </h1>
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: 14,
                  lineHeight: 1.6,
                  marginBottom: 28,
                }}
              >
                Your password has been successfully updated.
                <br />
                You can now log in with your new password.
              </p>
              {/* 🔁 Replace YOUR_LOGIN_URL with your actual app login page */}
              <a
                href="YOUR_LOGIN_URL"
                style={{
                  display: "block",
                  width: "100%",
                  background: "#1BAAB3",
                  color: "#fff",
                  fontFamily: "'Albert Sans',sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "14px",
                  borderRadius: 2,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(27,170,179,0.3)",
                  textAlign: "center",
                }}
              >
                Back to Login
              </a>
            </div>
          </RightPanel>
        </div>
      </>
    );
  }

  // ── Main form ────────────────────────────────────────────────────────────
  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: "100vh", display: "flex" }}>
        <LeftPanel />
        <RightPanel>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#1BAAB3",
                fontFamily: "'Albert Sans',sans-serif",
                marginBottom: 6,
              }}
            >
              New Password
            </h1>
            <p style={{ color: "#9ca3af", fontSize: 14 }}>
              Enter and confirm your new password
            </p>
          </div>

          {error && (
            <p
              style={{
                color: "#ef4444",
                fontSize: 13,
                textAlign: "center",
                marginBottom: 16,
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 8,
                padding: "10px 14px",
              }}
            >
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {/* New Password */}
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#0d8e96";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(27,170,179,0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#1BAAB3";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <span style={iconStyle}>
                <LockSVG />
              </span>
              <span style={floatingLabelStyle}>New Password</span>
              <button
                type="button"
                style={eyeBtnStyle}
                onClick={() => setShowPass((p) => !p)}
              >
                {showPass ? <EyeOffSVG /> : <EyeSVG />}
              </button>
              {password.length > 0 && (
                <div style={{ marginTop: 6, paddingLeft: 2 }}>
                  <div
                    style={{
                      height: 4,
                      background: "#e5e7eb",
                      borderRadius: 99,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: strength.width,
                        background: strength.color,
                        borderRadius: 99,
                        transition: "all 0.3s",
                      }}
                    />
                  </div>
                  <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
                    Strength:{" "}
                    <span style={{ color: strength.color, fontWeight: 600 }}>
                      {strength.label}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder=" "
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#0d8e96";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(27,170,179,0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#1BAAB3";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <span style={iconStyle}>
                <LockSVG />
              </span>
              <span style={floatingLabelStyle}>Confirm Password</span>
              <button
                type="button"
                style={eyeBtnStyle}
                onClick={() => setShowConfirm((p) => !p)}
              >
                {showConfirm ? <EyeOffSVG /> : <EyeSVG />}
              </button>
              {confirm && confirm !== password && (
                <p
                  style={{
                    fontSize: 11,
                    color: "#ef4444",
                    marginTop: 4,
                    paddingLeft: 2,
                  }}
                >
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} style={submitBtnStyle}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </RightPanel>
      </div>
    </>
  );
}

// ── Global styles ─────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Albert Sans', sans-serif; }
      button:focus { outline: none; }
      @media (min-width: 1024px) {
        #left-panel { display: flex !important; }
      }
    `}</style>
  );
}
