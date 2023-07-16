import { create } from "zustand";
import { toast } from 'react-hot-toast'
import { persist, createJSONStorage } from 'zustand/middleware'

import { Product } from "@/types";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
      const currentItems = get().items;
      // Checking if the item to be added already exists
      const existingItem = currentItems.find((item) => item.id === data.id)

      // If exist, return 
      if(existingItem) {
        return toast("Item already in cart")
      }
      
      // Spread the existing items and add the current data to the cart
      set({ items: [ ...currentItems, data ] })
      toast.success("Item added to cart")
    },
    removeItem: (id: string) => {
      set({ items: [ ...get().items.filter((item) => item.id !== id) ]})
      toast.success("Item removed")
    },
    removeAll: () => set({ items: [] })
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage)
  })
)

export default useCart