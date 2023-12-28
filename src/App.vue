<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapStores } from "pinia";
import { useCardsStore } from "@/stores/card";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from "axios"

export default {
  data() {
    return {
      showRegister: false,
      enteredNumber: "",
      enteredName: "",
      selectedOption: null,
      searchKey: ""
    }
  },
  computed: {
    ...mapStores(useCardsStore)
  },
  async mounted() {
    let progress = this.$progress.start();
    const response = await axios.get("http://localhost:3000/groups");
    this.cardsStore.groups = response.data
    progress.finish()
    this.cardsStore.username = localStorage.getItem("username") || ""
    this.cardsStore.telNumber = localStorage.getItem("telNumber") || ""
  },
  methods: {
    increase(p) {
      p.count += 1
      this.cardsStore.payment += p.price
      if (!this.cardsStore.wishlist.includes(p)) {
        this.cardsStore.wishlist.push(p)
      }
    },
    decrease(p) {
      p.count -= 1
      if (p.count <= 0) {
        this.cardsStore.wishlist = this.cardsStore.wishlist.filter(card => card.id != p.id)
      }
      this.cardsStore.payment -= p.price
    },
    async sendRequest() {
      let counter = 1
      let text = ""
      let now = new Date()
      let current = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
      let time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      for (let i = 0; i < this.cardsStore.wishlist.length; i++) {
        text += `%0AProduct ${counter}:%0AId: ${this.cardsStore.wishlist[i].id}%0AName: ${this.cardsStore.wishlist[i].name}%0ACount: ${this.cardsStore.wishlist[i].count}%0A`
        counter++
      }
      let response = await axios.get(`https://api.telegram.org/bot6715697333:AAEmAxIpoi8Wyb2C0ObJpZOOtLXkOVQGI3Q/sendMessage?chat_id=237282713&text=Date: ${current} ${time}%0AUsername: ${this.cardsStore.username}%0ATelephone Number: ${this.cardsStore.telNumber}%0A%0ABookings:%0A${text}%0A%0ATotal Payment: ${this.cardsStore.payment.toLocaleString()} so'm`)
    },
    submitBooking() {
      if (this.showRegister) {
        localStorage.setItem("username", this.enteredName)
        localStorage.setItem("telNumber", this.enteredNumber)
        toast.success("Successfully created account", {
          autoClose: 1000,
          theme: "colored"
        });
        this.enteredNumber = ""
        this.showRegister = false
      } else {
        this.cardsStore.username = localStorage.getItem("username") || ""
        this.cardsStore.telNumber = localStorage.getItem("telNumber") || ""
        if (this.cardsStore.telNumber == this.enteredNumber) {
          toast.info("We send your request. We will contact with you, soon !", {
            autoClose: 1000,
            theme: "colored"
          });
          this.sendRequest()
          for (let i = 0; i < this.cardsStore.wishlist.length; i++) {
            this.cardsStore.wishlist[i].count = 0
          }
          this.cardsStore.wishlist = []
          this.cardsStore.payment = 0
        } else {
          toast.error("We didn't registered this number yet", {
            autoClose: 1000,
            theme: "colored"
          });
        }
      }
    },
  },
}

</script>

