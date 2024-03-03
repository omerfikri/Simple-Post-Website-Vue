<template>
  <div class="container">
    <div class="row" v-if="posts.length !== 0">
      <div class="col-sm-6 mb-3" v-for="post in posts" :key="post.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ post.post }}</h5>
            <p class="card-text">{{ post.userName }}</p>
            <router-link :to="'/browse/' + post.id" class="btn btn-primary"
              >Review</router-link
            >
          </div>
          <div class="card-footer text-muted text-center">{{ post.date }}</div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-sm-12 mb-3">
        <p style="text-align: center" class="h3">
          Not uploaded posts yet or there are no posts.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { db } from "@/firebase/config";
  import { collection, query, onSnapshot } from "firebase/firestore";
  import { ref } from "vue";
  import dayjs from "dayjs";
  import "dayjs/locale/tr";
  export default {
    setup() {
      const posts = ref([]);

      const q = query(collection(db, "posts"));
      dayjs.locale("tr");

      onSnapshot(q, (snap) => {
        posts.value = [];
        snap.docs.forEach((doc) => {
          posts.value.push({
            ...doc.data(),
            id: doc.id,
            date: dayjs(doc.data().date.toDate()).format(
              "DD MMMM YYYY HH:mm:ss"
            ),
          });
        });
      });
      return { posts };
    },
  };
</script>

<style scoped>
  .container {
    max-width: 600px;
    padding-top: 50px;
  }
</style>
