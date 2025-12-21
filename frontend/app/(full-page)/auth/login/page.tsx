/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { getAuth, login } from '@/api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../../assets/images/logo.png';
import Image from 'next/image';

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const [loading, setLoading] = useState({
        login : false
    });
    const authStore = useSelector((state : any) => state.auth);

    const router = useRouter();
    const dispatch = useDispatch();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const handleLogin = async () => {
        setLoading({
            login : true
        });
        const loginSuccess = await login(dispatch, {
            email : email,
            password : password
        });
        
        if(!loginSuccess) {
            setLoading({
                login : false
            });
            return;
        }
        const auth = await getAuth(dispatch);

        setLoading({
            login : false
        });
        
        if(auth.roles.some((role : any) => role.role_type_id == 5)){
            router.push('/');
        }
        if(auth.roles.some((role : any) => role.role_type_id == 6)){
            router.push('/captain/bhw');
        }
        if(auth.roles.some((role : any) => role.role_type_id == 1)){
            console.log("BHW");
            router.push('/bhw/dashboard');
        }
        if(auth.roles.some((role : any) => role.role_type_id == 2)){
            console.log("Midwife");
            router.push('/midwife/dashboard');
        }
        if(auth.roles.some((role : any) => role.role_type_id == 3)){
            console.log("RHU");
            router.push('/rhu/dashboard');
        }
        if(auth.roles.some((role : any) => role.role_type_id == 4)){
            console.log("RHU");
            router.push('/pho/dashboard');
        }

    }
    
    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div className="p-3 m-0">
                    <Image src={logo} alt="Sakai logo" width={200} className="mb-5 " />
                </div>
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            {/* <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" /> */}
                            <div className="text-900 text-3xl font-bold mb-3">RHIMS</div>
                            {/* <div className="text-900 text-xl font-medium mb-3">Rural Health Information System</div> */}
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText id="email1" type="text" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} onChange={(e) => setEmail(e.target.value)} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                {/* <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div> */}
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a>
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" loading={loading.login} onClick={handleLogin}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
