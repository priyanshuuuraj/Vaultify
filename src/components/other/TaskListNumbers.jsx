import React from 'react'

const TaskListNumbers = ({ data }) => {
  const stats = [
    {
      key: 'newTask',
      label: 'New',
      sublabel: 'Unassigned',
      value: data.taskCounts.newTask,
      color: '#93c5fd',
      bg: 'rgba(147,197,253,0.06)',
      border: 'rgba(147,197,253,0.18)',
      glow: 'rgba(147,197,253,0.3)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      )
    },
    {
      key: 'active',
      label: 'Active',
      sublabel: 'In Progress',
      value: data.taskCounts.active,
      color: '#fde68a',
      bg: 'rgba(253,230,138,0.06)',
      border: 'rgba(253,230,138,0.18)',
      glow: 'rgba(253,230,138,0.3)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 2 13 9 20 9"/><path d="M3 15a9 9 0 1 0 9-9"/>
        </svg>
      )
    },
    {
      key: 'completed',
      label: 'Done',
      sublabel: 'Completed',
      value: data.taskCounts.completed,
      color: '#86efac',
      bg: 'rgba(134,239,172,0.06)',
      border: 'rgba(134,239,172,0.18)',
      glow: 'rgba(134,239,172,0.3)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      )
    },
    {
      key: 'failed',
      label: 'Failed',
      sublabel: 'Requires Review',
      value: data.taskCounts.failed,
      color: '#fca5a5',
      bg: 'rgba(252,165,165,0.06)',
      border: 'rgba(252,165,165,0.18)',
      glow: 'rgba(252,165,165,0.3)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      )
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        .tln-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          font-family: 'IBM Plex Mono', monospace;
        }
        @media (max-width: 768px) {
          .tln-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .tln-card {
          border-radius: 10px;
          padding: 20px 22px;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.25s;
          animation: cardPop 0.5s ease both;
        }
        .tln-card:hover { transform: translateY(-3px); }

        @keyframes cardPop {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tln-card:nth-child(1) { animation-delay: 0.05s; }
        .tln-card:nth-child(2) { animation-delay: 0.10s; }
        .tln-card:nth-child(3) { animation-delay: 0.15s; }
        .tln-card:nth-child(4) { animation-delay: 0.20s; }

        /* corner notch */
        .tln-card::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 0 20px 20px 0;
          opacity: 0.35;
        }

        /* ambient blob */
        .tln-blob {
          position: absolute;
          bottom: -18px; right: -18px;
          width: 72px; height: 72px;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(16px);
          pointer-events: none;
        }

        .tln-icon {
          width: 20px; height: 20px;
          margin-bottom: 14px;
          opacity: 0.85;
        }

        .tln-value {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
        }

        .tln-label {
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.55;
          margin-bottom: 2px;
        }

        .tln-sublabel {
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.3;
        }
      `}</style>

      <div className="tln-grid">
        {stats.map((s) => (
          <div
            key={s.key}
            className="tln-card"
            style={{
              background: s.bg,
              border: `1px solid ${s.border}`,
              color: s.color,
            }}
          >
            {/* corner notch inherits border-color via inline */}
            <style>{`.tln-card-${s.key}::before { border-color: transparent ${s.color} transparent transparent; }`}</style>
            <div className="tln-blob" style={{ background: s.color }} />
            <div className="tln-icon" style={{ color: s.color }}>{s.icon}</div>
            <div className="tln-value">{s.value}</div>
            <div className="tln-label">{s.label}</div>
            <div className="tln-sublabel">{s.sublabel}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TaskListNumbers