<script setup lang="ts">

    import { inject, onUnmounted, defineEmits } from 'vue'

    // สร้างชนิดข้อมูลของ userInfo
    type UserInfo = {
        name: string
        age: number
        email: string
    }

    let timer = setInterval(() => {
        console.log('Interval running...')
    }, 1000)

    onUnmounted(()=>{
        clearInterval(timer)
        console.log('Child Component has been unmounted and interval cleared')
    })

    // รับค่า provide จาก parent component ด้วย inject
    const message = inject('message')

    // รับ object จาก parent component
    const userInfo = inject<UserInfo>('userInfo')

    if (!userInfo) {
        throw new Error('userInfo is not provided')
    }

    // การใช้งาน Emits
    // กำหนด event ที่สามารถส่งไปให้ parent component ได้
    const emits = defineEmits(['sendData'])

    // สร้าง function สำหรับส่งข้อมูลไปให้ parent component
    function sendDataToParent() {
        // emits('sendData', 'Hello from Child Component')

        // สร้าง object ที่จะส่งไปยัง Parent Component
         const data = {
            message: 'Hello from Child Component',
            timestamp: new Date(),
            count: 100
        }

        // ส่งข้อมูลไปให้ parent component
        emits('sendData', data)
    }

</script>

<template>
    <h1>Child Component</h1>
    <h1>{{ message }}</h1>
    <p>Name:{{ userInfo.name }}</p>
    <p>Age: {{ userInfo.age }}</p>
    <p>Email:{{ userInfo.email }}</p>
    <button @click="sendDataToParent">Send Data to Parent</button>
</template>

<style scoped>

</style>