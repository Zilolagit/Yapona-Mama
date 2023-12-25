<template>
    <template v-for="product in cardsStore.products" :key="product.name">
                
        <div class="box__card" v-if="groupid == product.parentGroup">
            <div class="box__image">
                <img :src="`https://cdn.yaponamama.uz/products/thumbs/${product.image}`" :alt="product.name">
                <h3 class="pt-4" @click="cardsStore.selectedProduct = product" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasDetails" aria-controls="offcanvasDetails">{{
                        product.name }}</h3>
                <p>{{ product.description }}</p>
                <div class="box__info" v-if="product.price">
                    <h4>{{ product.price.toLocaleString() }}</h4>
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

    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasDetails" aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-body card">
            <div class="row">
                <div class="col-12 d-flex justify-content-end">
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="col-lg-5">
                    <div class="card__img">
                        <img :src="`https://cdn.yaponamama.uz/products/thumbs/${cardsStore.selectedProduct?.image}`" style="width: 100%;"
                            :alt="cardsStore.selectedProduct?.name">
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="card__title">
                        <h2>{{ cardsStore.selectedProduct?.name }}</h2>
                    </div>
                    <div class="card__desc">
                        <p>{{ cardsStore.selectedProduct?.description }}</p>
                    </div>

                    <div class="row align-items-center" style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding-top: 10px; padding-bottom: 10px;">
                        <div class="col-7">
                            <div class="card__sum">
                                <h3> {{ cardsStore.selectedProduct?.price }} </h3>
                            </div>
                        </div>
                        <div class="col-5 d-flex justify-content-end">
                            <div class="card__btn" v-if="cardsStore.selectedProduct?.count == 0">
                                <button class="btn btn-danger box__btn card__btn"
                                    @click="wantBtn(cardsStore.selectedProduct)">Hoxlayman</button>
                            </div>
                            <div class="card__count" v-else>
                                <div class="count">
                                    <span class="count__minus" @click="unwantedBtn(cardsStore.selectedProduct)"><i
                                            class="fa-solid fa-minus"></i></span>
                                    <span class="count__num">{{ cardsStore.selectedProduct?.count }}</span>
                                    <span class="count__plus" @click="wantBtn(cardsStore.selectedProduct)"><i
                                            class="fa-solid fa-plus"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>






                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import { mapStores } from "pinia";
import { useCardsStore } from "@/stores/card";


export default {
    data() {
        return {
            totalChosenCount: 0,
        }
    },
    props: ["groupid"],
    async mounted() {
        let progress = this.$progress.start();
        const answer = await axios.get(`http://localhost:3000/products/`);
        this.cardsStore.products = answer.data.map(pro => {
            return {
                ...pro,
                count: 0,
            }
        })
        progress.finish()

    },
    computed: {
        ...mapStores(useCardsStore),
    },
    methods: {
        wantBtn(p) {
            p.count += 1
            this.cardsStore.payment += p.price
            if (!this.cardsStore.wishlist.includes(p)) {
                this.cardsStore.wishlist.push(p)
            }
        },
        unwantedBtn(p) {
            p.count -= 1
            if (p.count <= 0) {
                this.cardsStore.wishlist = this.cardsStore.wishlist.filter(card => card.id != p.id)
            }
            this.cardsStore.payment -= p.price
        },
        // getProduct(product) {
        //     let cardBtn = document.querySelector(".card__btn")
        //     let cardTitle = document.querySelector(".card__title > h2")
        //     let cardDesc = document.querySelector(".card__desc > p")
        //     let cardSum = document.querySelector(".card__sum > h3")
        //     let cardImage = document.querySelector(".card__img > img")
        //     let cardMinus = document.querySelector(".count__minus")
        //     let cardPlus = document.querySelector(".count__plus")
        //     let cardNum = document.querySelector(".card__num")



        //     cardTitle.innerText = product.name
        //     cardDesc.innerText = product.description_en
        //     cardSum.innerText = product.price
        //     cardImage.setAttribute("src", product.image)


        //     cardMinus.onclick = () => {
        //         this.unwantedBtn(product)
        //         // cardNum.innerHTML = product.count
        //     }
        //     cardBtn.onclick = () => {
        //         this.wantBtn(product)
        //     }

        //     cardPlus.onclick = () => {
        //         this.wantBtn(product)
        //         // cardNum.innerHTML = product.count
        //     }
        // }
    },
}
</script>



<style lang="scss" scoped>
.card {
    padding: 30px;
    &__title {
        text-align: left;
        line-height: 1.2;
        box-sizing: border-box;
        text-decoration: none;
        background-color: transparent;
        font-size: 18px;
        color: #201e1e;
        font-weight: 500;
        white-space: nowrap;
    }

    h3 {
        margin: 0;
    }

    &__desc {
        p {
            line-height: 1.5;
            text-align: left;
            font-family: 'Rubik', sans-serif;
            word-wrap: break-word;
            box-sizing: border-box;
            margin-top: 0;
            margin-bottom: 1.5rem !important;
            color: #212529;
            font-size: 1rem;
            font-weight: 400;

        }
    }
}

.detail {
    &__info {
        h4 {
            font-size: 25px;
        }
    }
    .card {
        &__sum {
            margin: 0;
            padding: 0;
        }
    }
    .count {
        &__num, &__btn {
            padding: 0;
            margin: 0;
        }
    }
}

#offcanvasDetails {
    top: 30px;
    margin: 0 auto;
    max-width: 90%;
    border-radius: 5px;
    height: auto;
    bottom: auto;
}

@media screen and (min-width: 756px) {
    #offcanvasDetails {
        max-width: 75%;
    }
}

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
    &__image {
        img {
            width: 100%;
        }
    }

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
            z-index: 1;
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

            &:hover,
            &:active {
                text-decoration: underline;
            }
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
            margin-bottom: 25px;
        }
    }

}
</style>