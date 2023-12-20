<template>
    <div class="container-fluid" style="background: url('https://media.istockphoto.com/vectors/white-and-blue-swirl-abstract-background-computer-image-vector-id460340487?k=20&m=460340487&s=170667a&w=0&h=BhUlEVmiTDRuHgXk9kmbNqySPgW6qvOLPyCsPvQN0eo='); background-repeat: no-repeat; background-size: 100% 100%;">
        <div class="row p-5" style="height: 825px">
            <div class="col-lg-6 col-12 mx-auto " style="width:35%">
                <div class="text-center image-size-small position-relative">
                    <img src="https://annedece.sirv.com/Images/user-vector.jpg" class="rounded-circle p-2 bg-white">
                </div>
                <Form @submit="submitSignIn" :validation-schema="signInFormSchema" class="mt-3">
                    <div class="p-5 bg-white rounded shadow-lg">
                        <h3 class="mb-2 text-center pt-5">ADMIN LOGIN</h3>
                        <label for="username" class="font-500 text-secondary fst-bolder"
                            style="font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">Username</label>
                        <Field name="username" class="form-control form-control-lg mb-3" type="text"
                            v-model="signInLocal.username" />
                        <ErrorMessage name="username" class="error-feedback" />
                        <label for="password" class="font-500 text-secondary fst-bolder"
                            style="font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">Password</label>
                        <Field name="password" class="form-control form-control-lg" type="password"
                            v-model="signInLocal.password" />
                        <ErrorMessage name="password" class="error-feedback" />
                        <button class="btn btn-primary btn-lg w-100 shadow-lg mt-3">SIGN IN</button>
                    </div>
                </Form>

            </div>
        </div>
    </div>
</template>
  
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { defineComponent, reactive } from "vue";
export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup(props, context) {
        const signInLocal = reactive({
            username: "",
            password: "",
        });
        const signInFormSchema = yup.object().shape({
            username: yup.string().required("Username không được để trống."),
            password: yup.string().required("Mật khẩu không được để trống."),
        });
        const submitSignIn = () => {
            context.emit("submit:signin", signInLocal);
        };
        return {
            signInLocal,
            signInFormSchema,
            submitSignIn,
        };
    },
});
</script>
<style scoped>
.btn-lg {
    padding: 12px 26px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
}

::placeholder {
    font-size: 14px;
    letter-spacing: 0.5px;
}

.form-control-lg {
    font-size: 16px;
}

.font-500 {
    font-weight: 500;
}

.image-size-small {
    width: 140px;
    margin: 0 auto;
}

.image-size-small img {
    width: 140px;
    margin-bottom: -70px;
}
</style>
  