import React from "react";

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const ActivityLog = ({ logs }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md h-full border border-gray-200">
      <h3 className="text-xl font-bold   text-blue-900 mb-4 border-b pb-2">
        Activity Log
      </h3>

      <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar pr-2">
        {logs.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No activity yet.</p>
        ) : (
          logs.map((log, index) => {
            const userName =
              typeof log.user === "object" ? log.user.name : log.user;

            return (
              <div
                key={index}
                className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100 hover:shadow-sm transition"
              >
                {/* Avatar Circle */}
                <div className="w-9 h-9 rounded-full bg-[#115d83ad] text-white flex items-center justify-center font-semibold text-sm">
                  {getInitials(userName)}
                </div>

                {/* Message and Timestamp */}
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-snug">
                    <span className="font-semibold text-[#115d83ad]">
                      {userName}
                    </span>{" "}
               <span className="font-[400] text-gray-500">  {log.action}
                </span>   
                  </p>
                  <p className="text-xs  text-gray-400 mt-1">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
