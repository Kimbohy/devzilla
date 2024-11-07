"use client";
import { useState } from "react";

const NotificationTabs = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Notifications" },
    { id: "unread", label: "Unread" },
    { id: "mentions", label: "Mentions" },
  ];

  return (
    <div className="border-b flex">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-3 font-medium transition-colors 
            ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NotificationTabs;
