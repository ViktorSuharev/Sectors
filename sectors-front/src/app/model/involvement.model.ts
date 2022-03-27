import { Sector } from './sector.model';

export interface Involvement {
  id?: number;
  userName: string;
  sectors: Sector[];
  agreeToTerms: boolean;
}
