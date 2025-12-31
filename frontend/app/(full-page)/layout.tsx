import { Metadata } from 'next';
import AppConfig from '../../layout/AppConfig';
import React from 'react';

interface SimpleLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'RHIMS',
    description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.'
};

export default function SimpleLayout({ children }: SimpleLayoutProps) {
    return (
        <React.Fragment>
            <div className="" 
            style={{
                backgroundImage: `url('/assets/images/background.jpg')`,
                backgroundSize: 'cover',
                backdropFilter: 'blur(6px)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backgroundBlendMode: 'darken',
                backgroundPosition: 'center',
            }}>
                {children}
            </div>
            <AppConfig simple />
        </React.Fragment>
    );
}
