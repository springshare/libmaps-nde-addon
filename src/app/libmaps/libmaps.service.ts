import {Inject, Injectable} from '@angular/core';
import {ConfigurationData} from './configurationdata';
import {Configuration} from './configuration';
import {map, shareReplay} from 'rxjs/operators';
import {HttpClient,} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ButtonConfiguration} from './buttonConfiguration';

@Injectable()
export class LibmapsService {
    public libcalUrl: string;
    private configurationData: Observable<Configuration>;

    constructor(
        @Inject('MODULE_PARAMETERS') public moduleParameters: any,
        private httpClient: HttpClient
    ) {
        this.libcalUrl = moduleParameters.LibCalURL || '';

        if (this.libcalUrl === '') {
            console.warn('LibMaps: No LibCal URL provided');
            console.debug(moduleParameters);

            this.libcalUrl = 'https://site.libcal.docker';
        }

        this.configurationData = this.httpClient.get<ConfigurationData>(this.libcalUrl + '/libmaps/nde')
            .pipe(
                map((config: ConfigurationData) => {
                    return new Configuration(
                        this.createMap(config.locationNames),
                        config.collectionNameMapByLocation,
                        new ButtonConfiguration(
                            config.text,
                            config.textColor,
                            config.backgroundColor,
                            config.hoverColor,
                            config.borderRadius,
                            config.iconIndex,
                            config.isModalWanted
                        ),
                    );
                }),
                shareReplay(),
            );
    }

    public getConfigurationData(): Observable<any> {
        return this.configurationData;
    }

    private createMap(names: string[]): Map<string, boolean> {
        let map = new Map<string, boolean>();

        for (let i = 0; i < names.length; i++) {
            let name = names[i].toLowerCase();
            map.set(name, true);
        }

        return map;
    }
}