<template>
  <vue3-progress-bar></vue3-progress-bar>
  <header class="header">
    <div class="container-fluid header__container">
      <div class="d-flex justify-content-between align-items-center">
        <div class="header__logo"><img src="../public/logo.svg" alt="Logo"></div>
        <a href="#" class="header__city active">Buxoro</a>
        <nav class="header__nav">
          <ul class="menu d-none d-lg-flex">
            <router-link to="/menu">
              <li class="menu-item">MENU</li>
            </router-link>
            <router-link to="/news">
              <li class="menu-item">NEWS</li>
            </router-link>
            <router-link to="/restaurants">
              <li class="menu-item">RESTAURANTS</li>
            </router-link>
            <router-link to="/gallery">
              <li class="menu-item">GALLERY</li>
            </router-link>
          </ul>
          <a href="#" class="header__eng d-none d-sm-flex" data-bs-toggle="offcanvas" data-bs-target="#langOffcanvas"
            aria-controls="langOffcanvas">English</a>
          <a href="#" class="header__aksiya d-none d-xxl-flex">Sales</a>
          <a href="#" class="header__year d-none d-xxl-flex">1089</a>
          <a class="header__search" data-bs-toggle="offcanvas" href="#searchOffcanvas" role="button"
            aria-controls="searchOffcanvas">
            <img src="../public/search.svg" alt="search">
          </a>
          <a href="#" class="header__account">
            <img src="../public/account.svg" alt="account">
          </a>
          <a href="#" class="header__shop" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop"
            aria-controls="staticBackdrop">
            <img src="../public/shopping_cart.svg" alt="shop">
            <div class="badge" v-if="cardsStore.wishlist.length">
              {{ cardsStore.wishlist.length }}
            </div>
          </a>
          <a href="#" class="header__bar d-none d-sm-block" data-bs-toggle="offcanvas" data-bs-target="#menuBar"
            aria-controls="menuBar">
            <img src="../public/menu.svg" alt="bar">
          </a>
          <a href="#" class="header__bar d-sm-none" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu"
            aria-controls="mobileMenu">
            <img src="../public/menu.svg" alt="bar">
          </a>

        </nav>

      </div>
    </div>
  </header>

  <div class="offcanvas offcanvas-top" tabindex="-1" id="searchOffcanvas" aria-labelledby="searchOffcanvas">
    <div class="offcanvas-body">
      <div>
        <input type="text" placeholder="Search" v-model="searchKey">
        <template v-for="product in cardsStore.products">
          <a v-if="product.name.toLowerCase().includes(searchKey.toLowerCase()) && searchKey" :href="`#${product.id}`" class="alert alert-secondary d-block mt-3" role="alert">
            {{ product.name }}
          </a>
        </template>
        <template v-for="group in cardsStore.groups">
          <a v-if="group.name.toLowerCase().includes(searchKey.toLowerCase()) && searchKey" :href="`#${group.id}`" class="alert alert-secondary d-block mt-3" role="alert">
            {{ group.name }}
          </a>
          
        </template>
      </div>
    </div>
  </div>

  <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenu">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Yaponamama</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="mobile__menu">
        <router-link to="/about-us">About Us</router-link>
        <router-link to="/menu">MENU</router-link>
        <router-link to="/">AKSIYALAR</router-link>
        <router-link to="/restaurants">RESTORANLAR</router-link>
        <router-link to="/">YETKAZIB BERISH</router-link>
        <router-link to="/gallery">GALEREYA</router-link>
        <router-link to="/">ALOQA</router-link>
        <router-link to="/">ISH O'RINLARI</router-link>
        <router-link to="/">ALOQA</router-link>
        <router-link to="/">RESTORANGA KELISH SHARTLARI</router-link>
      </div>
      <div class="row my-3">
        <template v-for="group in cardsStore.groups" :key="`${group.name}`">
          <div class="col-6 d-flex justify-content-center text-center">
            <a class="mini__card" style="color: #201e1e; font-size: 16px;" :href="`#${group.id}`">
              <img :src='`https://cdn.yaponamama.uz/products/thumbs/${group.list_image}`' alt="miniImage">
              <p>{{ group.name.split(" ")[0] }}</p>
            </a>
          </div>
        </template>
      </div>
    </div>
  </div>

  <div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop"
    aria-labelledby="staticBackdropLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="staticBackdropLabel">Cart</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="wish" v-for="wishProduct in cardsStore.wishlist">
        <div class="row">
          <div class="col-4">
            <img :src="`https://cdn.yaponamama.uz/products/thumbs/${wishProduct.image}`" :alt="wishProduct.name">
          </div>
          <div class="col-8">
            <h2>{{ wishProduct.name }}</h2>
            <p>{{ wishProduct.description }}</p>
            <div class="row">
              <div class="col-4">
                <h3>{{ wishProduct.price.toLocaleString() }}</h3>
              </div>
              <div class="col-8 d-flex justify-content-end align-items-center">
                <div class="count">
                  <span class="count__minus" @click="decrease(wishProduct)"><i class="fa-solid fa-minus"></i></span>
                  <span class="count__num">{{ wishProduct.count }}</span>
                  <span class="count__plus" @click="increase(wishProduct)"><i class="fa-solid fa-plus"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p v-if="cardsStore.wishlist.length == 0" class="text-center pt-5">
        Your basket is empty. <br>
        Please add products
      </p>
    </div>
    <div class="offcanvas-footer" v-if="cardsStore.payment != 0">
      <div class="d-grid">
        <button class="btn btn-danger btn-lg offcanvas__btn" data-bs-toggle="offcanvas" href="#offcanvasOrder"
          role="button" aria-controls="offcanvasOrder">
          <span>Checkout</span>
          <span>{{ cardsStore.payment.toLocaleString() }} sum</span>
        </button>
      </div>
    </div>
  </div>

  <div class="offcanvas booking offcanvas-top offcanvas-top-2" tabindex="-1" id="offcanvasOrder"
    aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-body">
      <div>
        <img src="../public/logo.svg" alt="Logo">
        <form @submit.prevent="submitBooking" class="mt-4">
          <div class="mb-4" v-if="showRegister">
            <input type="text" v-model="enteredName" class="form-control form-control-lg mb-4"
              id="exampleFormControlInput1" placeholder="Please enter name">
            <input type="date" class="form-control form-control-lg" id="exampleFormControlInput1"
              placeholder="Please enter name">
          </div>
          <div class="mb-4">
            <input type="tel" v-model="enteredNumber" class="form-control form-control-lg" id="exampleFormControlInput1"
              placeholder="+998 91 999 99 99">
          </div>
          <div class="d-grid">
            <button class="btn text-center btn-danger btn-lg submit__btn"
              :data-bs-dismiss="cardsStore.telNumber == enteredNumber ? 'offcanvas' : ''"
              :aria-label="cardsStore.telNumber == enteredNumber ? 'Close' : ''" type="submit">Submit</button>
          </div>
          <p class="mt-3 p-0 mb-0" style="cursor: pointer;"
            v-text="showRegister ? 'I already have an account' : 'Register'" @click="showRegister = !showRegister">
          </p>
        </form>
      </div>
    </div>
  </div>

  <div class="offcanvas offcanvas-top" tabindex="-1" id="menuBar" aria-labelledby="menuBar">
    <div class="row">
      <div class="col-12 d-flex justify-content-end">
        <button style="z-index: 34;" type="button" class="btn-close" data-bs-dismiss="offcanvas"
          aria-label="Close"></button>
      </div>
    </div>
    <div class="offcanvas-body" style="margin-top: -30px;">
      <router-link to="/about-us">ABOUT US</router-link>
      <router-link to="/menu">MENU</router-link>
      <router-link to="/">SALES</router-link>
      <router-link to="/restaurants">RESTAURANTS</router-link>
      <router-link to="/delivery">DELIVERY</router-link>
      <router-link to="/gallery">GALLERY</router-link>
      <router-link to="/contact">CONTACT</router-link>
      <router-link to="/vacancy">VACANCY</router-link>
      <router-link to="/offer">PUBLIC OFFER</router-link>
      <router-link to="/rules">RESTAURANT VISITING RULES</router-link>
    </div>
  </div>

  <div class="offcanvas offcanvas-top" tabindex="-1" id="langOffcanvas" aria-labelledby="langOffcanvas">
    <div class="offcanvas-body">
      <h5 class="text-center py-3">Choose language</h5>
      <ul class="lang">
        <li class="lang__item"><img src="../public/uz.png" alt="uz"><a href="#">Uzbek</a></li>
        <li class="lang__item"><img src="../public/eng.png" alt="eng"><a href="#">English</a></li>
        <li class="lang__item"><img src="../public/ru.png" alt="uz"><a href="#">Uzbek</a></li>
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
                <li><router-link to="/about-us">About Us</router-link></li>
                <li><router-link to="/menu">Menu</router-link> </li>
                <li><router-link to="/">Sales</router-link></li>
                <li><router-link to="/restaurants">Restaurant</router-link> </li>
                <li><router-link to="/delivery">Delivery</router-link></li>
              </ul>
              <ul class="footer__menu">
                <li><router-link to="/gallery">Gallery</router-link> </li>
                <li><router-link to="/contact">Contacts</router-link></li>
                <li><router-link to="/offer">Public Offer</router-link></li>
                <li><router-link to="/rules">Restaurant Visiting Rules</router-link></li>
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
          <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center  justify-content-lg-start">
            <div class="footer__title text-center text-lg-start ">
              <p>© 2023 Yaponamama. Barcha huquqlar ximoyalangan.</p>
            </div>
          </div>
          <div
            class="col-12 col-lg-6 mt-4 mt-lg-0 d-flex footer__past text-center text-lg-end justify-content-center justify-content-lg-end  align-items-center">
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
@import "@marcoschulte/vue3-progress/dist/index.css";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Rubik', sans-serif;
}

