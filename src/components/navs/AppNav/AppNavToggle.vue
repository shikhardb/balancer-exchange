<template>
  <div class="app-nav-toggle">
    <router-link
      :to="{ name: 'trade' }"
      :class="['toggle-link pl-4 pr-6', { [activeClasses]: isTradePage }]"
    >
      {{ $t('trade') }}
    </router-link>
  </div>
</template>

<script lang="ts">
import useFathom from '@/composables/useFathom';
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AppNavToggle',

  setup() {
    const route = useRoute();
    const activeClasses = 'bg-black text-white';
    const isTradePage = true;
    const { trackGoal, Goals } = useFathom();

    return {
      isTradePage,
      activeClasses,
      trackGoal,
      Goals
    };
  }
});
</script>

<style scoped>
.app-nav-toggle {
  @apply h-10 border rounded-full flex items-center font-medium shadow overflow-hidden;
}

.toggle-link {
  @apply h-full flex items-center;
}
</style>
