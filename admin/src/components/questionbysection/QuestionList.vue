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

                    <div class="col-6 mt-4">
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="searchText" placeholder="Tìm kiếm" />
                            <div class="input-group-append">
                                <button class="btn btn-light-emphasis">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="col-4 mt-4 d-flex justify-content-end">
                        <div v-if="sectionId == 1">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Question Section 1
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddSection1 :sectionId="sectionId"
                                            :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div v-if="sectionId == 2">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Question Section 2
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddSection2 :sectionId="sectionId"
                                            :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div v-if="sectionId == 3">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Question Section 3
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddSection3 :sectionId="sectionId"
                                            :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div v-if="sectionId == 4">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Question Section 4
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddSection4 :sectionId="sectionId"
                                            :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div v-if="sectionId == 5">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Question Section 5
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddSection5 :sectionId="sectionId"
                                            :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div v-if="sectionId == 6">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Question Section 6
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddSection6 :sectionId="sectionId"
                                            :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div v-if="sectionId == 7">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Question Section 7
                                                Single
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddSection7Single :sectionId="sectionId"
                                            :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="sectionId == 12">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Question Section 7
                                                Double
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddSection7Double :sectionId="sectionId"
                                            :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div v-if="sectionId == 13">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Question Section 7
                                                Triple
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddSection7Triple :sectionId="sectionId"
                                            :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="sectionId == 104">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Speaking Question
                                                (No 1 To 2)
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddNo1To2 :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="sectionId == 105">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Speaking Question
                                                (No 3 To 4)
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddNo3To4 :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="sectionId == 106">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Speaking Question
                                                (No 5 To 7)
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddNo5To7 :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="sectionId == 107">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>

                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Speaking Question
                                                (No 8 To 10)
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddNo8To10 :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div v-if="sectionId == 108">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>

                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Speaking Question
                                                (No 11)
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddNo11 :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="sectionId == 109">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>

                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Writing Question
                                                (No 1-5)
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddNo1To5 :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="sectionId == 110">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>

                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Writing Question
                                                (No 1-5)
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddNo6To7 :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="sectionId == 111">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>

                            <div class="modal zoom" id="addQuestionModal" tabindex="-1"
                                aria-labelledby="addQuestionModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="addQuestionModalLabel"><i
                                                    class="fa-solid fa-circle-plus text-success"></i> Add Writing Question
                                                (No 8)
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionAddNo8 :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <!-- Phần 1: Mô tả tranh -->
                    <TableSection1 v-if="sectionId === '1'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :getImageUrl="getImageUrl"
                        :getAudioUrl="getAudioUrl" :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />

                    <!-- Phần 2: Hỏi - Đáp -->
                    <TableSection2 v-if="sectionId === '2'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :getAudioUrl="getAudioUrl"
                        :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />

                    <!-- Phần 3: Đoạn hội thoại -->
                    <TableSection3 v-if="sectionId === '3'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :getImageUrl="getImageUrl"
                        :getAudioUrl="getAudioUrl" :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />

                    <!-- Phần 4: Bài nói ngắn -->
                    <TableSection4 v-if="sectionId === '4'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :getImageUrl="getImageUrl"
                        :getAudioUrl="getAudioUrl" :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />

                    <!-- Phần 5: Hoàn thành câu -->
                    <TableSection5 v-if="sectionId === '5'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :retrieveQuestions="retrieveQuestions" />

                    <!-- Phần 6: Hoàn thành đoạn văn -->
                    <TableSection6 v-if="sectionId === '6'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :retrieveQuestions="retrieveQuestions" />

                    <!-- Phần 7: Đọc hiểu - Đoạn đơn -->
                    <TableSection7Single v-if="sectionId === '7'" :paginatedQuestions="paginatedQuestions"
                        :getImageUrl="getImageUrl" :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE"
                        :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />

                    <!-- Phần 7: Đọc hiểu - Đoạn kép -->
                    <TableSection7Double v-if="sectionId === '12'" :paginatedQuestions="paginatedQuestions"
                        :getImageUrl="getImageUrl" :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE"
                        :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />

                    <!-- Phần 7: Đọc hiểu - Đoạn ba -->
                    <TableSection7Triple v-if="sectionId === '13'" :paginatedQuestions="paginatedQuestions"
                        :getImageUrl="getImageUrl" :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE"
                        :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />

                    <!-- NÓI: Câu 1-2 -->
                    <TableSectionNo1To2 v-if="sectionId === '104'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :retrieveQuestions="retrieveQuestions" />

                    <!-- NÓI: Câu 3-4 -->
                    <TableSectionNo3To4 v-if="sectionId === '105'" :paginatedQuestions="paginatedQuestions"
                        :getImageUrl="getImageUrl" :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE"
                        :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />

                    <!-- NÓI: Câu 5-7 -->
                    <TableSectionNo5To7 v-if="sectionId === '106'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :retrieveQuestions="retrieveQuestions" />

                    <!-- NÓI: Câu 8-10 -->
                    <TableSectionNo8To10 v-if="sectionId === '107'" :paginatedQuestions="paginatedQuestions"
                        :getImageUrl="getImageUrl" :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE"
                        :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />

                    <!-- NÓI: Câu 11 -->
                    <TableSectionNo11 v-if="sectionId === '108'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :retrieveQuestions="retrieveQuestions" />

                    <!-- VIẾT: Câu 1-5 -->
                    <TableSectionNo1To5 v-if="sectionId === '109'" :paginatedQuestions="paginatedQuestions"
                        :getImageUrl="getImageUrl" :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE"
                        :sectionId="sectionId" :retrieveQuestions="retrieveQuestions" />

                    <!-- VIẾT: Câu 6-7 -->
                    <TableSectionNo6To7 v-if="sectionId === '110'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :retrieveQuestions="retrieveQuestions" />

                    <!-- VIẾT: Câu 8 -->
                    <TableSectionNo8 v-if="sectionId === '111'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :retrieveQuestions="retrieveQuestions" />
                        
                    <!-- Pagination controls -->
                    <nav aria-label="Page navigation" v-if="filteredQuestions.length > 0">
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
                        v-if="filteredQuestions.length > 0">
                        <p>
                            {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }} -
                            {{
                                Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredQuestions.length)
                            }}
                            trên {{ filteredQuestions.length }} kết quả
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
import { defineComponent, reactive, ref, computed, watch } from "vue";
import QuestionService from "@/services/question.service";

