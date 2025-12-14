// Conditional logic evaluation utilities

/**
 * Evaluate a single condition
 */
export const evaluateCondition = (condition, fieldValues) => {
    const { fieldId, operator, value: targetValue } = condition;
    const fieldValue = fieldValues[fieldId];

    // Handle empty/undefined field values
    if (fieldValue === undefined || fieldValue === null) {
        switch (operator) {
            case 'isEmpty':
                return true;
            case 'isNotEmpty':
                return false;
            default:
                return false;
        }
    }

    switch (operator) {
        case 'equals':
            return String(fieldValue).toLowerCase() === String(targetValue).toLowerCase();

        case 'notEquals':
            return String(fieldValue).toLowerCase() !== String(targetValue).toLowerCase();

        case 'contains':
            return String(fieldValue).toLowerCase().includes(String(targetValue).toLowerCase());

        case 'greaterThan':
            return Number(fieldValue) > Number(targetValue);

        case 'lessThan':
            return Number(fieldValue) < Number(targetValue);

        case 'isEmpty':
            return fieldValue === '' || fieldValue === false;

        case 'isNotEmpty':
            return fieldValue !== '' && fieldValue !== false;

        default:
            return false;
    }
};

/**
 * Evaluate all conditions for a field based on logic type (AND/OR)
 */
export const evaluateConditions = (conditions, logicType, fieldValues) => {
    if (!conditions || conditions.length === 0) {
        return true;
    }

    if (logicType === 'all') {
        // AND logic - all conditions must be true
        return conditions.every(condition => evaluateCondition(condition, fieldValues));
    } else {
        // OR logic - at least one condition must be true
        return conditions.some(condition => evaluateCondition(condition, fieldValues));
    }
};

/**
 * Determine if a field should be visible based on its conditional logic
 */
export const evaluateFieldVisibility = (field, fieldValues) => {
    const { conditionalLogic } = field;

    // If no conditional logic, always show
    if (!conditionalLogic || !conditionalLogic.enabled || conditionalLogic.conditions.length === 0) {
        return true;
    }

    const conditionsMet = evaluateConditions(
        conditionalLogic.conditions,
        conditionalLogic.logicType,
        fieldValues
    );

    // Determine visibility based on action and whether conditions are met
    switch (conditionalLogic.action) {
        case 'show':
            return conditionsMet;
        case 'hide':
            return !conditionsMet;
        default:
            return true;
    }
};

/**
 * Determine if a field should be disabled based on its conditional logic
 */
export const evaluateFieldDisabled = (field, fieldValues) => {
    const { conditionalLogic } = field;

    // If no conditional logic or not enabled, not disabled
    if (!conditionalLogic || !conditionalLogic.enabled || conditionalLogic.conditions.length === 0) {
        return false;
    }

    const conditionsMet = evaluateConditions(
        conditionalLogic.conditions,
        conditionalLogic.logicType,
        fieldValues
    );

    // Determine disabled state based on action
    switch (conditionalLogic.action) {
        case 'enable':
            return !conditionsMet;
        case 'disable':
            return conditionsMet;
        default:
            return false;
    }
};

/**
 * Get human-readable description of a condition
 */
export const describeCondition = (condition, fields) => {
    const targetField = fields.find(f => f.id === condition.fieldId);
    const fieldName = targetField ? targetField.label : 'Unknown field';

    const operatorLabels = {
        equals: 'equals',
        notEquals: 'does not equal',
        contains: 'contains',
        greaterThan: 'is greater than',
        lessThan: 'is less than',
        isEmpty: 'is empty',
        isNotEmpty: 'is not empty',
    };

    const operatorLabel = operatorLabels[condition.operator] || condition.operator;

    if (condition.operator === 'isEmpty' || condition.operator === 'isNotEmpty') {
        return `"${fieldName}" ${operatorLabel}`;
    }

    return `"${fieldName}" ${operatorLabel} "${condition.value}"`;
};

/**
 * Operators available for each field type
 */
export const getOperatorsForFieldType = (fieldType) => {
    const baseOperators = [
        { value: 'equals', label: 'Equals' },
        { value: 'notEquals', label: 'Does not equal' },
        { value: 'isEmpty', label: 'Is empty' },
        { value: 'isNotEmpty', label: 'Is not empty' },
    ];

    const textOperators = [
        ...baseOperators,
        { value: 'contains', label: 'Contains' },
    ];

    const numberOperators = [
        ...baseOperators,
        { value: 'greaterThan', label: 'Greater than' },
        { value: 'lessThan', label: 'Less than' },
    ];

    switch (fieldType) {
        case 'text':
        case 'email':
            return textOperators;
        case 'number':
            return numberOperators;
        default:
            return baseOperators;
    }
};
