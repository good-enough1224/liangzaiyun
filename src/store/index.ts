import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state() {
    return {
      msg: "this is a massage form store",
    };
  },
  actions: {},
});
