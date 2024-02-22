export enum Role {
  User = "user",
  Admin = "admin",
}

export interface UserStateProps {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  auth?: AuthProps;
  student?: StudentProps;
  lecturer?: any;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface AddProductProps {
  name: string;
  image: string;
  category: string;
  location: string;
  quantity: number;
  bestbefore: string;
  price: number;
}

export interface AuthProps {
  email?: string;
  isVerified?: boolean;
  role?: Role;
}

export interface ErrorProps {
  msg: string;
  Id: string;
}

export interface UserProps {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
}

export interface StudentProps {
  id?: string;
  matricNo: string;
  department: string;
  programme: string;
  level: string;
}

// export interface UserStateProps {
//   _id?: any;
//   account?: string | null;
//   user?: UserProps | null;
//   usersCount?: number;
//   companyInfo?: CompanyProps | null;
//   isRegistering?: boolean;
//   isLoggin?: boolean;
//   isLoading?: boolean;
//   errMsg?: ErrorProps | null | any;
//   isRegistered?: boolean;
//   loggin?: boolean;
//   updatingProfile?: boolean;
//   updatedProfile?: boolean;
//   isAuthenticated?: boolean;
//   updatingCompany?: boolean;
//   updatedCompany?: boolean;
//   updatingNotifications?: boolean;
//   updatedNotifications?: boolean;
//   updated?: boolean;
//   token?: string | any;
//   reqResettingPass?: boolean;
//   passwordRequestedProps?: {
//     msg: string;
//     passwordRequested: boolean;
//     email: string;
//   } | null;
//   changedPasswordProps?: {
//     msg: string;
//     changed: boolean;
//   } | null;
//   clientProfileProps?: {
//     msg: string;
//     changed: boolean;
//   } | null;
//   clientNotificationsProps?: {
//     msg: string;
//     changed: boolean;
//   } | null;
//   city?: string;
//   notificationsInfo?: NotificationsProps | null;
//   loadingStats?: boolean;
//   loadingUsers?: boolean;
//   stats?: any;
//   invitingUsers?: boolean;
//   invitedUsers?: boolean;
//   createdUsers?: any[] | null;
// }
