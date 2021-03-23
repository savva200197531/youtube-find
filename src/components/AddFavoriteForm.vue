<template>
  <div class="add-favorite-form-wrapper" v-if="showForm.show" @click="closeModal">
    <a-form
        id="components-form-demo-validate-other"
        :form="form"
        @submit="handleSubmit"
        class="add-favorite-form"
    >
      <h2 class="form-title">Сохранить запрос</h2>

      <a-form-item label="Запрос">
        <a-input
            :read-only="!showForm.redact"
            v-decorator="[
          'request',
          { initialValue: showForm.request, rules: rules.requestRules },
        ]"
            placeholder="Запрос"
        >
        </a-input>
      </a-form-item>

      <a-form-item label="Название">
        <a-input
            v-decorator="[
          'name',
          { initialValue: getCurrentFavorite.name, rules: rules.nameRules },
        ]"
            placeholder="Укажите название"
        >
        </a-input>
      </a-form-item>

      <a-form-item label="Сортировать по" has-feedback>
        <a-select
            v-decorator="[
          'order',
          { initialValue: getCurrentFavorite.order || 'relevance' }
        ]">
          <a-select-option v-for="(select, idx) in selectValues" :value="select.value" :key="idx">
            {{ select.name }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Максимальное количество">
        <a-row>
          <a-col :span="18">
            <a-slider
                v-decorator="['max', { initialValue: getCurrentFavorite.max || 12 }]"
                @change="handleSliderChange"
                :min="1"
                :max="50"/>
          </a-col>
          <a-col :span="4">
            <a-input-number v-decorator="['max', { initialValue: getCurrentFavorite.max || 12 }]"  @change="handleSliderChange" :min="1" :max="50" style="marginLeft: 16px"/>
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item>
        <div class="buttons">
          <a-button @click.prevent="closeForm">
            Не сохранять
          </a-button>
          <a-button type="primary" html-type="submit">
            Сохранить
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: "addFavoriteForm",
  data() {
    const defaultRequired = { required: true, message: 'Пожалуйста заполните поле!' };
    return {
      rules: {
        requestRules: [
          defaultRequired,
        ],
        nameRules: [
          defaultRequired,
        ],
        selectRules: [
          defaultRequired,
        ],
        sliderRules: [
          defaultRequired,
        ],
      },
      sliderValue: 12,
      selectValues: [
        {
          name: 'По релевантности',
          value: 'relevance'
        },
        {
          name: 'По дате загрузки',
          value: 'date'
        },
        {
          name: 'По рейтингу',
          value: 'rating'
        },
        {
          name: 'По числу просмотров',
          value: 'viewCount'
        }
      ]
    }
  },
  computed: {
    ...mapState('videoStorage', [
      'showForm',
    ]),
    ...mapState('authStorage', [
        'user'
    ]),
    ...mapGetters('videoStorage', [
      'getCurrentFavorite'
    ])
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' });
  },
  methods: {
    ...mapActions('videoStorage', [
      'closeForm',
        'submitFavoriteForm'
    ]),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.submitFavoriteForm({ ...values, userId: this.user.id, favoriteId: this.getCurrentFavorite.id });
          this.closeForm();
        }
      });
    },
    closeModal(event) {
      if (event.target.classList.contains('add-favorite-form-wrapper')) {
        this.closeForm();
      }
    },
    handleSliderChange(value) {
      this.form.setFieldsValue({
        max: value
      });
    },
  },
  mounted() {
    this.sliderValue = this.getCurrentFavorite.max;
  }
}
</script>

<style scoped lang="scss">

.add-favorite-form-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  backdrop-filter: blur(2px) brightness(40%);
  background-color: rgba(255, 255, 255, 0.3);
}

.add-favorite-form {
  z-index: 11;
  position: relative;
  background: white;
  box-shadow: 0 10px 50px rgba(19, 144, 229, 0.8);
  border-radius: 10px;
  width: 510px;
  height: 573px;
  margin: 150px auto 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 36px 40px;
}

.form-title {
  text-align: center;
  width: 100%;
}

.buttons {
  display: flex;
  justify-content: space-between;

  button {
    width: 100%;

    &:last-child {
      margin-left: 10px;
    }
  }
}
</style>
