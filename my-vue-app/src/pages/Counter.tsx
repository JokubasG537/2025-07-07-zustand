import { useCounterStore } from '../stores/useCounterStore'

export default function Counter() {
  const count = useCounterStore((state) => state.count)
  const increase = useCounterStore((state) => state.increase)
  const decrease = useCounterStore((state) => state.decrease)

  return (
    <div>
      <h1>Counter</h1>
      <h2>{count}</h2>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  )
}