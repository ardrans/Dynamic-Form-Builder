import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Tooltip,
    Box,
    Chip,
    CircularProgress,
} from '@mui/material';
import {
    DarkMode,
    LightMode,
    Save,
    FolderOpen,
    RestartAlt,
    FileDownload,
    Share,
} from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { useForm } from '../context/FormContext';
import useAutosave from '../hooks/useAutosave';
import { saveFormToStorage, loadFormFromStorage, exportFormAsJSON, clearStorage } from '../utils/storage';
import ConfirmDialog from './ui/ConfirmDialog';
import ShareDialog from './ui/ShareDialog';

function Header({ showSuccess, showError }) {
    const { isDarkMode, toggleTheme } = useTheme();
    const { getFormData, loadForm, resetForm, isDirty } = useForm();
    const { isSaving, lastSavedText } = useAutosave();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);

    const handleSave = () => {
        const formData = getFormData();
        const result = saveFormToStorage(formData);
        if (result.success) {
            showSuccess('Form saved successfully!');
        } else {
            showError('Failed to save form');
        }
    };

    const handleLoad = () => {
        const result = loadFormFromStorage();
        console.log('Load result:', result);
        if (result.success && result.data) {
            loadForm(result.data);
            showSuccess('Form loaded successfully!');
        } else {
            showError(result.error || 'No saved form found');
        }
    };

    const handleReset = () => {
        setConfirmOpen(true);
    };

    const confirmReset = () => {
        resetForm();
        clearStorage();
        setConfirmOpen(false);
        showSuccess('Form reset successfully!');
    };

    const handleExport = () => {
        const formData = getFormData();
        const result = exportFormAsJSON(formData);
        if (result.success) {
            showSuccess('Form exported successfully!');
        } else {
            showError('Failed to export form');
        }
    };

    const handleShare = () => {
        setShareOpen(true);
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    background: isDarkMode
                        ? 'rgba(15, 23, 42, 0.8)'
                        : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid',
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Logo and Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography
                            variant="h5"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Form Builder
                        </Typography>

                        {/* Autosave indicator */}
                        {isSaving ? (
                            <Chip
                                icon={<CircularProgress size={14} />}
                                label="Saving..."
                                size="small"
                                sx={{ animation: 'pulse 1.5s infinite' }}
                            />
                        ) : lastSavedText ? (
                            <Chip
                                label={lastSavedText}
                                size="small"
                                color="success"
                                variant="outlined"
                            />
                        ) : isDirty ? (
                            <Chip
                                label="Unsaved changes"
                                size="small"
                                color="warning"
                                variant="outlined"
                            />
                        ) : null}
                    </Box>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tooltip title="Save (Ctrl+S)">
                            <Button
                                startIcon={<Save />}
                                onClick={handleSave}
                                variant="outlined"
                                size="small"
                            >
                                Save
                            </Button>
                        </Tooltip>

                        <Tooltip title="Load">
                            <IconButton onClick={handleLoad} color="inherit">
                                <FolderOpen />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Reset">
                            <IconButton onClick={handleReset} color="inherit">
                                <RestartAlt />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Export JSON">
                            <IconButton onClick={handleExport} color="inherit">
                                <FileDownload />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Share">
                            <IconButton onClick={handleShare} color="primary">
                                <Share />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={isDarkMode ? 'Light mode' : 'Dark mode'}>
                            <IconButton onClick={toggleTheme} color="inherit">
                                {isDarkMode ? <LightMode /> : <DarkMode />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>

            <ConfirmDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmReset}
                title="Reset Form"
                message="Are you sure you want to reset the form? This will delete all fields and saved data."
            />

            <ShareDialog
                open={shareOpen}
                onClose={() => setShareOpen(false)}
                showSuccess={showSuccess}
            />
        </>
    );
}

export default Header;
