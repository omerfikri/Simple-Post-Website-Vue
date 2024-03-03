<template>
  <div class="container">
    <div class="mb-3">
      <label class="form-label">Write Something</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="I am happy today"
        v-model="post"
      />
    </div>
    <div class="mb-3 text-center">
      <button @click="handleClick" type="button" class="btn btn-dark">
        Share
      </button>
    </div>
    <hr />
    <div class="mb-3">
      <ol class="list-group list-group-numbered">
        <li
          v-for="post in posts"
          :key="post.id"
          class="list-group-item d-flex justify-content-between align-items-start"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ post.post }}</div>
            {{ post.date }}
          </div>
          <span class="badge bg-primary rounded-pill">{{
            post.comments.length
          }}</span>
          <span @click="handleDelete(post.id)" class="badge bg-danger mx-2"
            ><i class="bi bi-x"></i
          ></span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted } from "vue";
  import getUser from "@/composables/getUser";
  import {
    addDoc,
    collection,
    onSnapshot,
    query,
    where,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import { timestamp, db } from "@/firebase/config";
  import dayjs from "dayjs";
  import "dayjs/locale/tr";
  export default {
    setup() {
      const { user } = getUser();
      const post = ref("");
      const posts = ref([]);

      onMounted(() => {
        const q = query(
          collection(db, "posts"),
          where("userName", "==", user.value.displayName)
        );

        onSnapshot(q, (snap) => {
          posts.value = [];
          snap.docs.forEach((doc) => {
            if (doc.data().date) {
              dayjs.locale("tr");
              posts.value.push({
                ...doc.data(),
                id: doc.id,
                date: dayjs(doc.data().date.toDate()).format(
                  "DD MMMM YYYY HH:mm:ss"
                ),
              });
            }
          });
        });
      });

      const handleDelete = async (id) => {
        const docRef = doc(db, "posts", id);
        await deleteDoc(docRef);
      };

      const handleClick = async () => {
        if (user.value) {
          await addDoc(collection(db, "posts"), {
            userName: user.value.displayName,
            post: post.value,
            date: timestamp,
            comments: [],
          });
          post.value = "";
        }
      };
      return { post, posts, handleClick, handleDelete };
    },
  };
</script>

<style scoped>
  .container {
    max-width: 600px;
    padding-top: 50px;
  }
</style>
