import React, { useEffect } from "react";
import styles from "./Notification.css";
import { RxCross2 } from "react-icons/rx";

export const Notification = ({ background, text, onHideNotification }) => {
    // используется для закрытия уведомления с задержкой
  useEffect(() => {
    const timeout = setTimeout(() => {
      onHideNotification();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [onHideNotification]);
  return (
    <div className={`notification ${background}`}>
      <p className="notification-text">{text}</p>
      <button className="notification-close" onClick={onHideNotification}>
        <RxCross2 className="notification-icon" />
      </button>
    </div>
  );
};
