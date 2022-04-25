import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/base.css";
import {firebaseConfig} from "@/config/firebase"
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

const app = createApp(App)
.mount("#app");
