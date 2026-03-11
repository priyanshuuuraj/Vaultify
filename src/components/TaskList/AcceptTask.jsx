import React, { useState } from 'react'

const AcceptTask = ({ data }) => {
  const [status, setStatus] = useState(null)

  const handle = (type) => {
    setStatus(type)
    setTimeout(() => {
      if (type === 'completing' && data?.onComplete) data.onComplete()
      if (type === 'failing'    && data?.onFail)    data.onFail()
    }, 600)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .at2-card {
          flex-shrink: 0;
          width: 300px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(236,72,153,0.28);
          border-radius: 14px;
          padding: 22px;
          position: relative;
          overflow: hidden;
          font-family: 'IBM Plex Mono', monospace;
          transition: border-color 0.3s, transform 0.25s, box-shadow 0.3s;
          animation: at2In 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .at2-card:hover {
          border-color: rgba(236,72,153,0.52);
          transform: translateY(-3px);
          box-shadow: 0 16px 44px rgba(0,0,0,0.4), 0 0 24px rgba(236,72,153,0.07);
        }
        @keyframes at2In {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .at2-card::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 16px 16px 0 0;
          border-color: #ec4899 transparent transparent transparent;
          opacity: 0.6;
        }
        .at2-card::after {
          content: '';
          position: absolute; top: -50px; right: -50px;
          width: 150px; height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236,72,153,0.13), transparent 70%);
          pointer-events: none;
        }

        .at2-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }

        .at2-category {
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #f9a8d4;
          border: 1px solid rgba(236,72,153,0.4);
          background: rgba(236,72,153,0.1);
          border-radius: 4px;
          padding: 4px 12px;
          font-weight: 500;
        }
        .at2-date { font-size:0.72rem; letter-spacing:0.1em; color:rgba(255,255,255,0.5); }

        .at2-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.22rem;
          font-weight: 700;
          color: #f5f3ff;
          line-height: 1.3;
          margin-bottom: 10px;
          text-shadow: 0 0 22px rgba(236,72,153,0.22);
        }
        .at2-divider { height:1px; background:linear-gradient(90deg, rgba(236,72,153,0.4), rgba(139,92,246,0.2), transparent); margin-bottom:12px; }
        .at2-desc {
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

        .at2-footer { display:flex; align-items:center; justify-content:space-between; gap:8px; }
        .at2-status { display:flex; align-items:center; gap:7px; font-size:0.68rem; letter-spacing:0.16em; text-transform:uppercase; color:#f9a8d4; font-weight:500; }
        .at2-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
          background: #f472b6;
          box-shadow: 0 0 8px #f472b6, 0 0 16px rgba(236,72,153,0.5);
          animation: at2Pulse 2s ease infinite;
        }
        @keyframes at2Pulse { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .at2-btns { display:flex; gap:8px; }

        .at2-btn {
          padding: 9px 16px;
          border: 1px solid;
          border-radius: 6px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          background: transparent;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          position: relative; overflow: hidden;
        }
        .at2-btn:hover { transform: translateY(-1px); }
        .at2-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
        .at2-btn::after {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: skewX(-20deg);
          transition: left 0.4s;
        }
        .at2-btn:hover::after { left: 150%; }

        .at2-btn-complete { color:#86efac; border-color:rgba(74,222,128,0.4); background:rgba(74,222,128,0.08); }
        .at2-btn-complete:hover { box-shadow:0 4px 18px rgba(74,222,128,0.22); border-color:rgba(74,222,128,0.65); }

        .at2-btn-fail { color:#fca5a5; border-color:rgba(248,113,113,0.38); background:rgba(248,113,113,0.08); }
        .at2-btn-fail:hover { box-shadow:0 4px 18px rgba(248,113,113,0.2); border-color:rgba(248,113,113,0.65); }
      `}</style>

      <div
        className="at2-card"
        style={
          status === 'completing' ? { borderColor:'rgba(74,222,128,0.5)',  background:'rgba(74,222,128,0.04)'  } :
          status === 'failing'    ? { borderColor:'rgba(248,113,113,0.5)', background:'rgba(248,113,113,0.04)' } :
          {}
        }
      >
        <div className="at2-header">
          <span className="at2-category">{data?.category || 'General'}</span>
          <span className="at2-date">{data?.taskDate}</span>
        </div>
        <div className="at2-title">{data?.taskTitle}</div>
        <div className="at2-divider" />
        <p className="at2-desc">{data?.taskDescription}</p>
        <div className="at2-footer">
          <div className="at2-status">
            <div className="at2-dot" />
            {status === 'completing' ? 'Completing…' : status === 'failing' ? 'Failing…' : 'In Progress'}
          </div>
          <div className="at2-btns">
            <button className="at2-btn at2-btn-complete" onClick={() => handle('completing')} disabled={!!status}>✓ Done</button>
            <button className="at2-btn at2-btn-fail"    onClick={() => handle('failing')}    disabled={!!status}>✕ Fail</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AcceptTask