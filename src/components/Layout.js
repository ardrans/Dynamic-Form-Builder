import React from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import Header from './Header';
import BuilderPanel from './builder/BuilderPanel';
import PreviewPanel from './preview/PreviewPanel';
import useSnackbar from '../hooks/useSnackbar';
import { useShareUrl } from '../hooks/useShareUrl';

function Layout() {
    const { snackbar, hideSnackbar, showSuccess, showError, showInfo } = useSnackbar();
    const { loadedFromUrl, isLoading } = useShareUrl();

    // Show notification if loaded from URL
    React.useEffect(() => {
        if (loadedFromUrl && !isLoading) {
            showInfo('Form loaded from shared URL!');
        }
    }, [loadedFromUrl, isLoading, showInfo]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: (theme) =>
                    theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)'
                        : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #f8fafc 100%)',
            }}
        >
            <Header showSuccess={showSuccess} showError={showError} />

            {/* Main content area */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 3,
                    pt: 10, // Account for fixed AppBar
                    px: 3,
                    pb: 3,
                    minHeight: 'calc(100vh - 64px)',
                }}
            >
                {/* Builder Panel - Left side */}
                <Box
                    sx={{
                        flex: { xs: '1', md: '0 0 55%' },
                        maxWidth: { md: '55%' },
                    }}
                >
                    <BuilderPanel showSuccess={showSuccess} showError={showError} />
                </Box>

                {/* Preview Panel - Right side */}
                <Box
                    sx={{
                        flex: { xs: '1', md: '0 0 calc(45% - 24px)' },
                        maxWidth: { md: 'calc(45% - 24px)' },
                        position: { md: 'sticky' },
                        top: { md: 88 },
                        alignSelf: { md: 'flex-start' },
                    }}
                >
                    <PreviewPanel />
                </Box>
            </Box>

            {/* Snackbar notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={hideSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={hideSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Layout;
