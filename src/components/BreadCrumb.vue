<template>
    <div class="bread">
        <!-- <router-link to="/">Homepage</router-link>
        <span>/</span> -->
        <div class="bread__top">
            <router-link to="/" class="bread__home">Homepage</router-link>
            <span class="bread__divider">/</span>
            <span>{{ $route.name }}</span>
        </div>
        <div class="bread__main">
            <span>{{ $route.name }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .bread {
        padding-top: 100px;
        span {
            text-transform:capitalize;
            color: #201e1e;
        }
        &__divider {
            margin: 0 5px;
        }
        a {
            color: #d2d2d2;
        }
        &__main {
            padding-top: 50px;
            span {
                padding-left: 25px;
                position: relative;
                line-height: 1;
                font-size: 33px;
                font-weight: 500;
                &::after {
                    width: 3px;
                    height: 100%;
                    line-height: 1;
                    background-color: #e43a3a;
                    top: 0;
                    content: "";
                    position: absolute;
                    left: 0;
                }
            }
        }

    }
</style>