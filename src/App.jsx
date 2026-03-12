import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'

const App = () => {
  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, setUserData] = useContext(AuthContext)
  const [transitioning, setTransitioning] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const parsed = JSON.parse(loggedInUser)
      setUser(parsed.role)
      setLoggedInUserData(parsed.data)
    }
  }, [])

  const showToast = (msg, type = 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      setTransitioning(true)
      setTimeout(() => {
        setUser('admin')
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
        setTransitioning(false)
      }, 400)
    } else if (userData) {
      const employee = userData.find((e) => email === e.email && e.password === password)
      if (employee) {
        setTransitioning(true)
        setTimeout(() => {
          setUser('employee')
          setLoggedInUserData(employee)
          localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }))
          setTransitioning(false)
        }, 400)
      } else {
        showToast('Invalid credentials. Please try again.')
      }
    } else {
      showToast('Invalid credentials. Please try again.')
    }
  }

  const handleChangeUser = (val) => {
    setTransitioning(true)
    setTimeout(() => {
      setUser(val)
      setLoggedInUserData(null)
      setTransitioning(false)
    }, 400)
  }

  return (
    <>
      <style>{`
        .app-fade {
          animation: appFadeIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes appFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .app-transitioning {
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
        }

        /* Toast */
        .vt-toast {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%) translateY(0);
          z-index: 9999;
          font-family: 'Fira Code', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          padding: 12px 24px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: toastIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
          white-space: nowrap;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .vt-toast-error {
          background: rgba(15, 10, 10, 0.95);
          border: 1px solid rgba(248,113,113,0.4);
          color: #fca5a5;
          box-shadow: 0 8px 32px rgba(248,113,113,0.15);
        }
        .vt-toast-success {
          background: rgba(10, 15, 12, 0.95);
          border: 1px solid rgba(74,222,128,0.4);
          color: #86efac;
          box-shadow: 0 8px 32px rgba(74,222,128,0.15);
        }
        .vt-toast-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .vt-toast-error .vt-toast-dot  { background: #f87171; box-shadow: 0 0 6px #f87171; }
        .vt-toast-success .vt-toast-dot { background: #4ade80; box-shadow: 0 0 6px #4ade80; }
      `}</style>

      {/* Page content */}
      <div className={transitioning ? 'app-transitioning' : 'app-fade'} key={user}>
        {!user && <Login handleLogin={handleLogin} />}
        {user === 'admin'    && <AdminDashboard    changeUser={handleChangeUser} />}
        {user === 'employee' && <EmployeeDashboard changeUser={handleChangeUser} data={loggedInUserData} />}
      </div>

      {/* Toast notification */}
      {toast && (
        <div className={`vt-toast vt-toast-${toast.type}`}>
          <div className="vt-toast-dot" />
          {toast.msg}
        </div>
      )}
    </>
  )
}

export default App