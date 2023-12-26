<template>
    <div class="row list__row">
        <div class="col-7 col-md-6">
            <div class="list__title">
                <router-link :to="`${link}`">{{ title }}</router-link>
            </div>
            <div class="list__adress">
                <p>Address: </p>
                <span>{{ address }}</span>
            </div>
        </div>
        <div class="col-5 col-md-4 list__col">
            <div class="list__phone">
                <p>Phone: </p>
                <a v-for="phoneNumber in phoneNumbers" :href="`tel: ${phoneNumber}`">{{ phoneNumber }}</a>
            </div>
            <div class="list__work">
                <p>Working hours:</p>
                <span>{{ workingHour }}</span>
            </div>
        </div>
        <div class="col-md-2 text-end d-none d-md-block">
            <div class="list__images">
                <img src="../../public/wifi.svg" alt="wifi">
                <img src="../../public/tour.svg" alt="tour">
                <img src="../../public/virtual.svg" alt="virtual">
            </div>
            <div class="list__detail">
                <router-link :to="link">More about the branch</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : ["title", "address", "phoneNumbers", "workingHour", "link"]
}
</script>

<style lang="scss" scoped>
.list {
    &__row {
        border-top: 1px solid #ccc;
        padding: 30px 0px;
        &:last-child {
            padding-bottom: 0;
        }
    }
    &__col {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    &__title {
        margin-bottom: 20px;

        a {
            font-size: 1.4rem;
            color: #201e1e;
            text-transform: uppercase;
            text-decoration: none;
            background-color: transparent;
            cursor: pointer;

            &:hover {
                color: #0056b3;
                text-decoration: underline;
            }
        }
    }

    &__adress, &__phone, &__work{
        p {
            color: rgba(32, 30, 30, .4);
            padding-bottom: 7px;
            font-size: 15px;
            margin-bottom: 0;
            padding: 0;
            margin-bottom: 4px;
        }
    }
    &__phone {
        margin-bottom: 15px;
        a {
            display: block;
            color: #201e1e;
            font-size: 14px;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    &__work {
        span {
            font-size: 15px;
        }
    }
    &__images {
        display: flex;
        justify-content: end;
        align-items: center;
        img {
            width: 35px;
            margin-left: 15px;
        }
    }
    &__detail {
        padding-top: 20px;
        a {
            text-decoration: none;
            color: #ed411b;
            font-size: 15px;
            &:hover {
                text-decoration: underline;
            }
        }
    }
}

</style>