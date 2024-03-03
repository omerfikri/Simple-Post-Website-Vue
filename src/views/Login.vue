<template>
  <main class="form-signin m-auto w-100">
    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary" @click="handleLogin">
          <i class="bi bi-google"> With Log In</i>
        </button>
      </div>
    </div>
  </main>
</template>

<script>
  import { auth } from "@/firebase/config";
  import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { useRouter } from "vue-router";
  export default {
    setup() {
      const router = useRouter();
      const handleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((res) => {
          router.push({ name: "Home" });
        });
      };
      return { handleLogin };
    },
  };
</script>

<style scoped>
  .form-signin {
    max-width: 330px;
    padding: 15px;
    padding-top: 140px;
  }
</style>