import TableSection1 from "@/components/questionbysection/TableSection1.vue";
import TableSection2 from "@/components/questionbysection/TableSection2.vue";
import TableSection3 from "@/components/questionbysection/TableSection3.vue";
import TableSection4 from "@/components/questionbysection/TableSection4.vue";
import TableSection5 from "@/components/questionbysection/TableSection5.vue";
import TableSection6 from "@/components/questionbysection/TableSection6.vue";
import TableSection7Single from "@/components/questionbysection/TableSection7Single.vue";
import TableSection7Double from "@/components/questionbysection/TableSection7Double.vue";
import TableSection7Triple from "@/components/questionbysection/TableSection7Triple.vue";
import TableSectionNo1To2 from "@/components/questionbysection/TableSectionNo1To2.vue";
import TableSectionNo3To4 from "@/components/questionbysection/TableSectionNo3To4.vue";
import TableSectionNo5To7 from "@/components/questionbysection/TableSectionNo5To7.vue";
import TableSectionNo8To10 from "@/components/questionbysection/TableSectionNo8To10.vue";
import TableSectionNo11 from "@/components/questionbysection/TableSectionNo11.vue";
import TableSectionNo1To5 from "@/components/questionbysection/TableSectionNo1To5.vue";
import TableSectionNo6To7 from "@/components/questionbysection/TableSectionNo6To7.vue";
import TableSectionNo8 from "@/components/questionbysection/TableSectionNo8.vue";

import QuestionAddSection1 from "@/views/questionbysection/QuestionAddSection1.vue";
import QuestionAddSection2 from "@/views/questionbysection/QuestionAddSection2.vue";
import QuestionAddSection3 from "@/views/questionbysection/QuestionAddSection3.vue";
import QuestionAddSection4 from "@/views/questionbysection/QuestionAddSection4.vue";
import QuestionAddSection5 from "@/views/questionbysection/QuestionAddSection5.vue";
import QuestionAddSection6 from "@/views/questionbysection/QuestionAddSection6.vue";
import QuestionAddSection7Single from "@/views/questionbysection/QuestionAddSection7Single.vue";
import QuestionAddSection7Double from "@/views/questionbysection/QuestionAddSection7Double.vue";
import QuestionAddSection7Triple from "@/views/questionbysection/QuestionAddSection7Triple.vue";

