import { useState, useEffect } from 'react'
import { useCartStore } from '../stores/useCartStore'

type Item = {
  id: number;
  title: string;
}

export default function Shop() {
  const [items, setItems] = useState<Item[]>([])
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)

  async function getData() {
    const res = await fetch('http://localhost:3001/items')
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    setItems(data)
    console.log(data)
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div>
      <h1>Shop</h1>
      <p>
        welcome to the shop
      </p>
      <div className="items">

{items.length > 0 ? (
  <div >
    {items.map((items) => {
          return (
            <div key={items.id}>
              <span>{items.title}</span>
              <button>add to cart</button>
            </div>
          )
        })}
  </div>
) :
(
  <div>no items</div>
)}



      </div>
    </div>
  )
}