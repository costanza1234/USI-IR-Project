export interface Cause {
  name: string;
}

export interface CountryOfOperation {
  name: string;
}

export interface Charity {
  name: string;
  city: string;
  country: string;
  activeProjects: string;
  totalProjects: string;
  mission: string;
  organization_url: string;
  logoUrl: string;
  cause: Cause[];
  countries_of_operation: CountryOfOperation[];
}

export interface CharityResponse {
  score: number;
  charity: Charity;
}

export interface SearchResponse {
  query: string;
  charities: CharityResponse[];
}
