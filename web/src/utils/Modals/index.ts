import Swal, { SweetAlertResult } from 'sweetalert2';

import { ButtonColors, IConfirmModalParams, IImagePreviewModalParams, IPlainModalParams } from './Modals.types';

export const plainModal = ({
  type,
  isCustomTitle,
  customTitle,
  message
}: IPlainModalParams): Promise<SweetAlertResult<any>> => {
  const handleModalTitle = (): string | undefined => {
    if (isCustomTitle) {
      return customTitle;
    }

    switch (type) {
      case 'success':
        return 'Awesome!';
      case 'warning':
        return 'Oops...';
      case 'error':
        return 'Oops...';
    }

    return '';
  };

  return Swal.fire({
    icon: type,
    title: handleModalTitle(),
    text: message,
    confirmButtonColor: ButtonColors.Default
  });
};

export const confirmModal = ({
  type,
  title,
  message,
  confirmText,
  cancelText,
  callback
}: IConfirmModalParams): void => {
  Swal.fire({
    icon: type,
    title: title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: ButtonColors.Confirm,
    cancelButtonText: cancelText,
    cancelButtonColor: ButtonColors.Error,
    reverseButtons: true
  })
    .then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    })
};

export const imagePreviewModal = ({
  url,
  alt
}: IImagePreviewModalParams): Promise<SweetAlertResult<any>> => {
  return Swal.fire({
    imageUrl: url,
    imageAlt: alt,
    confirmButtonColor: ButtonColors.Default
  });
};