<template>
  <div
    class="my-button"
    :class="{ 'full-width': fullWidth, disabled: disabled }"
    v-loading="loading"
    :style="getStyle"
  >
    <div class="btn-wrap">
      <slot name="icon">
        <img :src="backImg" class="back" v-if="props.type === 'back'" />
      </slot>
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import backImg from '~/assets/img/layout/back.png'

const props = withDefaults(
  defineProps<{
    label?: string
    size?: 'small' | 'default' | 'large'
    type?: 'info' | 'success' | 'back'
    loading?: boolean
    disabled?: boolean
    fullWidth?: boolean
  }>(),
  {
    label: '',
    buttonType: 'black',
    type: 'info',
    size: 'large',
    loading: false,
    disabled: false,
    fullWidth: false
  }
)

const getStyle = computed(() => {
  if (props.type === 'success') {
    return {
      background: 'linear-gradient(90deg, #33c8ce 0%, #138e93 96%)'
    }
  }
  return {
    background: 'rgba(17, 42, 73, 0.6)'
  }
})
</script>
<style lang="scss" scoped>
.my-button {
  display: inline-block;
  width: 130rem;
  height: 50rem;
  border-radius: 136rem;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(90deg, #BBC0C0 0%, #CFD8D8 96%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  .btn-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16rem;
    color: rgb(43, 42, 42);
  }
  .back {
    width: 24rem;
    height: 24rem;
    margin-right: 4rem;
  }
  &.full-width {
    display: block;
    ion-button {
      width: 100%;
    }
  }
  &.disabled {
    pointer-events: none;
    opacity: 0.7;
  }
  &:active {
    opacity: 0.7 !important;
  }
  &.loading {
    pointer-events: none;
    opacity: 0.7;
  }
}
</style>
