import { useQuery,useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { getTodos } from "../endpoints/endpoints";

function Todos() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h1>Loading todos...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>Error Loading Todos</h1>
        <p>{error.message}</p>
        <button onClick={() => refetch()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  // Filter todos based on completion status
  const filteredTodos = data?.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  // Search functionality
  const searchedTodos = filteredTodos?.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: data?.length || 0,
    completed: data?.filter((t) => t.completed).length || 0,
    pending: data?.filter((t) => !t.completed).length || 0,
  };

  return (
    <div className="todos-container">
      <div className="header">
        <h1>📝 Todo List</h1>
        <p>Manage your tasks efficiently</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Total Tasks</h3>
            <p>{stats.total}</p>
          </div>
        </div>
        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Completed</h3>
            <p>{stats.completed}</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>Pending</h3>
            <p>{stats.pending}</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="todo-list">
        {searchedTodos?.length === 0 ? (
          <div className="no-results">
            <p>No todos found</p>
          </div>
        ) : (
          searchedTodos?.map((todo) => (
            <div key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
              <div className="todo-header">
                <div className="todo-id">#{todo.id}</div>
                <div className={`todo-status ${todo.completed ? "completed" : "pending"}`}>
                  {todo.completed ? "✓ Completed" : "○ Pending"}
                </div>
              </div>
              <div className="todo-content">
                <h3>{todo.title}</h3>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Refresh Button */}
      <button onClick={() => refetch()} className="refresh-btn">
        🔄 Refresh Todos
      </button>

      <style >{`
        .todos-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .header h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 10px;
        }

        .header p {
          color: #666;
          font-size: 1.1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          font-size: 2.5rem;
        }

        .stat-info h3 {
          margin: 0;
          font-size: 0.9rem;
          color: #666;
        }

        .stat-info p {
          margin: 5px 0 0;
          font-size: 1.8rem;
          font-weight: bold;
          color: #333;
        }

        .controls {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .filter-buttons {
          display: flex;
          gap: 10px;
        }

        .filter-buttons button {
          padding: 10px 20px;
          border: none;
          background: #f0f0f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .filter-buttons button:hover {
          background: #e0e0e0;
        }

        .filter-buttons button.active {
          background: #667eea;
          color: white;
        }

        .todo-list {
          display: grid;
          gap: 15px;
          margin-bottom: 30px;
        }

        .todo-item {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .todo-item:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .todo-item.completed {
          background: #f8f9fa;
          opacity: 0.8;
        }

        .todo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .todo-id {
          background: #f0f0f0;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
          color: #666;
        }

        .todo-status {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .todo-status.completed {
          background: #d4edda;
          color: #155724;
        }

        .todo-status.pending {
          background: #fff3cd;
          color: #856404;
        }

        .todo-content h3 {
          margin: 0;
          color: #333;
          font-size: 1.1rem;
        }

        .todo-item.completed .todo-content h3 {
          text-decoration: line-through;
          color: #999;
        }

        .refresh-btn {
          width: 100%;
          padding: 12px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s;
        }

        .refresh-btn:hover {
          background: #5a67d8;
        }

        .loading-container {
          text-align: center;
          padding: 50px;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-container {
          text-align: center;
          padding: 50px;
          background: #f8d7da;
          border-radius: 12px;
          color: #721c24;
        }

        .retry-btn {
          margin-top: 20px;
          padding: 10px 20px;
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .no-results {
          text-align: center;
          padding: 50px;
          color: #666;
        }

        @media (max-width: 768px) {
          .controls {
            flex-direction: column;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Todos;