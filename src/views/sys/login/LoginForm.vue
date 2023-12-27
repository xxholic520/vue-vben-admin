<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="tenantId" class="enter-x" v-if="tenantEnabled">
      <ASelect v-model:value="formData.tenantId" size="large" class="select-border">
        <ASelectOption v-for="item in tenantList" :key="item.tenantId" :value="item.tenantId">
          {{ item.companyName }}
        </ASelectOption>
      </ASelect>
    </FormItem>
    <FormItem name="username" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.username"
        :placeholder="t('sys.login.userName')"
        autocomplete="off"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>
    <FormItem name="code" class="enter-x" v-if="captchaEnabled">
      <Input
        ref="imageCodeRef"
        size="large"
        v-model:value="formData.code"
        placeholder="输入验证码"
        autocomplete="off"
      >
        <template #addonAfter>
          <Image
            :preview="false"
            :height="38"
            :width="120"
            :src="imageInfo"
            @click="getImageCode"
          />
        </template>
      </Input>
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>
    <!-- <ARow class="enter-x" :gutter="[16, 16]">
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </ACol>
    </ARow> -->

    <!-- <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider> -->

    <!-- <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div> -->
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed, toRaw } from 'vue';

  import {
    Checkbox,
    Form,
    Input,
    Row,
    Col,
    Button,
    // Divider,
    Select as ASelect,
    SelectOption as ASelectOption,
    Image,
  } from 'ant-design-vue';
  // import {
  //   GithubFilled,
  //   WechatFilled,
  //   AlipayCircleFilled,
  //   GoogleCircleFilled,
  //   TwitterCircleFilled,
  // } from '@ant-design/icons-vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '@/hooks/web/useI18n';
  import { useMessage } from '@/hooks/web/useMessage';

  import { useUserStore } from '@/store/modules/user';
  import {
    LoginStateEnum,
    useLoginState,
    useFormRules,
    useFormValid,
    useTenantState,
    useCaptchaImageState,
  } from './useLogin';
  import { useDesign } from '@/hooks/web/useDesign';
  import { createLocalStorage } from '@/utils/cache';
  //import { onKeyStroke } from '@vueuse/core';

  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();
  const ls = createLocalStorage();

  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(ls.get('rememberMe', false));

  const formData = reactive({
    tenantId: ls.get('tenantId', '000000'),
    username: ls.get('username', ''),
    password: ls.get('password', ''),
    code: '',
    uuid: '',
  });

  const { validForm } = useFormValid(formRef);

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  const { tenantEnabled, tenantList } = useTenantState();

  const { captchaEnabled, imageInfo, getImageCode } = useCaptchaImageState(formData);

  async function handleLogin() {
    async function afterLogin() {
      try {
        loading.value = true;
        if (unref(rememberMe)) {
          ls.set('tenantId', unref(formData).tenantId, null);
          ls.set('username', unref(formData).username, null);
          ls.set('password', unref(formData).password, null);
          ls.set('rememberMe', unref(rememberMe));
        } else {
          ls.remove('tenantId');
          ls.remove('username');
          ls.remove('password');
          ls.remove('rememberMe');
        }
        await userStore.login({ ...toRaw(formData), mode: 'none' });
        // notification.success({
        //   message: t('sys.login.loginSuccessTitle'),
        //   description: `${t('sys.login.loginSuccessDesc')}`,
        //   duration: 3,
        // });
        return Promise.resolve();
      } catch (error) {
        createErrorModal({
          title: t('sys.api.errorTip'),
          content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
          getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
        });
        if (unref(captchaEnabled)) {
          getImageCode();
        }
        return Promise.reject(error);
      } finally {
        loading.value = false;
      }
    }
    validForm().then(afterLogin);
  }
</script>
