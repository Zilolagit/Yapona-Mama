<template>
    <div class="gallery__item" :style="{'background-image' : `url(https://cdn.yaponamama.uz/gallery/${image})`}">
        <router-link to="/">
            {{ title }}
        </router-link>
    </div>
</template>

<script>
    export default {
      props : ["title", "image"]
    }
</script>

<style lang="scss" scoped>
    .gallery {
        &__item {
            width: 100%;
            min-height: 240px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
            padding: 25px 20px;
            display: flex;
            align-items: end;
            overflow: hidden;
            margin-bottom: 25px;
            &::after {
                position: absolute;
                content: "";
                width: 100%;
                height: 100%;
                background-color: #000;
                opacity: 0.2;
                top: 0;
                left: 0;
            }
            a {
                color: #fff;
                z-index: 3;

            }
        }
    }
    @media screen and (max-width: 768px) {
        .gallery {
            &__item {
                margin-bottom: 30px;
            }
        }
    }
</style>