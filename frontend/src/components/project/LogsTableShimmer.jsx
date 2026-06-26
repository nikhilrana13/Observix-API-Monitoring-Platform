const LogsTableShimmer = () => {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <tr
          key={index}
          className="border-t border-[#6a4dff]/10 animate-pulse"
        >
          {/* Timestamp */}
          <td className="px-6 py-4">
            <div className="h-3 w-24 bg-gray-700/40 rounded"></div>
          </td>

          {/* Method */}
          <td className="px-6 py-3">
            <div className="h-5 w-12 bg-gray-700/40 rounded-md"></div>
          </td>

          {/* Endpoint */}
          <td className="px-6 py-3">
            <div className="h-3 w-40 bg-gray-700/40 rounded"></div>
          </td>

          {/* Status */}
          <td className="px-6 py-3">
            <div className="h-5 w-20 bg-gray-700/40 rounded-md"></div>
          </td>

          {/* Response Time */}
          <td className="px-6 py-3">
            <div className="h-3 w-16 bg-gray-700/40 rounded"></div>
          </td>

          {/* IP */}
          <td className="px-6 py-3">
            <div className="h-3 w-24 bg-gray-700/40 rounded"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default LogsTableShimmer;