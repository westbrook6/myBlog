<script setup lang="ts">
import dayjs from 'dayjs'
import MyButton from '../MyButton/MyButton.vue'
const props = withDefaults(
  defineProps<{
    title?: string
    showRightBtn?: boolean
    showLeftBtn?: boolean
    disableBack?: boolean
  }>(),
  {
    showRightBtn: true,
    showLeftBtn: true,
    disabledBack: false
  }
)

const emits = defineEmits(['leftBtnClick', 'rightBtnClick'])
const router = useRouter()
const dateStr = ref('')
dateStr.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
setInterval(() => {
  dateStr.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}, 1000)

const handleLeftBtnClick = () => {
  emits('leftBtnClick')
  if(props.disableBack){
    return
  }
  router.go(-1)
}

const handleRightBtnClick = () => {
  emits('rightBtnClick')
}
</script>

<template>
  <div class="basic-layout">
    <div class="header">
      <div class="top-btn">
        <slot name="leftBtn" v-if="showLeftBtn">
          <MyButton type="back" @click="handleLeftBtnClick">返回</MyButton>
        </slot>
      </div>
      <span class="title">{{ title }}</span>
      <div class="top-btn">
      </div>
    </div>
    <div class="main">
      <slot> </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.basic-layout {
  width: 1920rem;
  height: 1080rem;
  overflow: hidden;
  background-image: url('~/assets/img/layout.png');
  background-repeat: no-repeat;
  background-size: cover;
  .header {
    padding: 147rem 128rem 0rem;
    height: 237rem;
    width: 100%;
    display: flex;
    align-items: center;
    .title {
      flex: 1 1 auto;
      text-align: center;
      font-size: 40rem;
      font-weight: normal;
      background: linear-gradient(
        180deg,
        #ffffff 0%,
        #ffffff 52%,
        #c5dbf7 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .top-btn {
      width: 130rem;
    }
  }
  .date-box {
    display: flex;
    align-items: center;
    position: absolute;
    left: 72rem;
    top: 28rem;
    font-size: 18rem;
    font-weight: bold;
    color: #ffffff;
    img {
      width: 20rem;
      height: 20rem;
      margin-right: 4rem;
    }
  }

  .main {
    padding: 32rem 128rem 0;
    height: 823rem;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
