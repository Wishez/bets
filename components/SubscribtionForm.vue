<template>
  <form class="font-size_12 subscribtionForm parent row nowrap grow h-between margin-top_base-phone margin-bottom_base-phone">
    <label 
      class="subscribtionForm__label parent centered margin-left_auto width_fill-phone"
      for="subscribtion_email">
      Подписаться на рассылку:
    </label>
    <div class="relative controller parent row nowrap grow margin_centered-phone margin-top_small-phone">
      <!-- <p>Вы ввели: {{ subscribtion_email }}</p> -->
      <input 
        id="subscribtion_email"
        v-model.trim="subscribtion_email"
        class="round_25 controller__input"
        type="email" 
        name="subscribtion_email" 
        placeholder="Введите ваш e-mail" 
        autocomplete="email" 
      >
      <base-button 
        :action="onSubmit"
        type="submit" 
        modifier="blue"
        class-name="text_upper absolute position_right-base controller__button"
      >
        Отправить
      </base-button>		
    </div>
  </form>
</template>

<script>
import { subscribtionUrl } from "@/constants/conf";
import { prevent, timeout } from "@/constants/pureFunctions";

import Cookies from "js-cookie";

export default {
  name: "SubscribtionForm",
  components: {},
  mixins: [],
  props: {},
  data: () => ({
    subscribtion_email: "",
    response: {
      serverMessage: "",
      success: false,
      error: false,
      requestion: false
    }
  }),
  methods: {
    setResponseData(data) {
      this.$set(this, "response", data);
    },
    onSubmit(event) {
      event.preventDefault();
      // Ссылка на объект состояния формы.
      const oldResponseData = this.response;
      // Извлекаем данные. При необходимости,
      // ключ (user_email) по которому будет присваиваться
      // подписка можно поменять.
      const data = {
        user_email: this.subscribtion_email
      };
      // Заботимся об безопасности.
      const csrftoken = Cookies.get("csrftoken");

      // POST запрос на подписку.
      this.$axios({
        method: "post",
        url: subscribtionUrl,
        headers: {
          "X-CSRFToken": csrftoken
        },
        data
      })
        .then(response => {
          // Успешно отправляем сообщение с сервера в отображение.
          this.setResponseData({
            ...oldResponseData,
            serverMessage: response.data,
            requesting: false,
            success: true
          });
        })
        .catch(error => {
          // Сообщение об ошибке.
          this.setResponseData({
            ...oldResponseData,
            serverMessage: `Внутренняя ошибка сервера: ${error}`,
            requesting: false,
            error: true
          });
          // Таймаут, по истечению которого сообщение об ошибки
          // скрывается.
          timeout(() => {
            this.setResponseData({
              ...oldResponseData,
              error: false,
              serverMessage: ""
            });
          }, 3000);
        });
      prevent(event);
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/conf/_colors.sass'
@import '../assets/sass/conf/_easing.sass'
@import '../assets/sass/conf/_sizes.sass'
@import '../assets/sass/conf/_breakpoints.sass'
.subscribtionForm
  max-width: 39%
  min-height: em(39, 12)
  transform: translateY(5px)
  @include breakpoint(max-width em($containerWidth))
    min-width: 100%
  @include breakpoint($phone-less)
      flex-wrap: wrap
  &__label
    padding-right: em(20, 12)
    @include breakpoint($phone-less)
        padding-right:  0
.controller
  max-width: em(265, 12)
  min-height: em(39, 12)
  &__input
    min-width: 100%
    text-indent: 14px
  &__button
    top: 3px
    right: 3px
    position: absolute
</style>
