<template>
  <template v-if="getFormProps?.schemas?.length && search">
    <Tooltip placement="top">
      <template #title>
        <span>{{ getProps.search ? 'Hide search' : 'Show search' }}</span>
      </template>
      <SearchOutlined @click="toggle" />
    </Tooltip>
  </template>
</template>
<script lang="ts" setup>
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { Tooltip } from 'ant-design-vue';
  import { useTableContext } from '../../hooks/useTableContext';

  const { getProps, setProps, getFormProps, search } = useTableContext();

  function toggle() {
    setProps({
      search: !getProps.value.search,
    });
  }
</script>
