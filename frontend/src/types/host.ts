export interface Host {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  profileImage: string;
  introduction: string;
  languages: string[];
  interests: string[];
  callPricePerMin: number;
  rating: number;
  reviewCount: number;
  totalCallCount: number;
  isOnline: boolean;
  status: 'online' | 'offline' | 'busy';
}
