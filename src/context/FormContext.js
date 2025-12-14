import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import { nanoid } from 'nanoid';

const FormContext = createContext();

// Initial state
const initialState = {
    formTitle: 'Untitled Form',
    formDescription: '',
    fields: [],
    selectedFieldId: null,
    previewValues: {},
    lastSaved: null,
    isDirty: false,
};

// Action types
const ActionTypes = {
    ADD_FIELD: 'ADD_FIELD',
    UPDATE_FIELD: 'UPDATE_FIELD',
    REMOVE_FIELD: 'REMOVE_FIELD',
    DUPLICATE_FIELD: 'DUPLICATE_FIELD',
    REORDER_FIELDS: 'REORDER_FIELDS',
    SELECT_FIELD: 'SELECT_FIELD',
    SET_PREVIEW_VALUE: 'SET_PREVIEW_VALUE',
    RESET_PREVIEW: 'RESET_PREVIEW',
    UPDATE_FORM_META: 'UPDATE_FORM_META',
    LOAD_FORM: 'LOAD_FORM',
    RESET_FORM: 'RESET_FORM',
    MARK_SAVED: 'MARK_SAVED',
    MARK_DIRTY: 'MARK_DIRTY',
};

// Default field configuration
const getDefaultField = (type) => ({
    id: nanoid(),
    type,
    label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
    placeholder: '',
    required: false,
    validation: {
        min: null,
        max: null,
        pattern: null,
        customError: '',
    },
    options: type === 'radio' || type === 'dropdown'
        ? [
            { id: nanoid(), label: 'Option 1', value: 'option1' },
            { id: nanoid(), label: 'Option 2', value: 'option2' },
        ]
        : [],
    conditionalLogic: {
        enabled: false,
        action: 'show',
        conditions: [],
        logicType: 'all',
    },
});

// Reducer
function formReducer(state, action) {
    switch (action.type) {
        case ActionTypes.ADD_FIELD: {
            const newField = getDefaultField(action.payload);
            return {
                ...state,
                fields: [...state.fields, newField],
                selectedFieldId: newField.id,
                isDirty: true,
            };
        }

        case ActionTypes.UPDATE_FIELD: {
            const { id, updates } = action.payload;
            return {
                ...state,
                fields: state.fields.map(field =>
                    field.id === id ? { ...field, ...updates } : field
                ),
                isDirty: true,
            };
        }

        case ActionTypes.REMOVE_FIELD: {
            const filteredFields = state.fields.filter(field => field.id !== action.payload);
            // Also remove any conditions that reference this field
            const cleanedFields = filteredFields.map(field => ({
                ...field,
                conditionalLogic: {
                    ...field.conditionalLogic,
                    conditions: field.conditionalLogic.conditions.filter(
                        cond => cond.fieldId !== action.payload
                    ),
                },
            }));
            return {
                ...state,
                fields: cleanedFields,
                selectedFieldId: state.selectedFieldId === action.payload ? null : state.selectedFieldId,
                isDirty: true,
            };
        }

        case ActionTypes.DUPLICATE_FIELD: {
            const fieldToDuplicate = state.fields.find(f => f.id === action.payload);
            if (!fieldToDuplicate) return state;

            const duplicatedField = {
                ...fieldToDuplicate,
                id: nanoid(),
                label: `${fieldToDuplicate.label} (Copy)`,
                options: fieldToDuplicate.options.map(opt => ({ ...opt, id: nanoid() })),
                conditionalLogic: {
                    ...fieldToDuplicate.conditionalLogic,
                    conditions: [], // Clear conditions for duplicated field
                },
            };

            const fieldIndex = state.fields.findIndex(f => f.id === action.payload);
            const newFields = [...state.fields];
            newFields.splice(fieldIndex + 1, 0, duplicatedField);

            return {
                ...state,
                fields: newFields,
                selectedFieldId: duplicatedField.id,
                isDirty: true,
            };
        }

        case ActionTypes.REORDER_FIELDS: {
            const { activeId, overId } = action.payload;
            if (activeId === overId) return state;

            const oldIndex = state.fields.findIndex(f => f.id === activeId);
            const newIndex = state.fields.findIndex(f => f.id === overId);

            if (oldIndex === -1 || newIndex === -1) return state;

            const newFields = [...state.fields];
            const [removed] = newFields.splice(oldIndex, 1);
            newFields.splice(newIndex, 0, removed);

            return {
                ...state,
                fields: newFields,
                isDirty: true,
            };
        }

        case ActionTypes.SELECT_FIELD:
            return {
                ...state,
                selectedFieldId: action.payload,
            };

        case ActionTypes.SET_PREVIEW_VALUE:
            return {
                ...state,
                previewValues: {
                    ...state.previewValues,
                    [action.payload.fieldId]: action.payload.value,
                },
            };

        case ActionTypes.RESET_PREVIEW:
            return {
                ...state,
                previewValues: {},
            };

        case ActionTypes.UPDATE_FORM_META:
            return {
                ...state,
                formTitle: action.payload.formTitle ?? state.formTitle,
                formDescription: action.payload.formDescription ?? state.formDescription,
                isDirty: true,
            };

        case ActionTypes.LOAD_FORM: {
            const { formTitle, formDescription, fields } = action.payload;
            console.log('Loading form:', { formTitle, formDescription, fieldsCount: fields?.length });
            return {
                ...state,
                formTitle: formTitle || 'Untitled Form',
                formDescription: formDescription || '',
                fields: fields || [],
                selectedFieldId: null,
                previewValues: {},
                isDirty: false,
                lastSaved: new Date().toISOString(),
            };
        }

        case ActionTypes.RESET_FORM:
            return {
                ...initialState,
                isDirty: false,
            };

        case ActionTypes.MARK_SAVED:
            return {
                ...state,
                lastSaved: new Date().toISOString(),
                isDirty: false,
            };

        case ActionTypes.MARK_DIRTY:
            return {
                ...state,
                isDirty: true,
            };

        default:
            return state;
    }
}

