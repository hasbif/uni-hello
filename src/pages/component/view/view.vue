<template>
  <view>
    <page-head title="view"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view>
        <text>Login phone number: Identify</text>

        <input
          placeholder="Phone number"
          v-model="phoneNumber"
          :disabled="loggedIn"
        />
        <button v-on:click="loginLogoutButton">
          {{ buttonType }}
        </button>
        <text>Trackers</text>
        <button v-on:click="handleApplyOffer">Apply Offer</button>
        <button v-on:click="handleMenuOffer">Menu Offer</button>
      </view>
    </view>
  </view>
</template>
<script>
import {
  login,
  logout,
  clickBtnApplyOffer,
  clickMenuOffers,
} from "../../../cxp/exampleTrackers";
import button from "../button/button.vue";

export default {
  components: { button },
  data: function () {
    return {
      phoneNumber: "",
      loggedIn: !!localStorage.getItem("phoneNumber"),
    };
  },
  mounted() {
    window.addEventListener("localstorage-changed", (event) => {
      this.data = !!event.detail.phoneNumber;
    });
  },
  computed: {
    buttonType: function () {
      return this.loggedIn ? "Logout" : "Login";
    },
  },
  methods: {
    handleLogin: function () {
      login(this.phoneNumber);
    },
    handleLogout: function () {
      logout();
    },
    loginLogoutButton: function () {
      if (this.loggedIn) return this.handleLogout();
      this.handleLogin();
    },
    handleMenuOffer: function () {
      clickMenuOffers();
    },
    handleApplyOffer: function () {
      clickBtnApplyOffer();
    },
  },
};
</script>

<style>
.flex-item {
  width: 33.3%;
  height: 200rpx;
  text-align: center;
  line-height: 200rpx;
}

.flex-item-V {
  width: 100%;
  height: 150rpx;
  text-align: center;
  line-height: 150rpx;
}

.text {
  margin: 15rpx 10rpx;
  padding: 0 20rpx;
  background-color: #ebebeb;
  height: 70rpx;
  line-height: 70rpx;
  text-align: center;
  color: #777;
  font-size: 26rpx;
}

.desc {
  /* text-indent: 40rpx; */
}
.flex-pc {
  display: flex;
  justify-content: center;
}
</style>
