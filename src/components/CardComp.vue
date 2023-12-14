<template>
    <template v-for="product in cardsStore.products" :key="product.name">
        <div class="box__card" v-if="groupid == product.parentGroup">
            <div class="box__image">
                <img :src="`${product.image}`" alt="productName">
                <h3>{{ product.name }}</h3>
                <p>{{ product.description_en }}</p>
                <div class="box__info">
                    <h4>{{ product.price }}</h4>
                    <button class="btn btn-danger box__btn" v-if="product.count == 0"
                        @click="wantBtn(product)">Hoxlayman</button>
                    <div class="count" v-else>
                        <span class="count__minus" @click="unwantedBtn(product)"><i class="fa-solid fa-minus"></i></span>
                        <span class="count__num">{{ product.count }}</span>
                        <span class="count__plus" @click="wantBtn(product)"><i class="fa-solid fa-plus"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<script>
import axios from "axios"
import { mapStores } from "pinia";
import { useCardsStore } from "@/stores/card";

export default {
    data() {
        return {
            totalChosenCount : 0,

        }
    },
    props : ["link", "groupid"],
    async mounted() {
        const answer = await axios.get(`http://localhost:3000/${this.link}/`);
        this.cardsStore.products = answer.data.map(pro => {
            return {
                ...pro,
                count: 0,
            }
        })

    },
    computed: {
        ...mapStores(useCardsStore),
    },
    methods: {
        wantBtn(p) {
            p.count += 1
            if (!this.cardsStore.wishlist.includes(p) ){
                this.cardsStore.wishlist.push(p)
            }
            console.log(this.cardsStore.wishlist);

        },
        unwantedBtn(p) {
            p.count -= 1
            this.cardsStore.wishlist = this.cardsStore.wishlist.filter(card => card.id != p.id)
            console.log(this.cardsStore.wishlist);
        }
    },
}
</script>

<style lang="scss" scoped>

.count {
    display: flex;
    justify-content: center;
    align-items: center;
    &__num {
        font-weight: 500;
        padding: 0 15px;
        font-size: 18px;
    }
}

.box {


    &__btn {
        word-wrap: break-word;
        box-sizing: border-box;
        text-decoration: none;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: .375rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        background: #e43a3a;
        border-color: #e43a3a;
        border-radius: 3px;
        color: #fff;
        padding-left: 2rem;
        padding-right: 2rem;
        cursor: pointer;

        &:hover {
            word-wrap: break-word;
            box-sizing: border-box;
            display: inline-block;
            font-weight: 400;
            text-align: center;
            vertical-align: middle;
            user-select: none;
            border: 1px solid transparent;
            padding: .375rem .75rem;
            font-size: 1rem;
            line-height: 1.5;
            transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            background: #e43a3a;
            border-radius: 3px;
            padding-left: 2rem;
            padding-right: 2rem;
            text-decoration: none;
            color: #fff;
            background-color: #c82333;
            border-color: #bd2130;
            cursor: pointer;
        }

        &:focus {
            transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            background: #e43a3a;
            border-radius: 3px;
            padding-left: 2rem;
            padding-right: 2rem;
            outline: 0;
            color: #fff;
            background-color: #c82333;
            border-color: #bd2130;
            box-shadow: 0 0 0 .2rem rgba(225, 83, 97, .5);
            cursor: pointer;
        }
    }

    &__info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h4 {
            margin: 0;
            padding: 0;
            color: #212529;
            text-align: left;
            word-wrap: break-word;
            box-sizing: border-box;
            margin-top: 0;
            font-size: 1.28rem;
            font-weight: 600;
            font-family: 'Rubik', sans-serif;
            margin-bottom: 0;
            line-height: 35px;
        }
    }

    &__card {
        cursor: pointer;
        width: 25%;
        padding: 1.5rem;
        background-color: #fff;
        border-radius: 0;
        border: 1px solid #ececf3;
        transition: all .2s ease;

        &:hover {
            transition: all .3s ease;
            transform: scale(1.05);
            border: 1px solid #fff;
            position: relative;
            box-shadow: 0 2px 36px rgba(0, 0, 0, .19);
            z-index: 9999;
        }

        h3 {
            text-align: left;
            line-height: 1.2;
            box-sizing: border-box;
            text-decoration: none;
            background-color: transparent;
            font-size: 20px;
            font-family: 'Rubik', sans-serif;
            color: #201e1e;
            margin-top: -10px;
            margin-bottom: 20px;
            font-weight: 500;
            overflow: hidden;
            white-space: nowrap;
        }

        p {
            line-height: 1.5;
            text-align: left;
            font-family: 'Rubik', sans-serif;
            word-wrap: break-word;
            box-sizing: border-box;
            margin-top: 0;
            margin-bottom: 1.5rem !important;
            color: #b3b5c2;
            font-size: .85rem;
            font-weight: 400;
            height: 60px;
            overflow: hidden;

        }
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


@media only screen and (max-width: 650px) {
    .box {
        &__card {
            width: 100%;
        }
    }

}
</style>