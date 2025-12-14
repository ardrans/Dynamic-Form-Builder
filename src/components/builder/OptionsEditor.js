import React from 'react';
import {
    Box,
    TextField,
    IconButton,
    Typography,
    Button,
    Paper,
} from '@mui/material';
import { Delete, Add, DragIndicator } from '@mui/icons-material';
import { nanoid } from 'nanoid';

function OptionsEditor({ options, onChange }) {
    const handleAddOption = () => {
        const newOption = {
            id: nanoid(),
            label: `Option ${options.length + 1}`,
            value: `option${options.length + 1}`,
        };
        onChange([...options, newOption]);
    };

    const handleUpdateOption = (id, key, value) => {
        onChange(
            options.map((opt) =>
                opt.id === id ? { ...opt, [key]: value } : opt
            )
        );
    };

    const handleRemoveOption = (id) => {
        if (options.length > 1) {
            onChange(options.filter((opt) => opt.id !== id));
        }
    };

    return (
        <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Define the options for this field. Users will be able to select from these options.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {options.map((option, index) => (
                    <Paper
                        key={option.id}
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            p: 1.5,
                            borderRadius: 2,
                        }}
                    >
                        <DragIndicator sx={{ color: 'text.disabled', cursor: 'grab' }} />
                        <TextField
                            size="small"
                            label="Label"
                            value={option.label}
                            onChange={(e) => handleUpdateOption(option.id, 'label', e.target.value)}
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            size="small"
                            label="Value"
                            value={option.value}
                            onChange={(e) => handleUpdateOption(option.id, 'value', e.target.value)}
                            sx={{ flex: 1 }}
                        />
                        <IconButton
                            size="small"
                            onClick={() => handleRemoveOption(option.id)}
                            disabled={options.length <= 1}
                            color="error"
                        >
                            <Delete fontSize="small" />
                        </IconButton>
                    </Paper>
                ))}
            </Box>

            <Button
                startIcon={<Add />}
                onClick={handleAddOption}
                sx={{ mt: 2 }}
                variant="outlined"
                size="small"
            >
                Add Option
            </Button>
        </Box>
    );
}

export default OptionsEditor;
