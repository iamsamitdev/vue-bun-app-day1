<script setup lang="ts">

  import { computed, onMounted, onUpdated, provide, reactive, ref, watch, watchEffect } from 'vue'

  // Import ChildComponent
  import ChildComponent from '@/components/ChildComponent.vue'

  // Import Custom Composable Function
  import { useCounter } from '@/composables/useCounter'

  // การสร้าง ref สำหรับเก็บข้อมูล count
  // สร้าง ref สำหรับเก็บข้อมูล count
  const count = ref(0)
  const myuser = ref({
    name: 'Jany Doe',
    age: 33
  })
  // เก็บ array
  const items = ref([1, 2, 3, 4, 5])

  // ตัวแปร ref ไว้ซ่อนหรือแสดง component ตามเงื่อนไข
  const showChild = ref(true)

  // การใช้ reactive สำหรับเก็บข้อมูล user
  // สร้าง reactive สำหรับเก็บข้อมูล user
  const user = reactive({
    name: 'John Doe',
    age: 25
  })

  // ตัวอย่างการใช้ computed
  const double = computed(()=> count.value * 2)

  // ตัวอย่างการใช้ watch
  watch(() => count.value, (newVal, oldVal) => {
    console.log('count changed', newVal, oldVal)
  })

  // ตัวอย่างการใช้ watchEffect
  watchEffect(()=>{
    console.log('count changed by watcheffect', count.value)
  })

  // ตัวอย่างการใช้ Lifecycle Hooks
  // ตัวอย่างการใช้ onMounted
  onMounted(()=>{
    console.log('Component has been mounted!')

    // ตัวอย่างการเรียก API เมื่อ Component ถูก Mounted
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))

    // focus ที่ input ทันทีเมื่อ component ถูก mounted
    inputElement.value?.focus()
  })

  // ตัวอย่างการใช้ onUpdated
  onUpdated(()=>{
    console.log('Component has been updated from onUpdate!')
    // เมื่อ count เปลี่ยนแปลง component จะทำงานใหม่และ log ข้อความนี้
  })

  // การเรียกใช้ composables จากไฟล์ useCounter.ts
  const { counter, increment } = useCounter()

  // สร้าง Ref สำหรับอ้างอิง Element ใน DOM
  const inputElement = ref<HTMLInputElement | null>(null)

  // ตัวอย่างการใช้ provide ใน Vue 3 Composition API
  provide('message', 'Hello from Parent Component!')

  // สร้าง object แบบ reactive
  const users = reactive({
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com'
  })

  // ส่ง object นี้ไปให้กับ child components ผ่าน provide
  provide('userInfo', users)

  // การรับข้อมูลจาก child component ผ่าน emit
  // function handleDataFromChild(data: string) {
  //   console.log('Received data from child:', data)
  // }

  // กำหนดประเภทของ object ที่จะรับ
  type ChildData = {
    message: string
    timestamp: Date
    count: number
  }

  // การรับข้อมูลจาก child component
  function handleDataFromChild(data: ChildData) {
    console.log('Received data from child:', data)
    console.log('Message:', data.message)
    console.log('Timestamp:', data.timestamp)
    console.log('Count:', data.count)
  }

</script>

<template>

  <button @click="count++">+ Increment</button>
  <h1>Counter: {{ count }}</h1>
  <button @click="count--">- Decrement</button>

  <h1>{{ user.name }} {{ user.age }}</h1>
  <h1>{{ myuser.name }} {{ myuser.age }}</h1>

  <ul>
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>

  <h1>Double: {{ double }}</h1>

  <button @click="showChild = !showChild">Toggle Child Component</button>
  <ChildComponent v-if="showChild" @sendData="handleDataFromChild" />

  <h1>Counter from Composable: {{ counter }}</h1>
  <button @click="increment">Increment</button>

  <h1>Input Element</h1>
  <input type="text" ref="inputElement"/>

</template>

<style scoped>
  
</style>