import React from 'react'

const CompleteTask = ({ data }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .cpt-card {
          flex-shrink: 0;
          width: 300px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(74,222,128,0.25);
          border-radius: 14px;
          padding: 22px;
          position: relative;
          overflow: hidden;
          font-family: 'IBM Plex Mono', monospace;
          transition: border-color 0.3s, transform 0.25s, box-shadow 0.3s;
          animation: cptIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .cpt-card:hover {
          border-color: rgba(74,222,128,0.5);
          transform: translateY(-3px);
          box-shadow: 0 16px 44px rgba(0,0,0,0.4), 0 0 24px rgba(74,222,128,0.06);
        }
        @keyframes cptIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cpt-card::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 16px 16px 0 0;
          border-color: #4ade80 transparent transparent transparent;
          opacity: 0.55;
        }
        .cpt-card::after {
          content: '';
          position: absolute; top: -50px; right: -50px;
          width: 150px; height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(74,222,128,0.12), transparent 70%);
          pointer-events: none;
        }

        .cpt-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }

        .cpt-category {
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #86efac;
          border: 1px solid rgba(74,222,128,0.4);
          background: rgba(74,222,128,0.1);
          border-radius: 4px;
          padding: 4px 12px;
          font-weight: 500;
        }
        .cpt-date { font-size:0.72rem; letter-spacing:0.1em; color:rgba(255,255,255,0.5); }

        .cpt-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.22rem;
          font-weight: 700;
          color: #f5f3ff;
          line-height: 1.3;
          margin-bottom: 10px;
          text-shadow: 0 0 22px rgba(74,222,128,0.18);
        }
        .cpt-divider { height:1px; background:linear-gradient(90deg, rgba(74,222,128,0.35), rgba(139,92,246,0.15), transparent); margin-bottom:12px; }
        .cpt-desc {
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

        .cpt-footer { display:flex; align-items:center; justify-content:space-between; gap:8px; }
        .cpt-status { display:flex; align-items:center; gap:7px; font-size:0.68rem; letter-spacing:0.16em; text-transform:uppercase; color:#86efac; font-weight:500; }
        .cpt-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
          background: #4ade80;
          box-shadow: 0 0 8px #4ade80, 0 0 16px rgba(74,222,128,0.4);
        }

        .cpt-btn {
          padding: 9px 16px;
          border: 1px solid rgba(74,222,128,0.35);
          border-radius: 6px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #86efac;
          background: rgba(74,222,128,0.08);
          cursor: default;
          opacity: 0.85;
        }
      `}</style>

      <div className="cpt-card">
        <div className="cpt-header">
          <span className="cpt-category">{data?.category || 'General'}</span>
          <span className="cpt-date">{data?.taskDate}</span>
        </div>
        <div className="cpt-title">{data?.taskTitle}</div>
        <div className="cpt-divider" />
        <p className="cpt-desc">{data?.taskDescription}</p>
        <div className="cpt-footer">
          <div className="cpt-status">
            <div className="cpt-dot" />
            Completed
          </div>
          <button className="cpt-btn" disabled>✓ Done</button>
        </div>
      </div>
    </>
  )
}

export default CompleteTask