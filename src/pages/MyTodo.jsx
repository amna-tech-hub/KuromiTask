import { useQuery } from "@tanstack/react-query"
import { getTodos } from "../endpoints/endpoints"
import { useState } from "react"
import User from "./User"

export const MyTodo = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterdata, setfilterdata] = useState("all")

  // Note: Fixed the capital 'L' in isLoading
  const { data, isLoading, error } = useQuery({
    queryKey: ['mytodo'],
    queryFn: getTodos
  })

  // 1. Fixed the filter statements to return properly
  const filterditems = data?.filter(item => {
    if (filterdata === 'completed') return item.completed
    if (filterdata === 'pending') return !item.completed
    return true // This handles "all"
  })

  // 2. Kept case-insensitive search logic
  const searchitem = filterditems?.filter((item) =>
    item.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  )

  // 3. Simplified states counting to optimize performance
  const totalTodos = data?.length || 0
  const completedTodos = data?.filter(item => item.completed).length || 0
  const pendingTodos = totalTodos - completedTodos

  // Handle loading/error states safely so it doesn't try to render data early
  if (isLoading) return <div style={{ textAlign: 'center', padding: '20px', color: 'purple' }}>Loading todos...</div>
  if (error) return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Something went wrong.</div>

  return (
    <>
      <div className="todo-container">
        <h1>My TODOS</h1>
        <h1><User/></h1>
        
        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-box total">
            <span>Total</span>
            <div className="stat-number">{totalTodos}</div>
          </div>
          <div className="stat-box completed">
            <span>Completed</span>
            <div className="stat-number">{completedTodos}</div>
          </div>
          <div className="stat-box pending">
            <span>Pending</span>
            <div className="stat-number">{pendingTodos}</div>
          </div>
        </div>

        {/* Search & Filter Panel */}
        <div id="inputsearchflex">
          <input 
            type="text" 
            placeholder="Search todos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="button-group">
            <button 
              className={filterdata === 'all' ? 'active' : ''} 
              onClick={() => setfilterdata("all")}
            >
              All
            </button>
            <button 
              className={filterdata === 'completed' ? 'active' : ''} 
              onClick={() => setfilterdata("completed")}
            >
              Completed
            </button>
            <button 
              className={filterdata === 'pending' ? 'active' : ''} 
              onClick={() => setfilterdata("pending")}
            >
              Pending
            </button>
          </div>
        </div>

        {/* Todo List Area */}
        <div className="todo-list">
          {searchitem && searchitem.length > 0 ? (
            searchitem.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'is-completed' : ''}`}>
                <p>{todo.title}</p>
                <span className="status-badge">
                  {todo.completed ? 'Done' : 'Pending'}
                </span>
              </div>
            ))
          ) : (
            <div className="no-data">No todos found matching those criteria.</div>
          )}
        </div>
      </div>

      {/* Your CSS Stylesheet Block */}
      <style>{`
        /* Global & Container Layout */
        .todo-container {
          max-w-2xl;
          width: 90%;
          margin: 40px auto;
          font-family: sans-serif;
          background-color: #ffffff;
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f3e8ff;
        }

        h1 {
          text-align: center;
          color: #4c1d95; /* Deep Purple */
          margin-bottom: 25px;
        }

        /* Stats Grid Dashboard */
        .stats-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 25px;
          text-align: center;
        }

        .stat-box {
          padding: 12px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: bold;
        }
        .stat-box span {
          display: block;
          margin-bottom: 5px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .stat-number {
          font-size: 22px;
        }
        
        /* Stats Theme Colors */
        .stat-box.total { background-color: #f3e8ff; color: #6b21a8; }
        .stat-box.completed { background-color: #d1fae5; color: #065f46; }
        .stat-box.pending { background-color: #fef3c7; color: #92400e; }

        /* Search & Filter Controls Panel */
        #inputsearchflex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #5b21b6; /* Main Purple background */
          padding: 15px;
          border-radius: 12px;
          gap: 15px;
          margin-bottom: 25px;
        }

        #inputsearchflex input {
          flex: 1;
          padding: 10px 15px;
          border-radius: 8px;
          border: 1px solid #7c3aed;
          background-color: rgba(255, 255, 255, 0.15);
          color: white;
          font-size: 14px;
          outline: none;
        }

        #inputsearchflex input::placeholder {
          color: #ddd6fe;
        }

        #inputsearchflex input:focus {
          background-color: #ffffff;
          color: #000000;
        }

        /* Buttons Grouping */
        .button-group {
          display: flex;
          gap: 8px;
        }

        #inputsearchflex button {
          background: none;
          border: none;
          color: white;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        #inputsearchflex button:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        #inputsearchflex button.active {
          background-color: #ffffff;
          color: #5b21b6;
          font-weight: bold;
        }

        /* Todo List Display and Items */
        .todo-list {
          max-height: 350px;
          overflow-y: auto;
        }

        .todo-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px;
          background-color: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 10px;
          margin-bottom: 10px;
          transition: background-color 0.2s;
        }

        .todo-item:hover {
          background-color: #faf5ff;
        }

        .todo-item p {
          margin: 0;
          color: #334155;
          font-weight: 500;
          font-size: 14px;
        }

        /* Completed Todo Styling variations */
        .todo-item.is-completed p {
          text-decoration: line-through;
          color: #94a3b8;
        }

        /* Status Badge labels */
        .status-badge {
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          padding: 4px 8px;
          border-radius: 20px;
          letter-spacing: 0.5px;
        }
        .todo-item.is-completed .status-badge {
          background-color: #d1fae5;
          color: #065f46;
        }
        .todo-item:not(.is-completed) .status-badge {
          background-color: #fef3c7;
          color: #92400e;
        }

        .no-data {
          text-align: center;
          color: #94a3b8;
          font-size: 14px;
          padding: 20px;
        }
      `}</style>
    </>
  )
}