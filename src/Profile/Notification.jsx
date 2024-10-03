
import pn from  '../../src/Assets/org.png'

 function requestNotificationPermission() {
  
  
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
  }
  
 function showNotification(status) {
    
     if (Notification.permission === "granted") {
     let options;
  
      if (status === "hired") {
        options = {
          body: "You have been hired!",
          requireInteraction: true, // Keeps notification on screen until user interacts
          vibrate: [200, 100, 200],
        
    
         
        };
      } else if (status === "rejected") {
        options = {
          body: "Your application has been rejected.",
          requireInteraction: true,
          vibrate: [200, 100, 200],
        
        };
      }
  
      const notification = new Notification(
        status === "hired" ? "Application Hired": "Application Rejected",
        options
      );
  
     
    }
 }
    export {showNotification,requestNotificationPermission};
  