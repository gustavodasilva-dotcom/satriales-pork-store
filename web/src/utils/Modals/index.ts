import Swal, { SweetAlertResult } from 'sweetalert2';

import { ButtonColors, IPlainModalParams } from './Modals.types';

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
      case 'error' || 'warning':
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