import SettingsProvider from '@/context/SettingsProvider';
import TooltipProvider from '@/context/TooltipProvider';
import LayerProvider from '@/context/LayerProvider';
import AuthProvider from '@/context/AuthProvider';
import { ReactElement } from 'react';
import './global.css';
import { TitleBar } from './app-components';

const RootLayout = ({ children }: { children: ReactElement }): ReactElement => {
    const maskStyle: React.CSSProperties = {
        position: 'absolute',
        top: '-1000px',
        left: '-1000px',
        pointerEvents: 'none',
    };

    return (
        <html lang='en'>
            <body>
                <div>
                    <TitleBar />

                    <AuthProvider>
                        <LayerProvider>
                            <TooltipProvider>
                                <SettingsProvider>{children}</SettingsProvider>
                            </TooltipProvider>
                        </LayerProvider>
                    </AuthProvider>

                    <svg style={maskStyle}>
                        <mask
                            id='status-mask-24'
                            maskContentUnits='objectBoundingBox'
                            viewBox='0 0 1 1'
                        >
                            <circle
                                fill='white'
                                cx='0.5'
                                cy='0.5'
                                r='0.5'
                            />

                            <circle
                                fill='black'
                                cx='0.85'
                                cy='0.85'
                                r='0.300'
                            />
                        </mask>
                    </svg>

                    <svg style={maskStyle}>
                        <mask
                            id='status-mask-24'
                            maskContentUnits='objectBoundingBox'
                            viewBox='0 0 1 1'
                        >
                            <circle
                                fill='white'
                                cx='0.5'
                                cy='0.5'
                                r='0.5'
                            />

                            <circle
                                fill='black'
                                cx='0.85'
                                cy='0.85'
                                r='0.275'
                            />
                        </mask>
                    </svg>

                    <svg style={maskStyle}>
                        <mask
                            id='status-mask-32'
                            maskContentUnits='objectBoundingBox'
                            viewBox='0 0 1 1'
                        >
                            <circle
                                fill='white'
                                cx='0.5'
                                cy='0.5'
                                r='0.5'
                            />

                            <circle
                                fill='black'
                                cx='0.85'
                                cy='0.85'
                                r='0.25'
                            />
                        </mask>
                    </svg>

                    <svg style={maskStyle}>
                        <mask
                            id='status-mask-40'
                            maskContentUnits='objectBoundingBox'
                            viewBox='0 0 1 1'
                        >
                            <circle
                                fill='white'
                                cx='0.5'
                                cy='0.5'
                                r='0.5'
                            />

                            <circle
                                fill='black'
                                cx='0.85'
                                cy='0.85'
                                r='0.185'
                            />
                        </mask>
                    </svg>

                    <svg style={maskStyle}>
                        <mask
                            id='status-mask-80'
                            maskContentUnits='objectBoundingBox'
                            viewBox='0 0 1 1'
                        >
                            <circle
                                fill='white'
                                cx='0.5'
                                cy='0.5'
                                r='0.5'
                            />

                            <circle
                                fill='black'
                                cx='0.85'
                                cy='0.85'
                                r='0.175'
                            />
                        </mask>
                    </svg>

                    <svg style={maskStyle}>
                        <mask
                            id='status-mask-120'
                            maskContentUnits='objectBoundingBox'
                            viewBox='0 0 1 1'
                        >
                            <circle
                                fill='white'
                                cx='0.5'
                                cy='0.5'
                                r='0.5'
                            />

                            <circle
                                fill='black'
                                cx='0.85'
                                cy='0.85'
                                r='0.16'
                            />
                        </mask>
                    </svg>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
