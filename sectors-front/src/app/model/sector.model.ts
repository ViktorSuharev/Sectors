export interface Sector {
  id?: number;
  name: string;
  parentId?: number;
  children: Sector[];
}