.offcanvas,
.offcanvas-lg,
.offcanvas-md,
.offcanvas-sm,
.offcanvas-xl,
.offcanvas-xxl {
  --bs-offcanvas-width: 450px;
}

#searchOffcanvas {
  max-width: 500px;
  height: auto;
  bottom: auto;
  margin: 0 auto;
  top: 30px;
  border-radius: 5px;
  bottom: auto;
  max-height: 93vh;


  input {
    width: 100%;
    padding: 12px 18px;
    outline: none;
    border: 1px solid #ccc;
    color: #a3a2a2;
    font-size: 15px;
  }
}

@media screen and (max-width: 576px) {
    #searchOffcanvas {
      max-width: 330px;
    }
}

#menuBar {
  height: 100%;
  background-image: url(../public/menu_bg.png);
  width: 100%;
  overflow: hidden;

  .offcanvas-body {
    padding: 20px;
    z-index: 12;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    a {
      margin-bottom: 15px;
      text-decoration: none;
      color: #fff;
      font-size: 30px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(255, 120, 120, .92), rgba(220, 77, 77, .8188));
  }

  .btn-close {
    background-image: url(../public/close.svg);
    color: #fff;
    background-size: 45px;
    opacity: 0.8;
    margin-top: 15px;
    margin-right: 20px;
  }
}

