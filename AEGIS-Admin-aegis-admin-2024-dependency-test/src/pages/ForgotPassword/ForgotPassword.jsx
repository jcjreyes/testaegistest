import {
    ForgotPasswordSection,
    ForgotPasswordHeading,
    ForgotPasswordSubHeading,
    ForgotPasswordInputWrapper,
    ForgotPasswordCTAWrapper,
    ForgotPasswordAnchor,
} from "./styles"
import Input from "../../components/Input"
import { Formik, Form } from "formik"
// import CTAButton from "../../components/CTAButton"
import * as Yup from "yup"
import { useMutation } from "react-query"
import { Accounts } from "../../services";
import { store } from "react-notifications-component"
import Button from "../../components/Button";
import { Link } from 'react-router-dom';


function ForgotPassword() {
return (
    <ForgotPasswordSection>
    <ForgotPasswordHeading>Forgot your password?</ForgotPasswordHeading>
    <ForgotPasswordSubHeading>
        That’s okay! Enter the email you used for your account and we’ll send
        you a reset link.
    </ForgotPasswordSubHeading>
    <ForgotPasswordInputWrapper>
        <Formik
        initialValues={{
            obfEmail: "",
        }}
        validationSchema={Yup.object().shape({
            obfEmail: Yup.string()
            .trim()
            .email()
            .test(
                "is-obf-email",
                "Your email must be a valid obf account",
                (value) => {
                if (value && value.split("@")[1] === "obf.ateneo.edu") {
                    return true
                }
                return false
                }
            )
            .required(),
        })}
        onSubmit={async (values, bag) => {
            try {
            const { obfEmail } = values
            console.log(obfEmail)
            Accounts.requestPasswordChange(obfEmail).then(json => {
                console.log(json)
            })
            bag.resetForm()
            store.addNotification({
                title: "Successfully requested for a password reset!",
                message: "Please check your email.",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                duration: 5000,
                onScreen: true,
                },
            })
            } catch (error) {
                console.log(error)
            Object.keys(error.response.data).map((el) => {
                let message = ""
                error.response.data[el].forEach(
                (el) =>
                    (message += `${el}\n`.replace(/username/gi, "id number"))
                )
                store.addNotification({
                title: "Error!",
                message: message,
                type: "danger",
                insert: "bottom",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                },
                })
            })
            }
        }}
        >
        {({
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isSubmitting,
        }) => (
            <Form>
            <Input
                label="OBF EMAIL"
                type="email"
                name="obfEmail"
                placeholder="e.g. jose.rizal@obf.ateneo.edu"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.obfEmail}
                touched={touched.obfEmail}
                required
            />

            <ForgotPasswordCTAWrapper>
                    <Button reverse={false} 
                        type={"submit"} 
                        onClick={null}
                        paddingX={"1.25rem"} 
                        paddingY={"0.75rem"} 
                        width={"auto"} 
                        height={"auto"}
                        label={"SEND"}
                    />
            </ForgotPasswordCTAWrapper>
            </Form>
        )}
        </Formik>
    </ForgotPasswordInputWrapper>
    <Link to="/" style={{"margin-top": "30px"}}>
        <ForgotPasswordAnchor>Back to Sign In</ForgotPasswordAnchor>
    </Link>
    </ForgotPasswordSection>
)
}

export default ForgotPassword;