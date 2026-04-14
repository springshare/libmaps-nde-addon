// Define the map
import {LibmapsComponent} from "../libmaps/libmaps.component";
import {LibmapsLocationComponent} from "../libmaps/libmaps-location.component";

export const selectorComponentMap = new Map<string, any>([
    ['nde-online-availability-after', LibmapsComponent],
    ['nde-physical-availability-line-after', LibmapsComponent],
    ['nde-location-bottom', LibmapsLocationComponent],
]);
