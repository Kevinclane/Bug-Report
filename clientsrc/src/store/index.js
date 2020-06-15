import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: [],
    notes: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    setNewBug(state, newBug) {
      state.bugs.push(newBug)
    },
    setActiveBug(state, bug) {
      state.activeBug = []
      state.activeBug.push(bug)
    },
    changeBug(state, bug) {
      state.activeBug[0] = bug
    },
    setNotes(state, notes) {
      state.notes = notes
    },
    setNewNote(state, note) {
      state.notes.push(note)
    },
    removeNote(state, id) {
      let index = state.notes.findIndex(n => n.id == id)
      state.notes.splice(index, 1)
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBugs({ commit }) {
      try {
        let res = await api.get("bugs")
        commit("setBugs", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async addNewBug({ commit }, newBug) {
      try {
        let res = await api.post("bugs", newBug)
        commit("setNewBug", res.data)
        debugger
        router.push({ name: "BugDetails", params: { bugId: res.data.id } })
      } catch (error) {
        console.error(error)
      }
    },
    async getActiveBug({ commit }, id) {
      try {
        let res = await api.get("bugs/" + id)
        commit("setActiveBug", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async updateBug({ commit }, bug) {
      try {
        let res = await api.put("bugs/" + bug.id, bug)
        commit("changeBug", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getNotes({ commit }, id) {
      try {
        let res = await api.get("bugs/" + id + "/notes")
        commit("setNotes", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async addNewNote({ commit }, note) {
      try {
        let res = await api.post("notes", note)
        commit("setNewNote", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteNote({ commit }, note) {
      try {
        await api.delete("notes/" + note.id, note)
        commit("removeNote", note.id)
      } catch (error) {
        console.error(error)
      }
    }
  }
});
