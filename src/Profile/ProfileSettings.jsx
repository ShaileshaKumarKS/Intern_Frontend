import React, { useState} from "react";
import { requestNotificationPermission } from "./Notification";
import './Profile.css'

export function ProfileSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    JSON.parse(localStorage.getItem("notificationsEnabled")) || false);

  const handleToggle = () => {
    requestNotificationPermission();
    const newSetting = !notificationsEnabled;
    setNotificationsEnabled(newSetting);
    localStorage.setItem("notificationsEnabled", JSON.stringify(newSetting));
  };

  return (
    <div className="pf bg-red-400 h-8 ">
      <h2>Notifications <i class="bi bi-bell"></i></h2>&nbsp; &nbsp; 
      <label className="switch">
        <input
          type="checkbox"
          checked={notificationsEnabled}
          onChange={handleToggle}
        />
        <span className="slider round"></span>
      </label>
       {/* <p>{notificationsEnabled ? "Notifications Enabled" : "Notifications Disabled"}</p>  */}
    </div>
  );
}

