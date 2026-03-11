import React, { useState, useEffect } from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = (props) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(tick)
  }, [])

  const pad = n => String(n).padStart(2, '0')
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const employeeName = props.data?.firstName || 'Operator'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        .emp-root {
          min-height: 100vh;
          width: 100%;
          background: #07080f;
          font-family: 'IBM Plex Mono', monospace;
          color: #ede9fe;
          position: relative;
          overflow-x: hidden;
        }

        /* ── Ambient glows — violet + rose ── */
        .emp-glow-tl {
          position: fixed;
          top: -140px; left: -140px;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .emp-glow-br {
          position: fixed;
          bottom: -120px; right: -120px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236,72,153,0.14), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .emp-glow-mid {
          position: fixed;
          top: 40%; right: -80px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Dot grid ── */
        .emp-grid {
          position: fixed;
          inset: 0;
          background-image: radial-gradient(rgba(139,92,246,0.07) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Side rails — violet ── */
        .emp-rail {
          position: fixed;
          top: 0; left: 0;
          width: 3px; height: 100vh;
          background: linear-gradient(180deg, transparent 0%, #8b5cf6 30%, #8b5cf6 70%, transparent 100%);
          opacity: 0.9;
          z-index: 10;
          box-shadow: 2px 0 14px rgba(139,92,246,0.4);
        }
        .emp-rail-right {
          left: auto; right: 0;
          opacity: 0.25;
          box-shadow: -2px 0 14px rgba(139,92,246,0.15);
        }

        /* ── Status bar ── */
        .emp-statusbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 36px 12px 44px;
          border-bottom: 1px solid rgba(139,92,246,0.2);
          background: rgba(139,92,246,0.05);
          position: relative;
          z-index: 5;
          animation: slideDown 0.5s ease both;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .emp-statusbar-left {
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
          background: #a78bfa;
          box-shadow: 0 0 8px #a78bfa, 0 0 18px rgba(139,92,246,0.6);
          animation: pulse-dot 2s ease infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        .emp-clock {
          font-size: 0.88rem;
          color: #a78bfa;
          letter-spacing: 0.12em;
          font-weight: 500;
          text-shadow: 0 0 14px rgba(139,92,246,0.7);
        }
        .emp-date {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
        }

        .emp-badge {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c4b5fd;
          border: 1px solid rgba(139,92,246,0.5);
          padding: 4px 14px;
          border-radius: 4px;
          background: rgba(139,92,246,0.1);
          text-shadow: 0 0 8px rgba(139,92,246,0.6);
          box-shadow: 0 0 14px rgba(139,92,246,0.12), inset 0 0 8px rgba(139,92,246,0.06);
        }

        /* ── Body ── */
        .emp-body {
          padding: 0 36px 48px 44px;
          position: relative;
          z-index: 2;
        }

        /* ── Greeting ── */
        .emp-greeting {
          padding: 32px 0 24px;
          border-bottom: 1px solid rgba(139,92,246,0.1);
          margin-bottom: 32px;
          animation: fadeUp 0.6s 0.1s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .emp-greeting-label {
          font-size: 0.72rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          text-shadow: 0 0 10px rgba(139,92,246,0.6);
        }
        .emp-greeting-label::before {
          content: '';
          display: block;
          width: 24px; height: 1px;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
          box-shadow: 0 0 8px rgba(139,92,246,0.8);
        }

        .emp-greeting-name {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #f5f3ff;
          line-height: 1.1;
          text-shadow: 0 0 30px rgba(139,92,246,0.2);
        }
        .emp-greeting-name span {
          color: #a78bfa;
          text-shadow: 0 0 22px rgba(139,92,246,0.6);
        }

        /* ── Sections ── */
        .emp-section { animation: fadeUp 0.6s ease both; }
        .emp-section:nth-child(2) { animation-delay: 0.2s; }
        .emp-section:nth-child(3) { animation-delay: 0.3s; }
        .emp-section:nth-child(4) { animation-delay: 0.4s; }

        .section-label {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.72rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 18px;
          text-shadow: 0 0 10px rgba(139,92,246,0.5);
        }
        .section-label::before {
          content: '';
          display: block;
          width: 24px; height: 1px;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
          box-shadow: 0 0 6px rgba(139,92,246,0.8);
        }
        .section-label-num {
          color: rgba(255,255,255,0.25);
          margin-left: 4px;
          font-size: 0.65rem;
        }

        /* ── Stats panel ── */
        .emp-stats-panel {
          background: rgba(139,92,246,0.04);
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 12px;
          padding: 28px 32px;
          position: relative;
          margin-bottom: 32px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .emp-stats-panel:hover {
          border-color: rgba(139,92,246,0.38);
          box-shadow: 0 0 36px rgba(139,92,246,0.08);
        }
        .emp-stats-panel::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 18px 18px 0 0;
          border-color: #8b5cf6 transparent transparent transparent;
          opacity: 0.7;
        }

        /* ── Task list panel ── */
        .emp-tasks-panel {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 12px;
          padding: 28px 32px;
          position: relative;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .emp-tasks-panel:hover {
          border-color: rgba(139,92,246,0.3);
          box-shadow: 0 0 28px rgba(139,92,246,0.06);
        }
        .emp-tasks-panel::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 18px 18px 0 0;
          border-color: #8b5cf6 transparent transparent transparent;
          opacity: 0.6;
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
          box-shadow: 2px 2px 8px rgba(139,92,246,0.25);
        }

        /* ── Divider ── */
        .emp-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 4px 0 24px;
        }
        .emp-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(139,92,246,0.4), transparent);
        }
        .emp-divider-line-r {
          background: linear-gradient(90deg, transparent, rgba(236,72,153,0.3));
        }
        .emp-divider-text {
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          color: rgba(167,139,250,0.7);
          text-transform: uppercase;
          text-shadow: 0 0 8px rgba(139,92,246,0.5);
        }

        /* ── Footer ── */
        .emp-footer {
          display: flex;
          align-items: center;
          gap: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(139,92,246,0.1);
          margin-top: 8px;
        }
        .emp-footer-item {
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
        }
        .emp-footer-item span {
          color: rgba(167,139,250,0.8);
          margin-right: 8px;
          text-shadow: 0 0 6px rgba(139,92,246,0.5);
        }
      `}</style>

      <div className="emp-root">
        <div className="emp-glow-tl" />
        <div className="emp-glow-br" />
        <div className="emp-glow-mid" />
        <div className="emp-grid" />

        <div className="emp-rail" />
        <div className="emp-rail emp-rail-right" />

        {/* Status bar */}
        <div className="emp-statusbar">
          <div className="emp-statusbar-left">
            <div className="status-dot">Session active</div>
            <div className="emp-date">{dateStr}</div>
          </div>
          <div className="emp-clock">{timeStr}</div>
          <div className="emp-badge">Employee Portal</div>
        </div>

        <div className="emp-body">

          {/* Greeting + Header */}
          <div className="emp-greeting emp-section">
            <div className="emp-greeting-label">// 01 &nbsp; Operator Station</div>
            <div className="emp-greeting-name">
              Welcome back, <span>{employeeName}</span>
            </div>
            <div style={{ marginTop: '22px' }}>
              <Header changeUser={props.changeUser} data={props.data} />
            </div>
          </div>

          {/* Task Stats */}
          <div className="emp-section">
            <div className="section-label">
              Task Overview <span className="section-label-num">// 02</span>
            </div>
            <div className="emp-stats-panel">
              <div className="corner-tl" /><div className="corner-br" />
              <TaskListNumbers data={props.data} />
            </div>
          </div>

          {/* Task List */}
          <div className="emp-section">
            <div className="section-label">
              Assigned Tasks <span className="section-label-num">// 03</span>
            </div>
            <div className="emp-divider">
              <div className="emp-divider-line" />
              <div className="emp-divider-text">Active Queue</div>
              <div className="emp-divider-line emp-divider-line-r" />
            </div>
            <div className="emp-tasks-panel">
              <div className="corner-tl" /><div className="corner-br" />
              <TaskList data={props.data} />
            </div>
          </div>

          {/* Footer */}
          <div className="emp-footer">
            <div className="emp-footer-item"><span>SYS</span>Vaultify Portal v2.1</div>
            <div className="emp-footer-item"><span>ENV</span>Production</div>
            <div className="emp-footer-item"><span>AUTH</span>Level 2 Clearance</div>
          </div>

        </div>
      </div>
    </>
  )
}

export default EmployeeDashboard