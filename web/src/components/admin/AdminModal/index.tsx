import { FC } from 'react';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import IAdminModalProps from './types';
import { styles } from './styles';

const AdminModal: FC<IAdminModalProps> = ({
  open,
  setOpen,
  title,
  focusAfter,
  children
}) => {
  const handleClose = () => {
    focusAfter?.current?.focus();
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
      >
        <Box sx={styles.modalBox}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
            >
              {title}
            </Typography>
            <IconButton
              onClick={() => setOpen(false)}
            >
              <Close />
            </IconButton>
          </Box>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default AdminModal;