<template>
  <div class="container my-5">
    <div class="row">
      <div class="alert alert-primary text-center" role="alert">
        <h2>Social</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-8 mb-3">
        <div class="card">
          <div class="card-header text-end">{{ date }}</div>
          <div class="card-body text-center">
            <h5 class="card-title">{{ post }}</h5>
            <p class="card-text">{{ userName }}</p>
          </div>

          <ul class="list-group list-group-flush" v-if="comments.length !== 0">
            <li
              class="list-group-item d-flex justify-content-between align-items-start"
              v-for="comment in comments"
              :key="comment.comment"
            >
              <div class="ms-2 me-auto">
                <div class="fw-bold">{{ comment.comment }}</div>
              </div>

              <span class="badge bg-primary mx-2">{{
                comment.commentUserName
              }}</span>
            </li>
          </ul>

          <ul class="list-group list-group-flush" v-else>
            <li class="list-group-item">There are no comments.</li>
          </ul>
        </div>
      </div>

      <div class="col-sm-4" v-if="user">
        <form @submit.prevent="handleComment">
          <div class="mb-3">
            <div id="yorumBaslik" class="form-text">
              Write Something about post
            </div>
            <label for="yorum" class="form-label">Your Comment</label>
            <input
              type="text"
              class="form-control"
              id="yorum"
              aria-describedby="yorumBaslik"
              v-model="commentText"
            />
          </div>

          <button type="submit" class="btn btn-outline-primary">
            Write Comment
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { useRoute } from "vue-router";
  import getUser from "@/composables/getUser";
  import { ref } from "vue";
  import { db } from "@/firebase/config";
  import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
  import dayjs from "dayjs";
  import "dayjs/locale/tr";
  export default {
    setup() {
      const route = useRoute();
      const { user } = getUser();

      const commentText = ref("");
      const postRef = doc(db, "posts", route.params.id);

      dayjs.locale("tr");

      const post = ref("");
      const date = ref("");
      const comments = ref([]);
      const userName = ref("");

      const handleComment = async () => {
        await updateDoc(postRef, {
          comments: arrayUnion({
            commentUserName: user.value.displayName,
            comment: commentText.value,
          }),
        });
        commentText.value = "";
      };

      onSnapshot(postRef, (snap) => {
        post.value = snap.data().post;
        date.value = dayjs(snap.data().date.toDate()).format(
          "DD MMMM YYYY HH:mm:ss"
        );
        userName.value = snap.data().userName;
        comments.value = snap.data().comments;
      });
      return {
        user,
        commentText,
        comments,
        userName,
        date,
        post,
        handleComment,
      };
    },
  };
</script>

<style></style>
