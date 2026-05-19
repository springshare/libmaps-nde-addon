import {ButtonConfiguration} from './buttonConfiguration';

export class Configuration {
    constructor(
        public locationNameMap: Map<string, boolean>,
        public collectionNameMapByLocation: Record<string, Record<string, boolean>>,
        public button: ButtonConfiguration
    ) {
    }
}
