import React, { useState, useEffect } from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'

const AdminDashboard = (props) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(tick)
  }, [])

  const pad = n => String(n).padStart(2, '0')
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        .adm-root {
          min-height: 100vh;
          width: 100%;
          background: #07080f;
          font-family: 'IBM Plex Mono', monospace;
          color: #ede9fe;
          position: relative;
          overflow-x: hidden;
        }

        /* ── Ambient glows — violet + rose ── */
        .adm-glow-tl {
          position: fixed;
          top: -140px; left: -140px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .adm-glow-br {
          position: fixed;
          bottom: -120px; right: -120px;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236,72,153,0.15), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .adm-glow-mid {
          position: fixed;
          top: 35%; right: -60px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.07), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Dot grid ── */
        .adm-grid {
          position: fixed;
          inset: 0;
          background-image: radial-gradient(rgba(139,92,246,0.07) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Side rails — rose accent for admin ── */
        .adm-rail {
          position: fixed;
          top: 0; left: 0;
          width: 3px; height: 100vh;
          background: linear-gradient(180deg, transparent 0%, #ec4899 30%, #8b5cf6 70%, transparent 100%);
          opacity: 0.9;
          z-index: 10;
          box-shadow: 2px 0 14px rgba(236,72,153,0.4);
        }
        .adm-rail-right {
          left: auto; right: 0;
          background: linear-gradient(180deg, transparent 0%, #8b5cf6 50%, transparent 100%);
          opacity: 0.25;
          box-shadow: -2px 0 14px rgba(139,92,246,0.15);
        }

        /* ── Status bar ── */
        .adm-statusbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 36px 12px 44px;
          border-bottom: 1px solid rgba(236,72,153,0.2);
          background: rgba(236,72,153,0.04);
          position: relative;
          z-index: 5;
          animation: slideDown 0.5s ease both;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .adm-statusbar-left {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .status-dot {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
        }
        .status-dot::before {
          content: '';
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #f472b6;
          box-shadow: 0 0 8px #f472b6, 0 0 18px rgba(236,72,153,0.6);
          animation: pulse-dot 2s ease infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        .adm-clock {
          font-size: 0.88rem;
          color: #f9a8d4;
          letter-spacing: 0.12em;
          font-weight: 500;
          text-shadow: 0 0 14px rgba(236,72,153,0.7);
        }
        .adm-date {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
        }

        .adm-badge {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f9a8d4;
          border: 1px solid rgba(236,72,153,0.5);
          padding: 4px 14px;
          border-radius: 4px;
          background: rgba(236,72,153,0.08);
          text-shadow: 0 0 8px rgba(236,72,153,0.6);
          box-shadow: 0 0 14px rgba(236,72,153,0.12), inset 0 0 8px rgba(236,72,153,0.05);
        }

        /* ── Body ── */
        .adm-body {
          padding: 0 36px 48px 44px;
          position: relative;
          z-index: 2;
        }

        /* ── Header wrap ── */
        .adm-header-wrap {
          padding: 32px 0 28px;
          border-bottom: 1px solid rgba(139,92,246,0.1);
          margin-bottom: 36px;
          animation: fadeUp 0.6s 0.1s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Sections ── */
        .adm-section { animation: fadeUp 0.6s ease both; }
        .adm-section:nth-child(2) { animation-delay: 0.2s; }
        .adm-section:nth-child(3) { animation-delay: 0.35s; }

        .section-label {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.72rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #f9a8d4;
          margin-bottom: 18px;
          text-shadow: 0 0 10px rgba(236,72,153,0.5);
        }
        .section-label::before {
          content: '';
          display: block;
          width: 24px; height: 1px;
          background: linear-gradient(90deg, #ec4899, #8b5cf6);
          box-shadow: 0 0 8px rgba(236,72,153,0.8);
        }
        .section-label-num {
          color: rgba(255,255,255,0.25);
          margin-left: 4px;
          font-size: 0.65rem;
        }

        /* ── Panels ── */
        .adm-panel {
          background: rgba(236,72,153,0.03);
          border: 1px solid rgba(139,92,246,0.18);
          border-radius: 12px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          margin-bottom: 32px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .adm-panel:hover {
          border-color: rgba(139,92,246,0.35);
          box-shadow: 0 0 36px rgba(139,92,246,0.07), inset 0 0 24px rgba(139,92,246,0.02);
        }
        .adm-panel::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 18px 18px 0 0;
          border-color: #ec4899 transparent transparent transparent;
          opacity: 0.65;
        }

        /* ── Divider ── */
        .adm-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 4px 0 28px;
        }
        .adm-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(236,72,153,0.4), transparent);
        }
        .adm-divider-text {
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          color: rgba(249,168,212,0.7);
          text-transform: uppercase;
          text-shadow: 0 0 8px rgba(236,72,153,0.5);
        }

        /* ── Corner brackets ── */
        .corner-tl, .corner-br {
          position: absolute;
          width: 14px; height: 14px;
          border-color: rgba(139,92,246,0.55);
          border-style: solid;
        }
        .corner-tl {
          top: 10px; left: 10px;
          border-width: 1.5px 0 0 1.5px;
          box-shadow: -2px -2px 8px rgba(139,92,246,0.25);
        }
        .corner-br {
          bottom: 10px; right: 10px;
          border-width: 0 1.5px 1.5px 0;
          box-shadow: 2px 2px 8px rgba(236,72,153,0.2);
        }

        /* ── Footer ── */
        .adm-footer {
          display: flex;
          align-items: center;
          gap: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(139,92,246,0.1);
          margin-top: 8px;
        }
        .adm-footer-item {
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
        }
        .adm-footer-item span {
          color: rgba(249,168,212,0.8);
          margin-right: 8px;
          text-shadow: 0 0 6px rgba(236,72,153,0.5);
        }
      `}</style>

      <div className="adm-root">
        <div className="adm-glow-tl" />
        <div className="adm-glow-br" />
        <div className="adm-glow-mid" />
        <div className="adm-grid" />

        <div className="adm-rail" />
        <div className="adm-rail adm-rail-right" />

        {/* Status bar */}
        <div className="adm-statusbar">
          <div className="adm-statusbar-left">
            <div className="status-dot">System online</div>
            <div className="adm-date">{dateStr}</div>
          </div>
          <div className="adm-clock">{timeStr}</div>
          <div className="adm-badge">Admin Console</div>
        </div>

        <div className="adm-body">

          {/* Header */}
          <div className="adm-header-wrap adm-section">
            <div className="section-label">
              Control Panel <span className="section-label-num">// 01</span>
            </div>
            <Header changeUser={props.changeUser} />
          </div>

          {/* Create Task */}
          <div className="adm-section">
            <div className="section-label">
              New Task <span className="section-label-num">// 02</span>
            </div>
            <div className="adm-panel">
              <div className="corner-tl" /><div className="corner-br" />
              <CreateTask />
            </div>
          </div>

          {/* All Tasks */}
          <div className="adm-section">
            <div className="section-label">
              Task Registry <span className="section-label-num">// 03</span>
            </div>
            <div className="adm-divider">
              <div className="adm-divider-line" />
              <div className="adm-divider-text">Active Queue</div>
              <div className="adm-divider-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.35))' }} />
            </div>
            <div className="adm-panel">
              <div className="corner-tl" /><div className="corner-br" />
              <AllTask />
            </div>
          </div>

          {/* Footer */}
          <div className="adm-footer">
            <div className="adm-footer-item"><span>SYS</span>Vaultify Admin v2.1</div>
            <div className="adm-footer-item"><span>ENV</span>Production</div>
            <div className="adm-footer-item"><span>AUTH</span>Level 5 Clearance</div>
          </div>

        </div>
      </div>
    </>
  )
}

export default AdminDashboard