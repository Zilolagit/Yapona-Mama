<template>
    <div>
        <div id="carouselExampleFade" class="carousel slide carousel-fade">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://cdn.yaponamama.uz/sliders/slider_1637322033.png" class="d-block w-100" alt="image-1">
                </div>
                <div class="carousel-item">
                    <img src="https://cdn.yaponamama.uz/sliders/slider_1691068968.png" class="d-block w-100" alt="image-1">
                </div>
                <div class="carousel-item">
                    <img src="	https://cdn.yaponamama.uz/sliders/slider_1699855368.png" class="d-block w-100" alt="image-1">
                </div>
                <div class="carousel-item">
                    <img src="https://cdn.yaponamama.uz/sliders/slider_1688372610.png" class="d-block w-100" alt="image-2">
                </div>
                <div class="carousel-item">
                    <img src="https://cdn.yaponamama.uz/sliders/slider_1691069803.jpg" class="d-block w-100" alt="image-3">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="mini d-none d-lg-block">
            <div class="container-fluid header__container">
                <div class="mini__flex ">
                    <template v-for="group in groups" :key="`${group.name}`">

                        <a class="mini__card" v-if="group.name_uz != 'Yangiliklar'" :href="`#${group.id}`">
                            <img :src='`${group.list_image}`' alt="miniImage">
                            <p>{{ group.name_uz.split(" ")[0] }}</p>
                        </a>
                    </template>
                </div>
            </div>
        </div>
        <template v-for="gr in groups" :key="`${gr.name}`">
            <div class="full" v-if="gr.name_uz != 'Yangiliklar'" :id="`${gr.id}`">
                <div class="container header__container">
                    <h3 class="full__name">{{ gr.name_uz }}</h3>
                    <div class="box__flex">
                        <CardComp link="products" :groupid="`${gr.id}`" />
                    </div>
                </div>
            </div>
        </template>

    </div>
</template>

<script>
import axios from "axios"
import CardComp from "../components/CardComp.vue";

export default {
    data() {
        return {
            groups: [],
        }
    },
    components: {
        CardComp
    },
    async mounted() {
        const response = await axios.get("http://localhost:3000/groups");
        this.groups = response.data

    },
}
</script>

<style lang="scss" scoped>
.carousel {
    padding-top: 65px;
}

.full {
    &__name {
        padding: 5px 0;
        padding-left: 20px;
        margin-top: 0px;
        margin-bottom: 50px;
        margin-top: 50px;
        border-left: 4px solid #e45858;
        cursor: pointer;
        color: #273c52;

        &:hover {
            text-decoration: underline;
        }
    }
}

.box {
    &__flex {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
    }
}

.mini {
    padding: 10px 0px 15px;
    background-color: #fff;
    border-bottom: 1px solid #eaeaea;
    box-shadow: 0 2px 2px rgba(0, 0, 0, .1);
    margin-bottom: 50px;
    position: sticky;
    z-index: 10;
    width: 100%;
    left: 0;
    top: 65px;

    &__card {
        text-align: center;
        cursor: pointer;

        img {
            padding: 0 20px;
        }

        p {
            font-size: 15px;
            margin: 0;
            line-height: 1.2;
            color: #201e1e;
        }
    }

    &__flex {
        display: flex;
    }
}

@media only screen and (max-width: 1100px) {
    .box {
        &__card {
            width: 50%;

            &:hover {
                transform: none;
            }
        }
    }

}

@media only screen and (max-width: 992px) {
    .carousel {
        padding-top: 57px;
    }
}

@media only screen and (max-width: 650px) {
    .box {
        &__card {
            width: 100%;
        }
    }

    .full {
        &__name {
            margin-top: 30px;
            margin-bottom: 30px;
        }
    }
}</style>