.mobile {
  &__menu {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid #e9ecef;

    a {
      color: #201e1e;
      font-size: 14px;
      margin-bottom: 15px;
    }
  }
}

.lang {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  max-width: 150px;
  margin: 0 auto;

  img {
    margin-right: 15px;
    width: 35px;
  }

  &__item {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    align-items: center;

    a {
      font-size: 1.1rem;
      color: #273c52;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

#langOffcanvas {
  max-width: 350px;
  margin: 0 auto;
  border-radius: 5px;
  top: 30px;
  height: auto;
  bottom: auto;
}

.vue3-progress-bar-container .vue3-progress-bar {
  background-color: #e43a3a;
}

.submit {
  &__btn {
    word-wrap: break-word;
    box-sizing: border-box;
    text-decoration: none;
    font-weight: 400;
    text-align: center;
    user-select: none;
    border: 1px solid transparent;
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
      transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
      background: #e43a3a;
      background-color: #c82333;
      border-color: #bd2130;
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
}

.offcanvas {
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
    font-size: 1rem;
    line-height: 1.5;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    background: #e43a3a;
    border-color: #e43a3a;
    border-radius: 3px;
    color: #fff;
    padding-left: 2rem;
    padding-right: 2rem;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
      transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
      background: #e43a3a;
      background-color: #c82333;
      border-color: #bd2130;
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

  &-footer {
    padding: 15px 20px;
    background-color: #f7f7f7;
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
    border-top-left-radius: calc(0.3rem - 1px);
    border-top-right-radius: calc(0.3rem - 1px);
    background-color: #f7f7f7;
  }

  &-body {
    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 25px;
    }

    &::-webkit-scrollbar-thumb {
      background: #dddddd;
      border-radius: 25px;
    }
  }

}

.booking {
  left: calc(50% - 210px) !important;
  height: auto !important;

  img {
    width: 200px;
    margin-bottom: 30px;
  }

  .form-control-lg {
    font-size: 17px;
  }
}

.booking.offcanvas {
  bottom: auto !important;
  max-width: 420px;
  padding: 30px 20px;
  border-radius: 5px;
  text-align: center;
}

.booking.offcanvas-top {
  top: calc(50% - 240px);
}


.count {
  display: flex;
  align-items: center;

  &__num {
    font-weight: 500;
    padding: 0 15px;
    font-size: 18px;
  }

  &__plus,
  &__minus {
    cursor: pointer;
  }
}

img {
  max-width: 100%;
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

.wish {
  border-bottom: 1px solid #ddd;
  padding: 15px 20px;

  &:last-child {
    border: none;
    padding-bottom: 0;
  }

  h2 {
    margin: 0;
    padding: 0;
    text-align: left;
    color: #201e1e;
    word-wrap: break-word;
    box-sizing: border-box;
    margin-top: 0;
    font-size: 1.25rem;
    font-weight: 600;
    font-family: 'Rubik', sans-serif;
    margin-bottom: 0;
    line-height: 30px;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }

  }

  p {
    height: 35px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    font-weight: 400;
    line-height: 135%;
    margin-bottom: 7px;
    color: rgba(0, 0, 0, .5);
  }

  h3 {
    font-size: 1.28rem;
    font-weight: 500;
    margin-bottom: 0;
    line-height: 35px;
  }
}

.media {
  display: flex;
  justify-content: end;

  &__list {
    margin-left: 10px;

    a {
      img {
        height: 40px;
      }
    }
  }
}

.footer {
  z-index: 45;
  background-color: #fff;

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

  &__past {
    flex-direction: row;

    @media screen and (max-width: 576px) {
      flex-direction: column;

      img {
        margin-top: 20px;
      }
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
    color: rgba(32, 30, 30, .55);
    font-size: 14px;
  }

  &__text {
    display: block;
    margin-bottom: 20px;
    font-size: 14px;
  }

  &__top {
    margin-top: 30px;
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
      a {
        color: #201e1e;
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
  z-index: 9;
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

    &__bar,
    &__shop,
    &__account,
    &__search,
    &__year,
    &__aksiya {
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
    background: linear-gradient(180deg, rgba(255, 120, 120, .92), rgba(220, 77, 77, .8188));

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
      letter-spacing: 0.5px;
      transition: all .3s ease-in-out;
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
  background-color: #e43a3a;
  width: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 17px;
  border-radius: 50px;
  color: #fff;
}</style>