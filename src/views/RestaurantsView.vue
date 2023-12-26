<template>
    <div>

        <div class="map" style="height: 210px;" v-if="activeTab == false">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.088533406537!2d69.2535719!3d41.2851776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a89cfac6c2f%3A0xe4fa5b1f864e9ee8!2sYapona%20Mama!5e0!3m2!1sen!2s!4v1703615506985!5m2!1sen!2s" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="container header__container" > 
            <BreadCrumb v-if="activeTab"/>
            <div class="tab d-flex justify-content-center  justify-content-sm-end" >
                <button @click="activeTab = false" style="padding: 10px 35px;"  class="btn btn-secondary btn-lg opacity-50" :class="{'btn-danger opacity-100' : activeTab == false}" >Map</button>
                <button  @click="activeTab = true" style="padding: 10px 35px;" class="btn btn-secondary btn-lg ms-1 opacity-50" :class="{'btn-danger opacity-100' : activeTab}" >List</button>
            </div>
    
            <div class="list" v-if="activeTab"> 
                <RestaurantList  v-for="restaurant in restaurants" 
                :key="restaurant.id" 
                :title="restaurant.name" 
                :address="restaurant.name" 
                :phoneNumbers="restaurant.phone_numbers" 
                :workingHour="restaurant.work"
                :link="`restaurants/${restaurant.id}`"
            />
            </div>
        </div>
        <div class="divider" v-if="activeTab == false"></div>
        
    </div>
</template>

<script>
    import axios from "axios"
import BreadCrumb from "../components/BreadCrumb.vue"
    import RestaurantList from "../components/RestaurantList.vue"
    export default {
        data() {
            return {
                restaurants : [],
                activeTab : true
            }
        },
        async mounted() {
            let progress = this.$progress.start();
            const response = await axios.get("http://localhost:3000/restaraunts/")
            this.restaurants = response.data
            progress.finish()
        },
        components : {
            BreadCrumb,
            RestaurantList
        }
    }
</script>

<style lang="scss" scoped>
    .list {
        padding-top: 50px;
    }
    .map {
        padding-top: 67px;
        iframe {
            width: 100%;
            height: 670px;
        }
    }

    .tab {
        margin-top: -40px;
        button {
            z-index: 1;
        }
    }
    .divider {
        padding-top: 430px;
    }
    @media screen and (max-width:576px)  {
        .tab {
            margin-top: 0;
            padding-top: 30px;
        }
    }


</style>