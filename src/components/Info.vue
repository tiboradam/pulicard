<template>
  <div class="  flex flex-col mt-20 justify-center">
    <div class="  flex flex-col items-center mx-auto gap-4">
      <img src="/img/Pulicard.svg" alt="Pulicard logo" class="w-32 sm:w-48">
      <div class="text-lg font-bold sm:text-4xl">PuliCard</div>
      <div class="relative -top-4 text-gray-500">Matching Game</div>
    </div>

    <ul class=" flex flex-col justify-center gap-6 mx-auto mt-4 w-full sm:w-7/12">
      <li class="flex overflow-hidden border rounded-lg border-gray-200">
        <div class="flex items-center justify-center w-16 bg-gray-200">
          <svg viewBox="0 0 24 24" class="w-8 text-gray-500">
            <path fill="currentColor" d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
          </svg>
        </div>
        <div class="px-4">
          <div class="text-lg font-semibold pt-1">Easy</div>
          <div class="relative text-gray-500 -top-1">Default card slot order for the whole game.</div>
        </div>      
      </li>

      <li class="flex overflow-hidden border rounded-lg border-blue-200">
        <div class="flex items-center justify-center w-16 bg-blue-100">
          <svg viewBox="0 0 24 24" class="w-8 text-blue-500">
            <path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
          </svg>              
        </div>
        <div class="px-4">
          <div class="text-lg font-semibold pt-1">Normal</div>
          <div class="relative text-gray-500 -top-1">Card slot order is shuffled at the start of the game</div>
        </div>      
      </li>

      <li class="flex overflow-hidden border rounded-lg border-red-200">
        <div class="flex items-center justify-center w-16 bg-red-100">
          <svg viewBox="0 0 24 24" class="w-8 text-red-500">
            <path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
          </svg>              
        </div>
        <div class="px-4">
          <div class="text-lg font-semibold pt-1">Hard</div>
          <div class="relative text-gray-500 -top-1">card slot order is shuffled at every card draw</div>
        </div>      
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>