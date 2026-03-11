import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
  const [userData] = useContext(AuthContext)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        .at-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'IBM Plex Mono', monospace;
        }

        .at-head-row {
          border-bottom: 1px solid rgba(236,72,153,0.2);
        }
        .at-head-row th {
          padding: 10px 16px;
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(249,168,212,0.6);
          font-weight: 400;
          text-align: left;
        }
        .at-head-row th:first-child { color: rgba(255,255,255,0.28); }

        .at-row {
          border-bottom: 1px solid rgba(139,92,246,0.07);
          transition: background 0.2s;
          animation: rowIn 0.4s ease both;
        }
        .at-row:hover { background: rgba(139,92,246,0.05); }
        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .at-row td {
          padding: 12px 16px;
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          color: #ede9fe;
        }

        .at-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .at-avatar {
          width: 28px; height: 28px;
          border-radius: 6px;
          background: rgba(139,92,246,0.12);
          border: 1px solid rgba(139,92,246,0.28);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          color: #c4b5fd;
          font-weight: 600;
          flex-shrink: 0;
          letter-spacing: 0;
          box-shadow: 0 0 8px rgba(139,92,246,0.15);
        }

        .at-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.05em;
        }
        .at-chip-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .at-empty {
          text-align: center;
          padding: 32px;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.15);
        }
      `}</style>

      <table className="at-table">
        <thead>
          <tr className="at-head-row">
            <th>Employee</th>
            <th>New</th>
            <th>Active</th>
            <th>Done</th>
            <th>Failed</th>
          </tr>
        </thead>
        <tbody>
          {userData.length === 0 ? (
            <tr><td colSpan={5} className="at-empty">No employees found</td></tr>
          ) : (
            userData.map((elem, idx) => (
              <tr key={idx} className="at-row" style={{ animationDelay: `${idx * 0.05}s` }}>
                <td>
                  <div className="at-name">
                    <div className="at-avatar">{elem.firstName?.charAt(0).toUpperCase()}</div>
                    {elem.firstName}
                  </div>
                </td>
                <td>
                  <span className="at-chip" style={{ color: '#93c5fd' }}>
                    <span className="at-chip-dot" style={{ background: '#93c5fd', boxShadow: '0 0 5px rgba(147,197,253,0.6)' }} />
                    {elem.taskCounts.newTask}
                  </span>
                </td>
                <td>
                  <span className="at-chip" style={{ color: '#fde68a' }}>
                    <span className="at-chip-dot" style={{ background: '#fde68a', boxShadow: '0 0 5px rgba(253,230,138,0.6)' }} />
                    {elem.taskCounts.active}
                  </span>
                </td>
                <td>
                  <span className="at-chip" style={{ color: '#86efac' }}>
                    <span className="at-chip-dot" style={{ background: '#86efac', boxShadow: '0 0 5px rgba(134,239,172,0.6)' }} />
                    {elem.taskCounts.completed}
                  </span>
                </td>
                <td>
                  <span className="at-chip" style={{ color: '#fca5a5' }}>
                    <span className="at-chip-dot" style={{ background: '#fca5a5', boxShadow: '0 0 5px rgba(252,165,165,0.6)' }} />
                    {elem.taskCounts.failed}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  )
}

export default AllTask