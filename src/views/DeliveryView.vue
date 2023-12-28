<template>
    <div>
        <div class="delivery">
            <div class="delivery__img">
                <img src="../../public/about_bg.jpg" alt="delivery">
            </div>
            <div class="container">
                <BreadCrumb/>
                <div class="delivery__text">
                    <b>Yetkazib berish shartlari:</b>
                    <p class="mt-4">Barcha savollaringiz bo'yicha 1089 yagona raqamiga qo'ng'iroq qiling, u yerda mutaxassisimiz sizga albatta maslahat beradi. Bizga telegram orqali +99890-933-26-76 (@Yaponamama) raqamiga yozishingiz va @yaponamamabot telegram botidan foydalanishingiz mumkin.</p>
                    <p>Toshkent, Samarqand va Buxoro shaharlarida yetkazib berish - 15.000 so'm</p>
                    <p>Toshkent shahridan tashqariga yetkazib berish 10 km gacha bo'lgan masofaga 25.000 so'm qo'shimcha to'lov bilan amalga oshiriladi.</p>
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
    .delivery {
        &__img {
            padding-top: 55px;
            img {
                width: 100%;
            }
        }
        &__text {
            padding-top: 40px;
            padding-bottom: 10px;
            p {
                line-height: 2;
            }
        }
    }
    .bread {
        padding-top: 40px;
    }
</style>