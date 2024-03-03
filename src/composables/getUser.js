import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

const user = ref(auth.currentUser);

onAuthStateChanged(auth, (u) => {
  user.value = u;
});

const getUser = () => {
  return { user };
};

export default getUser;
