<template>
    <div class="page-heading">
        <div class="section">
            <div class="card border-0">
                <div class="row">
                    <div class="col-2 mt-4">
                        <select class="form-select ms-3 w-50" v-model="ITEMS_PER_PAGE">
                            <option v-for="perPageOption in perPageOptions" :key="perPageOption" :value="perPageOption">
                                {{ perPageOption }}
                            </option>
                        </select>
                    </div>
                    <div class="col-7 mt-4">
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="searchText" placeholder="Tìm kiếm" />
                            <div class="input-group-append">
                                <button class="btn btn-light-emphasis">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 mt-4 d-flex justify-content-end">
                        <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                            data-bs-target="#addTopicModal">
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                        <div class="modal zoom" id="addTopicModal" tabindex="-1" aria-labelledby="addTopicModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="addTopicModalLabel"><i class="fa-solid fa-circle-plus text-success"></i> Add Topic
                                        </h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <TopicAdd :retrieveTopics="retrieveTopics" :topics="topics" />
                                </div>
                            </div>
                        </div>    
                    </div>

                </div>

                <div class="card-body">
                    <table class="table text-center table-hover shadow">
                        <thead class="shadow">
                            <tr class="align-middle">
                                <th><button class="btn btn-success rounded-5 disabled">No.</button></th>
                                <th>TOPIC</th>
                                <th>IMAGE</th>
                                <th>STATUS</th>
                                <th>CREATED_AT</th>
                                <th>UPDATED_AT</th>
                                <th>ACTION</th>
                                <th>MANAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(topic, index) in paginatedTopics" :key="topic.topicId" 
                                class="table-row shadow-on-hover align-middle">
                                <td>{{ (currentPage - 1) * ITEMS_PER_PAGE + index + 1 }}</td>
                                <td>{{ topic.topicName }}</td>
                                <td>
                                    <img :src="getImageUrl(topic.image)" alt="Topic Image" class="topic-image rounded-5" />
                                </td>
                                <td>
                                    <span v-if="topic.topicStatus === 1" @click="toggleStatus(topic.topicId, 0)"
                                        class="btn badge text-bg-success">
                                        Enable
                                    </span>
                                    <span v-else-if="topic.topicStatus === 0" @click="toggleStatus(topic.topicId, 1)"
                                        class="btn badge text-bg-danger">
                                        Disable
                                    </span>
                                </td>
                                <td>{{ formatDate(topic.createdAt) }}</td>
                                <td>{{ formatDate(topic.updatedAt) }}</td>

                                <td>
                                    <div class="d-flex justify-content-center">
                                        <!-- Mở modal chỉnh sửa Topic -->
                                        <button type="button" class="btn btn-white border-0" data-bs-toggle="modal" :title="`Chỉnh sửa [${topic.topicName}]`"
                                            :data-bs-target="'#editTopicModal-' + topic.topicId">
                                            <i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i>
                                        </button>
                                        <!-- Modal chỉnh sửa Topic -->
                                        <div :id="'editTopicModal-' + topic.topicId" class="modal zoom" tabindex="-1"
                                            :aria-labelledby="'editTopicModalLabel-' + topic.topicId" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5"
                                                            :id="'editTopicModalLabel-' + topic.topicId"><i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i> Edit Topic</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" 
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <TopicEdit :topicId="topic.topicId"
                                                        :retrieveTopics="retrieveTopics" :topics="topics" />
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" @click="deleteTopic(topic.topicId)"  :title="`Xóa [${topic.topicName}]`"
                                            class="btn btn-white border-0">
                                            <i class="fas fa-trash text-danger"></i>
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <router-link
                                            :to="{ name: 'admin.vocabulary.all', params: { topicId: topic.topicId } }">
                                            <button class="glowing-button ms-2">Vocabulary</button>
                                        </router-link>

                                        <router-link
                                            :to="{ name: 'admin.vocabulary-question.all', params: { topicId: topic.topicId } }">
                                            <button class="glowing-button ms-2">Question</button>
                                        </router-link>

                                    </div>
                                </td>
                            </tr>
                            <tr v-if="paginatedTopics.length === 0">
                                <td colspan="8">No data available</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination controls -->
                    <nav aria-label="Page navigation" v-if="filteredTopics.length > 0">
                        <ul class="pagination justify-content-center">
                            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                                <a class="page-link" href="#" @click="changePage(currentPage - 1)">&laquo;</a>
                            </li>
                            <li v-for="pageNumber in totalPageCount" :key="pageNumber" class="page-item"
                                :class="{ 'active': currentPage === pageNumber }">
                                <a class="page-link" href="#" @click="changePage(pageNumber)">{{ pageNumber }}</a>
                            </li>
                            <li class="page-item" :class="{ 'disabled': currentPage === totalPageCount }">
                                <a class="page-link" href="#" @click="changePage(currentPage + 1)">&raquo;</a>
                            </li>
                        </ul>
                    </nav>
                    <div class="d-flex justify-content-center mt-3 fw-lighter fst-italic" v-if="filteredTopics.length > 0">
                        <p>
                            {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }} -
                            {{
                                Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredTopics.length)
                            }}
                            trên {{ filteredTopics.length }} kết quả
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

