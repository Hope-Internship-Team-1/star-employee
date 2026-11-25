export type Gender = 'male' | 'female';
export type Education = 'SMA' | 'SMK' | 'D3' | 'D4' | 'S1' | 'S2';

export interface User {
  id?: number | string;
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  birth_date?: string;
  gender?: Gender;
  highest_education?: Education;
  positions?: string[];
  role?: string;
  verified?: boolean;
}

export interface RegisterInput {
  email: string;
  name?: string;
  phone?: string;
  positions?: string[];
}

export interface UpdateUserInput {
  name?: string;
  phone?: string;
  address?: string;
  birth_date?: string;
  gender?: Gender;
  highest_education?: Education;
  positions?: string[];
}
