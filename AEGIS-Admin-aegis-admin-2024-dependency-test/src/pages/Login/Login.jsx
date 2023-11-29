import React from "react";
import { Formik, Form } from "formik";
import { store } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';
import Input from "../../components/Input";
import Button from "../../components/Button";
import lockImage from "./assets/lock.png";
import * as Yup from "yup"
import { useHistory } from "react-router-dom";



import { Accounts } from "../../services";

import {
    Container,
    Header,
    LockImg,
    HeaderTitle,
    SubHeader,
    CardWrapper,
    LoginBtns,
    ForgotPass
} from "./styles"

function Login() {

    const history = useHistory();

    return (
        <Container>
        <Header>
            <LockImg src={lockImage} />
            <HeaderTitle>This content is protected.</HeaderTitle>
            <SubHeader>To view, please login the database.</SubHeader>
        </Header>

        <Formik 
            initialValues={{id: '', password: ''}}
            validationSchema={Yup.object().shape({
                id: Yup.string()
                .required("ID Number is a required field"),
                password: Yup.string()
                .required(),
            })}
            onSubmit={async (values, bag) => {
                try {
                    const loginData = {
                        username: values.id,
                        password: values.password,
                    }
                    Accounts.login(loginData).then(json => {
                        history.go('/')
                    })
                    .catch(error => {
                        // Resets form
                        bag.resetForm()
                        console.log("login error:" + error)
                        console.log(error)
                        // Displays error message
                        store.addNotification({
                            title: 'Invalid Login',
                            // message: error.response.data.non_field_errors[0],
                            message: "Something Went Wrong",
                            type: 'danger',
                            insert: 'bottom',
                            container: 'top-right',
                            animationIn: ['animated', 'fadeIn'],
                            animationOut: ['animated', 'fadeOut'],
                            dismiss: {
                                duration: 5000,
                                onScreen: true,
                            },
                        })
                    })
                } catch (error) {
                    console.log("idk:" + error)
                    Object.keys(error.response.data).map(el => {
                        let message = ''
                        error.response.data[el].forEach(
                            el => (message += `${el}\n`.replace(/username/gi, 'id number'))
                        )
                        store.addNotification({
                            title: 'Error!',
                            message:
                                message === 'Email is not verified.'
                                ? 'Your email is not yet verified. Please check your email and verify your account.'
                                : message.length > 0
                                ? message
                                : 'Please try again.',
                            type: 'danger',
                            insert: 'bottom',
                            container: 'top-right',
                            animationIn: ['animated', 'fadeIn'],
                            animationOut: ['animated', 'fadeOut'],
                            dismiss: {
                                duration: 5000,
                                onScreen: true,
                            },
                        })

                        bag.resetForm()
                    })
                }
            }}
        >
            { formik => {
                return (
                    <CardWrapper as={Form}>
                        <Input label="ID NUMBER" type="text" name="id" required={true} forceUseMeta={true} value={formik.values.id} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <Input label="PASSWORD" type="password" name="password" required={true} forceUseMeta={true} value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <LoginBtns>
                            <ForgotPass to="/forgot-password">Forgot Password?</ForgotPass>
                            <Button reverse={false} 
                                type={"submit"} 
                                paddingX={"1.25rem"} 
                                paddingY={"0.75rem"} 
                                width={"auto"} 
                                height={"auto"}
                                label={"LOGIN"}
                            />
                        </LoginBtns>
                    </CardWrapper>
                )
            }}
        </Formik>
    </Container>
    )
}

export default Login;
