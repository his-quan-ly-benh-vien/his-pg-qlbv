"use client";

import React, { useState } from 'react';
import { Alert, Snackbar as MuiSnackbar, AlertColor } from "@mui/material";
import { styled } from '@mui/material/styles';

// Styles cho form
export const formStyles = `
    .form-input {
        width: 100%;
        padding: 0.5rem 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: #1f2937;
        background-color: #ffffff;
        transition: all 0.15s ease-in-out;
    }
    
    .form-input:focus {
        outline: none;
        border-color: #0054a6;
        box-shadow: 0 0 0 1px #0054a6;
    }
    
    .form-input.error {
        border-color: #ef4444;
    }
    
    .form-input.error:focus {
        box-shadow: 0 0 0 1px #ef4444;
    }
    
    .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
    }
`;

// Hook xử lý lỗi form
export const useFormErrors = <T extends Record<string, boolean>>(initialErrors: T) => {
    const [errors, setErrors] = useState<T>(initialErrors);

    const setError = (field: keyof T, value: boolean) => {
        setErrors(prev => ({ ...prev, [field]: value }));
    };

    const resetErrors = () => {
        setErrors(initialErrors);
    };

    const resetError = (field: keyof T) => {
        setErrors(prev => ({ ...prev, [field]: false }));
    };

    return { errors, setError, resetErrors, resetError };
};

// Hook quản lý snackbar
export const useSnackbar = () => {
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success'
    });

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const hideSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return { snackbar, showSnackbar, hideSnackbar };
};

// Styled Snackbar Alert đẹp với hiệu ứng ánh sáng
export const StyledAlert = styled(Alert)(({ severity }: { severity?: AlertColor }) => ({
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '0.9rem',
    fontWeight: 400,
    fontFamily: 'Roboto, sans-serif',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    border: '1px solid',
    backdropFilter: 'blur(12px)',
    background: 'rgba(0, 120, 212, 0.85)',
    transform: 'translateY(0)',
    overflow: 'hidden',
    position: 'relative',
    animation: 'flashIn 0.15s ease-out forwards',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)',
        transform: 'translateX(-100%)',
        animation: 'slideRight 1.2s ease-in-out forwards'
    },
    '@keyframes flashIn': {
        '0%': {
            transform: 'translateY(-6px)',
            opacity: 0
        },
        '50%': {
            transform: 'translateY(0)',
            opacity: 1
        },
        '100%': {
            transform: 'translateY(0)',
            opacity: 0.98
        }
    },
    '@keyframes slideRight': {
        '0%': {
            transform: 'translateX(-100%)'
        },
        '100%': {
            transform: 'translateX(100%)'
        }
    },
    ...(severity === 'error' && {
        borderColor: 'rgba(0, 99, 177, 0.2)',
        color: '#FFFFFF',
        '& .MuiAlert-icon': {
            color: '#E0F2FF'
        }
    }),
    ...(severity === 'success' && {
        borderColor: 'rgba(0, 99, 177, 0.2)',
        color: '#FFFFFF',
        '& .MuiAlert-icon': {
            color: '#E0F2FF'
        }
    })
}));

// Component Snackbar tái sử dụng
interface CustomSnackbarProps {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
    onClose: () => void;
    autoHideDuration?: number;
}

export const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ 
    open, 
    message, 
    severity, 
    onClose,
    autoHideDuration = 1500 
}) => {
    return (
        <MuiSnackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{
                mt: 2,
                mr: 2,
                '& .MuiSnackbar-root': {
                    transition: 'all 0.15s ease-out'
                },
                '& .MuiAlert-message': {
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                    lineHeight: '1.3'
                }
            }}
        >
            <StyledAlert
                severity={severity}
                elevation={0}
                variant="filled"
                icon={false}
                sx={{
                    minWidth: '280px',
                    maxWidth: '380px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '7px 16px',
                    borderRadius: '6px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    borderColor: 'rgba(0, 99, 177, 0.15)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    '& .MuiAlert-message': {
                        padding: 0,
                        textAlign: 'center',
                        fontWeight: 400
                    },
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s ease-in-out'
                }}
            >
                {message}
            </StyledAlert>
        </MuiSnackbar>
    );
}; 