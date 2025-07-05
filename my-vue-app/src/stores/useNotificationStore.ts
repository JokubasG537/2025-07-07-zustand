import {create} from 'zustand'


interface NotificationState {
  message: string | null;
  show: (msg: string) => void;
  hide: () => void;
}


export const useNotificationStore = create<NotificationState>((set) => ({
  message: null,
  show: (msg) => set({message: msg}),
  hide: () => set({message: null})

}))