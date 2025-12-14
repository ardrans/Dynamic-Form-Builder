import React from 'react';
import { Box, Chip, Tooltip } from '@mui/material';
import { useForm } from '../../context/FormContext';
import { FIELD_TYPES } from '../../utils/fieldDefaults';

function FieldPalette() {
    const { addField } = useForm();

    const handleAddField = (type) => {
        addField(type);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
            }}
        >
            {FIELD_TYPES.map(({ type, label, icon: Icon, color }) => (
                <Tooltip key={type} title={`Add ${label} field`} arrow>
                    <Chip
                        icon={<Icon sx={{ color: `${color} !important` }} />}
                        label={label}
                        onClick={() => handleAddField(type)}
                        variant="outlined"
                        sx={{
                            cursor: 'pointer',
                            borderColor: color,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                background: `${color}15`,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 4px 12px ${color}30`,
                            },
                        }}
                    />
                </Tooltip>
            ))}
        </Box>
    );
}

export default FieldPalette;
