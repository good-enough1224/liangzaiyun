<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "@/store/index";
import request from "@/tools/request";

defineProps<{ msg: string }>();

const store = useUserStore();

const storeMsg = store.msg;

let list = reactive([]);

onMounted(async () => {
  const res = await request({
    method: "get",
    url: "/api",
  });
  if (res.code === 200) {
    list = res.data;
  }
});
</script>

<template>
  <div>
    <h1>{{ storeMsg }} 33</h1>

    <ul>
      <li v-for="item in list" :key="item">
        {{ item }}
      </li>
    </ul>
    <div>哇哦</div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
