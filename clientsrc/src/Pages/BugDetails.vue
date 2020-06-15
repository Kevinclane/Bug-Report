<template>
  <div class="Bug container-fluid bg-bug py-2 box-shadow">
    <div>
      <Bug v-for="bug in bugs" :key="bug.id" :bug="bug" />
      <div class="row">
        <div class="col-12 text-lg">NOTES</div>
        <div class="col-1"></div>
        <div class="col-10 border-cstm">
          <div class="row border-bottom">
            <div class="col-3">Name</div>
            <div class="col-7">Mesage</div>
            <div class="col-2">EDIT/DELETE</div>
          </div>
          <div>
            <Note v-for="note in notes" :key="note.id" :note="note" />
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-12 my-2">
          <form class="d-flex" @submit.prevent="addNewNote">
            <input
              class="form-control"
              type="text"
              name="content"
              placeholder="note..."
              v-model="newNote.content"
            />
            <button type="submit" class="btn btn-warning">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Note from "@/components/NotesComponent.vue";
import Bug from "@/components/BugDetailComponent.vue";
export default {
  name: "BugDetails",
  data() {
    return {
      newNote: {}
    };
  },
  mounted() {
    this.$store.dispatch("getActiveBug", this.$route.params.bugId);
    this.$store.dispatch("getNotes", this.$route.params.bugId);
  },
  methods: {
    addNewNote() {
      this.newNote.bugId = this.$route.params.bugId;
      this.$store.dispatch("addNewNote", { ...this.newNote });
      this.newNote = {};
    }
  },
  computed: {
    bugs() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.notes;
    }
  },
  components: {
    Note,
    Bug
  }
};
</script>

<style scoped>
.bg-bug {
  background-color: rgb(42, 42, 42);
  color: rgb(246, 216, 45);
}
.text-md {
  font-size: 1.5rem;
}
.text-lg {
  font-size: 3rem;
}
.text-red {
  color: red;
}
.text-green {
  color: green;
}
.border-cstm {
  border: 3px #914db9 solid;
}
.box-shadow {
  box-shadow: 5px 5px black;
}
</style>