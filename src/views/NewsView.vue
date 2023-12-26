<template>
  <div >
    <div class="container header__container">
      <BreadCrumb />
      <div class="news__row">
        <div class="row mb-4" data-bs-toggle="offcanvas" data-bs-target="#newsPop" aria-controls="newsPop" v-for="newItem in news" @click="cardsStore.selectedPost = newItem">
          <div class="col-md-3">
            <img :src="`https://cdn.yaponamama.uz/news/${newItem?.image}`" :alt="newItem?.title">
          </div>
          <div class="col-md-9 mt-4 mt-md-0">
            <h3>{{ newItem?.title }}</h3>
            <p>{{ newItem?.desc.split(".")[0] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="offcanvas offcanvas-top" tabindex="-1" id="newsPop" aria-labelledby="newsPop">
  <div class="offcanvas-body">
    <div class="row">
      <div class="col-md-4">
        <img :src="`https://cdn.yaponamama.uz/news/${cardsStore.selectedPost?.image}`" :alt="cardsStore.selectedPost?.title">
      </div>
      <div class="col-md-8 mt-3 mt-md-0">
        <h2>{{ cardsStore.selectedPost?.title }}</h2>
        <p>{{ cardsStore.selectedPost?.desc }}</p>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";
import axios from "axios";
import { mapStores } from "pinia";
import { useCardsStore } from "@/stores/card";
export default {
  data() {
    return {
      news: []
    }
  },
  computed: {
    ...mapStores(useCardsStore)
  },
  components: {
    BreadCrumb
  },
  async mounted() {
    let progress = this.$progress.start();
    const posts = await axios.get("http://localhost:3000/posts")
    this.news = posts.data
    progress.finish()
  }

}
</script>

<style lang="scss" scoped>

#newsPop {
  max-width: 90%;
  margin: 0 auto;
  bottom: auto;
  top: 30px;
  border-radius: 5px;
  padding: 10px;
  height: auto;
}
.news {
  &__row {
    padding-top: 45px;
    .row {
      cursor: pointer;
    }
  }
}
</style>