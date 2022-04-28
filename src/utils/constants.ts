import {makeParams} from "./Utils";

export const WS_URL: string = 'https://ws.infotbm.com/ws/1.0';
export const API_URL: string = 'https://www.infotbm.com/fr/api/json';

export enum AlertsMode {
  'tramway' = '1',
  'bus' = '2',
  'v3' = '3',
  'bat3' = '4',
  'parc_relais' = '5',
  'ter' = '6',
  'autocar' = '7' 
}

export enum AlertsType {
  'alerte_classique' = '1',
  'alerte_a_la_Une' = '2',
  '' = '3', // unknown type
  'Bandeau_evenement_faible_impact' = '4',
}

export type AlertsOrder = 'priority' | 'start_date'

export interface WsEndpointsAlertOptions {
  type: AlertsType[];
  maxResults: string;
  order: AlertsOrder[];
  mode: AlertsMode;
}


export interface WsEndpoints {
  alerts: {
    get: (options?: WsEndpointsAlertOptions) => string;
    byId: (id: string) => string;
    byTransport: (way: string, network: string, id: string) => string;
  },
  network: {
    nearby: {
      linesByGeo: (lat: string, lng: string, limit: string, referer: string) => string;
    };
    lineInformation: (way: string, network: string, id: string) => string;
  };
  getSchedule: (query: string, referer: string) => string;
  getRealtimePass: (id: string, transport: string) => string;
  stopPointsInformations: {
    route: ((way: string, network: string, id: string) => string) | {
      stopPoint: 
    }
  }
}

export const wsEndpoints: WsEndpoints = {
  alerts: {
    get: function(options?: WsEndpointsAlertOptions): string {
      return `/alerts${makeParams(Object.entries(options ?? {}))}`;
    },
    byId: function(id: string): string {
      return (<WsEndpoints><unknown>this).alerts.get() + id;
    },
    byTransport: function(way: string, network: string, id: string): string {
      return (<WsEndpoints><unknown>this).alerts.get() + `/by-transport/${way}:${network}:${id}`;
    }
  },
  network: {
    nearby: {
      linesByGeo: function(lat: string, lng: string, limit: string, referer: string): string {
        return `/${lat};${lng}?limit=${limit}&referer=${referer}`;
      },
    },
    lineInformation: function(way: string, network: string, id: string) {
      return `/${way}:${network}:${id}`;
    }
  },
  getSchedule: function(query: string, referer: string): string {
    return `/getSchedule/${query}?referer=${referer}`;
  },
  getRealtimePass: function(id: string, transport: string): string {
    return `/get-realtime-pass/${id}/${transport}`;
  },
  stopPointsInformations: {
    route: function(way: string, network: string, id: string): string {
      return `/stop-points-informations/${way}:${network}:${id}`;
    }
  }
};

wsEndpoints.stopPointsInformations.route.prototype.stopPoint = function(type: string, network: string, sp: string, id: string, referer: string): string {
    return `/${type}:${network}:${sp}:${id}?referer=${referer}`;
  }
}

export interface ApiEndpoints {
  news: (id: string) => string;
}

export const apiEndpoints: ApiEndpoints = {
  news(id: string): string {
    return `/news/${id}`;
  }
}
