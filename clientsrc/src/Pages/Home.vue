<template>
  <div>
    <div
      v-if="this.$auth.isAuthenticated"
      class="Bugs container-fluid box-shadow"
    >
      <div class="row">
        <div class="col-12 text-center">
          <form @submit.prevent="addNewBug">
            <input
              v-model="newBug.title"
              class="form-control my-1"
              type="text"
              name="Title"
              placeholder="Title..."
            />
            <input
              v-model="newBug.description"
              class="form-control my-1"
              type="text"
              name="despcription"
              placeholder="Description of the bug..."
            />
            <button type="submit" class="btn btn-info">Submit</button>
          </form>
        </div>
      </div>
      <div class>
        <div class="row bg-bug border-cstm">
          <div class="col-3">Title</div>
          <div class="col-3">Reported By</div>
          <div class="col-3">
            <span type="button" @click="sortByClosed">Status</span>
          </div>
          <div class="col-3">Last Modified</div>
        </div>
      </div>
      <Bug v-for="bug in bugs" :key="bug.id" :bug="bug" />
    </div>
    <div v-if="!this.$auth.isAuthenticated" class="home text-center">
      <img alt="Vue logo" src="../assets/logo.png" />
      <h1>Welcome to Bug Logger!</h1>
      <h4>Please sign in to continue</h4>
    </div>
  </div>
</template>

<script>
import Bug from "@/components/BugComponent.vue";
export default {
  name: "Bugs",
  data() {
    return {
      newBug: {
        closed: false,
        reportedBy: "placeholder because vue hates me",
      },
      sorted: "",
      fakeData: "",
    };
  },
  mounted() {
    if (this.$auth.isAuthenticated) {
      this.$store.dispatch("getBugs");
    }
  },
  computed: {
    bugs() {
      if (this.$auth.isAuthenticated) {
        return this.$store.state.bugs;
      }
    },
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {
    addNewBug() {
      this.$store.dispatch("addNewBug", { ...this.newBug });
      this.newBug = {
        closedToggle: false,
        reportedBy: "placeholder because vue hates me",
      };
    },
    compareOpen(a, b) {
      const closedA = a.closed;
      const closedB = b.closed;

      let comparison = 0;
      if (closedA > closedB) {
        comparison = 1;
      } else if (closedA < closedB) {
        comparison = -1;
      }
      return comparison;
    },
    compareClosed(a, b) {
      const closedA = a.closed;
      const closedB = b.closed;

      let comparison = 0;
      if (closedA > closedB) {
        comparison = -1;
      } else if (closedA < closedB) {
        comparison = 1;
      }
      return comparison;
    },
    sortByClosed() {
      if (this.sorted == "" || this.sorted == "closedTop") {
        this.bugs.sort(this.compareOpen);
        this.sorted = "openTop";
      } else if (this.sorted == "openTop") {
        this.bugs.sort(this.compareClosed);
        this.sorted = "closedTop";
      }
    },
  },
  components: {
    Bug,
  },
};
</script>

<style scoped>
.bg-bug {
  background-color: rgb(42, 42, 42);
  color: rgb(251, 220, 48);
  font-size: 1.5rem;
}
.border-cstm {
  border: 2px #914db9 solid;
}
.box-shadow {
  box-shadow: 5px 5px black;
}
</style>