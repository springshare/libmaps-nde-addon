import {ButtonConfiguration} from './buttonConfiguration';

export class Configuration {
    constructor(
        public validLocationNameMap: Map<string, boolean>,
        public validCollectionNameMap: Map<string, boolean>,
        public button: ButtonConfiguration
    ) {
    }
}
