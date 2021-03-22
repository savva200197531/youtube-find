<template>
  <div class="authentication">
    <a-form
        :form="form"
        class="authentication-form"
        @submit.prevent="handleSubmit"
    >
      <a-form-item class="text-center">
        <img src="../assets/img/logo.svg" alt="logo">
      </a-form-item>
      <a-form-item class="text-center">
        <h3>Вход</h3>
      </a-form-item>
      <a-form-item>
        <a-input
            v-decorator="[
          'login',
          { initialValue: '12345678', rules: this.rules.loginRules },
        ]"
            placeholder="Логин"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-password
            v-decorator="[
          'password',
          { initialValue: '12345678', rules: this.rules.passwordRules },
        ]"
            type="password"
            placeholder="Пароль"
        >
          <a-icon slot="suffix" type="lock" style="color: rgba(0,0,0,.25)"/>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "authentication",
  data: () => ({
    rules: {
      loginRules: [
        { required: true, message: 'Пожалуйста введите логин!' },
        { min: 3, message: 'Минимальное количество символов 3!' },
        { whitespace: true, message: 'Логин не должен содержать пробелы!' }
      ],
      passwordRules: [
        { required: true, message: 'Пожалуйста введите пароль!' },
        { min: 6, message: 'Минимальное количество символов 6!' },
        { whitespace: true, message: 'Пароль не должен содержать пробелы!' }
      ],
    }
  }),
  methods: {
    ...mapActions('authStorage', [
      'userLogin'
    ]),
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.userLogin(values);
        }
      });
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
}
</script>

<style scoped lang="scss">

.authentication {
  padding-top: 200px;
}

.authentication-form {
  max-width: 510px;
  background: white;
  margin: 0 auto;
  padding: 50px;
  border: 1px solid rgba(39, 39, 39, 0.1);
  border-radius: 5px;
}

.login-form-button {
  width: 50%;
  margin: 0 auto;
  display: block;
}
</style>
