import {Member} from './member.interface';

export interface User {
  id: number;
  username: string;
  role: userRole;
  email: string;
  member: Member;
}

type userRole = 'admin' | 'member';
