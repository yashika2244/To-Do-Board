const ConflictModal = ({ conflict, onResolve, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <div className="bg-white max-w-4xl w-full rounded-xl shadow-xl p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-semibold text-red-600 flex items-center gap-2">
          ⚠️ Conflict Detected
        </h3>
        <p className="text-gray-600">
          Two versions of the task exist. Choose which one to keep:
        </p>

        {/* Conflict Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Client Version */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-bold text-gray-700">📝 Your Changes</h4>
            <pre className="text-xs text-gray-800 bg-white p-2 rounded overflow-x-auto border border-gray-200">
              <code>{JSON.stringify(conflict.client, null, 2)}</code>
            </pre>
            <button
              onClick={() => onResolve(conflict.client)}
              className="w-full text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              ✅ Keep My Version
            </button>
          </div>

          {/* Server Version */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-bold text-gray-700">
              ☁️ Server Version
            </h4>
            <pre className="text-xs text-gray-800 bg-white p-2 rounded overflow-x-auto border border-gray-200">
              <code>{JSON.stringify(conflict.server, null, 2)}</code>
            </pre>
            <button
              onClick={() => onResolve(conflict.server)}
              className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              📥 Keep Server Version
            </button>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="text-center">
          <button
            onClick={onCancel}
            className="text-sm mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConflictModal;
