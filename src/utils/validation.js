// Validation utility functions

/**
 * Validate a field value based on field configuration
 */
export const validateField = (field, value) => {
    const errors = [];

    // Required validation
    if (field.required) {
        if (value === undefined || value === null || value === '') {
            errors.push(field.validation?.customError || `${field.label} is required`);
            return { valid: false, errors };
        }

        // For checkbox, check if it's checked
        if (field.type === 'checkbox' && !value) {
            errors.push(field.validation?.customError || `${field.label} must be checked`);
            return { valid: false, errors };
        }
    }

    // Skip further validation if value is empty and not required
    if (value === undefined || value === null || value === '') {
        return { valid: true, errors: [] };
    }

    const { min, max, pattern, customError } = field.validation || {};

    // Type-specific validations
    switch (field.type) {
        case 'email':
            if (!validateEmail(value)) {
                errors.push(customError || 'Please enter a valid email address');
            }
            break;

        case 'number':
            const numValue = Number(value);
            if (isNaN(numValue)) {
                errors.push(customError || 'Please enter a valid number');
            } else {
                if (min !== null && min !== undefined && numValue < min) {
                    errors.push(customError || `Value must be at least ${min}`);
                }
                if (max !== null && max !== undefined && numValue > max) {
                    errors.push(customError || `Value must be at most ${max}`);
                }
            }
            break;

        case 'text':
            const strValue = String(value);
            if (min !== null && min !== undefined && strValue.length < min) {
                errors.push(customError || `Must be at least ${min} characters`);
            }
            if (max !== null && max !== undefined && strValue.length > max) {
                errors.push(customError || `Must be at most ${max} characters`);
            }
            break;

        default:
            break;
    }

    // Pattern validation (regex)
    if (pattern && value) {
        try {
            const regex = new RegExp(pattern);
            if (!regex.test(String(value))) {
                errors.push(customError || 'Value does not match the required pattern');
            }
        } catch (e) {
            console.error('Invalid regex pattern:', pattern);
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate all fields and return validation state
 */
export const validateAllFields = (fields, values) => {
    const validationResults = {};
    let isFormValid = true;

    fields.forEach(field => {
        const value = values[field.id];
        const result = validateField(field, value);
        validationResults[field.id] = result;

        if (!result.valid) {
            isFormValid = false;
        }
    });

    return {
        isValid: isFormValid,
        fieldResults: validationResults,
    };
};
