import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { seeCurrentUser } from '@/api/userApi';

export const useUserStore = defineStore('user', () => {
  const user = ref();
  const currentUser = computed(async () => {
    return user.value = await seeCurrentUser();
  })

  return { user, currentUser }
})
