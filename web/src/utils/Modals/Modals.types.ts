import { SweetAlertIcon } from 'sweetalert2';

export enum ButtonColors {
  Error = '#CC0000',
  Warning = '#FF5500',
  Confirm = '#00B300',
  Default = '#0088CC'
};

export interface IPlainModalParams {
  type: SweetAlertIcon;
  isCustomTitle?: boolean;
  customTitle?: string;
  message: string;
};

export interface IConfirmModalParams {
  type: SweetAlertIcon;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  callback(): Promise<any> | void;
};

export interface IImagePreviewModalParams {
  url: string;
  alt: string;
};