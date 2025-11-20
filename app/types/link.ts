export interface Link {
  id: string;
  redirectUrl: string;
  title?: string | null;
  code: string;
  clicks: number;
  lastClicked?: string | null;
  createdAt: string;
  userId: string;
}
