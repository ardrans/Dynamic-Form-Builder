import TextFieldsIcon from '@mui/icons-material/TextFields';
import EmailIcon from '@mui/icons-material/Email';
import PinIcon from '@mui/icons-material/Pin';
import EventIcon from '@mui/icons-material/Event';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ListIcon from '@mui/icons-material/List';

// Field type definitions with icons and colors
export const FIELD_TYPES = [
    { type: 'text', label: 'Text', icon: TextFieldsIcon, color: '#6366f1' },
    { type: 'email', label: 'Email', icon: EmailIcon, color: '#ec4899' },
    { type: 'number', label: 'Number', icon: PinIcon, color: '#f59e0b' },
    { type: 'date', label: 'Date', icon: EventIcon, color: '#10b981' },
    { type: 'checkbox', label: 'Checkbox', icon: CheckBoxIcon, color: '#8b5cf6' },
    { type: 'radio', label: 'Radio', icon: RadioButtonCheckedIcon, color: '#06b6d4' },
    { type: 'dropdown', label: 'Dropdown', icon: ListIcon, color: '#f43f5e' },
];

/**
 * Get field type configuration by type
 */
export const getFieldTypeConfig = (type) => {
    return FIELD_TYPES.find(f => f.type === type) || FIELD_TYPES[0];
};

/**
 * Get field icon component by type
 */
export const getFieldIcon = (type) => {
    const config = getFieldTypeConfig(type);
    return config.icon;
};

/**
 * Get field color by type
 */
export const getFieldColor = (type) => {
    const config = getFieldTypeConfig(type);
    return config.color;
};

/**
 * Action types for conditional logic
 */
export const CONDITIONAL_ACTIONS = [
    { value: 'show', label: 'Show this field' },
    { value: 'hide', label: 'Hide this field' },
    { value: 'enable', label: 'Enable this field' },
    { value: 'disable', label: 'Disable this field' },
];

/**
 * Logic types for combining conditions
 */
export const LOGIC_TYPES = [
    { value: 'all', label: 'ALL conditions are met (AND)' },
    { value: 'any', label: 'ANY condition is met (OR)' },
];

/**
 * Operators for conditions
 */
export const OPERATORS = [
    { value: 'equals', label: 'Equals' },
    { value: 'notEquals', label: 'Does not equal' },
    { value: 'contains', label: 'Contains' },
    { value: 'greaterThan', label: 'Greater than' },
    { value: 'lessThan', label: 'Less than' },
    { value: 'isEmpty', label: 'Is empty' },
    { value: 'isNotEmpty', label: 'Is not empty' },
];
