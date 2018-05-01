export interface SubMenu {

    $id: string,
    SubMenuId: number,
    Name: string,
    HeaderImageName: string,
    Description: string,
    Subtitle?: string,
    IsSelectable: boolean,
    IsVisible: boolean,
    Restrictions?: any,
    DisplayName: string,
    MenuItems: Array<number[]>,
    ExternalId?: any

}
