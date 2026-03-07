export type GalleryCategory =
  | 'all'
  | 'full-wrap'
  | 'color-change'
  | 'ppf'
  | 'commercial'
  | 'partial';

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'all'>;
  imageUrl: string;
  thumbnailUrl?: string;
  vehicle: string;
  color?: string;
  beforeUrl?: string;
  afterUrl?: string;
  tags?: string[];
}
