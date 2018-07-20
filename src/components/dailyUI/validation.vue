<template>
    <div class="box">
        <div class="content">
            <h6 class="unitTile">Week6_Validation</h6>
            <div class="formCtn">
                <div class="stepBox">
                    <ul>
                        <li v-for="(condition, index) in stepList" :key="index">                            
                            <font-awesome-icon :icon="['fas',(stepList[index].step ? (stepList[index].valid ? 'check-circle' : 'bullseye') : 'genderless')]"/>
                        </li>
                    </ul>
                </div>
                <div class="prompt">
                    <h6>{{ stepList[stepIndex].title }}</h6>
                    <p>{{ stepList[stepIndex].text }}</p>
                </div>
                <div class="formBox step1" v-show="stepList[0].step">
                    <form method="post">
                        <div class="inputBox col12" :class="{'error':validInput.account}">
                            <label for="account">Account</label>
                            <input type="email" id="account" v-model.trim="inputData.account" placeholder="example@email.com">
                            <div class="errorText">INVALID EMAIL</div>
                        </div>
                        <div class="inputBox col12" :class="{'error':validInput.psw}">
                            <label for="psw">Password</label>
                            <input type="password" id="psw" v-model.trim="inputData.psw" minlength="8">
                            <div class="errorText">MINIMUM 8 CHARACTERS</div>
                        </div>
                        <div class="inputBox col12" :class="{'error': inputData.cpsw}">
                            <label for="cpsw">Comfirm Password</label>
                            <input type="password" id="cpsw" v-model.trim="inputData.cpsw">
                            <div class="errorText">NOT MATCH</div>
                        </div>
                        <button class="nextClickBtn" @click="nextClick(1)" :disabled="!stepList[0].valid">SUBMIT & NEXT</button>
                    </form>
                </div>
                <div class="formBox step2" v-show="stepList[1].step">
                    <form>
                        <div class="inputBox col6">
                            <label for="name">Name (optional)</label>
                            <input type="text" id="name" v-model.trim="inputData.name">
                            <label for="phone">Phone</label>
                            <input type="tel" id="phone" v-model.trim="inputData.phone" placeholder="0911-123-456" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}">
                            <div class="errorText">NUMBERS ONLY</div>
                        </div>
                        <div class="inputBox col4 onlylabel">
                            <label>Birth Date (optional)</label>
                            <select name="year" v-model="inputData.year"></select>
                            <select name="mouth" v-model="inputData.mouth"></select>
                            <select name="day" v-model="inputData.day"></select>
                        </div>
                        <div class="inputBox col6">
                            <label>Address</label>
                            <select name="city" v-model="inputData.city"></select>
                            <select name="dist" v-model="inputData.dist"></select>
                        </div>
                        <div class="inputBox col12">
                            <input type="text" v-model.trim="inputData.addr">
                            <div class="errorText">REQUIRED FILED</div>
                        </div>
                        <button @click="nextClick(2)" :disabled="!stepList[1].valid">SUBMIT & NEXT</button>
                    </form>
                </div>
                <div class="formBox step3" v-show="stepList[2].step">
                    <form>
                        <div class="uploadBox">

                        </div>
                        <div class="prompt">
                            ONE FILE IS OVER THE MAXIMUM SIZE
                        </div>
                        <div class="imgGroup">

                        </div>
                        <button @click="nextClick(3)">SUBMIT & NEXT</button>
                    </form>
                </div>
                <div class="formBox step4" v-show="stepList[3].step">
                    <form method="post" @submit="submitForm">
                        <div class="inputBox col12">
                            <label for="cardNum">Card Number</label>
                            <input type="text" id="cardNum" v-model="inputData.cardNum">
                        </div>
                        <div class="inputBox col6">
                            <label>Cardholder Name</label>
                            <input type="text" v-model="inputData.cardHolder">
                            <label>Bank Name</label>
                            <input type="text" v-model="inputData.bankName">
                        </div>
                        <div class="inputBox col4">
                            <label>CVV</label>
                            <input type="text" v-model="inputData.cvv">
                            <label>Expire Date</label>
                            <select name="expiremouth" v-model="inputData.expireM"></select>
                            <select name="expireyear" v-model="inputData.expireY"></select>
                        </div>
                        <button @click="formDone">DONE</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";

export default {
  name: "Validation",
  data() {
    return {
        stepIndex: 0,
        stepList: [
            {
                step: true,
                valid: false,
                title: "Create Account",
                text: "Glad to see you here!"
            },
            {
                step: false,
                valid: false,
                title: "General Infomation",
                text: "Tell us who you are!"
            },
            {
                step: false,
                valid: false,
                title: "Update Profile Picture",
                text: "We wanna know you more!"
            },
            {
                step: false,
                valid: false,
                title: "Payment Method",
                text: "Add your credit card infomation!"
            }
        ],
        inputData: {
            account: "",
            psw: "",
            cpsw: "",
            name: "",
            year: null,
            mouth: null,
            day: null,
            city: null,
            dist: null,
            addr: "",
            cardNum: "",
            cardHolder: "",
            bankName: "",
            cvv: "",
            expireM: "",
            expireY: ""
        },
        validInput:{
            account:false,
            psw:false,
            cpsw:false
        }
    };
  },
  watch: {},
  computed: {},
  created() {},
  components: {
    FontAwesomeIcon
  },
  methods: {
    nextClick: function(step) {
        let vm = this;
        let validation = false;
        switch (step) {
            case 0:
                let emailRex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                vm.validInput.account = !emailRex.test(vm.inputData.account);
                vm.validInput.psw = vm.inputData.psw >= 8;
                vm.validInput.cpsw = (vm.inputData.cpsw != "");
                vm.stepList[0].valid = (vm.validInput.account && vm.validInput.psw && vm.validInput.cpsw);
                break;
            case 1:
            break;
            case 2:
            break;
            case 3:
            break;
        }
      // 驗證成功
      if (validation) {
          this.stepIndex = (step + 1);
      }
    },
    formDone: function() {
      // step:false,
    },
    submitForm: function() {}
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/validation.scss";
</style>