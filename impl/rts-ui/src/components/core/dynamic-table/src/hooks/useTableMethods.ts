import { unref, nextTick, getCurrentInstance, watch } from 'vue';
import { isFunction, isBoolean, get, debounce } from 'lodash-es';
import { useInfiniteScroll } from '@vueuse/core';
import tableConfig from '../dynamic-table.config';
import { useEditable } from './useEditable';
import { useTableExpand } from './useTableExpand';
import type { DynamicTableProps, DynamicTableEmitFn } from '../dynamic-table';
import type { OnChangeCallbackParams, TableColumn } from '../types/';
import type { Pagination, TableState } from './useTableState';
import type { FormProps } from 'ant-design-vue';
import { warn } from '@/utils/log';
import { isObject } from '@/utils/is';

export type UseInfiniteScrollParams = Parameters<typeof useInfiniteScroll>;

export type TableMethods = ReturnType<typeof useTableMethods>;

export type UseTableMethodsContext = {
  state: TableState;
  props: DynamicTableProps;
  emit: DynamicTableEmitFn;
};

export const useTableMethods = ({ state, props, emit }: UseTableMethodsContext) => {
  const {
    innerPropsRef,
    tableData,
    loadingRef,
    queryFormRef,
    paginationRef,
    editFormErrorMsgs,
    searchState,
  } = state;
  // Editable lines
  const editableMethods = useEditable({ state, props });
  const expandMethods = useTableExpand({ state, props, emit });

  watch(
    () => props.searchParams,
    () => {
      fetchData();
    },
  );

  watch(
    () => props.dataSource,
    (val) => {
      updatePagination({
        total: val?.length,
      });
    },
  );

  const setProps = (props: Partial<DynamicTableProps>) => {
    innerPropsRef.value = { ...unref(innerPropsRef), ...props };
  };

  /**
   * @description Form query
   */
  const handleSubmit = (params, page = 1) => {
    updatePagination({
      current: page,
    });
    fetchData(params);
    emit('search', params);
  };

  /**
   * @param {object} params Table query parameters
   * @param {boolean} flush Whether to reset the page number to the first page
   * @description Get table data
   */
  const fetchData = debounce(async (params = {}) => {
    const { dataRequest, dataSource, fetchConfig, searchParams } = props;

    if (!dataRequest || !isFunction(dataRequest) || Array.isArray(dataSource)) {
      return;
    }
    try {
      let pageParams: Recordable = {};
      const pagination = unref(paginationRef)!;

      const { pageField, sizeField, listField, totalField } = {
        ...tableConfig.fetchConfig,
        ...fetchConfig,
      };

      // Whether paging is enabled
      const enablePagination = isObject(pagination);
      if (enablePagination) {
        pageParams = {
          [pageField]: pagination.current,
          [sizeField]: pagination.pageSize,
        };
      }
      const { sortInfo = {}, filterInfo } = searchState;
      // Table query parameters
      let queryParams: Recordable = {
        ...pageParams,
        ...sortInfo,
        ...filterInfo,
        ...searchParams,
        ...params,
      };
      await nextTick();
      if (queryFormRef.value) {
        const values = await queryFormRef.value.validate();
        queryParams = {
          ...queryFormRef.value.handleFormValues(values),
          ...queryParams,
        };
      }

      loadingRef.value = true;
      const res = await dataRequest(queryParams);

      const isArrayResult = Array.isArray(res);
      const resultItems: Recordable[] = isArrayResult ? res : get(res, listField);
      const resultTotal: number = isArrayResult ? res.length : Number(get(res, totalField));

      if (enablePagination && resultTotal) {
        const { current = 1, pageSize = tableConfig.defaultPageSize } = pagination;
        const currentTotalPage = Math.ceil(resultTotal / pageSize);
        if (current > currentTotalPage) {
          updatePagination({
            current: currentTotalPage,
          });
          return await fetchData(params);
        }
      }
      tableData.value = resultItems;
      updatePagination({ total: ~~resultTotal });
      if (queryParams[pageField]) {
        updatePagination({ current: queryParams[pageField] || 1 });
      }
      return tableData;
    } catch (error) {
      warn(`Table query error：${error}`);
      emit('fetch-error', error);
      tableData.value = [];
      updatePagination({ total: 0 });
    } finally {
      loadingRef.value = false;
    }
  });

  /**
   * @description Refresh table
   */
  const reload = (resetPageIndex = false) => {
    const pagination = unref(paginationRef);
    if (Object.is(resetPageIndex, true) && isObject(pagination)) {
      pagination.current = 1;
    }
    emit('reload');
    return fetchData();
  };

  /**
   * @description Pagination changes
   */
  const handleTableChange = async (...rest: OnChangeCallbackParams) => {
    const [pagination, filters, sorter] = rest;
    const { sortFn, filterFn } = props;

    if (queryFormRef.value) {
      await queryFormRef.value.validate();
    }
    updatePagination(pagination);

    const params: Recordable = {};
    if (sorter && isFunction(sortFn)) {
      const sortInfo = sortFn(sorter);
      searchState.sortInfo = sortInfo;
      params.sortInfo = sortInfo;
    }

    if (filters && isFunction(filterFn)) {
      const filterInfo = filterFn(filters);
      searchState.filterInfo = filterInfo;
      params.filterInfo = filterInfo;
    }

    await fetchData({});
    emit('change', ...rest);
  };

  // dataIndex Can be a.b.c
  // const getDataIndexVal = (dataIndex, record) => dataIndex.split('.').reduce((pre, curr) => pre[curr], record)

  // Get table column key
  const getColumnKey = (column: TableColumn) => {
    return (column?.key || column?.dataIndex) as string;
  };

  /** Edit form validation failure callback */
  const handleEditFormValidate: FormProps['onValidate'] = (name, status, errorMsgs) => {
    // console.log('errorInfo', editFormErrorMsgs);
    const key = Array.isArray(name) ? name.join('.') : name;
    if (status) {
      editFormErrorMsgs.value.delete(key);
    } else {
      editFormErrorMsgs.value.set(key, errorMsgs);
    }
  };

  /** Update table pagination information */
  const updatePagination = (info: Pagination = paginationRef.value) => {
    if (isBoolean(info)) {
      paginationRef.value = info;
    } else if (isObject(paginationRef.value)) {
      paginationRef.value = {
        ...paginationRef.value,
        ...info,
      };
    }
  };
  /** Table infinite scroll */
  const onInfiniteScroll = (
    callback: UseInfiniteScrollParams[1],
    options?: UseInfiniteScrollParams[2],
  ) => {
    const el = getCurrentInstance()?.proxy?.$el.querySelector('.ant-table-body');
    useInfiniteScroll(el, callback, options);
  };

  /**
   * @description When the value or option of the search form needs to be dynamically changed externally, this method needs to be called to obtain the dynamicFormRef instance.
   */
  const getQueryFormRef = () => queryFormRef.value;

  return {
    ...editableMethods,
    ...expandMethods,
    setProps,
    handleSubmit,
    handleTableChange,
    getColumnKey,
    fetchData,
    getQueryFormRef,
    reload,
    onInfiniteScroll,
    handleEditFormValidate,
  };
};
