import { Trash2, UserPlus2 } from "lucide-react";
import { FaEdit } from "react-icons/fa";
const TaskCard = ({ task, onSmartAssign, onStatusChange ,onDelete ,onEdit}) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 space-y-2">
      <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-sm">
        <span className="font-medium">Priority:</span> {task.priority}
      </p>
      <p className="text-sm">
        <span className="font-medium">Assigned to:</span>{" "}
        {task.assignedTo?.name || "Unassigned"}
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        <button
          onClick={() => onSmartAssign(task._id)}
          className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full transition"
        >
          Smart Assign
        </button>
         <button
          className="hover:text-blue-600"
          onClick={() => onEdit(task)}
        >
          <FaEdit />
        </button>
          <button
          className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          onClick={() => onDelete(task._id)}
        >
          <Trash2 size={14} className="inline-block mr-1" />
          Delete
        </button>

        {["Todo", "In Progress", "Done"]
          .filter((s) => s !== task.status)
          .map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(task, s)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full transition"
            >
              Move to {s}
            </button>
          ))}
      </div>
    </div>
  );
};

export default TaskCard;
