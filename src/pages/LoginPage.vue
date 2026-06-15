<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-06 21:12:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-06-15 11:55:34
* @FilePath              : docs-web/src/pages/LoginPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page style="height: 100%" class="flex flex-center">
    <q-card style="width: 60vw; min-width: 300px" :flat="!isLgXs">
      <q-card-section :horizontal="isLgXs">
        <!-- horizontal=true make col inactive -->
        <q-card-section class="col-8">
          <!-- horizontal true make col doesn't works -->
          <LottiePlayer animationLink="json/drawings-library.json" />
        </q-card-section>
        <q-separator v-if="isLgXs" inset vertical />
        <q-card-section class="col-4" align="center">
          <!-- horizontal=true make col inactive -->
          <div class="text-h3 text-primary">
            {{ $t('S.APP_NAME') }}
          </div>
          <q-banner dense style="min-height: 100px" class="bg-white text-red text-subtitle1">
            {{ $t('{VAR_HOLD}', { VAR_HOLD: loginMessage }) }}
          </q-banner>
          <q-form>
            <!--  -->
            <q-input
              v-model="username"
              bottom-slots
              autocomplete="username"
              standout="bg-teal text-white"
              :label="$t('S.LOGIN_NAME_NOTE')"
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
              bottom-slots
              autocomplete="off"
              class="login-input"
              standout="bg-teal text-white"
              :label="$t('S.PASSWORD')"
              :type="isPwd ? 'password' : 'text'"
              @keydown="checkEnterKey($event)"
            >
              <template v-slot:prepend>
                <q-icon name="key" />
              </template>
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  :name="isPwd ? 'disabled_visible' : 'visibility'"
                  v-on:click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <div class="bg-language q-mt-md q-mb-md">
              <SelectLanguage />
            </div>

            <!--  -->
            <q-btn
              label
              unelevated
              text-color="white"
              style="font-size: large"
              class="login-btn bg-login-card-input"
              :loading="loading"
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
import { Cookies, SessionStorage, useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import LottiePlayer from '@/components/LottiePlayer.vue'
import SelectLanguage from '@/components/SelectLanguage.vue'
import { Router } from '@/router'
import { useSessionStore } from '@/stores/SessionStore'

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
  Object.keys(Cookies.getAll()).forEach((key) => {
    Cookies.remove(key)
  })
}

const checkEnterKey = (event) => {
  if (event.keyCode === 13) {
    doLogin()
  }
}

const isEmail = (str) => {
  // Regular expression to match a valid email address
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/
  return emailRegex.test(str)
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

  axios
    .post('/docs-api/login', {}, { auth: { username: username.value, password: password.value } })
    .then((res) => {
      if (res.data.success) {
        const { userInfo, userName, DOCS_WRITE, DOCS_READ, ADMIN } = storeToRefs(useSessionStore())
        userInfo.value = res.data.msg['full_name'] + ' <' + res.data.msg['email'] + '>'
        userName.value = res.data.msg['login_name']
        DOCS_WRITE.value = res.data.msg['DOCS_WRITE']
        DOCS_READ.value = res.data.msg['DOCS_READ']
        ADMIN.value = res.data.msg['ADMIN']

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
