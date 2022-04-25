<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "./components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";
import type Emoji from "@/types/Emoji";
import { reactive, provide, onMounted } from "vue";
import { userInjectionKey } from "@/injectionKeys";
import type User from "./types/User";
import type Entry from "./types/Entry";
import { db } from "@/main";
import { collection, getDocs, orderBy, query} from "firebase/firestore";

onMounted(async () => { 
  await fetchTask()
});

//data
const entries: Entry[] = reactive([]);
const user: User = reactive({
  id: 1,
  username: "Adrian Fagilde",
  setting: [],
});

provide(userInjectionKey, user);

//methods
const fetchTask = async () => {
  const first = await query(collection(db, "reminders"), orderBy("createdAt"));
  const querySnapshot = await getDocs(first)
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    const entry: Entry = {
      id: doc.id,
      body: doc.data().body,
      emoji: doc.data().emoji,
      createdAt: doc.data().createdAt,
      userId: doc.data().userId,
    };
    entries.unshift(entry);
    
  });
};
const handleCreateEntry = async (entry: Entry) => {
  entries.unshift(entry)
  
};
</script>

<template>
  <main class="container m-auto p-10">
    <TheHeader />
    <EntryEditor @@create="handleCreateEntry" />
    <ul>
      <li v-for="entry in entries" :key="entry.id">
        <EntryCard :entry="entry" />
      </li>
    </ul>
  </main>
</template>
