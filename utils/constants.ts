export type IUserRoles = "user" | "mod";
export const USER_ROLES: Readonly<{
  USER: IUserRoles;
  MOD: IUserRoles;
}> = {
  USER: "user",
  MOD: "mod",
};

export type IApprovalStatus = "pending" | "approved" | "spam";
export const APPROVAL_STATUS: {
  PENDING: IApprovalStatus;
  APPROVED: IApprovalStatus;
  SPAM: IApprovalStatus;
} = {
  PENDING: "pending",
  APPROVED: "approved",
  SPAM: "spam",
};

export const NOTIF_QUEUE = "NOTIF_QUEUE";
