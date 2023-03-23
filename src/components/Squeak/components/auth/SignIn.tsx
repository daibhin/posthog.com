import React from 'react'
import { Field, Form, Formik } from 'formik'
import { useUser } from 'hooks/useUser'

type SignInProps = {
    buttonText?: string
    onSuccess?: () => void
}

export const SignIn: React.FC<SignInProps> = ({ buttonText = 'Login', onSuccess }) => {
    const { isLoading, login } = useUser()

    const handleSubmit = async (values: any) => {
        let user = await login({
            email: values.email,
            password: values.password,
        })

        if (!user) {
            // TODO: Handle error in the useUser hook
        } else {
            // await handleMessageSubmit(formValues || { email: values.email })
            onSuccess?.()
        }
    }

    return (
        <Formik
            validateOnMount
            initialValues={{
                email: '',
                password: '',
            }}
            validate={(values) => {
                const errors: any = {}
                if (!values.email) {
                    errors.email = 'Required'
                }
                if (!values.password) {
                    errors.password = 'Required'
                }
                return errors
            }}
            onSubmit={handleSubmit}
        >
            {({ isValid }) => {
                return (
                    <Form>
                        <label htmlFor="email">Email address</label>
                        <Field required id="email" name="email" type="email" placeholder="Email address..." />
                        <label htmlFor="password">Password</label>
                        <Field required id="password" name="password" type="password" placeholder="Password..." />
                        <button style={isLoading || !isValid ? { opacity: '.5' } : {}} type="submit">
                            {buttonText}
                        </button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default SignIn
