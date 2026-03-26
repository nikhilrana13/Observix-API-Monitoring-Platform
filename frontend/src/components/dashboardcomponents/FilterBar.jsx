const FiltersBar = ({setSelectmethod,setSelecttype,setSelectperiod}) => {

  return (
    <div className="p-4 border-b border-[#6a4dff]/20 flex flex-wrap gap-3 justify-between">

      <div className="flex gap-2 flex-wrap">
        <select onChange={(e)=>setSelectmethod(e.target.value)} className="bg-[#23104A] text-white text-sm px-3 py-2 rounded-md">
          <option value="">All Methods</option>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
           <option value="DELETE">DELETE</option>
        </select>
    

        <select onChange={(e)=>setSelecttype(e.target.value)}  className="bg-[#23104A] text-white text-sm px-3 py-2 rounded-md">
          <option>Select Type</option>
          <option value="error">Error</option>
          <option value="slow">Slow</option>
        </select>
      </div>
       <select onChange={(e)=>setSelectperiod(e.target.value)}  className="bg-[#23104A] text-white text-sm px-3 py-2 rounded-md">
          <option value="">Select Period</option>
          <option value="1hr">1 hour</option>
          <option value="12hr">12 hour</option>
          <option value="24hr">24 hour</option>
          <option value="7d">7 days</option>
          <option value="30d">30 days</option>
        </select>
    </div>
  );
};

export default FiltersBar;