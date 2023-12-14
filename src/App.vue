<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapStores } from "pinia";
import { useCardsStore } from "@/stores/card";
export default {
  data(){
    return {
      pop : false,
      cities : false
    }
  },
  mounted() {
    window.onload = () => {
      this.cities = true
    }
  },
  computed : {
    ...mapStores(useCardsStore)
  }
}

</script>

<template>
  <header class="header">
    <div class="container-fluid header__container">
      <div class="d-flex justify-content-between align-items-center">
          <div class="header__logo"><img src="../public/logo.svg" alt="Logo"></div>
          <a href="#" class="header__city active">Buxoro</a>
          <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
          <nav class="header__nav">
            <ul class="menu d-none d-lg-flex">
              <router-link to="/">
                <li class="menu-item">MENU</li>
              </router-link>
              <router-link to="/news">
                <li class="menu-item">NEWS</li>
              </router-link>
              <router-link to="/restraunts">
                <li class="menu-item">RESTAURANTS</li>
              </router-link>
              <router-link to="/gallery">
                <li class="menu-item">GALLERY</li>
              </router-link>
            </ul>
            <a href="#" class="header__eng d-none d-sm-flex">English</a>
            <a href="#" class="header__aksiya d-none d-xxl-flex">Sales</a>
            <a href="#" class="header__year d-none d-xxl-flex">1089</a>
            <a href="#" class="header__search">
              <img src="../public/search.svg" alt="search">
            </a>
            <a href="#" class="header__account">
              <img src="../public/account.svg" alt="account">
            </a>
            <a href="#" class="header__shop">
                <img src="../public/shop.svg" alt="shop">
                <div class="badge">
                  {{ cardsStore.wishlist.length }}
                </div>                
            </a>
            <a href="#" class="header__bar" @click="pop = true">
              <img src="../public/menu.svg" alt="bar">
            </a>
          </nav>

      </div>

    </div>
  </header>

  <div class="popup" v-if="pop">
    <div class="popup__close">
      <i class="fa-solid fa-xmark" @click="pop = false"></i>
    </div>
    <div class="popup__menu">
      <ul class="menu">
        <router-link to="/"><li class="menu-item">ABOUT US</li></router-link>
        <router-link to="/"><li class="menu-item">MENU</li></router-link>
        <router-link to="/"><li class="menu-item">SALES</li></router-link>
        <router-link to="/"><li class="menu-item">RESTAURANTS</li></router-link>
        <router-link to="/"><li class="menu-item">DELIVERY</li></router-link>
        <router-link to="/"><li class="menu-item">GALLERY</li></router-link>
        <router-link to="/"><li class="menu-item">CONTACTS</li></router-link>
        <router-link to="/"><li class="menu-item">VACANCY</li></router-link>
        <router-link to="/"><li class="menu-item">PUBLIC OFFER</li></router-link>
        <router-link to="/"><li class="menu-item">RESTAURANT VISITING RULES</li></router-link>
      </ul>
    </div>
  </div>

  <RouterView />

  <footer class="footer">
    <div class="footer__top">
      <div class="container-fluid header__container">
        <div class="row">
          <div class="col-12 col-lg-4 mb-3">
            <img src="../public/logo.svg" alt="logo">
          </div>
          <div class="col-12 col-lg-8">
            <div class="d-flex justify-content-between footer__part">
              <ul class="footer__menu">
              <li>BIZ HAQIMIZDA</li>
              <li>MENU</li>
              <li>AKSIYALAR</li>
              <li>RESTORANLAR</li>
              <li>YETKAZIB BERISH</li>
            </ul>
            <ul class="footer__menu">
              <li>GALEREYA</li>
              <li>ALOQA</li>
              <li>OMMAVIY TAKLIF</li>
              <li>RESTORANGA KELISH SHARTLARI</li>
            </ul>
            <div class="footer__social text-center text-sm-end">
              <p class="footer__tel">
                <a href="tel:1089">1089</a>
              </p>
              <p class="footer__time">10:00 dan 02:00 gacha</p>
              <span class="footer__text">Ijtimoiy tarmoqlarda ulashing</span>
              <ul class="media">
                <li class="media__list"><a href="#"><img src="../public/facebook.svg" alt="facebook"></a></li>
                <li class="media__list"><a href="#"><img src="../public/telegram.svg" alt="telegram"></a></li>
                <li class="media__list"><a href="#"><img src="../public/youtube.svg" alt="youtube"></a></li>
                <li class="media__list"><a href="#"><img src="../public/instagram.svg" alt="instagram"></a></li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container-fluid header__container">
        <div class="row">
          <div class="col-12 col-lg-6 d-flex align-items-center">
            <div class="footer__title">
              <p>© 2023 Yaponamama. Barcha huquqlar ximoyalangan.</p>
            </div>
          </div>
          <div class="col-12 col-lg-6 d-flex justify-content-center justify-content-sm-end  align-items-center">
            <h6>MOBIL ILOVANI KO'CHIRISH</h6>
            <a href="#">
              <img src="../public/googleplay.svg" alt="google">
            </a>
            <a href="#">
              <img src="../public/apple.svg" alt="google">
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>

</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Rubik', sans-serif;
}

a {
  text-decoration: none;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style-type: none;
}

img {
  max-width: 100%;
}



.media {
  display: flex;
  justify-content: end;
  &__list  {
    margin-left: 10px;
    a {
      img {
        height: 40px;
      }
    }
  }
}

