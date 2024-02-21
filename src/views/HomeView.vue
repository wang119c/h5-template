<template>
  <div id="page">
    <div class="page-top"></div>
    <div class="page-content">
      <div class="page-content-info">
        <!-- 头像 -->
        <div class="page-content-info-avatar">
          <div class="page-content-info-avatar-img">
            <img :src="getImageUrl(`${userInfo?.user.avatar}`)" alt="" />
          </div>
          <div class="page-content-info-name">{{ userInfo?.user.name }}</div>
          <div class="page-content-info-status">{{ userInfo?.user.signStatus ? '已签约' : '未签约' }}</div>
        </div>
        <!-- 图标列表 -->
        <div class="page-content-info-icons">
          <CateIcon v-for="item in userInfo?.service" :key="item.id" :title="item.title" :bgColor="item.bgColor"
            :imgSrc="getImageUrl(item.imgSrc)" />
          <!-- <CateIcon :imgSrc="getImageUrl('icon_heartbeat')" title="健康记录" bgColor="#fff4e6" />
          <CateIcon
            :imgSrc="getImageUrl('icon_signing_information')"
            title="签约信息"
            bgColor="#e9f1ff"
          />
          <CateIcon :imgSrc="getImageUrl('icon_service')" title="服务记录" bgColor="#fff7da" /> -->
        </div>
      </div>
      <!-- 个人信息 -->
      <div class="page-personal-information">
        <div class="title">个人信息</div>
        <div class="list">
          <div class="item">
            <div class="item-left">身份证号</div>
            <div class="item-right">{{ userInfo?.info.idCard }}</div>
          </div>
          <div class="item">
            <div class="item-left">性别</div>
            <div class="item-right">{{ userInfo?.info.gender ? '男' : '女' }}</div>
          </div>
          <div class="item">
            <div class="item-left">年龄</div>
            <div class="item-right">{{ userInfo?.info.age }}</div>
          </div>
          <div class="item">
            <div class="item-left">联系电话</div>
            <div class="item-right">{{ userInfo?.info.mobile }}</div>
          </div>
          <div class="item">
            <div class="item-left">现居地</div>
            <div class="item-right">{{ userInfo?.info.address }}</div>
          </div>
          <div class="item">
            <div class="item-left">居民来源</div>
            <div class="item-right">{{ userInfo?.info.source }}</div>
          </div>
          <div class="item">
            <div class="item-left">真实姓名</div>
            <div class="item-right item-flex">
              <CustomTag v-for="item in userInfo?.info.tags" :key="item.id" class="tag" :title="item.title"
                :borderColor="item.borderColor" :bgColor="item.bgColor" />
              <!-- <CustomTag class="tag" title="低血糖" borderColor="#fb7c4f" bgColor="#fff2e8" /> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 家庭成员 -->
      <div class="family-member">
        <div class="title">家庭成员</div>
        <div class="content">
          <van-swipe :loop="false" :width="220" :show-indicators="false">
            <van-swipe-item v-for="(item, index) in userInfo?.familyMember" :key="index">
              <div class="family-member-item">
                <div class="left">
                  <img :src="getImageUrl(`${item.avatar}`)" alt="头像" />
                </div>
                <div class="right">
                  <div class="right-top">
                    <div class="name">{{ item.name }}</div>
                    <div class="age">{{ item.age }}岁</div>
                    <SvgIcon :icon="item.gender ? 'man' : 'woman'" class="icon" />
                  </div>
                  <div class="right-bottom">关系: {{ item.relation }}</div>
                </div>
              </div>
            </van-swipe-item>
            <!-- <van-swipe-item>
              <div class="family-member-item">
                <div class="left">
                  <img src="@/assets/images/avatar_1.png" alt="头像" />
                </div>
                <div class="right">
                  <div class="right-top">
                    <div class="name">韦栋</div>
                    <div class="age">58岁</div>
                    <SvgIcon icon="woman" class="icon" />
                  </div>
                  <div class="right-bottom">关系: 母亲</div>
                </div>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="family-member-item">
                <div class="left">
                  <img src="@/assets/images/avatar_2.png" alt="头像" />
                </div>
                <div class="right">
                  <div class="right-top">
                    <div class="name">
                      <div class="van-ellipsis">布馨昭</div>
                    </div>
                    <div class="age">60岁</div>
                    <SvgIcon icon="woman" class="icon" />
                  </div>
                  <div class="right-bottom">关系: 父亲</div>
                </div>
              </div>
            </van-swipe-item> -->
          </van-swipe>
        </div>
      </div>
    </div>
    <!-- 添加服务 -->
    <div class="add-service">
      <van-button class="btn" color="#49b9ad" block>添加服务</van-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CateIcon from '@/components/CateIcon/index.vue'
