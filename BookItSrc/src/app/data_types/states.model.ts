export interface NavbarState {
    optionEnabled: string,
    settingsOption: string,
    myBooksOption: string,
    show: boolean,
}

export interface ContextState {
    navbar: NavbarState,
}

export interface ExploreState extends Loadable {
    usersNearBy:string[],
    booksNearBy:Book[],
}

export interface Loadable {
    loading?: boolean,
    loaded?: boolean,
    error?: string,
}

export interface ExtendedUserInfo extends Loadable {
    uid?: string,
    email?: string;
    photoURL?: string;
    displayName?: string,
    accountDeleted?: boolean,
    rating?: number;
    numRates?: number;
    borrowRestricted?: boolean,
    maxAllowedOpenBorrows?: number,
    shareMyBooks?: boolean,
}

export interface Location {
    id?: string,
    label: string,
    address: string,
    lat: number,
    long: number,
    active: boolean
}

export interface LocationSettings extends Loadable {
    useCurrentLocation?: boolean,
    searchRadiusKm?: number,
}

export interface Category {
    name: string,
    active: boolean
}

export interface FavoriteCategories extends Loadable {
    categories: Category[],
}

export interface UserSettingsState {
    info?: ExtendedUserInfo,
    locationSettings?: LocationSettings,
    favoriteCategories?: FavoriteCategories,
}

export interface UserState {
    userSettings: UserSettingsState,
    locations,// {'id':Location, 'id':Location}
    myBooks:Book[],
}

export interface Book {
    id: string,
    visible: boolean,
    giveaway: boolean,
    lendCount: number,
    maxLendDays: number,
    currentLend?: {
        borrowerUid: string,
        startTime: Date
    }
    title: string,
    author: string,
    categories: string[],
    imagePath: string,
    description:string,
}



export enum UserUpdateType {
    SEARCH_RADIUS_KM,
    SHARE_MY_BOOKS,
}
