import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ChatbotInterface = ({ open, setOpen }) => {
    const user = useSelector((state) => state.Auth.user)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const bottomref = useRef()
    const { id } = useParams()
    // auto scroll on new message
    useEffect(() => {
        bottomref.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, loading])

    const handleStaticQuestion = async (type) => {
        //  console.log("submit")
        // user message 
        const labelMap = {
            insight: "Show insights",
            performance: "Check performance",
            errors: "Show errors",
            traffic: "Show traffic",
            recommendation: "Give recommendations"
        };
        // show user message
        setMessages(prev => [...prev, { role: "user", message: labelMap[type] }])
        setLoading(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/chatbot`, {
                projectId: id,
                type
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }, withCredentials: true
            }
            )
            // console.log("response", response.data)
            const botdata = response.data.data
            if (botdata) {
                setMessages((prev) => [...prev, { role: botdata?.role, message: botdata?.reply }])
            }
        } catch (error) {
            console.log("failed to send message", error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className={`fixed bottom-6 left-6 w-[360px] h-[500px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-xl bg-[#0F0B1E]/90 flex flex-col z-[9999] transition-all duration-300 
          ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-6 pointer-events-none"}`}>
            {/*header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#5B13EC] to-[#7C3AED]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">
                        AI
                    </div>
                    <div>
                        <p className="text-white text-sm font-semibold">Observix AI</p>
                        <p className="text-[10px] text-white/70">Online</p>
                    </div>
                </div>
                <IoIosCloseCircle
                    onClick={() => setOpen(false)}
                    className="text-white cursor-pointer hover:scale-110"
                    size={26}
                />
            </div>
            {/* body*/}
            <div className="flex-1 overflow-y-auto px-3 py-3 bg-[#0B0917] space-y-2">
                {/* welcome */}
                {messages.length === 0 && (
                    <div className="text-xs text-gray-400 text-center mt-10">
                        Hi 👋 {user?.username || "User"} <br />
                        Ask anything about your API logs
                    </div>
                )}
                {/* messages */}
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] px-4 py-2 rounded-xl text-sm shadow-md
                         ${msg.role === "user"
                                ? "bg-gradient-to-r from-[#5B13EC] to-[#7C3AED] text-white"
                                : "bg-[#1C1635] text-gray-200"
                            }`}
                        >
                            {msg.role === "system" ? formatAIResponse(msg.message) : msg.message}
                        </div>
                    </div>
                ))}
                {/* typing */}
                {loading && (
                    <div className="text-xs text-gray-400 animate-pulse">
                        🤖 AI is typing...
                    </div>
                )}
                <div ref={bottomref}></div>
            </div>
            {/* static questions */}
            <div className="p-3 border-t border-white/10 bg-[#0F0B1E]">
                <p className="text-[10px] text-gray-400 mb-2">Ask AI</p>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: "📊 Insights", type: "insight" },
                        { label: "⚡ Performance", type: "performance" },
                        { label: "🚨 Errors", type: "errors" },
                        { label: "📈 Traffic", type: "traffic" },
                        { label: "💡 Recommendations", type: "recommendation" },
                    ].map((item, i) => (
                        <button
                            disabled={loading}
                            key={i}
                            onClick={() => !loading && handleStaticQuestion(item.type)}
                            className={`text-[11px] px-3 py-1.5 rounded-full border transition-all ${loading
                                    ? "bg-[#2A2245] text-gray-500 cursor-not-allowed"
                                    : "bg-[#1C1635] border-[#5B13EC]/20 text-gray-300 hover:bg-[#5B13EC]/20 hover:text-white"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChatbotInterface;


const formatAIResponse = (text) => {
    if (!text) return null;
    const sections = text.split("\n\n");

    return sections.map((section, index) => {
        const [title, ...lines] = section.split("\n");
        return (
            <div key={index} className="mb-4 overflow-hidden">
                {/* Title */}
                <h4 className="text-sm font-semibold text-[#A78BFA] mb-2">
                    {title.includes("Insight") ? "📊 Insight" : "💡 Recommendation"}
                </h4>
                {/* Points */}
                <ul className="space-y-1">
                    {lines?.map((line, i) => (
                        <li key={i} className="text-xs text-gray-300 flex gap-2">
                            <span className="text-[#5B13EC]">•</span>
                            <span>{line?.replace("*", "").trim()}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    });
};