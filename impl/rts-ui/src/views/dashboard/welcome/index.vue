<template>
  <div class="box">
    <Descriptions title="Dashboard" bordered />
  </div>
</template>

<style lang="less" scoped>
  @import '@/styles/theme.less';

  .themeBgColor(box);

  .box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 280px);
    padding: 12px;

    img {
      flex: 1;
      min-height: 0;
    }

    .ant-form {
      flex: 2;
    }
  }
</style>
