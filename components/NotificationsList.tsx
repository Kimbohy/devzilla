"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { motion } from "framer-motion";

interface Notification {
  id: string;
  type: string;
  content: string;
  sender: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  isRead: boolean;
}

const NotificationsList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/notifications");
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId: string) => {
    try {
      await axios.patch(`/api/notifications/${notificationId}/read`);
      setNotifications(
        notifications.map((notif) =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      mention: "/icons/mention.svg",
      comment: "/icons/comment.svg",
      like: "/icons/like.svg",
      follow: "/icons/follow.svg",
    };
    return icons[type] || "/icons/notification.svg";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {notifications.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No notifications yet
        </div>
      ) : (
        notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
              !notification.isRead ? "bg-blue-50" : ""
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="relative mr-4">
              <Image
                src={notification.sender.avatar}
                alt={notification.sender.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <Image
                src={getNotificationIcon(notification.type)}
                alt="Notification Type"
                width={20}
                height={20}
                className="absolute bottom-0 right-0 bg-white rounded-full"
              />
            </div>
            <div className="flex-grow">
              <p className="text-sm">
                <span className="font-semibold">
                  {notification.sender.name}
                </span>{" "}
                {notification.content}
              </p>
              <p className="text-xs text-gray-500">{notification.timestamp}</p>
            </div>
            {!notification.isRead && (
              <div className="w-2 h-2 bg-primary rounded-full ml-2"></div>
            )}
          </motion.div>
        ))
      )}
    </div>
  );
};

export default NotificationsList;
