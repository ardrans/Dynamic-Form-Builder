import React from 'react';
import { Box } from '@mui/material';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useForm } from '../../context/FormContext';
import FieldItem from './FieldItem';
import EmptyState from '../ui/EmptyState';

function FieldList({ onEditField }) {
    const { fields, reorderFields, addField } = useForm();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            reorderFields(active.id, over.id);
        }
    };

    if (fields.length === 0) {
        return <EmptyState onAddField={addField} />;
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={fields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {fields.map((field) => (
                        <FieldItem
                            key={field.id}
                            field={field}
                            onEdit={() => onEditField(field.id)}
                        />
                    ))}
                </Box>
            </SortableContext>
        </DndContext>
    );
}

export default FieldList;
