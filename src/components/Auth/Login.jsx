import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [focused, setFocused] = useState(null)
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    try {
      handleLogin(email, password)
    } catch {
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
    setLoading(false)
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        .login-root {
          min-height: 100vh;
          width: 100vw;
          background: #07080f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'IBM Plex Mono', monospace;
          overflow: hidden;
          position: relative;
        }

        /* ── Ambient orbs — violet + rose palette ── */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          animation: drift 14s ease-in-out infinite;
          pointer-events: none;
        }
        .orb-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(139,92,246,0.22), transparent 70%);
          top: -160px; left: -140px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(236,72,153,0.18), transparent 70%);
          bottom: -100px; right: -80px;
          animation-delay: -7s;
        }
        .orb-3 {
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(167,139,250,0.12), transparent 70%);
          top: 40%; right: 10%;
          animation-delay: -3.5s;
        }
        @keyframes drift {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(28px,-18px) scale(1.04); }
          66%      { transform: translate(-18px,26px) scale(0.97); }
        }

        /* ── Fine dot grid ── */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(139,92,246,0.08) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        /* ── Noise grain ── */
        .grain {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
        }

        /* ── Card ── */
        .card {
          position: relative;
          width: 430px;
          background: rgba(255,255,255,0.028);
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 20px;
          padding: 52px 48px 48px;
          backdrop-filter: blur(28px);
          animation: cardIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
          opacity: 0;
          transform: translateY(36px);
          box-shadow:
            0 0 0 1px rgba(139,92,246,0.08),
            0 32px 64px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }
        @keyframes cardIn {
          to { opacity: 1; transform: translateY(0); }
        }

        /* corner accents */
        .card::before, .card::after {
          content: '';
          position: absolute;
          width: 22px; height: 22px;
          border-color: rgba(139,92,246,0.6);
          border-style: solid;
        }
        .card::before {
          top: -1px; left: -1px;
          border-width: 2px 0 0 2px;
          border-radius: 20px 0 0 0;
        }
        .card::after {
          bottom: -1px; right: -1px;
          border-width: 0 2px 2px 0;
          border-radius: 0 0 20px 0;
        }

        /* ── Brand ── */
        .brand {
          text-align: center;
          margin-bottom: 44px;
          animation: fadeUp 0.7s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .logo-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px; height: 56px;
          border: 1.5px solid rgba(139,92,246,0.45);
          border-radius: 16px;
          margin-bottom: 18px;
          background: rgba(139,92,246,0.07);
          box-shadow: 0 0 24px rgba(139,92,246,0.2), inset 0 0 12px rgba(139,92,246,0.06);
        }
        .logo-mark svg {
          width: 26px; height: 26px;
          stroke: #a78bfa;
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 6px rgba(139,92,246,0.7));
        }

        .app-name {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #f5f3ff;
          text-transform: uppercase;
          display: block;
          text-shadow: 0 0 30px rgba(139,92,246,0.3);
        }
        .app-name span {
          color: #a78bfa;
          text-shadow: 0 0 20px rgba(139,92,246,0.6);
        }

        .tagline {
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          margin-top: 7px;
          font-family: 'IBM Plex Mono', monospace;
        }

        /* ── Fields ── */
        .field {
          position: relative;
          margin-bottom: 22px;
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        .field:nth-child(1) { animation-delay: 0.35s; }
        .field:nth-child(2) { animation-delay: 0.45s; }

        .field label {
          display: block;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 9px;
          font-family: 'IBM Plex Mono', monospace;
          transition: color 0.3s;
        }
        .field.active label { color: #a78bfa; }

        .field input {
          width: 100%;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 14px 18px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.88rem;
          color: #ede9fe;
          outline: none;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
          letter-spacing: 0.04em;
        }
        .field input::placeholder { color: rgba(255,255,255,0.16); }
        .field input:focus {
          border-color: rgba(139,92,246,0.5);
          background: rgba(139,92,246,0.05);
          box-shadow: 0 0 0 3px rgba(139,92,246,0.1), inset 0 1px 0 rgba(139,92,246,0.06);
        }

        /* animated underline */
        .field-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px; width: 0%;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
          border-radius: 0 0 10px 10px;
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 8px rgba(139,92,246,0.6);
        }
        .field.active .field-bar { width: 100%; }

        /* ── Button ── */
        .btn-wrap {
          margin-top: 32px;
          animation: fadeUp 0.7s 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }

        .btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%);
          border: none;
          border-radius: 10px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #f5f3ff;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.3s;
          box-shadow: 0 4px 20px rgba(139,92,246,0.35);
        }
        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(139,92,246,0.5);
        }
        .btn:active { transform: translateY(0); }
        .btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s;
        }
        .btn:hover::after { left: 150%; }
        .btn:disabled { opacity: 0.75; cursor: not-allowed; transform: none; }

        /* spinner */
        .spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(245,243,255,0.3);
          border-top-color: #f5f3ff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Divider ── */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 28px;
          animation: fadeUp 0.7s 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .divider-line {
          flex: 1; height: 1px;
          background: rgba(255,255,255,0.07);
        }
        .divider span {
          font-size: 0.58rem;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.18);
          text-transform: uppercase;
        }

        /* ── Footer ── */
        .footer-text {
          text-align: center;
          margin-top: 16px;
          font-size: 0.64rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.2);
          animation: fadeUp 0.7s 0.65s cubic-bezier(0.16,1,0.3,1) both;
        }
        .footer-text a {
          color: #a78bfa;
          text-decoration: none;
          transition: opacity 0.2s, text-shadow 0.2s;
        }
        .footer-text a:hover {
          opacity: 0.8;
          text-shadow: 0 0 8px rgba(139,92,246,0.6);
        }

        /* ── Shake ── */
        .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
          10%,90% { transform: translateX(-2px); }
          20%,80% { transform: translateX(4px); }
          30%,50%,70% { transform: translateX(-6px); }
          40%,60% { transform: translateX(6px); }
        }
      `}</style>

      <div className="login-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
        <div className="grain" />

        <div className={`card ${shake ? 'shake' : ''}`}>

          {/* Brand */}
          <div className="brand">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1.5" fill="#a78bfa" stroke="none" />
              </svg>
            </div>
            <span className="app-name">Vault<span>ify</span></span>
            <p className="tagline">Secure access portal</p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler}>
            <div className={`field ${focused === 'email' ? 'active' : ''}`}>
              <label>Email address</label>
              <input
                type="email"
                value={email}
                placeholder="you@example.com"
                required
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
              <div className="field-bar" />
            </div>

            <div className={`field ${focused === 'password' ? 'active' : ''}`}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                placeholder="••••••••••••"
                required
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
              />
              <div className="field-bar" />
            </div>

            <div className="btn-wrap">
              <button className="btn" type="submit" disabled={loading}>
                {loading && <span className="spinner" />}
                {loading ? 'Authenticating' : 'Enter Vault'}
              </button>
            </div>
          </form>

          <div className="divider">
            <div className="divider-line" />
            <span>or</span>
            <div className="divider-line" />
          </div>

          <p className="footer-text">
            No account? <a href="#">Request access</a>
          </p>

        </div>
      </div>
    </>
  )
}

export default Login