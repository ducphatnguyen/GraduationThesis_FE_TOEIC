<template>
    <div>
        <h1>NGHE</h1>
        <div class="row d-flex justify-content-start">
            <div v-for="(section, index) in ngheSections" :key="index" class="col-lg-3 col-md-6 col-sm-12 d-flex">
                <!-- Hiển thị thông tin về phần nghe -->
                <router-link :to="{ name: 'practice.show', params: { sectionId: section.id } }"
                    class="card text-decoration-none">
                    <div class="card-image">
                        <img :src="getImageUrl(section.image)" class="card-img-top" alt="..." loading="lazy"/>
                    </div>
                    <div class="card-body">
                        <p class="fw-bolder underline-hover">{{ section.name }}</p>
                        <p class="card-text overflow-ellipsis" :title="section.description">
                            {{ section.description }}
                        </p>
                    </div>
                </router-link>
            </div>
        </div>

        <h1 class="mt-4">ĐỌC</h1>
        <div class="row d-flex justify-content-start">
            <div v-for="(section, index) in docSections" :key="index"  class="col-lg-3 col-md-6 col-sm-12">
                <!-- Hiển thị thông tin về phần đọc -->
                <router-link :to="{ name: 'practice.show', params: { sectionId: section.id } }"
                    class="card text-decoration-none mb-3">
                    <div class="card-image">
                        <img :src="getImageUrl(section.image)" class="card-img-top" style="height: 143px;" alt="..." loading="lazy"/>
                    </div>
                    <div class="card-body ">
                        <p class="fw-bolder underline-hover">{{ section.name }}</p>
                        <p class="card-text overflow-ellipsis" :title="section.description">
                            {{ section.description }}
                        </p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import SectionService from "@/services/section.service";
export default defineComponent(
    {
        name: 'LR',
        props: {
            msg: String
        },
        setup() {
            const sections = ref([]);
            const activeIndex = ref(-1);

            const retrieveSections = async () => {
                try {
                    sections.value = await SectionService.allEnable();
                    console.log(sections.value)
                } catch (error) {
                    console.log(error);
                }
            };

            retrieveSections();

            const getImageUrl = (imageName) => {
                if (imageName) {
                    // Tạo URL cho ảnh bằng cách kết hợp đường dẫn cơ sở và tên ảnh
                    return `http://localhost:9004/images/${imageName}`;
                }
                return "http://localhost:9004/images/default-image.png";
            };

            const ngheSections = computed(() => {
                return sections.value.filter((section) => section.type === 1);
            });

            // Tạo computed property mới để lọc các phần có type "Đọc"
            const docSections = computed(() => {
                return sections.value.filter((section) => section.type === 2);
            });

            return {
                sections,
                activeIndex,
                ngheSections,
                docSections,
                retrieveSections,
                getImageUrl
            };
        },
    }

);
</script>

<style scoped>
.card {
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(7, 6, 6, 0.1);
    cursor: pointer;
    border-color: rgb(255, 255, 255, 0);
}
.card-image {
    overflow: hidden;
    position: relative;
    border-radius: 8px 8px 0 0;
}
.card-image img {
    width: 100%;
    height: auto;
    transition: transform 0.7s;
}
.card-image:hover img {
    transform: scale(1.3);
}
.card-body {
    padding: 20px;
    background-color: #fff;
    height: 200px;
}
.card-text {
    font-size: 14px;
    color: #555;
}
h1 {
    /* font-family: "Arial", sans-serif; */
    font-weight: 700;
    color: #34447c;
}
#test p {
    /* font-family: "SVN-Poppins,sans-serif;", sans-serif; */
    font-size: 16px;
    color: #8293d0;
    text-align: center;
    line-height: 1.5;
    margin: 20px 100px;
    font-weight: 700;
}
.card-body a.btn {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #34447c;
    color: #fff;
    border: none;
    border-radius: 20px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.card-body a.btn:hover {
    background-color: #2c3e6e;
}
.overflow-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 8;
    /* Số dòng hiển thị */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
.underline-hover {
    position: relative;
    display: inline-block;
    color: #2c3e6e;
}

.underline-hover::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px; /* Điều chỉnh độ dày của underline tại đây */
    background-color: blue; /* Thay đổi màu của underline tại đây */
    bottom: 0;
    left: 0;
    transition: width 0.3s ease; /* Điều chỉnh thời gian và kiểu chuyển động */
}

.underline-hover:hover::after {
    width: 100%;
}
</style>

