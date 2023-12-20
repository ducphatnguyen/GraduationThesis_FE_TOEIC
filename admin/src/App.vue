<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>

* {
  font-family: "Poppins", sans-serif;
}

/* Ẩn thanh cuộn chiều ngang khi không cần thiết */
body {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

/* --------------------------Scroll bar----------------------- */
::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  /* Chiều rộng của thanh cuộn */
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

* {
  scrollbar-color: #888 #f1f1f1;
  scrollbar-width: thin;
}
</style>
