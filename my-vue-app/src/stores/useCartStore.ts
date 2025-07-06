import { create} from 'zustand'

type CartState = {
  items: { id: number; title: string }[]
  addItem: (item: { id: number; title: string }) => void
  removeItem: (id: number) => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({items: [...state.items, item]})),
  removeItem: (id) => set((state) => ({items: state.items.filter((item) => item.id !== id)})),
}))