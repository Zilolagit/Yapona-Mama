<template>
    <div>
        <div class="container header__container">
            <BreadCrumb />
            <div class="row contact">
                <div class="col-md-6">
                    <p class="mt-5">Yapona Mama - delivery of sushi and rolls in Tashkent. We make our meals only from high
                        quality products of world manufacturers, we are passionate about each order and always deliver on
                        time.</p>
                    <a href="#">+99871-200-89-89 </a>
                    <p>For complaints and suggestions, service management department - +99898-121-61-12 Rustam</p>
                    <p>For vacancies and employment, HR-department - +99898-125-50-20 (Tashkent), +99898-124-50-20 (regions)
                    </p>
                    <p>For commercial offers (advertising, cooperation): +99890-926-08-08 Vladimir</p>
                    <p>E-mail: info@yaponamama.uz</p>

                    <h4 class="mb-4">Our Restaurants</h4>
                    <template v-if="restaraunts">
                        <div class="contact__box" v-for="restaraunt in restaraunts">
                            <b>{{ restaraunt.name }} <span> {{ restaraunt.work }}</span></b>
                            <h6 class="mt-3">Reserve: <span>{{ restaraunt.phone_numbers.join("; ") }}</span></h6>
                            <h6>Address: <span>{{ restaraunt.address }}</span></h6>
                            <h6>Landmark: <span>{{ restaraunt.location }}</span></h6>
                        </div>
                    </template>
                </div>
                <div class="col-md-6">
                    <div class="contact__img">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.088533406537!2d69.2535719!3d41.2851776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a89cfac6c2f%3A0xe4fa5b1f864e9ee8!2sYapona%20Mama!5e0!3m2!1sen!2s!4v1703615506985!5m2!1sen!2s"
                            style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
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
            restaraunts: []
        }
    },
    components: {
        BreadCrumb
    },
    async mounted() {
        let progress = this.$progress.start();
        const response = await axios.get("http://localhost:3000/restaraunts/")
        this.restaraunts = response.data
        progress.finish()
    }
}
</script>

<style lang="scss" scoped>
.contact {
    p {
        line-height: 2;
    }

    h6 {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 15px;
    }

    span {
        font-weight: 400;
    }

    b {
        padding-right: 10px;
    }

    &__box {
        margin-bottom: 60px;
    }
    &__img {
        width: 100%;
        iframe {
            width: 100%;
            height: 550px;
        } 
    }
}
</style>