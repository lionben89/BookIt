export interface NavbarState {
    optionEnabled: string,
    settingsOption: string
}

export interface ContextState {
    navbar: NavbarState,
}

export interface Loadable {
    loading?: boolean,
    loaded?: boolean,
    error?: string,
}

export interface ExtendedUserInfo extends Loadable {
    uid: string,
    email: string;
    photoURL: string;
    displayName: string,
    accountDeleted: boolean,
    rating?: number;
    numRates?: number;
    borrowRestricted?: boolean,
    maxAllowedOpenBorrows?: number,
}

export interface Location {
    label: string,
    address: string,
    lat: number,
    long: number,
    active: boolean
}

export interface LocationSettings extends Loadable {
    useCurrentLocation: boolean,
    locations: Location[],
    searchRadiusKm: number,
}

export interface Category {
    name: string,
    active: boolean
}

export interface FavoriteCategories extends Loadable {
    categories: Category[],
}

export interface UserDataState {
    info: ExtendedUserInfo,
    locationSettings?: LocationSettings,
    favoriteCategories?: FavoriteCategories,
}
