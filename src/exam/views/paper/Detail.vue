<template>
  <base-detail-view title="问卷详情"
                    parentPath="/exam/paper/list"
                    :service="service"
                    :detailFormModel="formModel"
                    ref="detail" >

    <div class="phone">
      <div class="phone__content">

        <div class="paper">

          <div class="paper__header"></div>

          <div class="paper__body">

            <div class="question">
              <div class="question__header">1. 您对此次的产品/服务满意吗？</div>
              <div class="question__content">

                <div class="option mui-input-row mui-radio mui-left">
                  <label>A. 非常满意</label> <input name="radio1" type="radio">
                </div>
                <div class="option mui-input-row mui-radio mui-left">
                  <label>B. 满意</label> <input name="radio1" type="radio">
                </div>
                <div class="option mui-input-row mui-radio mui-left">
                  <label>C. 一般</label> <input name="radio1" type="radio">
                </div>
                <div class="option mui-input-row mui-radio mui-left">
                  <label>
                    <div class="option__text">D. 0# 柴油：数量</div>
                    <div class="option__input"><input type="text" class=""></div>
                  </label>
                  <input name="radio1" type="radio">
                </div>

              </div>
            </div>

            <div class="question">
              <div class="question__header">2. 您使用惠购油感觉如何？</div>
              <div class="question__content">

                <div class="mui-input-row mui-checkbox mui-left">
                  <label>A. 非常满意</label>
                  <input name="checkbox1" value="Item 1" type="checkbox">
                </div>
                <div class="mui-input-row mui-checkbox mui-left">
                  <label>B. 满意</label>
                  <input name="checkbox1" value="Item 1" type="checkbox" checked>
                </div>
                <div class="mui-input-row mui-checkbox mui-left">
                  <label>C. 一般</label>
                  <input name="checkbox1" value="Item 1" type="checkbox" checked>
                </div>
                <div class="mui-input-row mui-checkbox mui-left">
                  <label>
                    <div class="option__text">D. 其他：</div>
                    <div class="option__input"><input type="text" class=""></div>
                  </label>
                  <input name="checkbox1" value="Item 1" type="checkbox" checked>
                </div>
              </div>
            </div>

            <div class="question">
              <div class="question__header">3. 您使用惠购油感觉如何？</div>
              <div class="question__content">

                <div class="question">
                  <div class="question__header">（1）您使用惠购油感觉如何？</div>
                  <div class="question__content">

                    <div class="mui-input-row mui-checkbox mui-left">
                      <label>A. 非常满意</label>
                      <input name="checkbox1" value="Item 1" type="checkbox">
                    </div>
                    <div class="mui-input-row mui-checkbox mui-left">
                      <label>B. 满意</label>
                      <input name="checkbox1" value="Item 1" type="checkbox" checked>
                    </div>
                    <div class="mui-input-row mui-checkbox mui-left">
                      <label>C. 一般</label>
                      <input name="checkbox1" value="Item 1" type="checkbox" checked>
                    </div>
                    <div class="mui-input-row mui-checkbox mui-left">
                      <label>
                        <div class="option__text">D. 其他：</div>
                        <div class="option__input"><input type="text" class=""></div>
                      </label>
                      <input name="checkbox1" value="Item 1" type="checkbox" checked>
                    </div>
                  </div>
                </div>

                <div class="question">
                  <div class="question__header">（2）您使用惠购油感觉如何？</div>
                  <div class="question__content">

                    <div class="mui-input-row mui-checkbox mui-left">
                      <label>A. 非常满意</label>
                      <input name="checkbox1" value="Item 1" type="checkbox">
                    </div>
                    <div class="mui-input-row mui-checkbox mui-left">
                      <label>B. 满意</label>
                      <input name="checkbox1" value="Item 1" type="checkbox" checked>
                    </div>
                    <div class="mui-input-row mui-checkbox mui-left">
                      <label>C. 一般</label>
                      <input name="checkbox1" value="Item 1" type="checkbox" checked>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>

  </base-detail-view>
</template>
<script>
  import PaperService from '../../services/PaperService';

  export default {
    data() {
      return {
        service: PaperService,
        formModel: {
          MenuName: '',
          MenuNodeIcon: '',
          MenuUrl: '',
          MenuNo: '',
          MenuParentNo: '',
        },
      };
    },
    methods: {
      finish() {
        this.$emit('finish-detail');
      },
    },
  };
</script>

<style scoped src="../../../common/assets/mui/css/mui.css"></style>
<style scoped>
  .phone {
    width: 365px;
    height: 796px;
    margin: 20px 20px 0;
    padding: 100px 16px;
    background: url(../../assets/phone.png) no-repeat;
    background-size: 100%;
  }

  .phone__content {
    overflow: auto;
    height: 100%;
    background: #f4f4f4;
  }

  .paper {

  }
  .paper__header {
    height: 160px;
    background: url(../../assets/banner.png) no-repeat;
    background-size: 100% 100%;
  }

  .paper__body {

  }

  .question {
    margin-top: 1em;
    padding: 0.5em 1em;
    font-size: 16px;
    background: #fff;
    border-top: solid 1px #e8e8e8;
    border-bottom: solid 1px #e8e8e8;
  }

  .question .question {
    margin-top: 0;
    border: none 0;
  }

  .question__header {
    line-height: 2em;
  }

  .question__content {

  }

  .option__text {
    float: left;
    margin-right: 10px;
  }
  .option__input {
    overflow: hidden;
    margin-top: -11px;
  }

  .option__input input {
    margin-bottom: 0;
  }
</style>