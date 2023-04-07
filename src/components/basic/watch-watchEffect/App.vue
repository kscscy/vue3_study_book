<template>
  <p>{{ count_o }}</p>
  <button @click="count_o++">Options API 카운트 증가</button>
  <p>{{ count_c_1 }}</p>
  <button @click="count_c_1++">Composition API 1st 카운트 증가</button>
  <p>{{ count_c_2 }}</p>
  <button @click="count_c_2++">Composition API 2nd 카운트 증가</button>
  <p>상태: {{ state }}</p>
  <button @click="onStop()">watchEffect 중지</button>

</template>

<script>
import { ref, watch, watchEffect } from 'vue';

export default {
  // Options API
  data() {
    return {
      count_o: 0,
    }
  },
  watch: {
    count_o: (newValue, oldValue) => {
      console.log(`Options API Watch: ${oldValue} ==> ${newValue}`);
    }
  },

  // Composition API
  setup() {
    const count_c_1 = ref(0);
    const count_c_2 = ref(0);
    const state = ref('실행 중');
    
    watch(count_c_1, (newValue, oldValue) => {
      console.log(`Composition API Watch: ${oldValue} ==> ${newValue}`);
    }, {
      immediate: true
    });

    watch([count_c_1, count_c_2], (newValue, oldValue) => {
      console.log(`Composition API MULTIPLE Watch: ${oldValue} ==> ${newValue}`);
    });

    /**
     * 기본적으로 와처는 컴포넌트 렌더링 직전에 실행됩니다.
     * flush: 'post'를 설정하면 컴포넌트 렌더링 이후까지 와처가 지연됩니다.
     * 자세한 내용은 콜백 플러시 타이밍을 참조하세요. (https://ko.vuejs.org/guide/essentials/watchers.html#callback-flush-timing)
     * 드물지만 캐시 무효화와 같이 반응형 의존성이 변경될 때 즉시 와처를 트리거해야 하는 경우가 있을 수 있습니다.
     * 이는 flush: 'sync'를 사용하여 수행할 수 있습니다.
     * 그러나 이 설정은 여러 프로퍼티가 동시에 업데이트되는 경우 성능 및 데이터 일관성 문제를 일으킬 수 있으므로 주의해서 사용해야 합니다.
     * 
     * 기본적으로 flush: 'pre'|'post' 옵션은 콜백을 버퍼링하여, 동일한 "틱(tick)"에서 여러 번 상태 변경이 되더라도, 마지막에 한 번만 호출됩니다.
     * 동일한 틱 내에 여러 번 상태 변경 시 마다 동기적으로 콜백을 호출해야 하는 경우, flush: 'sync' 옵션을 사용해야 합니다.
     * 단, 일반적으로 이러한 동작은 비효율적이므로 사용하려는 경우, 정말 필요한지 다시 한번 고민해봐야 합니다.
     */

    const stop = watchEffect(() => {
      console.log(`Composition API watchEffect called ${count_c_2.value}`);
    }, {
      flush: 'post'
    });
    const onStop = () => {
      state.value = '중지됨'
      stop();
    }

    return {
      count_c_1,
      count_c_2,
      state,
      onStop
    }
  }
}
</script>
