<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container">
      <a class="navbar-brand" href="/">Social</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-show="user">
          <li class="nav-item">
            <router-link
              :to="{ name: 'Share' }"
              class="nav-link active"
              aria-current="page"
              href="#"
              >Share</router-link
            >
          </li>
        </ul>
      </div>
      <div class="d-flex" role="search">
        <router-link
          v-show="!user"
          :to="{ name: 'Login' }"
          class="btn btn-outline-success"
          type="submit"
        >
          Log In
        </router-link>
        <button
          v-show="user"
          @click="handleLogout"
          class="btn btn-outline-danger"
          type="submit"
        >
          Log Out
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
  import getUser from "@/composables/getUser";
  import { auth } from "@/firebase/config";
  import { signOut } from "firebase/auth";
  import { useRouter } from "vue-router";
  export default {
    setup() {
      const { user } = getUser();
      const router = useRouter();

      const handleLogout = async () => {
        await signOut(auth);
        router.push({ name: "Login" });
      };

      return { user, handleLogout };
    },
  };
</script>

<style scoped></style>
