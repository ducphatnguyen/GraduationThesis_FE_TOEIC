<template>
    <div class="card shadow d-flex justify-content-center mt-3">
        <!-- nav options -->
        <ul class="nav nav-pills mb-3 shadow-sm" id="pills-tab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                    aria-controls="pills-home" aria-selected="true">Cài đặt hệ thống
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"
                    aria-controls="pills-profile" aria-selected="false">Quản lý ngày giờ</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab"
                    aria-controls="pills-contact" aria-selected="false">Bảng điểm TOEIC</a>
            </li>
        </ul>

        <!-- content -->
        <div class="tab-content" id="pills-tabContent p-3">
            <!-- 1st card -->
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                <form class="search">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search..." />
                </form>
                <ul class="ccontent">
                    <li>
                        <div class="wrapp">
                            <div>login attempts</div>
                            <p>number of user login attempts</p>
                        </div>
                    </li>
                    
                    <li>
                        <div class="wrapp">
                            <div>customer spend 24h</div>
                            <p>amount customer has spent in the past 24h</p>
                        </div>
                    </li>
                    <li>
                        <div class="wrapp">
                            <div>device id is on blacklist</div>
                            <p>checkif a users device id is on a blacklist</p>
                        </div>
                    </li>
                    <li>
                        <div class="wrapp">
                            <div>card country</div>
                            <p>credit card issue country</p>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 2nd card -->
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <div class="form-group addinfo">
                    <label for="exampleFormControlTextarea1">Write additional info.</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </div>
            <!-- 3nd card -->
            <div class="tab-pane fade third" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                <div class="form">
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Value Type<span>i</span></label>
                        <select class="form-control round" id="exampleFormControlSelect1">
                            <option class="">United States Dollar</option>
                            <option class="amount">Indian Rupees</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>amount</label>
                        <input class="form-control amount" placeholder="1500" />
                    </div>
                    <button class="btn btn-success">Insert</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent } from "vue";
export default defineComponent({
    setup() {
        return {

        };
    },
});
</script>
<style scoped>
body {
    background-color: #bcd9f5;
}
/* nav */
.card {
    padding: 0;
    border: none;
    border-radius: 0.5rem;
}
a.active {
    border-bottom: 2px solid #55c57a;
}
.nav-link {
    color: rgb(110, 110, 110);
    font-weight: 500;
}
.nav-link:hover {
    color: #55c57a;
}

.nav-pills .nav-link.active {
    color: black;
    background-color: white;
    border-radius: 0.5rem 0.5rem 0 0;
    font-weight: 600;
}
.tab-content {
    padding-bottom: 1.3rem;
}
.form-control {
    background-color: rgb(241, 243, 247);
    border: none;
}
/* 3nd card */
span {
    margin-left: 0.5rem;
    padding: 1px 10px;
    color: white;
    background-color: rgb(143, 143, 143);
    border-radius: 4px;
    font-weight: 600;
}
.third {
    padding: 0 1.5rem 0 1.5rem;
}
label {
    font-weight: 500;
    color: rgb(104, 104, 104);
}
.btn-success {
    float: right;
}
.form-control:focus {
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 7px rgba(0, 0, 0, 0.2);
}
select {
    text-indent: 1px;
    text-overflow: "";
}
/* 1st card */
ul {
    list-style: none;
    margin-top: 1rem;
    padding-inline-start: 0;
}
.search {
    padding: 0 1rem 0 1rem;
}
.ccontent li .wrapp {
    padding: 0.3rem 1rem 0.001rem 1rem;
}
.ccontent li .wrapp div {
    font-weight: 600;
}
.ccontent li .wrapp p {
    font-weight: 360;
}
.ccontent li:hover {
    background-color: rgb(117, 93, 255);
    color: white;
}
.addinfo {
    padding: 0 1rem;
}
</style>
  