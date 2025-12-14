import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function EmptyState({ onAddField }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                px: 4,
                textAlign: 'center',
            }}
        >
            <Box
                sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                }}
            >
                <Box
                    component="svg"
                    viewBox="0 0 24 24"
                    sx={{ width: 48, height: 48, color: 'primary.main' }}
                >
                    <path
                        fill="currentColor"
                        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
                    />
                </Box>
            </Box>

            <Typography variant="h6" color="text.primary" gutterBottom>
                No fields yet
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 300 }}>
                Start building your form by adding fields from the palette above, or click the button below.
            </Typography>

            {onAddField && (
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => onAddField('text')}
                    sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    }}
                >
                    Add Your First Field
                </Button>
            )}
        </Box>
    );
}

export default EmptyState;
