import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import { ContentCopy, Check, Share } from '@mui/icons-material';
import { useForm } from '../../context/FormContext';
import { generateShareableURL, copyToClipboard } from '../../utils/shareUrl';

function ShareDialog({ open, onClose, showSuccess }) {
    const { getFormData } = useForm();
    const [shareUrl, setShareUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (open) {
            const formData = getFormData();
            const result = generateShareableURL(formData);
            if (result.success) {
                setShareUrl(result.url);
            }
            setCopied(false);
        }
    }, [open, getFormData]);

    const handleCopy = async () => {
        const result = await copyToClipboard(shareUrl);
        if (result.success) {
            setCopied(true);
            showSuccess('Link copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                },
            }}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Share color="primary" />
                Share Form
            </DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Share this link to let others view your form. The form schema is encoded in the URL.
                </Typography>
                <TextField
                    fullWidth
                    value={shareUrl}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleCopy} edge="end">
                                    {copied ? <Check color="success" /> : <ContentCopy />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'action.hover',
                        },
                    }}
                />
                <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Note: Very large forms may create long URLs. For complex forms, consider using Export instead.
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose}>Close</Button>
                <Button
                    onClick={handleCopy}
                    variant="contained"
                    startIcon={copied ? <Check /> : <ContentCopy />}
                >
                    {copied ? 'Copied!' : 'Copy Link'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ShareDialog;
