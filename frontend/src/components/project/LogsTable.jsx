import { formatLatency } from "@/utils/Formaters";
import LogsTableShimmer from "./LogsTableShimmer";

const LogsTable = ({ logs, logsloading }) => {

  const methodStyles = {
    GET: "text-green-400 bg-green-500/10",
    POST: "text-blue-400 bg-blue-500/10",
    PUT: "text-yellow-400 bg-yellow-500/10",
    DELETE: "text-red-400 bg-red-500/10",
    PATCH: "text-purple-400 bg-purple-500/10",
  };
  const getStatusStyles = (code) => {
    if (code >= 200 && code < 300) {
      return {
        text: "OK",
        className: "text-green-400 bg-green-500/10",
      };
    } else if (code >= 300 && code < 400) {
      return {
        text: "Redirect",
        className: "text-yellow-400 bg-yellow-500/10",
      };
    } else if (code >= 400 && code < 500) {
      return {
        text: "Client Error",
        className: "text-orange-400 bg-orange-500/10",
      };
    } else if (code >= 500) {
      return {
        text: "Server Error",
        className: "text-red-400 bg-red-500/10",
      };
    } else {
      return {
        text: "Unknown",
        className: "text-gray-400 bg-gray-500/10",
      };
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-[#23104A] text-xs text-gray-400">
          <tr>
            <th className="px-6 py-3">Time</th>
            <th className="px-6 py-3">Method</th>
            <th className="px-6 py-3">Endpoint</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Latency</th>
            <th className="px-6 py-3">IP ADDRESS</th>
          </tr>
        </thead>
        {
          logsloading ? (
            <tbody>
              <LogsTableShimmer />
            </tbody>
          ) : logs?.length > 0 ? (
            <tbody>
              {logs?.map((log) => {
                return (
                  <tr key={log?._id} className={`border-t border-[#6a4dff]/10 hover:bg-[#23104A] ${log.isNew ? "animate-pulse bg-[#2a1b5c]": ""}`}>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {new Date(log.timestamp).toLocaleDateString("en-IN",{
                        day:"2-digit",month:"short", year:"2-digit",hour:"2-digit",minute:"2-digit"
                      })}</td>
                    <td className="px-6 py-3">
                      <span className={` text-sm rounded-md p-1 ${methodStyles[log.method] || "text-gray-400 bg-gray-500/10"}`}>
                        {log?.method || "NA"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[#5B13EC]">{log.endpoint || "NA"}</td>
                    <td className="px-6 py-3">
                      {(() => {
                        const status = getStatusStyles(log.statusCode);
                        return (
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${status.className}`}>
                            {log?.statusCode} {status.text}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-6 text-xs py-3 text-white">
                      {formatLatency(log?.responseTime || "NA")}
                      </td>
                    <td className="px-6 py-3 text-gray-400 text-sm">{log.ip}</td>
                  </tr>
                )
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No Logs found
                </td>
              </tr>
            </tbody>
          )
        }
      </table>
    </div>
  );
};

export default LogsTable;