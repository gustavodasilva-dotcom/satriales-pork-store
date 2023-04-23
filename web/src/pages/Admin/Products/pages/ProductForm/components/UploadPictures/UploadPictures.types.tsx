import { IImage } from 'interfaces/IImage';

export interface IUploadPicturesProps {
  imageList: IImage[],
  setImageList: React.Dispatch<React.SetStateAction<IImage[]>>;
  imagesDeleted: string[];
  setImagesDeleted: React.Dispatch<React.SetStateAction<string[]>>;
};