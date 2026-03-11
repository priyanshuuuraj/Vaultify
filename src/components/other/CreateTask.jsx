import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [asignTo, setAsignTo] = useState('')
  const [category, setCategory] = useState('')
  const [newTask, setNewTask] = useState({})
  const [focused, setFocused] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    setNewTask({ taskTitle, taskDescription, taskDate, category, active: false, newTask: true, failed: false, completed: false })
    const data = userData
    data.forEach((elem) => {
      if (asignTo === elem.firstName) {
        elem.tasks.push(newTask)
        elem.taskCounts.newTask = elem.taskCounts.newTask + 1
      }
    })
    setUserData(data)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
    setTaskTitle(''); setCategory(''); setAsignTo(''); setTaskDate(''); setTaskDescription('')
  }

  const fields = [
    { id: 'title',    label: 'Task Title',  value: taskTitle,  setter: setTaskTitle,  type: 'text', placeholder: 'e.g. Design dashboard UI' },
    { id: 'date',     label: 'Due Date',    value: taskDate,   setter: setTaskDate,   type: 'date', placeholder: '' },
    { id: 'assign',   label: 'Assign To',   value: asignTo,    setter: setAsignTo,    type: 'text', placeholder: 'Employee first name' },
    { id: 'category', label: 'Category',    value: category,   setter: setCategory,   type: 'text', placeholder: 'design, dev, ops…' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        .ct-form {
          display: flex;
          gap: 32px;
          align-items: flex-start;
          width: 100%;
        }
        .ct-left  { flex: 1; display: flex; flex-direction: column; }
        .ct-right { width: 38%; display: flex; flex-direction: column; }

        .ct-field { position: relative; margin-bottom: 18px; }

        .ct-field label {
          display: block;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 8px;
          transition: color 0.3s;
          font-family: 'IBM Plex Mono', monospace;
        }
        .ct-field.ct-active label { color: #c4b5fd; }

        .ct-input {
          width: 100%;
          background: rgba(139,92,246,0.04);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 8px;
          padding: 11px 15px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.82rem;
          color: #ede9fe;
          outline: none;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
          letter-spacing: 0.04em;
        }
        .ct-input::placeholder { color: rgba(255,255,255,0.15); }
        .ct-input:focus {
          border-color: rgba(139,92,246,0.5);
          background: rgba(139,92,246,0.07);
          box-shadow: 0 0 0 3px rgba(139,92,246,0.1);
        }
        .ct-input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.6) sepia(1) saturate(3) hue-rotate(230deg);
          opacity: 0.5;
          cursor: pointer;
        }

        .ct-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 1.5px; width: 0%;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
          border-radius: 0 0 8px 8px;
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 6px rgba(139,92,246,0.5);
        }
        .ct-field.ct-active .ct-bar { width: 100%; }

        .ct-desc-label {
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 8px;
          font-family: 'IBM Plex Mono', monospace;
          transition: color 0.3s;
        }
        .ct-desc-label.ct-active { color: #f9a8d4; }

        .ct-textarea {
          width: 100%;
          height: 168px;
          background: rgba(236,72,153,0.03);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 8px;
          padding: 12px 16px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.82rem;
          color: #ede9fe;
          outline: none;
          resize: none;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
          letter-spacing: 0.03em;
          line-height: 1.75;
        }
        .ct-textarea::placeholder { color: rgba(255,255,255,0.15); }
        .ct-textarea:focus {
          border-color: rgba(236,72,153,0.45);
          background: rgba(236,72,153,0.05);
          box-shadow: 0 0 0 3px rgba(236,72,153,0.09);
        }

        .ct-submit {
          margin-top: 14px;
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%);
          border: none;
          border-radius: 8px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #f5f3ff;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.3s;
          box-shadow: 0 4px 20px rgba(139,92,246,0.3);
        }
        .ct-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(139,92,246,0.45);
        }
        .ct-submit:active { transform: translateY(0); }
        .ct-submit.ct-done {
          background: linear-gradient(135deg, #ec4899, #be185d);
          box-shadow: 0 6px 20px rgba(236,72,153,0.3);
        }
        .ct-submit::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s;
        }
        .ct-submit:hover::after { left: 150%; }
      `}</style>

      <form onSubmit={submitHandler} className="ct-form">
        <div className="ct-left">
          {fields.map(f => (
            <div key={f.id} className={`ct-field ${focused === f.id ? 'ct-active' : ''}`}>
              <label>{f.label}</label>
              <input
                className="ct-input"
                type={f.type}
                value={f.value}
                placeholder={f.placeholder}
                required
                onChange={e => f.setter(e.target.value)}
                onFocus={() => setFocused(f.id)}
                onBlur={() => setFocused(null)}
              />
              <div className="ct-bar" />
            </div>
          ))}
        </div>

        <div className="ct-right">
          <div className={`ct-desc-label ${focused === 'desc' ? 'ct-active' : ''}`}>Description</div>
          <textarea
            className="ct-textarea"
            value={taskDescription}
            placeholder="Describe the task in detail…"
            required
            onChange={e => setTaskDescription(e.target.value)}
            onFocus={() => setFocused('desc')}
            onBlur={() => setFocused(null)}
          />
          <button type="submit" className={`ct-submit ${submitted ? 'ct-done' : ''}`}>
            {submitted ? '✓ Task Created' : 'Deploy Task'}
          </button>
        </div>
      </form>
    </>
  )
}

export default CreateTask