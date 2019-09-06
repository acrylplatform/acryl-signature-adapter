import { Adapter } from './Adapter';
import { AdapterType } from '../config';
import { SIGN_TYPE, TSignData } from '../prepareTx';
import { isValidAddress } from '../prepareTx/fieldValidator';

const DEFAULT_TX_VERSIONS = {
    [SIGN_TYPE.AUTH]: [1],
    [SIGN_TYPE.MATCHER_ORDERS]: [1],
    [SIGN_TYPE.CREATE_ORDER]: [1, 2, 3],
    [SIGN_TYPE.CANCEL_ORDER]: [1],
    [SIGN_TYPE.COINOMAT_CONFIRMATION]: [1],
    [SIGN_TYPE.ISSUE]: [2],
    [SIGN_TYPE.TRANSFER]: [2],
    [SIGN_TYPE.REISSUE]: [2],
    [SIGN_TYPE.BURN]: [2],
    [SIGN_TYPE.EXCHANGE]: [],
    [SIGN_TYPE.LEASE]: [2],
    [SIGN_TYPE.CANCEL_LEASING]: [2],
    [SIGN_TYPE.CREATE_ALIAS]: [2],
    [SIGN_TYPE.MASS_TRANSFER]: [1],
    [SIGN_TYPE.DATA]: [1],
    [SIGN_TYPE.SET_SCRIPT]: [1],
    [SIGN_TYPE.SPONSORSHIP]: [1],
    [SIGN_TYPE.SET_ASSET_SCRIPT]: [1],
    [SIGN_TYPE.SCRIPT_INVOCATION]: [1]
};

export class AcrylKeeperAdapter extends Adapter {

    public static type = AdapterType.AcrylKeeper;
    public static adapter: AcrylKeeperAdapter;
    private static _onUpdateCb: Array<(...args: Array<any>) => any> = [];
    private _onDestoryCb = [];
    private _needDestroy = false;
    private _address: string;
    private _pKey: string;
    private static _txVersion: typeof DEFAULT_TX_VERSIONS = DEFAULT_TX_VERSIONS;
    private static _getApiCb: () => IAcrylKeeper;

    private static _api: IAcrylKeeper;

    private handleUpdate = (state: any) => {
        if (!state.locked && (!state.account || state.account.address !== this._address)) {
            this._needDestroy = true;
            this._isDestroyed = true;
            //@ts-ignore
            this._onDestoryCb.forEach(cb => cb());
            this._onDestoryCb = [];
            AcrylKeeperAdapter.offUpdate(this.handleUpdate);
        }
    };

    constructor({ address, publicKey }: any, networkCode?: number|string) {
        super(networkCode);
        this._address = address;
        this._pKey = publicKey;
        AcrylKeeperAdapter._initExtension();
        //@ts-ignore
        AcrylKeeperAdapter.onUpdate(this.handleUpdate);
        this._isDestroyed = false;
    }

    public async isAvailable(ignoreLocked = false): Promise<void> {
        try {
            await AcrylKeeperAdapter.isAvailable(this.getNetworkByte());
            const data = await AcrylKeeperAdapter._api.publicState();
            AcrylKeeperAdapter._updateState(data);

            if (data.locked) {
                return ignoreLocked ? Promise.resolve() : Promise.reject({ code: 4, msg: 'Keeper is locked' });
            }

            if (data.account && data.account.address === this._address) {
                return Promise.resolve();
            }
        } catch (e) {
        }

        return Promise.reject({ code: 5, msg: 'Keeper has another active account' });
    }

    public async isLocked() {
        await AcrylKeeperAdapter.isAvailable();
        const data = await AcrylKeeperAdapter._api.publicState();

        AcrylKeeperAdapter._updateState(data);

        if (data.locked) {
            return Promise.resolve();
        }
    }

    public getSignVersions(): Record<SIGN_TYPE, Array<number>> {
        return AcrylKeeperAdapter._txVersion;
    }

    //@ts-ignore
    public onDestroy(cb) {
        if (this._needDestroy) {
            return cb();
        }

        //@ts-ignore
        this._onDestoryCb.push(cb);
    }

    public getPublicKey() {
        return Promise.resolve(this._pKey);
    }

    public getAddress() {
        return Promise.resolve(this._address);
    }

    public getSeed() {
        return Promise.reject(Error('Method "getSeed" is not available!'));
    }

    //@ts-ignore
    public async signRequest(bytes: Uint8Array, _?, signData?): Promise<string> {
        await this.isAvailable(true);
        return await AcrylKeeperAdapter._api.signRequest(AcrylKeeperAdapter._serializedData(signData));
    }

    //@ts-ignore
    public async signTransaction(bytes: Uint8Array, amountPrecision: number, signData): Promise<string> {
        await this.isAvailable(true);
        const dataStr = await AcrylKeeperAdapter._api.signTransaction(AcrylKeeperAdapter._serializedData(signData));
        const { proofs, signature } = JSON.parse(dataStr);
        return signature || proofs.pop();
    }

