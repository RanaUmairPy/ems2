import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Replace with the correct URL for fetching tasks assigned to the logged-in user
        const response = await axios.get("http://127.0.0.1:8000/api/task/", {
          withCredentials: true,  // Ensure the session cookies are sent
        });
        setTasks(response.data);
      } catch (err) {
        setError("Failed to fetch tasks.");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Employee Dashboard</h1>
      {error && <p>{error}</p>}
      <h2>Your Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Description</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.task_title}</td>
                <td>{task.task_des}</td>
                <td>{task.task_type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No tasks assigned.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;
