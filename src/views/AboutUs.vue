<template>
    <div>
        <div class="about">
                <div class="about__img">
                    <img src="../../public/about_bg.jpg" alt="About Image">
                </div>
            <div class="container">
                <BreadCrumb/>
                <div class="about__text">
                    <p><b>Yaponamama</b> is a Pan-Asian Fusion Cuisine.</p>
                    <p>Brand Chef combined traditional, centuries-old practice of sushi making with innovations of modern life and bright ideas.</p>
                    <p>We use oceanic fish as the basis of a healthy diet and put a piece of our soul into the making of each order! The seas and oceans are far from us, but this does not prevent us from making fresh and perfect-tasting dishes. And all because we work with the best suppliers of seafood from the very opening of the restaurant, winning the hearts and trust of millions of people!</p>
                    <p>Our goal is to cultivate the pleasure of food consumed and we are moving in the right direction.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '../components/BreadCrumb.vue';
    export default {
        components : {
            BreadCrumb
        }
    }
</script>

<style lang="scss" scoped>
    .about {
        &__img {
            width: 100%;
            padding-top: 55px;
            img {
                width: 100%;
            }
        }
        &__text {
            padding-top: 35px;
            padding-bottom: 20px;
        }
    }
    .bread {
        padding-top: 40px;
    }
</style>