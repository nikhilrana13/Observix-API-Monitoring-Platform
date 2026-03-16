import { BiFolder } from 'react-icons/bi';
import { LuLayoutDashboard, LuLogOut, LuSettings2 } from 'react-icons/lu'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    const links = [
        { to: "dashboard", label: "Dashboard", icon: LuLayoutDashboard },
        { to: "projects", label: "Projects", icon: BiFolder },
        { to: "settings", label: "Settings", icon: LuSettings2 },
    ];
    const getNavClass = (isActive) => isActive ? "bg-[#6a4dff]/10 text-[#6a4dff] text-white px-3 py-3 rounded-md flex items-center gap-2 " : "px-3 py-3 mb-2 rounded-md hover:bg-[#6a4dff]/10 hover:text-[#6a4dff] transition-all duration-300 text-white";
   

    return (
        <aside className='w-full border-r-2 border-[#6a4dff]/10 bg-[#161022] flex-shrink-0 flex flex-col  h-full '>
            {/* nav links */}
            <nav className='flex px-3 mt-3 py-2 gap-5 flex-col'>
                {links.map(({ to, label, icon: Icon }) => (
                    <NavLink key={to} to={to} className={({ isActive }) => getNavClass(isActive)}>
                        <div className="flex items-center gap-4">
                            <Icon size={23} />
                            <span className="text-sm">{label}</span>
                        </div>
                    </NavLink>
                ))}
            </nav>
            <div className="mt-auto border-t-2 border-[#6a4dff]/10 ">
                {/* Logout */}
                <div
                    className="flex cursor-pointer text-white items-center justify-between px-5 py-4 gap-3  transition hover:bg-[#6a4dff]/10 hover:text-[#6a4dff]"
                >
                    <span>Logout</span>
                    <LuLogOut size={18} />
                </div>
            </div>
        </aside>
    )
}

export default Sidebar