import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import { useForm } from '../../../context/FormContext';

function DropdownField({ field, disabled, error }) {
    const { previewValues, setPreviewValue } = useForm();
    const value = previewValues[field.id] || '';

    const handleChange = (e) => {
        setPreviewValue(field.id, e.target.value);
    };

    return (
        <FormControl fullWidth error={!!error} disabled={disabled}>
            <InputLabel>
                {field.label}
                {field.required && <span style={{ color: 'red' }}> *</span>}
            </InputLabel>
            <Select
                value={value}
                label={field.label}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>{field.placeholder || 'Select an option'}</em>
                </MenuItem>
                {field.options.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
}

export default DropdownField;
