const LogsTable = () => {
  const logs = [
    {
      time: "2026-03-24 14:22",
      method: "GET",
      endpoint: "/users",
      status: 200,
      latency: "12ms",
      ip: "192.168.1.1",
    },
  ];

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
        <tbody>
          {logs.map((log, i) => (
            <tr key={i} className="border-t border-[#6a4dff]/10 hover:bg-[#23104A]">
              <td className="px-6 py-4 text-xs text-gray-400">{log.time}</td>
              <td className="px-6 py-3">{log.method}</td>
              <td className="px-6 py-3">{log.endpoint}</td>
              <td className="px-6 py-3">
                {log.status}
              </td>
              <td className="px-6 py-3">{log.latency}</td>
              <td className="px-6 py-3">{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsTable;