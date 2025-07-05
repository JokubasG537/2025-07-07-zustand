import { useNotificationStore } from '../stores/useNotificationStore'
import Notification from '../components/Notification'
export default function NotificationPopup() {
  const show = useNotificationStore((state) => state.show)

  return (
    <div>
      <h1>Noti page</h1>
      <button onClick={() => show('Hello')}>Click</button>
      <Notification />
    </div>
  )
}