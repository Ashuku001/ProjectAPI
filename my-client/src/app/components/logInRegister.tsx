'use client'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { LoginMerchantDocument, SignupMerchantDocument } from '../../../__gql__/graphql';
import { useMutation } from '@apollo/client';
import ErrorComponent from './ErrorComponent';
import LoadingComponent from './LoadingSpinner';
import { isLoggedInVar, merchantId } from '../cache/cache';
import secureLocalStorage from 'react-secure-storage';

type LoginFormProps = {
    changeLoginState: Dispatch<SetStateAction<boolean>>
}

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginMerchant, {data, loading, error }] = useMutation(LoginMerchantDocument)

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('setting jwt')
        loginMerchant({
            //@ts-ignore
            update(cache, { data: { loginMerchant } }) {

                console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$4",loginMerchant)
                if (loginMerchant.token && loginMerchant.merchant.id) {
                    localStorage.setItem('jwt', loginMerchant.token);
                    secureLocalStorage.setItem('merchantId', loginMerchant.merchant.id)
                    // changeLoginState(true);
                    isLoggedInVar(true)
                    merchantId(loginMerchant.merchant.id)
                    console.log("merchant id", merchantId(), loginMerchant.merchant.id)
                }
            },
            variables: { username, password }
        })
        setUsername('')
        setPassword('')
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if(e.code === 'Space')
            e.preventDefault()
        
    }


    return (
        <div className=''>
            <div className='flex flex-col w-[300px]'>
                {!loading && (
                    <form onSubmit={onSubmit} className='flex flex-col space-y-2 w-full' >
                        <input
                            type="text"
                            placeholder='username'
                            onChange={(e) =>{
                                 setUsername(e.target.value)
                                }}
                            className='p-2 rounded-md'
                        />
                        <input
                            type="password"
                            placeholder='password'
                            onChange={(e) => setPassword(e.target.value)}
                            className='p-2 rounded-md'
                        />
                        <button
                            type='submit'
                            className='p-2 bg-slate-500 rounded-md'
                        >Login</button>
                    </form>
                )}
                {loading && <LoadingComponent/>}
                {error && (<ErrorComponent message={error.message} />)}
            </div>
        </div>
    )
}

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [whatsapp_phone_number, setWhatsapp_phone_number] = useState('')
    const [signupMerchant, { loading, error, data }] = useMutation(SignupMerchantDocument)

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signupMerchant({
            //@ts-ignore
            update(cache, { data: { signupMerchant} }) {
                if (signupMerchant.token) {
                    console.log("In here")
                    secureLocalStorage.setItem('jwt', signupMerchant.token);
                    isLoggedInVar(true)
                }
            },
            variables: { username, whatsapp_phone_number, password }
        })
        setUsername('')
        setPassword('')
        setWhatsapp_phone_number('')
    }

    return (
        <div className=''>
            <div className='w-[300px]'>
                {!loading && (
                    <form onSubmit={onSubmit} className='flex flex-col space-y-2' >
                        <input
                            type="text"
                            placeholder='username'
                            onChange={(e) => setUsername(e.target.value)}
                            className='p-2 rounded-md focus:outline-none'
                            required

                        />
                        <input
                            type='number'
                            placeholder='whatsapp phone number'
                            onChange={(e) => setWhatsapp_phone_number(e.target.value)}
                            className='p-2 rounded-md focus:outline-none'
                            required
                        />
                        <input
                            type="password"
                            placeholder='password'
                            onChange={(e) => setPassword(e.target.value)}
                            className='p-2 rounded-md focus:outline-none'
                            required
                        />
                        <button
                            disabled={!username && !password && !whatsapp_phone_number}
                            type='submit'
                            className='p-2 bg-slate-500 rounded-md'
                        >Sign up</button>
                    </form>
                )}
                {loading && <LoadingComponent/>}
                {error && <ErrorComponent message={error.message} />}
            </div>
        </div>
    )
}

const LoginRegisterForm = () => {
    const [showLogin, setShowLogin] = useState<boolean>(true)

    return (
        <div className='h-screen flex items-center justify-center'>
            {showLogin
                ?
                <div className='text-center'>
                    <LoginForm  />
                    <button className='text-blue-400' onClick={e => setShowLogin(false)}>Or sign up </button>
                </div>
                : <div className='text-center'>
                    <RegisterForm/>
                    <button onClick={e => setShowLogin(true)} className='text-blue-400'>Or login</button>
                </div>
            }

        </div>
    )
}



export default LoginRegisterForm