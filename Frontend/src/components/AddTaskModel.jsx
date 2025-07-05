import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const AddTaskModal = ({ isOpen, onClose, onCreate, onUpdate, editingTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        priority: editingTask.priority || "Low",
      });
    } else {
      setFormData({ title: "", description: "", priority: "Low" });
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      onUpdate(editingTask._id, formData);
    } else {
      onCreate(formData);
    }
    setFormData({ title: "", description: "", priority: "Low" });
      onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all">
      <div className="bg-white w-full max-w-lg mx-auto rounded-2xl shadow-2xl p-8 relative animate-fade-in">
        {/* Close Icon */}
        <button
          onClick={() => {
            setFormData({ title: "", description: "", priority: "Low" });
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {editingTask ? "Update Task" : "Create New Task"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {editingTask
            ? "Make changes to your task below."
            : "Add a new task to your Kanban board."}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Write a short description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setFormData({ title: "", description: "", priority: "Low" });
                onClose();
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition font-semibold"
            >
              {editingTask ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