    //@ts-ignore
    public async signOrder(bytes: Uint8Array, amountPrecision: number, signData): Promise<string> {
        await this.isAvailable(true);
        let promise;
        switch (signData.type) {
            case SIGN_TYPE.CREATE_ORDER:
                promise = AcrylKeeperAdapter._api.signOrder(AcrylKeeperAdapter._serializedData(signData));
                break;
            case SIGN_TYPE.CANCEL_ORDER:
                promise = AcrylKeeperAdapter._api.signCancelOrder(AcrylKeeperAdapter._serializedData(signData));
                break;
            default:
                return AcrylKeeperAdapter._api.signRequest(AcrylKeeperAdapter._serializedData(signData));
        }

        const dataStr = await promise;
        const { proofs, signature } = JSON.parse(dataStr);
        return signature || proofs.pop();
    }

    public async signData(bytes: Uint8Array): Promise<string> {
        await this.isAvailable(true);
        return Promise.resolve(''); //TODO
    }

    public getPrivateKey() {
        return Promise.reject('No private key');
    }

    public static async isAvailable(networkCode?: number) {
        await AcrylKeeperAdapter._initExtension();

        if (!this._api) {
            throw { code: 0, message: 'Install AcrylKeeper' };
        }

        if (!(networkCode || Adapter._code)) {
            throw { code: 5, message: 'Set adapter network code' };
        }

        let error, data;
        try {
            data = await this._api.publicState();
            AcrylKeeperAdapter._updateState(data);

            if (data.txVersion) {
                AcrylKeeperAdapter._txVersion = data.txVersion;
            }
        } catch (e) {
            error = { code: 1, message: 'No permissions' };
        }

        if (!error && data) {
            if (!data.account) {
                error = { code: 2, message: 'No accounts in acrylkeeper' };
            } else if ((!data.account.address || !isValidAddress(data.account.address, networkCode || Adapter._code))) {
                error = { code: 3, message: 'Selected network incorrect' };
            }
        }

        if (error) {
            throw error;
        }

        return true;
    }

    public static async getUserList() {
        await AcrylKeeperAdapter.isAvailable();
        return AcrylKeeperAdapter._api.publicState().then((data) => {
            AcrylKeeperAdapter._updateState(data);
            return [data.account];
        });
    }

    //@ts-ignore
    public static initOptions(options) {
        Adapter.initOptions(options);
        this.setApiExtension(options.extension);
        this._initExtension();
        try {
            this._api.publicState().then(AcrylKeeperAdapter._updateState);
        } catch (e) {

        }
    }

    //@ts-ignore
    public static setApiExtension(extension) {

        let extensionCb;

        if (typeof extension === 'function') {
            extensionCb = extension;
        } else if (extension) {
            extensionCb = () => extension;
        }

        AcrylKeeperAdapter._getApiCb = extensionCb;
    }

    public static onUpdate(cb: any) {
        AcrylKeeperAdapter._onUpdateCb.push(cb);
    }

    public static offUpdate(func: any) {
        AcrylKeeperAdapter._onUpdateCb = AcrylKeeperAdapter._onUpdateCb.filter(f => f !== func)
    }

    private static _updateState(state: any) {
        for (const cb of AcrylKeeperAdapter._onUpdateCb) {
            cb(state);
        }
    }

    private static _initExtension() {
        if (AcrylKeeperAdapter._api || !AcrylKeeperAdapter._getApiCb) {
            return AcrylKeeperAdapter._api.initialPromise;
        }

        const acrylApi = AcrylKeeperAdapter._getApiCb();
        if (acrylApi) {
           return acrylApi.initialPromise.then((api: IAcrylKeeper) => {
                this._api = api;
                this._api.on('update', AcrylKeeperAdapter._updateState);
                this._api.publicState().then(state => {

                    if (state.txVersion) {
                        AcrylKeeperAdapter._txVersion = state.txVersion;
                    }

                    AcrylKeeperAdapter._updateState(state);
                })
            });
        }
    }

    private static _serializedData(data: any) {
        return JSON.parse(
            JSON.stringify(data, (key, value) => value instanceof Uint8Array ? Array.from(value) : value)
        );
    }


}


interface IAcrylKeeper {
    getSignVersions?: () => Record<SIGN_TYPE, Array<number>>;
    auth: (data: IAuth) => Promise<IAuthData>;
    signTransaction: (data: TSignData) => Promise<any>;
    signOrder: (data: any) => Promise<any>;
    signCancelOrder: (data: any) => Promise<any>;
    signRequest: (data: any) => Promise<string>;
    signBytes: (data: any) => Promise<string>;
    publicState: () => Promise<any>;
    on: (name: string, cb: any) => Promise<any>;
    initialPromise: Promise<IAcrylKeeper>;
}

interface IAuth {
    data: string;
    name: string;
    icon?: string;
    successPath?: string;
}

interface IAuthData {
    address: string;
    data: string;
    host: string;
    prefix: string;
    publicKey: string;
    signature: string;
}
