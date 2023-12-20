<template>
     <div class="mt-2 bg-white shadow-lg rounded-1">
        <nav>
            <ol class="cd-breadcrumb custom-separator">
                <li class="current">
                    <i class="fa-solid fa-layer-group"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Free Material</button>
                </li>
            </ol>
        </nav>
    </div>
    <div>
        <FreeMaterialList :freeMaterials="freeMaterials" :retrieveFreeMaterials="retrieveFreeMaterials"></FreeMaterialList>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

import FreeMaterialList from "@/components/free_material/FreeMaterialList.vue";
import FreeMaterialService from "@/services/free_material.service";

export default defineComponent({
    components: {
        FreeMaterialList,
    },
    setup() {
        const freeMaterials = ref([]);
        const activeIndex = ref(-1);

        const retrieveFreeMaterials = async () => {
            try {
                freeMaterials.value = await FreeMaterialService.all();
                console.log(freeMaterials.value);
            } catch (error) {
                console.log(error);
            }
        };
        retrieveFreeMaterials();
        return {
            freeMaterials,
            activeIndex,
            retrieveFreeMaterials,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>
