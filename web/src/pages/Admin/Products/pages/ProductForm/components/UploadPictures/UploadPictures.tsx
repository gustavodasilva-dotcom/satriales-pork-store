import { FC, useEffect, useRef, useState } from 'react';
import { DeleteForever, Visibility } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import './UploadPictures.scss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UploadPictures: FC = () => {
  const [_files, _setFiles] = useState<File[]>([]);
  const [_selectedImage, _setSelectedImage] = useState<File | null>(null);
  const [_imagePreview, _setImagePreview] = useState('');
  const [_openPreviewModal, _setOpenPreviewModal] = useState(false);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const _triggerInputFile = () => {
    inputFileRef.current?.click();
  };

  const _handleUploadedFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // TODO: create file size validation

    if (files && files.length) {
      const filesArray = Array.from(files);
      _setFiles(filesArray);
    }
  };

  const _handleImagePreview = (): (() => void) | undefined => {
    if (_selectedImage) {
      const objectUrl = URL.createObjectURL(_selectedImage!);

      _setImagePreview(objectUrl);
      _setOpenPreviewModal(true);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  };

  const _deleteImage = (image: File): void => {
    const otherImages = _files.filter(file => file.name !== image.name);
    _setFiles(otherImages);
  };

  useEffect(() => {
    _handleImagePreview();
  }, [_selectedImage]);

  return (
    <div className='UploadPictures'>
      <Paper className='table-wrapper'>
        <Button
          variant='contained'
          color='primary'
          className='upload-button'
          onClick={_triggerInputFile}
        >
          Upload image
        </Button>
        <input
          type='file'
          ref={inputFileRef}
          onChange={_handleUploadedFiles}
          className='file-input-field'
          multiple
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Filename</b>
                </TableCell>
                <TableCell className='options-head'>
                  <b>Options</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_files.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {file.name}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => _setSelectedImage(file)}>
                      <Visibility color='primary' />
                    </IconButton>
                    <IconButton onClick={() => _deleteImage(file)}>
                      <DeleteForever color='error' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal
        open={_openPreviewModal}
        onClose={() => _setOpenPreviewModal(false)}
      >
        <Box sx={style}>
          <div className='image-preview'>
            <img src={_imagePreview} alt="image preview" />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UploadPictures;