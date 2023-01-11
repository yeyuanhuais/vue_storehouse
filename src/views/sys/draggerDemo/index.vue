<template>
  <div class="seat-box">
    <div v-for="(item, index) in obj.seatArr" :key="index">
      <div class="seat-row-box">
        <div class="fl seat-row-title">{{ item.rowHint }}排</div>

        <draggable
          group="people"
          :list="item?.seat"
          class="draggable-item seat-row-arr"
          item-key="seatId"
          tag="div"
          @change="onStart"
          @end="end"
          :data-index="index"
          data-seatid="seatId"
        >
          <template #item="{ element }">
            <div class="seat-row-arr-item" :data-seatid="element.seatNum" :data-index="index">
              <div
                class="seat-name"
                :style="[
                  {
                    background:
                      element?.seatType == 'MT_SEAT_TYPE_DISABLE'
                        ? '#555555'
                        : element?.seatType == 'MT_SEAT_TYPE_RESERVED'
                        ? '#0000bf'
                        : element?.seatColor,
                  },
                  {
                    border: showBorder ? '1px solid #333333' : 'none',
                  },
                ]"
              >
                <div v-if="element?.realName" class="seat-name-con">
                  {{ element?.realName }}
                </div>
              </div>
              <div class="seat-item">
                <span v-if="showRowNum"> {{ element?.seatNum }}</span>
              </div>
            </div>
          </template>
        </draggable>
      </div>
      <div
        v-if="item.row == 2 && obj.venuetitle?.type == 'MT_VENUE_TYPE_CHAIRMAN'"
        class="massageTitle"
      >
        请前两排的领导统一从会场右侧进入，三至八排从两侧进入。
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, onMounted, ref } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import draggable from 'vuedraggable';
  import { DataModel } from './model/index';
  let obj = reactive<any>({ seatArr: [], venuetitle: {} });
  let copyobj = { seatArr: [], venuetitle: {} };
  let showBorder = ref(true); //座位边框
  let showRowNum = ref(true); //是否显示座位号
  /* ======== 获取数据 ======== */
  const getData = async () => {
    const data = await defHttp.post<DataModel>({ url: '/draggger' });
    obj.seatArr = data.data;
    copyobj.seatArr = data.data;
    obj.venuetitle = data.venue;
  };
  /* ======== 拖拽开始 ======== */
  const onStart = async (val, val2) => {
    // console.log('%c val,val2', 'font-size:13px; background:pink; color:#bf2c9f;', val, val2);
  };
  const end = async (val) => {
    console.log('%cend val,val2', 'font-size:13px; background:pink; color:#bf2c9f;', val);
    // console.log(
    //   '%c copyList.value[val.item.dataset.index].seat[val.newIndex]',
    //   'font-size:13px; background:pink; color:#bf2c9f;',
    //   copyList.value[val.item.dataset.index].seat[val.newIndex].seatId,
    //   copyList.value[val.item.dataset.index].seat[val.oldIndex].seatId,
    // );
    let copyList = copyobj.seatArr;
    console.log('%c copyList', 'font-size:13px; background:pink; color:#bf2c9f;', copyList);
    const item = copyList[val.item.dataset.index].seat[val.oldIndex];
    console.log('%c item', 'font-size:13px; background:pink; color:#bf2c9f;', item);
    copyList[val.item.dataset.index].seat.splice(
      val.oldIndex,
      1,
      copyList[val.item.dataset.index].seat[val.newIndex],
    );
    copyList[val.item.dataset.index].seat.splice(val.newIndex, 1, item);
    obj.seatArr = copyList;
    copyList[val.item.dataset.index].seat = obj.seatArr[val.item.dataset.index].seat.slice(0);
  };
  onMounted(() => {
    getData();
  });
</script>
<style lang="less" scoped>
  .seat-box {
    width: 100%;
  }

  .seat-row-box {
    display: flex;
    flex-wrap: nowrap;

    .seat-row-title {
      line-height: 70px;
      margin-right: 20px;
      white-space: nowrap;
      width: 60px;
    }

    .seat-row-arr {
      margin-right: 40px;
      display: flex;

      &.seat-row-arr-right {
        justify-content: flex-end;
      }

      &.seat-row-arr-center {
        justify-content: center;
        margin-left: auto;
      }

      &:last-child {
        margin-right: 0;
        margin: auto;
      }
    }

    .seat-row-arr-item {
      margin-right: 3px;

      &:last-child {
        margin-right: 0;
      }
    }

    .draggable-item {
      // width: 25px;
      // height: 70px;
      // overflow-y: hidden;
    }

    .seat-name {
      width: 25px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #d7d7d7;
      writing-mode: tb-rl;
      border: 1px solid #333333;

      cursor: pointer;

      .seat-name-con {
        width: 25px;
        height: 70px;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        padding: 5px 0;
        writing-mode: vertical-rl;
        cursor: pointer;
        user-select: none;
        text-align-last: justify;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
      }
    }

    .seat-item {
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
    }
  }

  .massageTitle {
    text-align: center;
    padding: 10px 0 10px 55px;
    font-weight: bold;
  }
</style>
