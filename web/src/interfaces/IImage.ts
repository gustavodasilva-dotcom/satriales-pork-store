export interface IImage {
  _id: string;
  name: string;
  image: {
    data: ArrayBuffer,
    type: string
  };
  _v: Number;
};