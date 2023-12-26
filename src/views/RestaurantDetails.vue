<template>
    <div class="container" v-if="restaurant">
        <div class="detail">
            <div class="detail__carousel">
                <div v-if="restaurant.images?.length > 0" id="carouselExample" class="carousel slide">
                    <div class="carousel-inner">
                        <div class="carousel-item " v-for="(image, id) in restaurant.images" :class="{'active' : id == 0}">
                            <img :src="`https://cdn.yaponamama.uz/restaurants/${image}`" class="d-block w-100" :alt="restaurant.name">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <BreadCrumb/>
            <div class="row">
                <div class="col-md-8">
                    <p class="detail__desc">{{ restaurant.desc }}</p>
                    <h5>Number of seats: <span>for {{ restaurant.seats }} people</span></h5>
                    <h5>Parking: <span>{{  restaurant.parking ? 'Available' : 'Unavailable'}}</span></h5>
                    <h5>Reserve: <span>{{ restaurant.phone_numbers.join("; ") }}</span></h5>
                    <h5>Address: <span>{{ restaurant.address }}</span></h5>
                    <h5>Landmark: <span>{{ restaurant.location }}</span></h5>
                    <a :href="restaurant.yandex">Yandex.Maps</a>
                    <a :href="restaurant.google">Google Maps</a>
                    <a :href="restaurant.gis">2GIS Maps</a>
                </div>
                <div class="col-md-4">
                    <div class="detail__box">
                        <div class="detail__img">
                            <img src="../../public/map.svg" alt="map">
                        </div>
                        <a :href="restaurant.google">Location</a>
                    </div>
                    <div class="detail__box">
                        <div class="detail__img">
                            <img src="../../public/menu_list.svg" alt="menu">
                        </div>
                        <router-link to="/menu">Menu</router-link>
                    </div>
                    <div class="detail__box">
                        <div class="detail__img">
                            <img src="../../public/360.svg" alt="360-tour">
                        </div>
                        <a :href="`https://cdn.yaponamama.uz/vt/${restaurant.id}`" >Virtual Tour</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import BreadCrumb from '../components/BreadCrumb.vue';
export default {
    data() {
        return {
            restaurant : null
        }
    },
    components : {
        BreadCrumb
    },
    async mounted() {
        console.log(this.$route.params);
        let progress = this.$progress.start();
        const response = await axios.get(`http://localhost:3000/restaraunts/${this.$route.params.id}/`)
        this.restaurant = response.data
        progress.finish()
    }
}
</script>

<style lang="scss" scoped>
    .detail {
        padding-top: 100px;
        &__desc {
            padding-top: 35px;
            line-height: 220%;
            padding-bottom: 35px;
        }
        &__carousel {
            img {
                height: 80vh;
                width: 100%;
                object-fit: cover;
                object-position: center;
            }
        }
        h5 {
            font-size: 17px;
            margin-bottom: 20px;
            line-height: 2;
            span {
                font-weight: 400;
                line-height: 1;

            }
        }
        a {
            display: block;
            margin-bottom: 20px;
        }
        &__img {
            width: 55px;

        }
        &__box {
            display: flex;
            margin-bottom: 20px;
            align-items: center;

            a {
                margin-bottom: 0;
                margin-left: 20px;
            }
        }
    }
    .bread {
        padding-top: 30px;
    }

    @media screen and (max-width: 576px) {
        .detail {
            &__carousel {
                img {
                height: 50vh;
                }
            }
        }
    }
</style>