interface UserGeoType {
    lat: string;
    lng: string
}

interface UserAddressType {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: UserGeoType;
}

interface UserCompanyType {
    name: string;
    catchPhrase: string
    bs: string
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddressType;
    phone: string;
    website: string;
    company: UserCompanyType;
}

export type UserState = User[];

export interface AppState {
    loading: boolean;
    data: UserState;
    filteredData: UserState; 
    fetchedData: UserState;
    error: string;
    filter: string;
  }