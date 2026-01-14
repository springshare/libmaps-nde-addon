// this is the data format we get from libmaps server
export interface ConfigurationData {
    locationNames: string[];
    collectionNames: string[];
    text: string;
    textColor: string;
    backgroundColor: string;
    hoverColor: string;
    borderRadius: string;
    iconIndex: number;
    isModalWanted: boolean;
}