.footer {
  img {
    height: 60px;
  }

  &__bottom {
    padding-top: 20px;
    padding-bottom: 20px;
    h6 {
      font-size: 15px;
      margin: 0;
    }
    img {
      height: 35px;
      margin-left: 20px;
    }
  }


  &__tel {
    margin: 0;
    a {
      text-decoration: none;
      color: #201e1e;
      font-weight: 500;
      font-size: 20px;
      margin: 0;
    }
  }
  &__time {
    color: rgba(32,30,30,.55);
    font-size: 14px;
  }
  &__text {
    display: block;
    margin-bottom: 20px;
    font-size: 14px;
  }
  &__top {
    margin-top: 85px;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    padding-top: 4rem;
    padding-bottom: 3rem;
  }
  &__menu {
    li {
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &__title {
    p {
      margin-bottom: 0;
    }
  }
}


.header {
  position: fixed;
  z-index: 9999999;
  background-color: #fff;
  width: 100%;
  top: 0;
  left: 0;
  border-bottom: 1px solid #ccc;

  &__nav {
    display: flex;
    align-items: center;
    padding: 12px 0;
  }

  &__logo {
    padding: 10px 0px;

    img {
      height: 45px;
      @media only screen and (max-width: 992px) {
        height: 37px;
      }
    }
  }

  &__container {
    max-width: 1400px;
    margin: 0 auto;
  }

  a {
    color: #201e1e;
  }

  &__city {
    font-weight: 500;
  }

  &__city.active {
    color: #e43a3a;
  }

  .menu {
    padding: 10px 20px 7px 0px;
  display: flex;

    &-item {
      font-size: 14px;
      margin-left: 30px;
      font-weight: 500;
    }

    .router-link-exact-active {
      color: #e43a3a;
    }
  }
  &__eng {
    padding-right: 1.2rem;
    padding-left: 4rem;
    border: 1px solid #000;
    border-top: none;
    border-bottom: none;
    border-color: #b5b3b3;
    background-image: url(../public/eng.png);
    background-repeat: no-repeat;
    background-size: 25px;
    background-position: 1.5rem;
  }
  &__aksiya {
    padding-right: 1.2rem;
    padding-left: 4rem;
    border: 1px solid #000;
    border-top: none;
    border-left: none;
    border-bottom: none;
    border-color: #b5b3b3;
    background-image: url(../public/aksiya.svg);
    background-repeat: no-repeat;
    background-size: 25px;
    background-position: 1.5rem 0.055rem;
    color: #e43a3a !important;
  }
  &__year {
    color: #201e1e;
    padding-right: 1.2rem;
    padding-left: 1.2rem;
    font-weight: 600;
    font-size: 18px;
    border-right: 1px solid #b5b3b3;
  }
  &__search {
    color: #201e1e;
    padding-right: 1.2rem;
    padding-left: 1.2rem;
  }
  &__account {
    color: #201e1e;
    padding-right: 1.2rem;
    padding-left: 1.2rem;
    font-size: 15px;
  }
  &__shop {
    color: #201e1e;
    padding-right: 1.2rem;
    padding-left: 1.2rem;
    font-size: 15px;
    position: relative;
  }
  &__bar {
    color: #201e1e;
    padding-right: 1.2rem;
    padding-left: 1.2rem;
    font-size: 15px;
  }

}

@media only screen and (max-width: 576px) {
  .media {
    justify-content: center;
    align-items: center;
  }
  .header {
    &__bar, &__shop, &__account, &__search,&__year, &__aksiya {
      padding-left: 10px;
      padding-right: 10px;
    }
    &__bar {
      padding-right: 0;
    }
    &__city {
      padding-left: 11px;
    }
  }
  .footer {
    &__top {
      padding-top: 3rem;
      margin-top: 50px;
      padding-bottom: 2rem;
      img {
        display: flex;
        height: 45px;
        margin: 0 auto;
        justify-content: center;
      }
    }
    &__part {
      flex-direction: column;
      text-align: center;
    }
    &__bottom {
      .col-12 {
        justify-content: center;
      }
    }
  }
}

.popup {
  position: fixed;
  width: 100%;
  padding-top: 25px;
  padding-bottom: 25px;
  background: url(../public/menu_bg.png);
  background-size: contain;
  background-position: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; 
  color: #fff;
  font-size: 30px;
  transition: all .5s ease-in-out;
  z-index: 999999999999;
  @media only screen and (max-width: 992px) {
    font-size: 25px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  // background: ;
  &::after {
    width: 100%;
    content: "";
    position: absolute;
    height: 100%;
    z-index: -1;
    background: linear-gradient(180deg,rgba(255,120,120,.92),rgba(220,77,77,.8188));  

  }
  &__close {
    width: 90%;
    font-size: 45px;

    display: flex;
    justify-content: end;
    align-items: center;
    text-align: end;
    @media only screen and (max-width: 992px) {
        font-size: 30px;
    }
    * {
      cursor: pointer;
    }
  }
  &__menu {
    flex-direction: column;
  }
  .menu {
    &-item {
      margin-bottom: 18px;
      letter-spacing: 0.5;
      transition: 0.3 all .3s;
      cursor: pointer;
      color: #fff;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
}

.badge {
  color: black;
  margin: 0;
  padding: 0;
  position: absolute;
  top: -7px;
  right: 10px;
  z-index: 2;
  line-height: 1;
  font-size: 9px;
  font-weight: 400;
  background-color:#e43a3a;
  width: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 17px;
  border-radius: 50px;
  color: #fff;
}

</style>