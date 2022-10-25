export interface ProposalModel {
  id?: string;
  userId: string;
  title: string;
  description: string;
  banner_image?: string | [];
  raiseFund?: string;
  additionalFeature?: string;
  endDate: string;
  startDate: string;
  assetTypeId: string;
  // subscriptionTypeId: string;
  documents: string | [];
  project_id?: string;
  year?: number;
  fee?: string;
  head?: string;
  issuedToken?: string;
  tokenToSold?: string;
  minInvestment?: string;
  mintStatus?: number;
  tokenValue?: string;
  feature?: string | [];
  subHead?: string | [];
}
