import { SeedAdapter } from './adapters/SeedAdapter';
import { LedgerAdapter } from './adapters/LedgerAdapter';
import { AcrylKeeperAdapter } from './adapters';
import {PrivateKeyAdapter} from "./adapters/PrivateKeyAdapter";

export const enum AdapterType {
    Seed = 'seed',
    PrivateKey = 'privateKey',
    AcrylKeeper = 'acrylKeeper',
    Ledger = 'ledger',
    Tresor = 'tresor'
}

export const adapterPriorityList = [
    AdapterType.AcrylKeeper,
    AdapterType.Ledger,
    AdapterType.Tresor,
    AdapterType.Seed,
    AdapterType.PrivateKey
];

export const adapterList = [
    SeedAdapter,
    LedgerAdapter,
    AcrylKeeperAdapter,
    PrivateKeyAdapter
];
