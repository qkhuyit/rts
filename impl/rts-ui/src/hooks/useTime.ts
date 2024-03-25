import { ref, onMounted, onUnmounted } from 'vue';

/**
 * @description Get local time
 */
export function useTime() {
  let timer; // 定时器
  const year = ref(0); // years
  const month = ref(0); // month
  const week = ref(''); // Day of the week
  const day = ref(0); // days
  const hour = ref<number | string>(0); // Hour
  const minute = ref<number | string>(0); // minute
  const second = ref(0); // second

  // Update time
  const updateTime = () => {
    const date = new Date();
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1;
    week.value = '日一二三四五六'.charAt(date.getDay());
    day.value = date.getDate();
    hour.value =
      `${date.getHours()}`?.padStart(2, '0') ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getHours());
    minute.value =
      `${date.getMinutes()}`?.padStart(2, '0') ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getMinutes());
    second.value = date.getSeconds();
  };

  updateTime();

  onMounted(() => {
    clearInterval(timer);
    timer = setInterval(() => updateTime(), 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return { month, day, hour, minute, second, week };
}
