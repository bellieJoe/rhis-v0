'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import ToastComponent from '@/components/ToastComponent';
import { useEffect } from 'react';
import { getAuth } from '@/api/authApi';
import { ConfirmPopup } from 'primereact/confirmpopup';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
                <title>RHIMS</title>
            </head>
            <body>
                <Provider store={store}>
                    <PrimeReactProvider >
                        <LayoutProvider >{children}</LayoutProvider>
                        <ToastComponent />
                        <ConfirmPopup />
                    </PrimeReactProvider>
                </Provider>
            </body>
        </html>
    );
}
