import { IProductCategory } from 'interfaces/IProductCategory';

export interface ICarouselItemProps {
  category: IProductCategory;
  carouselRef: React.RefObject<HTMLDivElement>;
};