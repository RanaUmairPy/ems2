import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskType, setTaskType] = useState("");
  const [assignedEmployee, setAssignedEmployee] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/task/");
      setTasks(response.data);
    } catch (error) {
      setErrorMessage("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      task_title: taskTitle,
      task_des: taskDescription,
      task_type: taskType,
      task_assign_to: [parseInt(assignedEmployee)],
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/task/", newTask);
      setSuccessMessage("Task assigned successfully!");
      fetchTasks();
      setTaskTitle("");
      setTaskDescription("");
      setTaskType("");
      setAssignedEmployee("");
    } catch (error) {
      console.error(error); // Log actual error for debugging
      setErrorMessage("Failed to assign task.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {errorMessage && (
        <p className="text-red-500" style={{ color: "red" }}>
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="text-green-500" style={{ color: "green" }}>
          {successMessage}
        </p>
      )}

      <h2>Assign Task</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>Task Title:</label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Task Description:</label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Task Type:</label>
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="IT">IT</option>
            <option value="Non IT">Non IT</option>
          </select>
        </div>
        <div>
          <label>Assign To (Employee ID):</label>
          <input
            type="number"
            value={assignedEmployee}
            onChange={(e) => setAssignedEmployee(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          {loading ? "Assigning..." : "Assign Task"}
        </button>
      </form>

      <h2>Tasks</h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <table border="1" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.task_title}</td>
                <td>{task.task_des}</td>
                <td>{task.task_type}</td>
                <td>{task.task_assign_to.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
