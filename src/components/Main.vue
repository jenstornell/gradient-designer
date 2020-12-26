<script>
/*import Palette from "@/components/Palette.vue";
import Shade from "@/components/Shade.vue";

import Port from "@/components/Port.vue";

import PreviewMix from "@/components/PreviewMix.vue";
import Direction from "@/components/Direction.vue";*/

import { watchEffect, ref } from "vue";
import vclone from "@/vclone/";

export default {
  components: {
    //Tabs,
    /*Palette,
    Shade,
    Port,
    Direction,
    
    PreviewMix,*/
  },
  setup() {
    const { state, thisGradientClasses } = vclone;
    const root = ref(null);

    function isEmpty(obj) {
      if (!obj) return;
      return Object.keys(obj).length === 0;
    }

    watchEffect(() => {
      if (root.value) {
        state.css = window
          .getComputedStyle(root.value)
          .getPropertyValue("background-image");
      }
    });

    return { isEmpty, thisGradientClasses, root, state };
  },
};
</script>
