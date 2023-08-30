export type Country = {
  id: string;
  name: string;
  flag: string;
  code: string;
  someWeirdServerFieldNameWithCount: number;
};

export type CountryItem = Pick<Country, 'name' | 'flag' | 'code'> & {
  prefix: string;
};

export type CountryFilter = { q: string } | null;
