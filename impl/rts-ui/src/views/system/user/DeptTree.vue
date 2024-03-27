<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import type { DataNode } from 'ant-design-vue/es/tree';
  import Api from '@/api/';

  defineOptions({
    name: 'DeptTree',
  });
  const emit = defineEmits(['select', 'init']);
  const searchValue = ref('');
  const originDeptTree = ref<API.DeptEntity[]>([]);
  const expandedKeys = ref<number[]>([]);
  const autoExpandParent = ref(true);

  const deptTree = computed(() => {
    return filterDeptByKeyword(
      cloneDeep(originDeptTree.value),
      searchValue.value,
    ) as unknown as DataNode[];
  });

  const filterDeptByKeyword = (treeData: API.DeptEntity[], keyword = '') => {
    return treeData.filter((item) => {
      if (item.children?.length) {
        item.children = filterDeptByKeyword(item.children, keyword);
        if (item.children.length) {
          return true;
        }
      }
      return item.name?.includes(keyword);
    });
  };
  /**
   * Get department list
   */
  const fetchDeptList = async () => {
    originDeptTree.value = await Api.systemDept.deptList({});
    expandedKeys.value = [...expandedKeys.value, ...originDeptTree.value.map((n) => Number(n.id))];
    emit('init', originDeptTree.value);
  };

  /**
   * Click on department
   */
  const onTreeSelect = (selectedKeys: number[]) => {
    emit('select', selectedKeys[0]);
  };

  const getAllKeys = (treeData: any[], defaultKeys = []) => {
    return treeData.reduce((prev, curr: API.DeptEntity) => {
      prev.push(curr.id);
      if (curr.children?.length) {
        getAllKeys(curr.children, prev);
      }
      return prev;
    }, defaultKeys);
  };

  /** Expand All */
  const expandAll = () => {
    expandedKeys.value = getAllKeys(deptTree.value);
  };

  const onExpand = (keys: number[]) => {
    expandedKeys.value = keys;
    autoExpandParent.value = false;
  };

  fetchDeptList();
</script>

<template>
  <div :style="{ '--border': 1 }" class="header">
    <div class="title">Organization</div>
    <a-input-search v-model:value="searchValue" size="small" placeholder="Search" />
    <a-dropdown>
      <Icon icon="ant-design:more-outlined" size="20" class="flex-shrink-0" />
      <template #overlay>
        <a-menu>
          <a-menu-item @click="expandAll"> Expand All </a-menu-item>
          <a-menu-item @click="expandedKeys = []"> Collapse All </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
  <a-tree
    v-model:expandedKeys="expandedKeys"
    :auto-expand-parent="autoExpandParent"
    :tree-data="deptTree"
    :field-names="{ key: 'id', title: 'name' }"
    @select="onTreeSelect"
    @expand="onExpand"
  />
</template>

<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }

  .title {
    margin-right: 6px;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
  }
</style>
