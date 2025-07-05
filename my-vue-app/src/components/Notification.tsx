import { useEffect } from "react"
import { useNotificationStore } from "../stores/useNotificationStore"

export default function Notification() {
  const message = useNotificationStore((state) => state.message)
  const hide = useNotificationStore((state) => state.hide)

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        hide();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message, hide]);

  if (!message) return null

  return (
      <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      background: '#333',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }}>
      {message}
    </div>
  )
}