<template>
  <base-detail-view title="问卷详情"
                    parentPath="/exam/paper/list"
                    :service="service"
                    :detailFormModel="formModel"
                    ref="detail" >

    <div class="phone">
      <div class="phone__content">

        <div class="paper">

          <div class="paper__header"><img src="../../assets/images/banner.png" width="100%" alt=""></div>

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

<style scoped lang="scss" src="../../assets/iphone.scss"></style>
<style scoped src="../../../common/assets/mui/css/mui.css"></style>
