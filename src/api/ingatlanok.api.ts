import axios from 'axios';

export const typicodeApi = axios.create({
  baseURL: 'http://localhost:8080/ingatlanok',
  headers: {
    Accept: 'application/json',
  },
});

export type Ingatlan = {
  id: number;
  orszag: string;
  varos: string;
  negyzetmeter: number;
  termekAra: number;
  tulajNeve: string;
  elerhetoseg: string;
};

export type NewIngatlan = {
  orszag: string;
  varos: string;
  negyzetmeter: number;
  termekAra: number;
  tulajNeve: string;
  elerhetoseg: string;
};

export async function fetchAllIngatlans(): Promise<Ingatlan[]> {
  const res = await typicodeApi.get<Ingatlan[]>('');
  return res.data;
}

export async function createIngatlan(data: NewIngatlan): Promise<Ingatlan> {
  const res = await typicodeApi.post<Ingatlan>('', data);
  return res.data;
}

export async function getIngatlanById(id: number): Promise<Ingatlan> {
  const res = await typicodeApi.get<Ingatlan>(`/${id}`);
  return res.data;
}

export async function putIngatlan(data: Ingatlan): Promise<Ingatlan> {
  const { id, ...restData } = data;
  const res = await typicodeApi.put<Ingatlan>(`/${id}`, restData);
  return res.data;
}

export async function ingatlanDelete(id: number): Promise<void> {
  await typicodeApi.delete(`/${id}`);
}
