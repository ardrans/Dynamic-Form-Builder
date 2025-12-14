import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    IconButton,
    Chip,
    Tooltip,
} from '@mui/material';
import {
    DragIndicator,
    Edit,
    ContentCopy,
    Delete,
    AccountTree,
} from '@mui/icons-material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useForm } from '../../context/FormContext';
import { getFieldTypeConfig } from '../../utils/fieldDefaults';
import ConfirmDialog from '../ui/ConfirmDialog';
import FieldConfigDialog from './FieldConfigDialog';

function FieldItem({ field, onEdit }) {
    const { removeField, duplicateField, selectField, selectedFieldId } = useForm();
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [configOpen, setConfigOpen] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const fieldConfig = getFieldTypeConfig(field.type);
    const Icon = fieldConfig.icon;
    const hasConditions = field.conditionalLogic?.enabled && field.conditionalLogic?.conditions?.length > 0;
    const isSelected = selectedFieldId === field.id;

    const handleEdit = () => {
        selectField(field.id);
        setConfigOpen(true);
    };

    const handleDuplicate = () => {
        duplicateField(field.id);
    };

    const handleDelete = () => {
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        removeField(field.id);
        setDeleteConfirmOpen(false);
    };

    return (
        <>
            <Paper
                ref={setNodeRef}
                style={style}
                elevation={isDragging ? 8 : isSelected ? 2 : 0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1.5,
                    gap: 1.5,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: isSelected ? 'primary.main' : 'divider',
                    bgcolor: isDragging ? 'action.hover' : 'background.paper',
                    opacity: isDragging ? 0.8 : 1,
                    cursor: isDragging ? 'grabbing' : 'default',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        borderColor: 'primary.light',
                        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.15)',
                        '& .field-actions': {
                            opacity: 1,
                        },
                    },
                }}
            >
                {/* Drag Handle */}
                <Box
                    {...attributes}
                    {...listeners}
                    sx={{
                        cursor: 'grab',
                        color: 'text.secondary',
                        display: 'flex',
                        '&:active': { cursor: 'grabbing' },
                    }}
                >
                    <DragIndicator />
                </Box>

                {/* Field Icon */}
                <Box
                    sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: `${fieldConfig.color}15`,
                    }}
                >
                    <Icon sx={{ color: fieldConfig.color, fontSize: 20 }} />
                </Box>

                {/* Field Info */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                            variant="body2"
                            fontWeight={500}
                            noWrap
                            sx={{ maxWidth: 200 }}
                        >
                            {field.label}
                        </Typography>
                        {field.required && (
                            <Chip
                                label="Required"
                                size="small"
                                color="error"
                                variant="outlined"
                                sx={{ height: 20, fontSize: '0.65rem' }}
                            />
                        )}
                        {hasConditions && (
                            <Tooltip title="Has conditional logic">
                                <AccountTree sx={{ fontSize: 16, color: 'warning.main' }} />
                            </Tooltip>
                        )}
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                        {fieldConfig.label}
                        {field.placeholder && ` • "${field.placeholder}"`}
                    </Typography>
                </Box>

                {/* Actions */}
                <Box
                    className="field-actions"
                    sx={{
                        display: 'flex',
                        gap: 0.5,
                        opacity: { xs: 1, md: 0 },
                        transition: 'opacity 0.2s ease',
                    }}
                >
                    <Tooltip title="Edit">
                        <IconButton size="small" onClick={handleEdit}>
                            <Edit fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Duplicate">
                        <IconButton size="small" onClick={handleDuplicate}>
                            <ContentCopy fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton size="small" onClick={handleDelete} color="error">
                            <Delete fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Paper>

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Field"
                message={`Are you sure you want to delete "${field.label}"? This action cannot be undone.`}
            />

            {/* Field Configuration Dialog */}
            <FieldConfigDialog
                open={configOpen}
                onClose={() => setConfigOpen(false)}
                fieldId={field.id}
            />
        </>
    );
}

export default FieldItem;
