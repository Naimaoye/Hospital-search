interface POI {
    name: string;
    phone?: string;
    categorySet: { id: number | null }[];
    categories: string[];
    classifications: {
      code: string;
      names: { nameLocale: string; name: string }[];
    }[];
  }
  
  interface Position {
    lat: number | null;
    lon: number | null;
  }
  
  interface Address {
    streetNumber: string;
    streetName: string;
    municipalitySubdivision: string;
    municipality: string;
    countrySecondarySubdivision: string;
    countryTertiarySubdivision: string;
    countrySubdivision: string;
    postalCode: string;
    extendedPostalCode: string;
    countryCode: string;
    country: string;
    countryCodeISO3: string;
    freeformAddress: string;
    countrySubdivisionName: string;
    localName: string;
  }
  
  interface Mapcodes {
    type: string;
    fullMapcode: string;
    territory?: string;
    code?: string;
  }
  
  interface Viewport {
    topLeftPoint: {
      lat: number | null;
      lon: number | null;
    };
    btmRightPoint: {
      lat: number | null;
      lon: number | null;
    };
  }
  
  interface EntryPoints {
    type: string;
    functions?: string[];
    position: {
      lat: number | null;
      lon: number | null;
    };
  }
  
  interface AddressRanges {
    rangeLeft: string;
    rangeRight: string;
    from: {
      lat: number | null;
      lon: number | null;
    };
    to: {
      lat: number | null;
      lon: number | null;
    };
  }
  
  interface DataSources {
    chargingAvailability: {
      id: string;
    };
    geometry: {
      id: string;
    };
    poiDetails: {
      id: string;
      sourceName: string;
    }[];
  }
  
  export type HospitalProps = {
    type: string;
    id: string;
    score: number | null;
    info: string;
    entityType: string;
    poi: POI;
    address: Address;
    position: Position;
    mapcodes: Mapcodes[];
    viewport: Viewport;
    entryPoints: EntryPoints[];
    addressRanges: AddressRanges;
    dataSources: DataSources;
  };
  