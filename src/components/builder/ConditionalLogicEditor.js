import React from 'react';
import {
    Box,
    Typography,
    Switch,
    FormControlLabel,
    Select,
    MenuItem,
    TextField,
    IconButton,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Button,
    FormControl,
    InputLabel,
    Chip,
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { nanoid } from 'nanoid';
import { useForm } from '../../context/FormContext';
import { CONDITIONAL_ACTIONS, OPERATORS } from '../../utils/fieldDefaults';
import { describeCondition } from '../../utils/conditionalLogic';

function ConditionalLogicEditor({ field, onChange }) {
    const { fields } = useForm();
    const { conditionalLogic } = field;

    // Get other fields that can be used as conditions
    const availableFields = fields.filter((f) => f.id !== field.id);

    const handleToggle = (enabled) => {
        onChange({
            ...conditionalLogic,
            enabled,
        });
    };

    const handleActionChange = (action) => {
        onChange({
            ...conditionalLogic,
            action,
        });
    };

    const handleLogicTypeChange = (event, newLogicType) => {
        if (newLogicType) {
            onChange({
                ...conditionalLogic,
                logicType: newLogicType,
            });
        }
    };

    const handleAddCondition = () => {
        const firstAvailableField = availableFields[0];
        if (!firstAvailableField) return;

        const newCondition = {
            id: nanoid(),
            fieldId: firstAvailableField.id,
            operator: 'equals',
            value: '',
        };

        onChange({
            ...conditionalLogic,
            conditions: [...conditionalLogic.conditions, newCondition],
        });
    };

    const handleUpdateCondition = (conditionId, key, value) => {
        onChange({
            ...conditionalLogic,
            conditions: conditionalLogic.conditions.map((c) =>
                c.id === conditionId ? { ...c, [key]: value } : c
            ),
        });
    };

    const handleRemoveCondition = (conditionId) => {
        onChange({
            ...conditionalLogic,
            conditions: conditionalLogic.conditions.filter((c) => c.id !== conditionId),
        });
    };

    if (availableFields.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">
                    Add more fields to enable conditional logic.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    You need at least one other field to create conditions.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            {/* Enable/Disable Toggle */}
            <FormControlLabel
                control={
                    <Switch
                        checked={conditionalLogic.enabled}
                        onChange={(e) => handleToggle(e.target.checked)}
                        color="primary"
                    />
                }
                label="Enable conditional logic"
                sx={{ mb: 2 }}
            />

            {conditionalLogic.enabled && (
                <>
                    {/* Action Selector */}
                    <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                        <InputLabel>Action</InputLabel>
                        <Select
                            value={conditionalLogic.action}
                            label="Action"
                            onChange={(e) => handleActionChange(e.target.value)}
                        >
                            {CONDITIONAL_ACTIONS.map((action) => (
                                <MenuItem key={action.value} value={action.value}>
                                    {action.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Logic Type */}
                    {conditionalLogic.conditions.length > 1 && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                When should this action trigger?
                            </Typography>
                            <ToggleButtonGroup
                                value={conditionalLogic.logicType}
                                exclusive
                                onChange={handleLogicTypeChange}
                                size="small"
                            >
                                <ToggleButton value="all">ALL conditions (AND)</ToggleButton>
                                <ToggleButton value="any">ANY condition (OR)</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    )}

                    {/* Conditions */}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Conditions:
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {conditionalLogic.conditions.map((condition, index) => {
                            const showValueInput = !['isEmpty', 'isNotEmpty'].includes(condition.operator);

                            return (
                                <Paper
                                    key={condition.id}
                                    variant="outlined"
                                    sx={{ p: 2, borderRadius: 2 }}
                                >
                                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                        {/* Field Selector */}
                                        <FormControl size="small" sx={{ minWidth: 140 }}>
                                            <InputLabel>Field</InputLabel>
                                            <Select
                                                value={condition.fieldId}
                                                label="Field"
                                                onChange={(e) =>
                                                    handleUpdateCondition(condition.id, 'fieldId', e.target.value)
                                                }
                                            >
                                                {availableFields.map((f) => (
                                                    <MenuItem key={f.id} value={f.id}>
                                                        {f.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        {/* Operator Selector */}
                                        <FormControl size="small" sx={{ minWidth: 140 }}>
                                            <InputLabel>Operator</InputLabel>
                                            <Select
                                                value={condition.operator}
                                                label="Operator"
                                                onChange={(e) =>
                                                    handleUpdateCondition(condition.id, 'operator', e.target.value)
                                                }
                                            >
                                                {OPERATORS.map((op) => (
                                                    <MenuItem key={op.value} value={op.value}>
                                                        {op.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        {/* Value Input */}
                                        {showValueInput && (
                                            <TextField
                                                size="small"
                                                label="Value"
                                                value={condition.value}
                                                onChange={(e) =>
                                                    handleUpdateCondition(condition.id, 'value', e.target.value)
                                                }
                                                sx={{ flex: 1 }}
                                            />
                                        )}

                                        {/* Remove Button */}
                                        <IconButton
                                            size="small"
                                            onClick={() => handleRemoveCondition(condition.id)}
                                            color="error"
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    {/* Human-readable description */}
                                    <Chip
                                        label={describeCondition(condition, fields)}
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                    />
                                </Paper>
                            );
                        })}
                    </Box>

                    {/* Add Condition Button */}
                    <Button
                        startIcon={<Add />}
                        onClick={handleAddCondition}
                        sx={{ mt: 2 }}
                        variant="outlined"
                        size="small"
                    >
                        Add Condition
                    </Button>
                </>
            )}
        </Box>
    );
}

export default ConditionalLogicEditor;
