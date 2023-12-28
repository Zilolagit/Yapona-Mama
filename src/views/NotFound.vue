<template>
    <div>
        <div class="container found__container text-center">
            <h2>404</h2>
            <p>Ooops! Page Not Found</p>
            <router-link to="/">
                <button class="btn btn-danger btn-lg">Return to Homepage</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    h2 {
        font-size: 170px;
    }
    p{
        font-size: 30px;
        margin-bottom: 20px;
    }
    .found {
        &__container {
            padding-top: 150px;
            padding-bottom: 100px;
        }
    }
</style>