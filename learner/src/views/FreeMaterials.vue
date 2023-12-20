<template>
    <div class="container">
        <h1 class="text-center mt-5">
            <span>DOWNLOAD TÀI LIỆU MIỄN PHÍ TOEIC</span>
        </h1>
        <div class="row mt-5">
            <div class="col-lg col-md col-sm">
                <div class="card specific-card">
                    <div class="card-body lesson-content">
                        <div class="row">
                            
                            <div class="d-flex justify-content-center text-center">
                                <div class="alert alert-primary w-75" role="alert">
                                    <i class="fa-solid fa-circle-question me-2"></i>Click để tải xuống
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6" v-for="freeMaterial in freeMaterials"
                                :key="freeMaterial.materialId">
                                <div class="card specific-card mb-3" :title="freeMaterial.description">
                                    <div class="card-body test" @click="downloadFilePdf(freeMaterial.filePdf)">
                                        <span class="icon-container bg-danger">
                                            <i class="fa-solid fa-file-pdf text-white p-3"></i>
                                        </span>
                                        <span class="grammar-name">{{ freeMaterial.title }}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4 text-decoration-none">
                <div class="card mb-2" v-for="section in docngheSections" :key="section.id">
                    <router-link class="card-body text-decoration-none custom-card"
                        :to="{ name: 'practice.show', params: { sectionId: section.id } }">
                        {{ section.name }}
                    </router-link>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";

import SectionService from "@/services/section.service";
import FreeMaterialService from "@/services/free_material.service";

export default defineComponent({
    setup() {

        const sections = ref([]);
        const retrieveSections = async () => {
            try {
                sections.value = await SectionService.allEnable();
                console.log(sections.value)
            } catch (error) {
                console.log(error);
            }
        };
        const docngheSections = computed(() => {
            return sections.value.filter((section) => section.type === 1 || section.type === 2);
        });

        // DOWNLOAD
        const freeMaterials = ref([]);
        const fetchFreeMaterials = async () => {
            try {
                freeMaterials.value = await FreeMaterialService.allEnable();
                console.log(freeMaterials.value);
            } catch (error) {
                console.log(error);
            }
        };
        const downloadFilePdf = async (fileName) => {
            try {
                await FreeMaterialService.downloadFilePdf(fileName);
            } catch (error) {
                console.log(error);
            }
        };

        onMounted(() => {
            retrieveSections();
            fetchFreeMaterials();
        });

        return {
            sections,
            retrieveSections,
            docngheSections,

            freeMaterials,
            downloadFilePdf
        };
    },
});
</script>
  
<style scoped>
@import "@/assets/grammar.css";
</style>
  