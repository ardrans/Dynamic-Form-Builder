import React from 'react';
import { Box, Fade } from '@mui/material';
import TextField from './fields/TextField';
import EmailField from './fields/EmailField';
import NumberField from './fields/NumberField';
import DateField from './fields/DateField';
import CheckboxField from './fields/CheckboxField';
import RadioField from './fields/RadioField';
import DropdownField from './fields/DropdownField';

function PreviewField({ field, disabled, error }) {
    const renderField = () => {
        const commonProps = {
            field,
            disabled,
            error,
        };

        switch (field.type) {
            case 'text':
                return <TextField {...commonProps} />;
            case 'email':
                return <EmailField {...commonProps} />;
            case 'number':
                return <NumberField {...commonProps} />;
            case 'date':
                return <DateField {...commonProps} />;
            case 'checkbox':
                return <CheckboxField {...commonProps} />;
            case 'radio':
                return <RadioField {...commonProps} />;
            case 'dropdown':
                return <DropdownField {...commonProps} />;
            default:
                return null;
        }
    };

    return (
        <Fade in timeout={300}>
            <Box
                sx={{
                    opacity: disabled ? 0.6 : 1,
                    transition: 'opacity 0.3s ease',
                }}
            >
                {renderField()}
            </Box>
        </Fade>
    );
}

export default PreviewField;
