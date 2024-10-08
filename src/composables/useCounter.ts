import { ref } from 'vue'

export function useCounter(){
    const counter = ref(0)
    const increment = () => counter.value++
    return { counter, increment }
}