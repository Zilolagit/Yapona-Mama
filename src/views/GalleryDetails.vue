<template>
    <div class="container header__container">
        <BreadCrumb />

        <div style="height: 100%;" id="carouselExampleIndicators" v-if="gallerySingle" class="carousel slide mt-5">
            <div class="carousel-indicators">
                <button v-for="(ig, i) in gallerySingle.carousel_images" type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="i" :class="{'active' : i == 0}"
                    aria-current="true" :aria-label="`Slide ${i+1}`"></button>
            </div>
            <div class="carousel-inner">
                <div style="height: 100%;" v-if="gallerySingle.carousel_images.length > 0" class="carousel-item" v-for="(image, i) in gallerySingle.carousel_images" :key="i" :class="{'active' : i == 0}">
                    <img :src="`https://cdn.yaponamama.uz/gallery/${image}`" class="d-block w-100" :alt="gallerySingle.title">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import BreadCrumb from '../components/BreadCrumb.vue';

export default {
    data() {
        return {
            gallerySingle: null
        }
    },
    components: {
        BreadCrumb
    },
    async mounted() {
        let progress = this.$progress.start();
        const response = await axios.get(`http://localhost:3000/gallery/${this.$route.params.id}`)
        this.gallerySingle = response.data
        progress.finish()
    }
}
</script>

<style lang="scss" scoped>
.carousel {
    &-item {
        width: 100%;
        // img {
        //     object-fit: cover;
        //     object-position: center;
        // }
    }
}



</style>