<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click.self="close">
      <transition name="modal-fade">
        <div class="mx-4 sm:mx-auto rounded-lg shadow-2xl bg-white overflow-hidden">
          <div v-if="mode" class="flex flex-col p-12 items-center justify-center bg-green-50 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-5xl sm:text-7xl text-center">You won!</div>
          </div>
          <div v-else class="flex flex-col p-12 items-center bg-red-50 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-5xl sm:text-7xl text-center">You lost!</div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close')
    },
  },
  props: ['mode']
};
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-fade-enter-from {
    opacity: 0;
    transform: translateY(-60px);
  }
  .modal-fade-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: all .3s ease;
  }

  .modal-fade-leave-from {
    opacity: 1;
  }
  .modal-fade-leave-to {
    opacity: 0;
  }

</style>