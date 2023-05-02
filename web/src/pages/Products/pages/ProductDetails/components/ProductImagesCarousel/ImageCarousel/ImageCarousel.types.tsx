import { IImage } from 'interfaces/IImage';

export interface IImageCarouselProps {
  images: IImage[];
  carouselRef: React.RefObject<HTMLDivElement>;
};