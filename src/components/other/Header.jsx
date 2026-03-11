import React from 'react'

const Header = ({ changeUser, data }) => {
  const logOutUser = () => {
    localStorage.removeItem('loggedInUser')
    changeUser(null)
  }

  const isAdmin = !data?.firstName
  const name = data?.firstName || 'Admin'
  const accentColor = isAdmin ? '#f9a8d4' : '#c4b5fd'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        .hdr-root {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          font-family: 'IBM Plex Mono', monospace;
        }

        .hdr-eyebrow {
          font-size: 0.62rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-bottom: 8px;
          font-family: 'IBM Plex Mono', monospace;
        }

        .hdr-name {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #f5f3ff;
          line-height: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          text-shadow: 0 0 30px rgba(139,92,246,0.2);
        }

        .hdr-wave {
          display: inline-block;
          animation: wave 2.5s ease-in-out infinite;
          transform-origin: 70% 70%;
          font-style: normal;
        }
        @keyframes wave {
          0%, 60%, 100% { transform: rotate(0deg); }
          10%, 30%       { transform: rotate(18deg); }
          20%            { transform: rotate(-8deg); }
          40%            { transform: rotate(12deg); }
          50%            { transform: rotate(-4deg); }
        }

        .hdr-logout {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(236,72,153,0.07);
          border: 1px solid rgba(236,72,153,0.25);
          border-radius: 8px;
          padding: 11px 22px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #f9a8d4;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .hdr-logout:hover {
          background: rgba(236,72,153,0.13);
          border-color: rgba(236,72,153,0.45);
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(236,72,153,0.18);
        }
        .hdr-logout:active { transform: translateY(0); }

        .hdr-logout-icon {
          width: 15px; height: 15px;
          stroke: #f9a8d4;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          flex-shrink: 0;
        }
      `}</style>

      <div className="hdr-root">
        <div>
          <div className="hdr-eyebrow" style={{ color: accentColor }}>
            // {isAdmin ? 'Admin Console' : 'Operator Station'}
          </div>
          <div className="hdr-name">
            Hello, {name}
            <span className="hdr-wave">👋</span>
          </div>
        </div>

        <button className="hdr-logout" onClick={logOutUser}>
          <svg className="hdr-logout-icon" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>
    </>
  )
}

export default Header