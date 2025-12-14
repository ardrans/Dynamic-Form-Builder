import React from 'react';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
} from '@mui/material';
import { useForm } from '../../../context/FormContext';

function RadioField({ field, disabled, error }) {
    const { previewValues, setPreviewValue } = useForm();
    const value = previewValues[field.id] || '';

    const handleChange = (e) => {
        setPreviewValue(field.id, e.target.value);
    };

    return (
        <FormControl error={!!error} disabled={disabled}>
            <FormLabel>
                {field.label}
                {field.required && <span style={{ color: 'red' }}> *</span>}
            </FormLabel>
            <RadioGroup value={value} onChange={handleChange}>
                {field.options.map((option) => (
                    <FormControlLabel
                        key={option.id}
                        value={option.value}
                        control={<Radio color="primary" />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
}

export default RadioField;
