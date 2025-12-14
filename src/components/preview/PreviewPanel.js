import React from 'react';
import { Box, Card, Typography, Chip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormPreview from './FormPreview';

function PreviewPanel() {
    return (
        <Card
            sx={{
                p: 3,
                height: '100%',
                minHeight: 400,
                background: (theme) =>
                    theme.palette.mode === 'dark'
                        ? 'rgba(30, 41, 59, 0.8)'
                        : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <VisibilityIcon color="primary" />
                <Typography variant="h6" fontWeight={600}>
                    Live Preview
                </Typography>
                <Chip
                    label="Auto-updates"
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ ml: 'auto' }}
                />
            </Box>

            {/* Preview Container */}
            <Box
                sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    border: '1px solid',
                    borderColor: 'divider',
                    minHeight: 300,
                }}
            >
                <FormPreview />
            </Box>
        </Card>
    );
}

export default PreviewPanel;