import TopicService from "@/services/topic.service";
import TopicAdd from "@/views/topic/TopicAdd.vue";
import TopicEdit from "@/views/topic/TopicEdit.vue";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default defineComponent({
    components: {
        TopicAdd,
        TopicEdit
    },
    props: {
        topics: { type: Array, default: [] },
        retrieveTopics: { type: Function, required: true }, 
    },
    setup(props, context) {
        const router = useRouter();
        const searchText = ref("");
        const ITEMS_PER_PAGE_OPTIONS = [25, 50, 75, 100];
        const ITEMS_PER_PAGE = ref(ITEMS_PER_PAGE_OPTIONS[0]);
        const currentPage = ref(1);

        const filteredTopics = computed(() => {
            if (!searchText.value) {
                return props.topics.slice();
            }
            return props.topics.filter((topic) =>
                Object.values(topic).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const totalPageCount = computed(() => Math.ceil(filteredTopics.value.length / ITEMS_PER_PAGE.value));

        const paginatedTopics = computed(() => {
            const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE.value;
            const endIndex = startIndex + ITEMS_PER_PAGE.value;
            return filteredTopics.value.slice(startIndex, endIndex);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPageCount.value) {
                currentPage.value = page;
            }
        };

        const perPageOptions = computed(() => {
            return ITEMS_PER_PAGE_OPTIONS;
        });

        watch(() => props.topics, () => {
            currentPage.value = 1; 
        });

        // Add computed properties for first row number, last row number, and total number of rows
        const firstRowNumber = computed(() => (currentPage - 1) * ITEMS_PER_PAGE + 1);
        const lastRowNumber = computed(() =>
            Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredTopics.length)
        );

        const deleteTopic = async (topicId) => {
            const result = await Swal.fire({
                title: 'Bạn muốn xóa chủ đề này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            });
            if (result.isConfirmed) {
                try {
                    await TopicService.delete(topicId);
                    props.retrieveTopics();
                    Swal.fire({
                        title: 'Xóa chủ đề thành công!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Lỗi khi xóa chủ đề',
                        icon: 'error',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                }
            }
        };

        const getImageUrl = (imageName) => {
            if (imageName) {
                return `http://localhost:9004/images/${imageName}`;
            }
            return "http://localhost:9004/images/default-image.png";
        };

        const goToAddTopic = () => {
            router.push({ name: "admin.topic.add" });
        };

        const toggleStatus = async (topicId, newStatus) => {
            try {
                console.log(topicId);
                console.log(newStatus);
                await TopicService.updateStatus(topicId, newStatus);
                props.retrieveTopics();
            } catch (error) {
                console.error(error);
            }
        };

        const formatDate = (dateTimeString) => {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const date = new Date(dateTimeString);
            return date.toLocaleDateString('en-GB', options);
        };

        return {
            searchText,
            filteredTopics,
            deleteTopic,
            goToAddTopic,
            getImageUrl,
            paginatedTopics,
            currentPage,
            totalPageCount,
            changePage,
            ITEMS_PER_PAGE,
            ITEMS_PER_PAGE_OPTIONS,
            perPageOptions,
            firstRowNumber,
            lastRowNumber,
            toggleStatus,
            formatDate
        };
    },
});
</script>

<style scoped>
.table-row.shadow-on-hover:hover {
   box-shadow: 0 2px 3px rgba(196, 181, 181, 0.9); 
}
th {
   color: #052649; 
   font-weight: bold;
}
td {
   color: #052649; 
   font-weight: normal;
}
.modal.zoom .modal-dialog {
  transition: transform 0.2s ease-out;
  transform: scale(0.4);
}
.modal.zoom.show .modal-dialog {
  transform: scale(1);
}
.glowing-button {
    padding: 10px 20px;
    font-size: 13px;
    background: linear-gradient(45deg, rgb(59, 99, 126), #0b3142);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    transform-origin: center;
}
.glowing-button:hover {
    animation: glowing 1.5s infinite;
}
@keyframes glowing {
    0% {
        box-shadow: 0 0 5px #2d97df, 0 0 20px #309ae0;
    }

    50% {
        box-shadow: 0 0 20px #2f94d8, 0 0 40px #3098dd;
    }

    100% {
        box-shadow: 0 0 5px #319ae0, 0 0 20px #2f98dd;
    }
}
.topic-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 10px;
}
.input-group {
    border: 1px solid #6694c2;
    border-radius: 10px;
    overflow: hidden;
    width: 80%;
}
.input-group .form-control {
    border: none;
    box-shadow: none;
    outline: none;
}
.input-group .btn {
    border: none;
    background-color: transparent;
    box-shadow: none;
    outline: none;
}
.form-select,
.form-control {
    font-size: 14px;
}

.table {
    font-size: 13px;

}

.page-item .page-link {
    font-size: 13px;
}
</style>
  