<template>
  <div class="row">
    <div class="col-12">
      <div class>Title</div>
      <div class="text-lg">{{bug.title}}</div>
    </div>
    <div class="col-12 justify-content-between d-flex">
      <span class>
        Reported by:
        <span class="text-md">{{bug.reportedBy}}</span>
      </span>
      <span v-if="bug.closed == false">
        <span class>Status:</span>
        <span class="text-green">OPEN</span>
      </span>
      <span v-if="bug.closed == true">
        <span class>Status:</span>
        <span class="text-red">CLOSED</span>
      </span>
    </div>
    <div class="col-12 text-md border-cstm">{{bug.description}}</div>

    <div v-if="bug.closed == false && isCreator" class="col-12 d-flex justify-content-end">
      <button
        v-if="openEditBug == false"
        @click="openEditBug = true"
        class="btn btn-warning my-2"
      >EDIT BUG</button>
      <button
        v-if="openEditBug == true"
        @click="openEditBug = false"
        class="btn btn-warning my-2"
      >CANCEL</button>
      <button @click="closeBug" class="btn btn-success my-2">CLOSE BUG</button>
    </div>
    <div v-if="openEditBug == true" class="col-12">
      <form @submit.prevent="updateBug">
        <input v-model="bug.title" class="form-control my-1" type="text" name="Title" />
        <input v-model="bug.description" class="form-control my-1" type="text" name="despcription" />
        <button type="submit" class="btn btn-warning">SUBMIT</button>
      </form>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "BugDetailComponent",
  props: ["bug"],
  data() {
    return {
      openEditBug: false
    };
  },
  methods: {
    updateBug() {
      this.$store.dispatch("updateBug", this.bug);
      this.openEditBug = false;
    },
    closeBug() {
      swal({
        title: "Are you sure?",
        text: "Once closed, you will not be able to reopen this bug",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.bug.closed = true;
          this.$store.dispatch("updateBug", this.bug);
          swal("This bug has been closed!", {
            icon: "success"
          });
        } else {
          swal("Your bug is still open");
        }
      });
    }
  },
  computed: {
    isCreator() {
      return this.$store.state.profile.name == this.bug.reportedBy;
    }
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