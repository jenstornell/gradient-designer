<template>
  <div class="flex flex-col h-full overflow-hidden font-body">
    <Topbar />
    <SelectSet />
    <Sidebar />
    <Main />
    <Modal name="ModalAbout" />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Main from "@/components/Main.vue";
//import ModalAbout from "@/components/modals/ModalAbout.vue";
import Modal from "@/components/modals/Modal.vue";
import Topbar from "@/components/Topbar.vue";
import SelectSet from "@/components/SelectSet.vue";
import global from "@/global.js";

export default {
  name: "App",
  provide: {
    global,
  },
  components: {
    Sidebar,
    Main,
    Modal,
    Topbar,
    SelectSet,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Quicksand:wght@400;700&display=swap");
#app {
  height: 100%;
}

.extra-white,
.extra-transparent,
.extra-current {
  border: 1px solid rgb(163, 163, 163);
}

.extra-transparent {
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 1rem 1rem;
  background-position: 0 0, 0 0.5rem, 0.5rem -0.5rem, -0.5rem 0;
}

.extra-current {
  position: relative;
  background: black !important;
  border: none !important;
}

/*.extra-current:after {
  line-height: 1;
  content: "C";
  font-size: 1.15rem;
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  color: white;
}*/
</style>
