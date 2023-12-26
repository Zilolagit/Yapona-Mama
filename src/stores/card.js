import { defineStore } from 'pinia'

export const useCardsStore = defineStore('cards', {
    state: () => {
        return {
          wishlist : [],
          products : [],
          payment : 0,
          username: "",
          telNumber : "",
          selectedProduct : null,
          groups : [],
          selectedGroup : null,
          selectedPost : null
        }
    },
})