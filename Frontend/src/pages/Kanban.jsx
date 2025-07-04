import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";
import ActivityLog from "../components/ActivityLog";
import ConflictModal from "../components/ConflictModel";
import Navbar from "../components/Navbar";
import { io } from "socket.io-client";
import AddTaskModal from "../components/AddTaskModel";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const socket = io(BASE_URL);

const Kanban = () => {
  const { user, token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [conflict, setConflict] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const fetchTasks = async () => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTasks(data);
  };

  const fetchLogs = async () => {
    const res = await fetch(`${BASE_URL}/api/tasks/logs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setLogs(data);
  };

  useEffect(() => {
    fetchTasks();
    fetchLogs();

    const updateAll = () => {
      fetchTasks();
      fetchLogs();
    };

    socket.on("task:created", updateAll);
    socket.on("task:updated", updateAll);
    socket.on("task:deleted", updateAll);

    return () => {
      socket.off("task:created", updateAll);
      socket.off("task:updated", updateAll);
      socket.off("task:deleted", updateAll);
    };
  }, []);

  const handleSmartAssign = async (taskId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/tasks/smart-assign/${taskId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Smart assignment failed");

      toast.success("🤖 Task smart assigned");
      fetchTasks();
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    const tempTasks = tasks.map((t) =>
      t._id === task._id ? { ...t, status: newStatus } : t
    );
    setTasks(tempTasks);

    const updatedTask = {
      ...task,
      status: newStatus,
      lastUpdated: task.lastUpdated,
    };

    const res = await fetch(`${BASE_URL}/api/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTask),
    });

    if (res.status === 409) {
      const serverData = await res.json();
      setConflict({ client: updatedTask, server: serverData.serverTask });

      fetchTasks();
    }
  };

  const resolveConflict = async (finalTask) => {
    await fetch(`${BASE_URL}/api/tasks/${finalTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(finalTask),
    });
    setConflict(null);
    fetchTasks();
  };

  const handleCreateTask = async (formData) => {
    try {
      const res = await fetch(`${BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create task");
      setShowModal(false);
      toast.success("✅ Task created successfully!");
      fetchTasks();
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete task");
      toast.success("🗑️ Task deleted");
      fetchTasks();
      fetchLogs();
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const res = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update task");
      toast.success("✏️ Task updated");
      setEditingTask(null);
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  const statuses = ["Todo", "In Progress", "Done"];

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#1f2937]">
      <Navbar />

      {/* Header */}
      <div className="px-4 py-6 md:px-10 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
        <h2 className="text-xl sm:text-2xl font-semibold px-4 py-2 rounded-xl bg-white shadow text-[#1f2937] border border-gray-200">
          🗂️ Kanban Dashboard
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
        >
          <FaPlus className="text-sm" />
          Add Task
        </button>
      </div>

      {/* Kanban Columns */}
      <div className="px-4 md:py-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {statuses.map((status) => {
          const filteredTasks = tasks.filter((task) => task.status === status);

          return (
            <div
              key={status}
              className="flex-1 bg-white rounded-xl p-4 shadow-md border border-gray-200"
            >
              <h3 className="text-xl font-bold text-[#1a4079] mb-4 border-b pb-2">
                {status}
              </h3>

              {filteredTasks.length === 0 ? (
                <div className="text-gray-400 text-sm text-center py-6">
                  No tasks in {status}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onSmartAssign={handleSmartAssign}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDeleteTask}
                      onEdit={(task) => {
                        setEditingTask(task);
                        setShowModal(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Activity Log */}
        <div className="w-full md:w-72 self-stretch">
          <ActivityLog logs={logs} />
        </div>
      </div>

      {/* Conflict Modal */}
      {conflict && (
        <ConflictModal
          conflict={conflict}
          onResolve={resolveConflict}
          onCancel={() => setConflict(null)}
        />
      )}

      {/* Task Modal */}
      <AddTaskModal
        isOpen={showModal}
        onClose={() => {
          setEditingTask(null);
          setShowModal(false);
        }}
        onCreate={handleCreateTask}
        onUpdate={handleUpdateTask}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Kanban;
