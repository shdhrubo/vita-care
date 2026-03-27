export interface ServiceCategory {
  Id: string;
  Title: string;
  Description: string;
  Path: string;
  Icon: string;
  Color: string; // e.g., 'primary', 'amber', 'rose'
  Features: ServiceFeature[];
}

export interface ServiceFeature {
  Id: string;
  Title: string;
  Description: string;
  Icon: string;
}

export interface CareServiceDetails {
  Id: string;
  CategoryId: string;
  Title: string;
  FullDescription: string;
  Features: ServiceFeature[];
  Image: string;
}
