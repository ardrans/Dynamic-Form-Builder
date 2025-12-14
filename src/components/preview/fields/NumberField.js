import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import PinIcon from '@mui/icons-material/Pin';
import { useForm } from '../../../context/FormContext';

function NumberField({ field, disabled, error }) {
    const { previewValues, setPreviewValue } = useForm();
    const value = previewValues[field.id] ?? '';

    const handleChange = (e) => {
        const val = e.target.value;
        setPreviewValue(field.id, val === '' ? '' : Number(val));
    };

    return (
        <TextField
            fullWidth
            type="number"
            label={field.label}
            placeholder={field.placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            required={field.required}
            error={!!error}
            helperText={error}
            variant="outlined"
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <PinIcon color="action" fontSize="small" />
                    </InputAdornment>
                ),
            }}
            inputProps={{
                min: field.validation?.min,
                max: field.validation?.max,
            }}
        />
    );
}

export default NumberField;
