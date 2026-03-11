import React, { useState } from 'react'

const NewTask = ({ data }) => {
  const [accepting, setAccepting] = useState(false)

  const handleAccept = () => {
    setAccepting(true)
    setTimeout(() => { if (data?.onAccept) data.onAccept() }, 600)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .nt-card {
          flex-shrink: 0;
          width: 300px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(139,92,246,0.28);
          border-radius: 14px;
          padding: 22px;
          position: relative;
          overflow: hidden;
          font-family: 'IBM Plex Mono', monospace;
          transition: border-color 0.3s, transform 0.25s, box-shadow 0.3s;
          animation: ntIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .nt-card:hover {
          border-color: rgba(139,92,246,0.55);
          transform: translateY(-3px);
          box-shadow: 0 16px 44px rgba(0,0,0,0.4), 0 0 24px rgba(139,92,246,0.08);
        }
        @keyframes ntIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nt-card::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 16px 16px 0 0;
          border-color: #8b5cf6 transparent transparent transparent;
          opacity: 0.6;
        }
        .nt-card::after {
          content: '';
          position: absolute; top: -50px; right: -50px;
          width: 150px; height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.14), transparent 70%);
          pointer-events: none;
        }

        .nt-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }

        .nt-category {
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c4b5fd;
          border: 1px solid rgba(139,92,246,0.4);
          background: rgba(139,92,246,0.12);
          border-radius: 4px;
          padding: 4px 12px;
          font-weight: 500;
        }
        .nt-date { font-size:0.72rem; letter-spacing:0.1em; color:rgba(255,255,255,0.5); }

        .nt-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.22rem;
          font-weight: 700;
          color: #f5f3ff;
          line-height: 1.3;
          margin-bottom: 10px;
          text-shadow: 0 0 22px rgba(139,92,246,0.25);
        }
        .nt-divider { height:1px; background:linear-gradient(90deg, rgba(139,92,246,0.4), rgba(236,72,153,0.2), transparent); margin-bottom:12px; }
        .nt-desc {
          font-size: 0.82rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.02em;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .nt-footer { display:flex; align-items:center; justify-content:space-between; gap:8px; }
        .nt-status { display:flex; align-items:center; gap:7px; font-size:0.68rem; letter-spacing:0.16em; text-transform:uppercase; color:#c4b5fd; font-weight:500; }
        .nt-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
          background: #a78bfa;
          box-shadow: 0 0 8px #a78bfa, 0 0 16px rgba(139,92,246,0.5);
          animation: ntPulse 2s ease infinite;
        }
        @keyframes ntPulse { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .nt-btn {
          padding: 9px 16px;
          border: 1px solid rgba(139,92,246,0.4);
          border-radius: 6px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #c4b5fd;
          background: rgba(139,92,246,0.1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .nt-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(139,92,246,0.3);
          border-color: rgba(139,92,246,0.65);
        }
        .nt-btn:active { transform: translateY(0); }
        .nt-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
        .nt-btn::after {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: skewX(-20deg);
          transition: left 0.4s;
        }
        .nt-btn:hover::after { left: 150%; }
      `}</style>

      <div className="nt-card">
        <div className="nt-header">
          <span className="nt-category">{data?.category || 'General'}</span>
          <span className="nt-date">{data?.taskDate}</span>
        </div>
        <div className="nt-title">{data?.taskTitle}</div>
        <div className="nt-divider" />
        <p className="nt-desc">{data?.taskDescription}</p>
        <div className="nt-footer">
          <div className="nt-status">
            <div className="nt-dot" />
            {accepting ? 'Accepting…' : 'Awaiting'}
          </div>
          <button className="nt-btn" onClick={handleAccept} disabled={accepting}>
            Accept Task
          </button>
        </div>
      </div>
    </>
  )
}

export default NewTask