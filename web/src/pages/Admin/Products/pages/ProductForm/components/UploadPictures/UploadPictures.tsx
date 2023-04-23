import { FC, useEffect, useRef, useState } from 'react';
import { DeleteForever, Visibility } from '@mui/icons-material';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { confirmModal, imagePreviewModal, plainModal } from 'utils/Modals';

import { IUploadPicturesProps } from './UploadPictures.types';
import { IImage } from 'interfaces/IImage';
import './UploadPictures.scss';

const UploadPictures: FC<IUploadPicturesProps> = ({
  imageList,
  setImageList,
  imagesDeleted,
  setImagesDeleted
}) => {
  const [_selectedImage, _setSelectedImage] = useState<IImage | null>(null);

  const _inputFileRef = useRef<HTMLInputElement>(null);

  const _axiosPrivate = useAxiosPrivate();

  const _triggerInputFile = () => {
    _inputFileRef.current?.click();
  };

  const _cleanInputFile = () => {
    if (_inputFileRef.current) {
      _inputFileRef.current.value = '';
    }
  };

  const _handleUploadedFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      const image = files[0]

      if (image.size > 107000) {
        plainModal({
          type: 'warning',
          message: 'This image is too big!'
        });

        _cleanInputFile();

        return;
      }

      const formData = new FormData();

      formData.append('name', image.name);
      formData.append('image', image);
      formData.append('contentType', image.type);

      _axiosPrivate.request<IImage>({
        url: 'v2/images/upload',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then(res => {
          const data = res.data;
          setImageList([...imageList, data]);
        })
        .catch(error => {
          console.log(error);
        });
    }

    _cleanInputFile();
  };

  const _handleImagePreview = (): (() => void) | undefined => {
    if (_selectedImage) {
      const buffer = new Blob([new Uint8Array(_selectedImage.image.data).buffer]);
      const objectUrl = URL.createObjectURL(buffer);

      imagePreviewModal({
        url: objectUrl,
        alt: _selectedImage.name
      });

      _setSelectedImage(null);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  };

  const _handleDeleteImage = (image: IImage): void => {
    const deleteImage = async (): Promise<any> => {
      try {
        const response = await _axiosPrivate.delete<IImage>(`v2/images/${image._id}`);
        const data = response.data;

        setImagesDeleted([...imagesDeleted, data._id]);
        
        const otherImages = imageList.filter(file => file._id !== data._id);
        return setImageList(otherImages);
      } catch (error) {
        return () => console.log(error);
      }
    };

    confirmModal({
      type: 'warning',
      title: 'Warning!',
      message: 'Are you sure that you want to delete this image?',
      confirmText: 'Yes!',
      cancelText: 'No!',
      callback: deleteImage
    });
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
          ref={_inputFileRef}
          onChange={_handleUploadedFiles}
          className='file-input-field'
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
              {imageList.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {file.name}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => _setSelectedImage(file)}>
                      <Visibility color='primary' />
                    </IconButton>
                    <IconButton onClick={() => _handleDeleteImage(file)}>
                      <DeleteForever color='error' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default UploadPictures;