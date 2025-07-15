<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-06 21:12:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-07-16 00:08:49
* @FilePath              : docs-web/src/pages/LoginPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page class="flex flex-center" style="height: 100%">
    <q-card style="width: 60vw; min-width: 300px" :flat="!isLgXs">
      <q-card-section :horizontal="isLgXs">
        <!-- horizontal=true make col inactive -->
        <q-card-section class="col-8">
          <!-- horizontal true make col doesn't works -->
          <LottiePlayer animationLink="json/drawings-library.json" />
        </q-card-section>
        <q-separator v-if="isLgXs" vertical inset />
        <q-card-section align="center" class="col-4">
          <!-- horizontal=true make col inactive -->
          <div class="text-h3 text-primary">
            {{ $t('S.APP_NAME') }}
          </div>
          <q-banner dense class="bg-white text-red text-subtitle1" style="min-height: 100px">
            {{ $t('{VAR_HOLD}', { VAR_HOLD: loginMessage }) }}
          </q-banner>
          <q-form>
            <!--  -->
            <q-input
              v-model="username"
              standout="bg-teal text-white"
              bottom-slots
              :label="$t('S.LOGIN_NAME_NOTE')"
              autocomplete="username"
              @keydown="checkEnterKey($event)"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <!--  -->
            <q-input
              v-model="password"
              clearable
              class="login-input"
              standout="bg-teal text-white"
              bottom-slots
              :label="$t('S.PASSWORD')"
              :type="isPwd ? 'password' : 'text'"
              autocomplete="current-password"
              @keydown="checkEnterKey($event)"
            >
              <template v-slot:prepend>
                <q-icon name="key" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'disabled_visible' : 'visibility'"
                  class="cursor-pointer"
                  v-on:click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <div class="bg-language q-mt-md q-mb-md">
              <SelectLanguage />
            </div>

            <!--  -->
            <q-btn
              :loading="loading"
              class="login-btn bg-login-card-input"
              text-color="white"
              unelevated
              label
              style="font-size: large"
              @click="doLogin"
            >
              {{ $t('S.LOGIN') }}
            </q-btn>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { SessionStorage, useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { authToken, isEmail } from 'src/assets/auth.js'
import { Router } from 'src/boot/router'
import { useSessionStore } from 'src/stores/SessionStore'

import LottiePlayer from 'src/components/LottiePlayer.vue'
import SelectLanguage from 'src/components/SelectLanguage.vue'

// common vars
const $q = useQuasar()
const { t } = useI18n()

// page vars
const isLgXs = $q.screen.gt.xs
const isPwd = ref(true)
const username = ref('')
const password = ref('')
const loading = ref(false)
const loginMessage = ref('')

onMounted(() => {
  cleanSession()
})

const cleanSession = () => {
  SessionStorage.remove('SessionStore')
  SessionStorage.remove('Authorization')
}

const checkEnterKey = (event) => {
  if (event.keyCode === 13) {
    doLogin()
  }
}

const doLogin = async () => {
  if (isEmail(username.value)) {
    $q.dialog({
      title: t('S.TIPS'),
      message: t('S.LOGIN_NAME_NOTE'),
      html: true,
      ok: {
        label: t('S.OK'),
        color: 'primary',
      },
    })
    return
  }
  const auth = authToken(username.value, password.value)

  axios
    .post('/docs-api/login', {}, { headers: { Authorization: auth } })
    .then((res) => {
      if (res.data.success) {
        const { userInfo } = storeToRefs(useSessionStore())
        userInfo.value = res.data.msg['full_name'] + ' <' + res.data.msg['email'] + '>'

        SessionStorage.set('Authorization', auth)
        Router.push({ name: 'IndexPage' })
      } else {
        cleanSession()
        loginMessage.value = res.msg
      }
    })
    .catch((err) => {
      cleanSession()
      if (err.data.msg) {
        loginMessage.value = err.data.msg
      } else {
        loginMessage.value = t('S.OOPS')
      }
    })
    .finally(() => {
      loading.value = false
      $q.loadingBar.stop()
    })
}
</script>

<style lang="scss" scoped>
.login-btn {
  font-size: large;
  margin-top: 0px;
  margin-bottom: 20px;
  width: 100%;
}

.bg-login-card-input {
  background: linear-gradient(to right, $secondary, $primary);
  transition: all 0.3s ease-in-out;
  background-size: 200% auto;
}

.bg-login-card-input:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px rgba(0, 0, 0, 0.7);
}

.bg-language {
  background: linear-gradient(to right, $secondary, $primary);
  transition: all 0.3s ease-in-out;
  background-size: 200% auto;
}
</style>
