// this is the data format we get from libmaps server
export interface ConfigurationData {
    locationNames: string[];
    collectionNameMapByLocation: Record<string, Record<string, boolean>>;
    text: string;
    textColor: string;
    backgroundColor: string;
    hoverColor: string;
    borderRadius: string;
    iconIndex: number;
    isModalWanted: boolean;
}
