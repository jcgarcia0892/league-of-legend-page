export interface Role {
    roleName: RoleName;
    name: string;
    nickName: string;
};

export type RoleInfo = Omit<Role, 'roleName'>;

export type RoleName = 'asesinos' | 'luchadores' | 'magos' | 'tiradores' | 'apoyos' | 'tanques';