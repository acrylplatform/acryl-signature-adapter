import { AcrylKeeperAdapter } from '../src/adapters/AcrylKeeperAdapter';
import { Asset, Money } from '@acryl/data-entities';
import { TRANSACTION_TYPE_NUMBER } from '../src/prepareTx';
import { BigNumber } from '@acryl/bignumber';

const testAsset = new Asset({
    precision: 5,
    id: '68X83bfvSSQauL81fcfqA3Vne9s4y2BRAG36DGRcv4V2',
    quantity: new BigNumber(10000),
    description: 'Some text',
    height: 100,
    name: 'Test',
    reissuable: false,
    sender: '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
    timestamp: new Date(),
    ticker: undefined
});

const keeperMock = {
    //@ts-ignore
    auth: async (data) => ({
        'data': 'test',
        'prefix': 'WavesWalletAuthentication',
        'host': 'www.yandex.ru',
        'name': 'test',
        'address': '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
        'publicKey': '4MUrTiAwkVhRdkUj2Ya4LZbM7tGgd4sinLsGRZBvBvNa',
        'signature': '3xvbSznhRTgDP5vMSoPpqwVf29hSdDQLFpdbtVaMHCyzuFFEgSodB7MXZTescxcYiVtR9wCgTGmZPWTApMVMg6qP'
    }),
    //@ts-ignore
    signTransaction: async data => {
        switch (data.type) {
            case TRANSACTION_TYPE_NUMBER.SPONSORSHIP:
            case TRANSACTION_TYPE_NUMBER.BURN:
            case TRANSACTION_TYPE_NUMBER.CANCEL_LEASING:
            case TRANSACTION_TYPE_NUMBER.CREATE_ALIAS:
            case TRANSACTION_TYPE_NUMBER.DATA:
            case TRANSACTION_TYPE_NUMBER.EXCHANGE:
            case TRANSACTION_TYPE_NUMBER.ISSUE:
            case TRANSACTION_TYPE_NUMBER.LEASE:
            case TRANSACTION_TYPE_NUMBER.MASS_TRANSFER:
            case TRANSACTION_TYPE_NUMBER.TRANSFER:
            case TRANSACTION_TYPE_NUMBER.REISSUE:
            case TRANSACTION_TYPE_NUMBER.SET_SCRIPT:
                break;
            default:
                throw new Error('invalid transaction');
        }
        return JSON.stringify({ proofs: ['test', 'realProof'] });
    },
    //@ts-ignore
    signOrder: async data => {
    },
    //@ts-ignore
    signCancelOrder: async data => {
    },
    //@ts-ignore
    signRequest: async data => {
    },
    publicState: async () => ({
        locked: false,
        account: {
            address: '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
            publicKey: '4MUrTiAwkVhRdkUj2Ya4LZbM7tGgd4sinLsGRZBvBvNa'
        }
    }),
    //@ts-ignore
    on: (key: string, cb) => {
    },
    initialPromise: Promise.reject(),
};

keeperMock.initialPromise = Promise.resolve(keeperMock) as any;

AcrylKeeperAdapter.initOptions({ networkCode: 'A'.charCodeAt(0), extension: keeperMock });


describe('AcrylKeeper adapter test', () => {

    it('Test connect to extension', async () => {
        try {
            const users = await AcrylKeeperAdapter.getUserList();
            const adapter = new AcrylKeeperAdapter(users[0]);
            await adapter.isAvailable();
        } catch (e) {
            console.error(e);
            expect('Fail create adapter').toBe('Done');
        }
    });

    it('Test connect to extension by cb', async () => {
        let mock: any = null;
        AcrylKeeperAdapter.setApiExtension(() => mock);

        try {
            const users = await AcrylKeeperAdapter.getUserList();
            const adapter = new AcrylKeeperAdapter(users[0]);
            await adapter.isAvailable();
            expect('Fail init Adapter').toBe('Done');
        } catch (e) {
            mock = keeperMock;
        }

        try {
            const users = await AcrylKeeperAdapter.getUserList();
            const adapter = new AcrylKeeperAdapter(users[0]);
            await adapter.isAvailable();

        } catch (e) {
            expect('Fail create adapter').toBe('Done');
        }
    });

    it('Test sign transfer', async () => {

        const data = {
            type: 4,
            data: {
                fee: new Money(0.1, testAsset),
                amount: new Money(1, testAsset),
                recipient: 'test',
                attachment: ''
            }
        };

        try {
            AcrylKeeperAdapter.setApiExtension(keeperMock);
            const users = await AcrylKeeperAdapter.getUserList();
            const adapter = new AcrylKeeperAdapter(users[0]);
            const signable = adapter.makeSignable(data as any);
            const result = await signable.getDataForApi() as any;
            expect(result.proofs[0]).toBe('realProof');
        } catch (e) {
            expect(e).toBe('Done');
        }
    });
    
    it('Test convert UInt8Array transfer', async () => {
        
        const data = {
            type: 4,
            data: {
                fee: new Money(0.1, testAsset),
                amount: new Money(1, testAsset),
                recipient: 'test',
                attachment: new Uint8Array([1,2,3,4])
            }
        };
        
        try {
            AcrylKeeperAdapter.setApiExtension(keeperMock);
            const users = await AcrylKeeperAdapter.getUserList();
            const adapter = new AcrylKeeperAdapter(users[0]);
            const signable = adapter.makeSignable(data as any);
            const result = await signable.getDataForApi() as any;
            expect(result.proofs[0]).toBe('realProof');
        } catch (e) {
            expect(e).toBe('Done');
        }
    });
});