import QuestionAddNo1To2 from "@/views/questionbysection/QuestionAddNo1To2.vue";
import QuestionAddNo3To4 from "@/views/questionbysection/QuestionAddNo3To4.vue";
import QuestionAddNo5To7 from "@/views/questionbysection/QuestionAddNo5To7.vue";
import QuestionAddNo8To10 from "@/views/questionbysection/QuestionAddNo8To10.vue";
import QuestionAddNo11 from "@/views/questionbysection/QuestionAddNo11.vue";
import QuestionAddNo1To5 from "@/views/questionbysection/QuestionAddNo1To5.vue";
import QuestionAddNo6To7 from "@/views/questionbysection/QuestionAddNo6To7.vue";
import QuestionAddNo8 from "@/views/questionbysection/QuestionAddNo8.vue";

export default defineComponent({
    components: {
        TableSection1,
        TableSection2,
        TableSection3,
        TableSection4,
        TableSection5,
        TableSection6,
        TableSection7Single,
        TableSection7Double,
        TableSection7Triple,
        TableSectionNo1To2,
        TableSectionNo3To4,
        TableSectionNo5To7,
        TableSectionNo8To10,
        TableSectionNo11,
        TableSectionNo1To5,
        TableSectionNo6To7,
        TableSectionNo8,

        QuestionAddSection1,
        QuestionAddSection2,
        QuestionAddSection3,
        QuestionAddSection4,
        QuestionAddSection5,
        QuestionAddSection6,
        QuestionAddSection7Single,
        QuestionAddSection7Double,
        QuestionAddSection7Triple,
        QuestionAddNo1To2,
        QuestionAddNo3To4,
        QuestionAddNo5To7,
        QuestionAddNo8To10,
        QuestionAddNo11,
        QuestionAddNo1To5,
        QuestionAddNo6To7,
        QuestionAddNo8,

    },
    props: {
        questions: { type: Array, default: [] },
        sectionId: { type: String, required: true },
        retrieveQuestions: { type: Function, required: true },
    },
    setup(props, context) {
        console.log(props.sectionId)
        const searchText = ref("");

        const filteredQuestions = computed(() => {
            if (!searchText.value) {
                return reactive(props.questions);
            }
            return props.questions.filter((question) =>
                Object.values(question).some((value) => String(value).toLowerCase().includes(searchText.value.toLowerCase()))
            );
        });

        const ITEMS_PER_PAGE_OPTIONS = [60, 120, 180, 600]; 
        // const ITEMS_PER_PAGE_OPTIONS = [25, 50, 75, 100];
        const ITEMS_PER_PAGE = ref(ITEMS_PER_PAGE_OPTIONS[0]);
        const currentPage = ref(1);

        const totalPageCount = computed(() => Math.ceil(filteredQuestions.value.length / ITEMS_PER_PAGE.value));
        const paginatedQuestions = computed(() => {
            const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE.value;
            const endIndex = startIndex + ITEMS_PER_PAGE.value;
            return filteredQuestions.value.slice(startIndex, endIndex);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPageCount.value) {
                currentPage.value = page;
            }
        };

        const perPageOptions = computed(() => {
            return ITEMS_PER_PAGE_OPTIONS;
        });

        watch(() => props.questions, () => {
            currentPage.value = 1; 
        });

        // Add computed properties for first row number, last row number, and total number of rows
        const firstRowNumber = computed(() => (currentPage - 1) * ITEMS_PER_PAGE + 1);
        const lastRowNumber = computed(() => Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredQuestions.length));

        const toggleStatus = async (questionId, newStatus) => {
            try {
                console.log(questionId);
                console.log(newStatus);
                await QuestionService.updateStatus(questionId, newStatus);
                props.retrieveQuestions();
            } catch (error) {
                console.error(error);
            }
        };

        const getImageUrl = (imageName) => {
            if (imageName) {
                return `http://localhost:9004/images/${imageName}`;
            }
            return "";
        };

        const getAudioUrl = (audioName) => {
            if (audioName) {
                return `http://localhost:9004/audios/${audioName}`;
            }
            return "";
        };

        return {
            searchText,
            filteredQuestions,
            paginatedQuestions,
            currentPage,
            totalPageCount,
            changePage,
            ITEMS_PER_PAGE,
            ITEMS_PER_PAGE_OPTIONS,
            perPageOptions,
            firstRowNumber,
            lastRowNumber,
            toggleStatus,
            getImageUrl,
            getAudioUrl
        };
    },
});
</script>

<style scoped>
.modal.zoom .modal-dialog {
    transition: transform 0.2s ease-out;
    transform: scale(0.4);
}
.modal.zoom.show .modal-dialog {
    transform: scale(1);
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

.page-item .page-link {
    font-size: 13px;
}
</style>