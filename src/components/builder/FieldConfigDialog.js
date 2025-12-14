import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Switch,
    FormControlLabel,
    Box,
    Tabs,
    Tab,
    Typography,
    IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useForm } from '../../context/FormContext';
import { getFieldTypeConfig } from '../../utils/fieldDefaults';
import OptionsEditor from './OptionsEditor';
import ConditionalLogicEditor from './ConditionalLogicEditor';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
        </div>
    );
}

function FieldConfigDialog({ open, onClose, fieldId }) {
    const { fields, selectedFieldId, updateField } = useForm();
    const [activeTab, setActiveTab] = useState(0);
    const [localField, setLocalField] = useState(null);

    // Get the field to edit
    const targetFieldId = fieldId || selectedFieldId;
    const field = fields.find(f => f.id === targetFieldId);

    // Initialize local state when dialog opens
    useEffect(() => {
        if (open && field) {
            setLocalField({ ...field });
            setActiveTab(0);
        }
    }, [open, field]);

    if (!localField) return null;

    const fieldConfig = getFieldTypeConfig(localField.type);
    const Icon = fieldConfig.icon;
    const hasOptions = localField.type === 'radio' || localField.type === 'dropdown';

    const handleChange = (key, value) => {
        setLocalField(prev => ({ ...prev, [key]: value }));
    };

    const handleValidationChange = (key, value) => {
        setLocalField(prev => ({
            ...prev,
            validation: { ...prev.validation, [key]: value },
        }));
    };

    const handleOptionsChange = (options) => {
        setLocalField(prev => ({ ...prev, options }));
    };

    const handleConditionalLogicChange = (conditionalLogic) => {
        setLocalField(prev => ({ ...prev, conditionalLogic }));
    };

    const handleSave = () => {
        updateField(localField.id, localField);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3, maxHeight: '90vh' },
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pb: 1,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: `${fieldConfig.color}15`,
                        }}
                    >
                        <Icon sx={{ color: fieldConfig.color }} />
                    </Box>
                    <Box>
                        <Typography variant="h6">Configure Field</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {fieldConfig.label} Field
                        </Typography>
                    </Box>
                </Box>
                <IconButton onClick={onClose} size="small">
                    <Close />
                </IconButton>
            </DialogTitle>

            <Tabs
                value={activeTab}
                onChange={(e, v) => setActiveTab(v)}
                sx={{ px: 3, borderBottom: 1, borderColor: 'divider' }}
            >
                <Tab label="Basic" />
                <Tab label="Validation" />
                {hasOptions && <Tab label="Options" />}
                <Tab label="Conditions" />
            </Tabs>

            <DialogContent sx={{ pt: 0 }}>
                {/* Basic Tab */}
                <TabPanel value={activeTab} index={0}>
                    <TextField
                        fullWidth
                        label="Label"
                        value={localField.label}
                        onChange={(e) => handleChange('label', e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Placeholder"
                        value={localField.placeholder}
                        onChange={(e) => handleChange('placeholder', e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={localField.required}
                                onChange={(e) => handleChange('required', e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Required field"
                    />
                </TabPanel>

                {/* Validation Tab */}
                <TabPanel value={activeTab} index={1}>
                    {(localField.type === 'text' || localField.type === 'number') && (
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <TextField
                                label={localField.type === 'text' ? 'Min Length' : 'Min Value'}
                                type="number"
                                value={localField.validation.min ?? ''}
                                onChange={(e) =>
                                    handleValidationChange('min', e.target.value ? Number(e.target.value) : null)
                                }
                                sx={{ flex: 1 }}
                            />
                            <TextField
                                label={localField.type === 'text' ? 'Max Length' : 'Max Value'}
                                type="number"
                                value={localField.validation.max ?? ''}
                                onChange={(e) =>
                                    handleValidationChange('max', e.target.value ? Number(e.target.value) : null)
                                }
                                sx={{ flex: 1 }}
                            />
                        </Box>
                    )}
                    <TextField
                        fullWidth
                        label="Regex Pattern (optional)"
                        value={localField.validation.pattern ?? ''}
                        onChange={(e) => handleValidationChange('pattern', e.target.value || null)}
                        placeholder="e.g. ^[A-Za-z]+$"
                        sx={{ mb: 2 }}
                        helperText="Regular expression for custom validation"
                    />
                    <TextField
                        fullWidth
                        label="Custom Error Message"
                        value={localField.validation.customError}
                        onChange={(e) => handleValidationChange('customError', e.target.value)}
                        placeholder="e.g. Please enter a valid value"
                    />
                </TabPanel>

                {/* Options Tab (for radio/dropdown) */}
                {hasOptions && (
                    <TabPanel value={activeTab} index={2}>
                        <OptionsEditor
                            options={localField.options}
                            onChange={handleOptionsChange}
                        />
                    </TabPanel>
                )}

                {/* Conditions Tab */}
                <TabPanel value={activeTab} index={hasOptions ? 3 : 2}>
                    <ConditionalLogicEditor
                        field={localField}
                        onChange={handleConditionalLogicChange}
                    />
                </TabPanel>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} variant="outlined">
                    Cancel
                </Button>
                <Button onClick={handleSave} variant="contained">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FieldConfigDialog;