// Provider component
export function FormProvider({ children }) {
    const [state, dispatch] = useReducer(formReducer, initialState);

    // Action creators
    const actions = useMemo(() => ({
        addField: (type) => dispatch({ type: ActionTypes.ADD_FIELD, payload: type }),
        updateField: (id, updates) => dispatch({ type: ActionTypes.UPDATE_FIELD, payload: { id, updates } }),
        removeField: (id) => dispatch({ type: ActionTypes.REMOVE_FIELD, payload: id }),
        duplicateField: (id) => dispatch({ type: ActionTypes.DUPLICATE_FIELD, payload: id }),
        reorderFields: (activeId, overId) => dispatch({ type: ActionTypes.REORDER_FIELDS, payload: { activeId, overId } }),
        selectField: (id) => dispatch({ type: ActionTypes.SELECT_FIELD, payload: id }),
        setPreviewValue: (fieldId, value) => dispatch({ type: ActionTypes.SET_PREVIEW_VALUE, payload: { fieldId, value } }),
        resetPreview: () => dispatch({ type: ActionTypes.RESET_PREVIEW }),
        updateFormMeta: (meta) => dispatch({ type: ActionTypes.UPDATE_FORM_META, payload: meta }),
        loadForm: (formData) => dispatch({ type: ActionTypes.LOAD_FORM, payload: formData }),
        resetForm: () => dispatch({ type: ActionTypes.RESET_FORM }),
        markSaved: () => dispatch({ type: ActionTypes.MARK_SAVED }),
        markDirty: () => dispatch({ type: ActionTypes.MARK_DIRTY }),
    }), []);

    // Get form data for saving
    const getFormData = useCallback(() => ({
        formTitle: state.formTitle,
        formDescription: state.formDescription,
        fields: state.fields,
    }), [state.formTitle, state.formDescription, state.fields]);

    const value = useMemo(() => ({
        ...state,
        ...actions,
        getFormData,
    }), [state, actions, getFormData]);

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
}

// Custom hook to use form context
export function useForm() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useForm must be used within a FormProvider');
    }
    return context;
}

export default FormContext;
