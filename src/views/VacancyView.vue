<template>
    <div>
        <div class="container header__container">
            <BreadCrumb/>
            <div class="vacancy">
                <h6 class="mt-5 mb-3">1. О компании</h6>
                <p>Группа компаний Mika Group — это сеть ресторанов Японамама, MayorTayyor, Nesu Kuksu и KAI ZEN. На нашем счету более 8 лет успешной работы в сфере общественного питания. Мы имеем филиалы в 4-х регионах Узбекистана и планируем расширение до масштабов всей страны. Наша миссия ­— накормить жителей Узбекистана вкусной паназиатской кухней и предоставить им высококачественный сервис!</p>
                <p>На сегодняшний день мы являемся лидерами рынка в сфере общественного питания на территории Узбекистана. Мы выступаем за продвижение каждого сотрудника внутри нашей компании. Большинство из управляющего состава начинали свою карьеру у нас в качестве официантов, курьеров и даже поваров. Также большое количество сотрудников были обучены и переквалифицированы в ходе работы с учётом их собственных интересов.</p>
                <p>Преимущества:</p>
                <p>- работа по мировым стандартам ISO;</p>
                <p>- собственная система развития сотрудников;</p>
                <p>- система мотивации;</p>
                <p>- возможность обучаться;</p>
                <p>- возможность карьерного роста с любой линейной позиции до управляющего и даже соучредителя.</p>
                <h6 class="mt-5 mb-5">2. Вакансии</h6>
                
                <template v-if="vacancies">
                    <div class="vacancy__box" v-for="(vacancy, i) in vacancies" :key="i">
                        <h4>- {{ vacancy.position }}</h4>
                        <a :href="vacancy.more_details">Подробнее о вакансии</a>
                        <a :href="vacancy.bot">Оставить заявку</a>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import BreadCrumb from '../components/BreadCrumb.vue';
export default {
    data() {
        return {
            vacancies : []
        }
    },
    components : {
        BreadCrumb
    },
    async mounted() {
        let progress = this.$progress.start();
        const response = await axios.get("http://localhost:3000/vacancies/")
        this.vacancies = response.data
        progress.finish()
    }
}
</script>

<style lang="scss" scoped>
.vacancy {
    p {
        line-height: 2;
    }
    &__box {
        margin-bottom: 60px;
        a {
            display: block;
            margin-bottom: 14px;
        }
        h4 {
            font-style: italic;
            margin-bottom: 20px;
            font-size: 16px;
            font-weight: 700;
        }
    }
}

</style>