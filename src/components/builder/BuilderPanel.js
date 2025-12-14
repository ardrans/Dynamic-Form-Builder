import React, { useState } from 'react';
import { Box, Typography, Card, TextField } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import FieldPalette from './FieldPalette';
import FieldList from './FieldList';
import FieldConfigDialog from './FieldConfigDialog';
import { useForm } from '../../context/FormContext';

function BuilderPanel({ showSuccess, showError }) {
    const { formTitle, formDescription, updateFormMeta } = useForm();
    const [configDialogOpen, setConfigDialogOpen] = useState(false);

    const handleOpenConfig = () => {
        setConfigDialogOpen(true);
    };

    const handleCloseConfig = () => {
        setConfigDialogOpen(false);
    };

    return (
        <Card
            sx={{
                p: 3,
                height: '100%',
                background: (theme) =>
                    theme.palette.mode === 'dark'
                        ? 'rgba(30, 41, 59, 0.8)'
                        : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <BuildIcon color="primary" />
                <Typography variant="h6" fontWeight={600}>
                    Form Builder
                </Typography>
            </Box>

            {/* Form Title & Description */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    label="Form Title"
                    value={formTitle}
                    onChange={(e) => updateFormMeta({ formTitle: e.target.value })}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Form Description (optional)"
                    value={formDescription}
                    onChange={(e) => updateFormMeta({ formDescription: e.target.value })}
                    variant="outlined"
                    size="small"
                    multiline
                    rows={2}
                />
            </Box>

            {/* Field Palette */}
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Add Fields
            </Typography>
            <FieldPalette />

            {/* Spacing before Field List */}
            <Box sx={{ mt: 4 }} />

            {/* Field List */}
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                Form Fields
            </Typography>
            <FieldList onEditField={handleOpenConfig} />

            {/* Field Configuration Dialog */}
            <FieldConfigDialog
                open={configDialogOpen}
                onClose={handleCloseConfig}
                showSuccess={showSuccess}
            />
        </Card>
    );
}

export default BuilderPanel;
