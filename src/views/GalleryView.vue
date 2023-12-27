<template>
    <div>
        <div class="container header__container">
            <BreadCrumb />
            <div class="row gallery mt-5">
                <div class="col-12 col-md-6 col-lg-4" v-for="gallery in galleryList" :key="gallery.id">
                    <GalleryList 
                    :title="gallery.title" 
                    :image="gallery.image"
                    :link="`gallery/${gallery.id}`"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import BreadCrumb from "../components/BreadCrumb.vue"
import GalleryList from "../components/GalleryList.vue"
export default {
    data() {
        return {
            galleryList : []
        }
    },
    async mounted() {
        let progress = this.$progress.start();
        const response = await axios.get("http://localhost:3000/gallery/")
        this.galleryList = response.data
        progress.finish()
    },
    components: {
        BreadCrumb,
        GalleryList
    }
}
</script>

<style lang="scss" scoped>
.gallery {
    &__col {
        .gallery__item {
            margin-bottom: 0;
        }
    }
}
</style>