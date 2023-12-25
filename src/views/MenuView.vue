<template>
    <div class="container header__container">
        <div class="bread-crumb">
            <BreadCrumb/>
        </div>
        <div class="sort" v-if="cardsStore.selectedGroup">
                <div class="sort__flex" >
                    <div class="sort__box" v-for="group in cardsStore.groups">
                        <span @click="cardsStore.selectedGroup = group ">{{ group.name }}</span>
                    </div>
                </div>
        </div>

        
        <div class="products" v-if="cardsStore.selectedGroup">
            <h2 class="text-center products__title">{{ cardsStore.selectedGroup.name }}</h2>
            <a v-for="child in cardsStore.selectedGroup?.child" class="btn btn-outline-dark btn-small me-2 mb-3" :href="`#${child.id}`">{{ child.name }}</a>
            <div class="products__flex">
                    <CardComp :groupid="cardsStore.selectedGroup.id"/>
                    <template v-for="child in cardsStore.selectedGroup?.child">
                        <div class="container header__container">
                            <h2 class="text-center products__title" style="padding-top: 70px; padding-bottom: 60px;" :id="child.id">{{ child.name }}</h2>
                            <div class="products__flex">
                                <CardComp :groupid="child.id"/>
                            </div>
                        </div>
                    </template>
            </div>
        </div>



    </div>
</template>

<script>
import BreadCrumb from '../components/BreadCrumb.vue';
import { mapStores } from "pinia";
import CardComp from "../components/CardComp.vue"
import { useCardsStore } from "@/stores/card";
    export default {
        components : {
            BreadCrumb,
            CardComp
        },
        computed: {
            ...mapStores(useCardsStore),
        },
        mounted() {
            this.cardsStore.selectedGroup = this.cardsStore.groups[0]
            console.log(this.cardsStore.groups);
        }
    }
</script>

<style lang="scss" scoped>
.bread-crumb {
    padding-bottom: 20px;
}
    .sort {
        &__flex {
            margin-top: 30px;
            padding: 1rem;
            background: #e74c4c;
            box-shadow: 0 4px 4px rgba(231,76,76,.35);
            border-radius: 4px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: auto;
        }
        &__box {
            padding:5px 10px;
            border-right: 1px solid #21252985 ;
            color: #fff;
            cursor: pointer;
            font-size: 15px;
            &:last-child {
                border: none;
            }
        }
    }
    .products {
        &__flex {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
        }
        &__title {
            padding-top: 35px;
            padding-bottom: 40px;
        }
    }
    @media only screen and (max-width: 576px) {
        .sort {
            &__flex {
                flex-direction: column;
                text-align: left;
                justify-content: start;

            }
            &__box {
                width: 100%;
                border: none;
                border-bottom: 1px solid #ffffff4b;
                padding: 10px 15px;
            }
        }
    }
</style>