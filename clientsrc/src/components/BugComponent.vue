<template>
  <div class="Bug row bg-bug d-flex">
    <router-link
      :to="{name: 'BugDetails', params: {bugId: bug.id}}"
      class="col-3"
      style="text-decoration:none; color:gold"
    >{{bug.title}}</router-link>
    <div class="col-3">{{bug.reportedBy}}</div>
    <div v-if="bug.closed == false" class="col-3 text-green">OPEN</div>
    <div v-else-if="bug.closed == true" class="col-3 text-red">CLOSED</div>
    <div class="col-3">{{date}}</div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Bug",
  props: ["bug"],
  data() {
    return {
      date: moment(String(this.bug.updatedAt)).format("MM/DD/YYYY hh:mm")
    };
  },
  computed: {}
};
</script>

<style scoped>
.bg-bug {
  background-color: rgb(53, 52, 52);
  color: gold;
  font-size: 1.5rem;
}
.text-red {
  color: red;
}
.text-green {
  color: green;
}
</style>