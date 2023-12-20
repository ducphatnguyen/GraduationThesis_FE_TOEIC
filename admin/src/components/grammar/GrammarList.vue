<template>
    <div class="page-heading">
       
        <section class="section">
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
                            data-bs-target="#addGrammarModal">
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                        <div class="modal zoom" id="addGrammarModal" tabindex="-1" aria-labelledby="addGrammarModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="addGrammarModalLabel"><i class="fa-solid fa-circle-plus text-success"></i> Add Grammar
                                        </h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <GrammarAdd :retrieveGrammars="retrieveGrammars" :grammars="grammars" />
                                </div>
                            </div>
                        </div> 
                    </div>

                </div>
                <div class="card-body">
                    <table class="table text-center table-hover shadow">
                        <thead class="text-center shadow">
                            <tr class="align-middle">
                                <th>
                                    <button class="btn btn-success rounded-5 disabled">No.</button>
                                </th>
                                <th>GRAMMAR</th>
                                <th>STATUS</th>
                                <th>CREATED_AT</th>
                                <th>UPDATED_AT</th>
                                <th>ACTION</th>
                                <th>MANAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(grammar, index) in paginatedGrammars" :key="grammar.grammarId" 
                                class="table-row shadow-on-hover align-middle">
                                <td>{{ (currentPage - 1) * ITEMS_PER_PAGE + index + 1 }}</td>
                                <td>{{ grammar.grammarName }}</td>
                                <td>
                                    <span v-if="grammar.grammarStatus === 1" @click="toggleStatus(grammar.grammarId, 0)"
                                        class="btn badge text-bg-success">
                                        Enable
                                    </span>
                                    <span v-else-if="grammar.grammarStatus === 0" @click="toggleStatus(grammar.grammarId, 1)"
                                        class="btn badge text-bg-danger">
                                        Disable
                                    </span>
                                </td>

                                <td>{{ formatDate(grammar.createdAt) }}</td>
                                <td>{{ formatDate(grammar.updatedAt) }}</td>

                                <td>
                                    <div class="d-flex justify-content-center">
                                        <!-- Mở modal chỉnh sửa Grammar -->
                                        <button type="button" class="btn btn-white border-0" data-bs-toggle="modal" :title="`Chỉnh sửa [${grammar.grammarName}]`"
                                            :data-bs-target="'#editGrammarModal-' + grammar.grammarId">
                                            <i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i>
                                        </button>
                                        <!-- Modal chỉnh sửa Grammar -->
                                        <div :id="'editGrammarModal-' + grammar.grammarId" class="modal zoom" tabindex="-1"
                                            :aria-labelledby="'editGrammarModalLabel-' + grammar.grammarId" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5"
                                                            :id="'editGrammarModalLabel-' + grammar.grammarId"><i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i> Edit Grammar</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" 
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <GrammarEdit :grammarId="grammar.grammarId"
                                                        :retrieveGrammars="retrieveGrammars" :grammars="grammars" />
                                                </div>
                                            </div>
                                        </div>

                                        <button type="button" @click="deleteGrammar(grammar.grammarId)" :title="`Xóa [${grammar.grammarName}]`"
                                            class="btn btn-white border-0">
                                            <i class="fas fa-trash text-danger"></i>
                                        </button>                          

                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <router-link :to="{
                                            name: 'admin.grammar-content.all',
                                            params: { grammarId: grammar.grammarId },
                                        }">
                                             <button class="glowing-button ms-2">Grammar Content</button>
                                        </router-link>

                                        <router-link :to="{
                                            name: 'admin.grammar-question.all',
                                            params: { grammarId: grammar.grammarId },
                                        }">
                                             <button class="glowing-button ms-2">Question</button>
                                        </router-link>

                                    </div>


                                </td>
                            </tr>
                            <tr v-if="paginatedGrammars.length === 0">
                                <td colspan="6">No data available</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Pagination controls -->
                    <nav aria-label="Page navigation" v-if="filteredGrammars.length > 0">
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
                    <div class="d-flex justify-content-center mt-3 fw-lighter fst-italic"
                        v-if="filteredGrammars.length > 0">
                        <p>
                            {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }} -
                            {{
                                Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredGrammars.length)
                            }}
                            trên {{ filteredGrammars.length }} kết quả
                        </p>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>
<script>
import { defineComponent, reactive, ref, computed, watch } from "vue";
import GrammarService from "@/services/grammar.service";
import GrammarAdd from "@/views/grammar/GrammarAdd.vue";
import GrammarEdit from "@/views/grammar/GrammarEdit.vue";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { useRouter } from "vue-router";

export default defineComponent({
    components: {
        GrammarAdd,
        GrammarEdit
    },
    props: {
        grammars: { type: Array, default: [] },
        retrieveGrammars: { type: Function, required: true }, 
    },
    setup(props, context) {

        const router = useRouter();
        const searchText = ref("");
        const ITEMS_PER_PAGE_OPTIONS = [25, 50, 75, 100]; 
        const ITEMS_PER_PAGE = ref(ITEMS_PER_PAGE_OPTIONS[0]);
        const currentPage = ref(1);

        const filteredGrammars = computed(() => {
            if (!searchText.value) {
                return props.grammars.slice();
            }
            return props.grammars.filter((grammar) =>
                Object.values(grammar).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const totalPageCount = computed(() => Math.ceil(filteredGrammars.value.length / ITEMS_PER_PAGE.value));

        const paginatedGrammars = computed(() => {
            const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE.value;
            const endIndex = startIndex + ITEMS_PER_PAGE.value;
            return filteredGrammars.value.slice(startIndex, endIndex);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPageCount.value) {
                currentPage.value = page;
            }
        };

        const perPageOptions = computed(() => {
            return ITEMS_PER_PAGE_OPTIONS;
        });

        watch(() => props.grammars, () => {
            currentPage.value = 1; 
        });

        const firstRowNumber = computed(() => (currentPage - 1) * ITEMS_PER_PAGE + 1);
        const lastRowNumber = computed(() => Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredGrammars.length));

        const deleteGrammar = async (grammarId) => {
            const result = await Swal.fire({
                title: 'Bạn muốn xóa ngữ pháp này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            });
            if (result.isConfirmed) {
                try {
                    await GrammarService.delete(grammarId);
                    props.retrieveGrammars();
                    Swal.fire({
                        title: 'Xóa ngữ pháp thành công!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Lỗi khi xóa ngữ pháp',
                        icon: 'error',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                }
            }
        };

        const goToAddGrammar = () => {
            router.push({ name: "admin.grammar.add" });
        };

        const toggleStatus = async (grammarId, newStatus) => {
            try {
                console.log(grammarId);
                console.log(newStatus);
                await GrammarService.updateStatus(grammarId, newStatus);
                props.retrieveGrammars();
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
            filteredGrammars,
            deleteGrammar,
            goToAddGrammar,
            paginatedGrammars,
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