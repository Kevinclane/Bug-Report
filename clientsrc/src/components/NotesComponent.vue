<template>
  <div class="Notes row my-2">
    <div class="col-3 text-md">{{note.reportedBy}}</div>
    <div class="col-7 text-md">{{note.content}}</div>
    <div class="col-2 text-md">
      <button v-if="isCreator" class="btn btn-warning">EDIT</button>
      <button v-if="isCreator" @click="deleteNote" class="btn btn-success">DELETE</button>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "Notes",
  props: ["note"],
  data() {
    return {};
  },
  computed: {
    isCreator() {
      return this.$store.state.profile.name == this.note.reportedBy;
    }
  },
  methods: {
    deleteNote() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this comment",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.$store.dispatch("deleteNote", this.note);
          swal("Poof! Your comment has been deleted!", {
            icon: "success"
          });
        } else {
          swal("Your comment is safe!");
        }
      });
    }
  }
};
</script>

<style scoped>
.text-md {
  font-size: 1.5rem;
}
</style>