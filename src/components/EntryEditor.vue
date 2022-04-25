<script lang="ts" setup>
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";
import { ref, computed, onMounted, inject } from "vue";
import { userInjectionKey } from "@/injectionKeys";
import type Emoji from "@/types/Emoji";
import type Entry from "@/types/Entry";
import { db } from "@/main";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";



//data
const body = ref("");
const emoji = ref<Emoji | null>(null);
const charCount = computed(() => body.value.length);
const maxChars = 280;
const user = inject(userInjectionKey);

//template refs
const textarea = ref<HTMLTextAreaElement | null>(null);
onMounted(() => textarea.value?.focus());
//event
const emit = defineEmits<{
  (e: "@create", entry: Entry): void;
}>();

//methods
const handleTextInput = (e: Event) => {
  const textArea = e.target as HTMLTextAreaElement;

  if (textArea.value.length <= maxChars) {
    body.value = textArea.value;
  } else {
    body.value = textArea.value = textArea.value.substring(0, maxChars);
  }
};
const saveFirebase = async (entry: Entry) => {
  try {
    const docRef = await addDoc(collection(db, "reminders"), {
      body: entry.body,
      emoji: entry.emoji,
      id: entry.id,
      createdAt: serverTimestamp(),
      userId: entry.userId,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
const getDocument = async (entry: Entry) => {
  const q = query(collection(db, "reminders"), where("id", "==", entry.id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    entry.createdAt = doc.data().createdAt;
  });
  return entry
}

const handleSubmit = async () => {
  const entry: Entry = {
    body: body.value,
    emoji: emoji.value,
    id: "qqqq" + Math.random(),
    createdAt: serverTimestamp(),
    userId: Math.random(),
  };
  await saveFirebase(entry);
  const newEntry = await getDocument(entry)
  emit("@create", newEntry);

  body.value = "";
  emoji.value = null;
};
</script>

<template>
  <form class="entry-form" @submit.prevent="handleSubmit">
    <textarea
      :value="body"
      ref="textarea"
      @keyup="handleTextInput"
      :placeholder="`New Journal Entry for ${user?.username || 'anonymous'}`"
    >
    </textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <span>{{ charCount }} / {{ maxChars }}</span>
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>
