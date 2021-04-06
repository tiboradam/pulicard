<template>
  <transition name="toast">
    <div class="fixed top-0 z-20 flex items-center justify-center w-full h-24 sm:h-20 shadow-md bg-red-200">
      <div class="font-semibold text-lg px-6 sm:text-2xl text-red-600">Critical Error. Please refresh your browser and try again!</div>
    </div>
  </transition>
</template>

<script>
export default {

}
</script>

<style scoped>

  .toast-enter-active {  
    animation: shakey .5s ease;
  }

  .toast-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  .toast-leave-to {
    opacity: 0;
    transform: translateY(-60px);
  }

  .toast-leave-active {
    transition: all .3s ease;
  }

  @keyframes shakey {
      0% {opacity: 0; transform: translateY(-60px);}
     50% {opacity: 1; transform: translateY(0);}
     60% {transform: translateX(8px);}
     70% {transform: translateX(-8px);}
     80% {transform: translateX(4px);}
     90% {transform: translateX(-4px);}
    100% {transform: translateX(0);}
  }

</style>