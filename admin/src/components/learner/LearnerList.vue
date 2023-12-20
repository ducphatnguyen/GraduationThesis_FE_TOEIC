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
                    <div class="col-7 mt-4 d-flex justify-content-end">
                        <div class="input-group me-3">
                            <input type="text" class="form-control" v-model="searchText" placeholder="Tìm kiếm" />
                            <div class="input-group-append">
                                <button class="btn btn-light-emphasis">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body ">
                    <table class="table text-center table-hover shadow">
                        <thead class="shadow">
                            <tr class="align-middle">
                                <th>
                                    <button class="btn btn-success rounded-5 disabled">No.</button>
                                </th>
                                <th>IMAGE</th>
                                <th>EMAIL</th>
                                <th>USERNAME</th>
                                <th>ADDRESS</th>
                                <th>PHONENUMBER</th>
                                <th>GENDER</th>
                                <th>IS_ACTIVE</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(learner, index) in paginatedLearners" :key="learner.id" 
                                class="table-row shadow-on-hover align-middle">
                                <td>{{ (currentPage - 1) * ITEMS_PER_PAGE + index + 1 }}</td>
                                <td>
                                    <img :src="getImageUrl(learner.image)" alt="Section Image" class="learner-image rounded-5" />
                                </td>
                                <td>{{ learner.email }}</td>
                                <td>{{ learner.username }}</td>
                                <td>{{ learner.address }}</td>
                                <td>{{ learner.phoneNumber }}</td>
                                <td>
                                    {{ getGenderType(learner.gender) }} 
                                </td>
                                <td>
                                    <span v-if="learner.isActive === 1" class="text-success fw-bold">
                                        Active
                                    </span>
                                    <span v-else-if="learner.status === 0" class="text-danger fw-bold">
                                        Deactive
                                    </span>
                                </td>
                                <td>
                                    <span v-if="learner.status === 1"
                                        @click="toggleStatus(learner.id, 0)" class="btn badge text-bg-success">
                                        Enable
                                    </span>
                                    <span v-else-if="learner.status === 0"
                                        @click="toggleStatus(learner.id, 1)" class="btn badge text-bg-danger">
                                        Disable
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="paginatedLearners.length === 0">
                                <td colspan="7">No data available</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Pagination controls -->
                    <nav aria-label="Page navigation" v-if="filteredLearners.length > 0">
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
                    <div class="d-flex justify-content-center mt-3 fw-lighter fst-italic" v-if="filteredLearners.length > 0">
                        <p>
                            {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }} -
                            {{
                                Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredLearners.length)
                            }}
                            trên {{ filteredLearners.length }} kết quả
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, computed, watch } from "vue";
import UserService from "@/services/user.service";

export default defineComponent({

    props: {
        learners: { type: Array, default: [] },
        getAllLearners: Function
    },

    setup(props) {

        const searchText = ref("");
        const ITEMS_PER_PAGE_OPTIONS = [25, 50, 75, 100]; 
        const ITEMS_PER_PAGE = ref(ITEMS_PER_PAGE_OPTIONS[0]);
        const currentPage = ref(1);

        const filteredLearners = computed(() => {
            if (!searchText.value) {
                return props.learners.slice();
            }
            return props.learners.filter((learner) =>
                Object.values(learner).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const totalPageCount = computed(() => Math.ceil(filteredLearners.value.length / ITEMS_PER_PAGE.value));

        const paginatedLearners = computed(() => {
            const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE.value;
            const endIndex = startIndex + ITEMS_PER_PAGE.value;
            return filteredLearners.value.slice(startIndex, endIndex);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPageCount.value) {
                currentPage.value = page;
            }
        };

        const perPageOptions = computed(() => {
            return ITEMS_PER_PAGE_OPTIONS;
        });

        watch(() => props.learners, () => {
            currentPage.value = 1; 
        });

        // Add computed properties for first row number, last row number, and total number of rows
        const firstRowNumber = computed(() => (currentPage - 1) * ITEMS_PER_PAGE + 1);
        const lastRowNumber = computed(() => 
            Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredLearners.length)
        );

        const getImageUrl = (imageName) => {
            if (imageName) {
                return `http://localhost:9004/images/${imageName}`;
            }
            return "http://localhost:9004/images/anhdaidienmacdinh.jpg";
        };

        const getGenderType = (type) => {
            switch (type) {
                case 0:
                    return "Nam";
                case 1:
                    return "Nữ";
                default:
                    return "";
            }
        };

        const toggleStatus = async (userId, newStatus) => {
            try {
                await UserService.updateUserStatus(userId, newStatus);
                props.getAllLearners();
            } catch (error) {
                console.error(error);
            }
        };

        return {
            searchText,
            filteredLearners,
            paginatedLearners,
            currentPage,
            totalPageCount,
            changePage,
            ITEMS_PER_PAGE,
            ITEMS_PER_PAGE_OPTIONS,
            perPageOptions,
            firstRowNumber,
            lastRowNumber,
            getImageUrl,
            getGenderType,
            toggleStatus
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
.learner-image {
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
  