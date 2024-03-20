<template>
  <div>
    <input
      v-show="false"
      ref="inputRef"
      type="file"
      accept=".xlsx, .xls"
      @change="handleInputClick"
    />
    <div @click="handleUpload">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { read, utils } from 'xlsx';
  import type { WorkSheet, WorkBook } from 'xlsx';
  import type { ExcelData } from './typing';
  import { dateUtil } from '@/utils/dateUtil';

  export default defineComponent({
    name: 'ImportExcel',
    props: {
      // Date time format. If not provided or a null value is provided, the original Date object will be returned
      dateFormat: {
        type: String,
      },
      // Time zone adjustment. Experimental function, only to solve the problem of deviation in reading date and time values. Currently only bias correction values for the +08:00 time zone are provided
      // https://github.com/SheetJS/sheetjs/issues/1470#issuecomment-501108554
      timeZone: {
        type: Number,
        default: 8,
      },
    },
    emits: ['success', 'error'],
    setup(props, { emit }) {
      const inputRef = ref<HTMLInputElement | null>(null);
      const loadingRef = ref<Boolean>(false);

      /**
       * @description: The first line serves as the header
       */
      function getHeaderRow(sheet: WorkSheet) {
        if (!sheet || !sheet['!ref']) return [];
        const headers: string[] = [];
        // A3:B7=>{s:{c:0, r:2}, e:{c:1, r:6}}
        const range = utils.decode_range(sheet['!ref']);

        const R = range.s.r;
        /* start in the first row */
        for (let C = range.s.c; C <= range.e.c; ++C) {
          /* walk every column in the range */
          const cell = sheet[utils.encode_cell({ c: C, r: R })];
          /* find the cell in the first row */
          let hdr = `UNKNOWN ${C}`; // <-- replace with your desired default
          if (cell && cell.t) hdr = utils.format_cell(cell);
          headers.push(hdr);
        }
        return headers;
      }

      /**
       * @description:Get excel data
       */
      function getExcelData(workbook: WorkBook) {
        const excelData: ExcelData[] = [];
        const { dateFormat, timeZone } = props;
        for (const sheetName of workbook.SheetNames) {
          const worksheet = workbook.Sheets[sheetName];
          const header: string[] = getHeaderRow(worksheet);
          let results = utils.sheet_to_json(worksheet, {
            raw: true,
            dateNF: dateFormat, //Not worked
          }) as object[];
          results = results.map((row: object) => {
            for (const field in row) {
              if (row[field] instanceof Date) {
                if (timeZone === 8) {
                  row[field].setSeconds(row[field].getSeconds() + 43);
                }
                if (dateFormat) {
                  row[field] = dateUtil(row[field]).format(dateFormat);
                }
              }
            }
            return row;
          });

          excelData.push({
            header,
            results,
            meta: {
              sheetName,
            },
          });
        }
        return excelData;
      }

      /**
       * @description: Read excel data
       */
      function readerData(rawFile: File) {
        loadingRef.value = true;
        const { promise, resolve, reject } = Promise.withResolvers();
        const reader = new FileReader();

        reader.onload = async (e) => {
          try {
            const data = e.target && e.target.result;
            const workbook = read(data, { type: 'array', cellDates: true });
            /* DO SOMETHING WITH workbook HERE */
            const excelData = getExcelData(workbook);
            emit('success', excelData);
            resolve('');
          } catch (error) {
            reject(error);
            emit('error');
          } finally {
            loadingRef.value = false;
          }
        };
        reader.readAsArrayBuffer(rawFile);
        return promise;
      }

      async function upload(rawFile: File) {
        const inputRefDom = unref(inputRef);
        if (inputRefDom) {
          // fix can't select the same excel
          inputRefDom.value = '';
        }
        await readerData(rawFile);
      }

      /**
       * @description: Trigger selection file manager
       */
      function handleInputClick(e: Event) {
        const files = e && (e.target as HTMLInputElement).files;
        const rawFile = files && files[0]; // only setting files[0]
        if (!rawFile) return;
        upload(rawFile);
      }

      /**
       * @description: Click the upload button
       */
      function handleUpload() {
        const inputRefDom = unref(inputRef);
        inputRefDom && inputRefDom.click();
      }

      return { handleUpload, handleInputClick, inputRef };
    },
  });
</script>