import CustomTag from '@/components/CustomTag/index.vue'
import { getImageUrl } from '@/utils/index.ts'
import { getUserInfo, type UserInfo } from '@/api/user';
import { showFailToast } from 'vant';

const userInfo = ref<UserInfo>()
onMounted(async () => {
  try {
    const { data, code } = await getUserInfo()
    if (code === 200) {
      userInfo.value = data
    } else {
      showFailToast("获取用户信息失败")
    }
  } catch (error) {
    console.log(error);
  }
})


</script>
<style scoped lang="less">
#page {
  width: 100%;
  height: auto;
  background-color: @grey-color;
  min-height: 100vh;
  overflow: hidden;

  .add-service {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 10;
    height: 5.8125rem;
    box-sizing: border-box;
    padding: 0 10px;

    .btn {
      margin-top: 0.5rem;
      border-radius: 0.625rem;
    }
  }

  .page-top {
    width: 100%;
    height: 12.5rem;
    background-color: @green-color;
    position: absolute;
    top: 0;
  }

  .page-content {
    position: relative;
    z-index: 1;
    margin-top: 5.625rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0 13px;

    .page-content-info {
      width: 100%;
      height: 12.875rem;
      background: #ffffff;
      border-radius: 10px;
      margin: 0 auto;
      position: relative;

      .page-content-info-avatar {
        position: relative;
        width: 93px;
        height: 93px;
        background: #fff;
        border: 1px solid #e6e6e6;
        border-radius: 50%;
        margin: 0 auto;
        top: -45px;
        box-sizing: border-box;
        padding: 4px;

        .page-content-info-avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .page-content-info-name {
          text-align: center;
          margin-top: 0.75rem;
          font-size: 0.875rem;
        }

        .page-content-info-status {
          padding: 0;
          margin: 0 auto;
          margin-top: 0.3125rem;
          border: 1px solid @green-1-color;
          font-size: 10px;
          text-align: center;
          width: 40px;
          height: 18px;
          box-sizing: border-box;
          border-radius: 5px;
          line-height: 16px;
          background: @green-2-color;
          color: @green-1-color;
        }
      }

      .page-content-info-icons {
        display: flex;
        justify-content: space-between;
        margin-top: 1.0625rem;
        box-sizing: border-box;
        padding: 0 15px;
      }
    }

    .page-personal-information {
      margin-top: 1.5625rem;

      .title {
        font-size: 16px;
        margin-bottom: 0.875rem;
      }

      .list {
        background-color: #fff;
        padding: 0 15px;
        box-sizing: border-box;
        border-radius: 10px;

        .item {
          padding: 1.25rem 0;
          display: flex;
          justify-content: flex-start;
          font-size: 14px;
          border-bottom: 1px solid #f4f4f4;

          &:last-child {
            border: none;
          }

          .item-left {
            width: 70px;
          }

          .item-flex {
            display: flex;
          }

          .tag {
            margin-right: 10px;
          }

          .item-right {
            text-align: left;
          }
        }
      }
    }

    .family-member {
      margin-top: 1.5625rem;

      .title {
        font-size: 16px;
        margin-bottom: 0.875rem;
      }

      .content {
        background-color: #fff;
        padding: 15px 15px;
        border-radius: 10px;
        margin-bottom: 6.25rem;

        .family-member-item {
          width: 13rem;
          height: 4.375rem;
          background-color: #f5f7fb;
          border-radius: 0.5rem;
          box-sizing: border-box;
          padding: 0.75rem 1.125rem;
          display: flex;

          .left {
            width: 45px;
            height: 45px;
            overflow: hidden;
            border-radius: 50%;
            margin-right: 10px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .right {
            .right-top {
              display: flex;
              justify-content: flex-start;

              .name {
                font-size: 16px;
                margin-right: 8px;
                max-width: 4.0625rem;
              }

              .age,
              .icon {
                font-size: 12px;
              }

              .age {
                margin-right: .2rem;
                margin-top: .1875rem;
              }

              .icon {
                margin-top: .3125rem;
              }
            }

            .right-bottom {
              font-size: 12px;
              color: #606972;
              margin-top: .375rem;
            }
          }
        }
      }
    }
  }
}</style>
