export interface NotificationModel {
  id?: string;
  subject?:string;
  message: string;
  by_user_id:string;
  to_user_id?: string;
  notification_type?: number ;
}
