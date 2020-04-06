import { SIGN_TYPE } from '../src/prepareTx';
import { Money } from '@acryl/data-entities';
import { BtcAsset, TORCorp, INSTANTCOIN, AcrylAsset, Aracoin, WETH, Voyage, TBTC } from './assets';
import { libs } from '@acryl/acryl-transactions';
import { BigNumber } from '@acryl/bignumber';

const { base58Decode } = libs.crypto;

export const txs = {
    [SIGN_TYPE.ISSUE]: {
        2: {
            name: 'issure',
            data: {
                name: 'JUNKGOLD',
                senderPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                description: 'きらりと光る電子ゴミ。\nSparkling electronic waste.',
                quantity: new BigNumber(5300000000),
                precision: 2,
                reissuable: true,
                script: null,
                fee: Money.fromCoins(100000000, AcrylAsset),
                timestamp: 1558497371511,
                version: 2,
            },
            id: 'AekdhMjRAADxoAgqS1HK9XES49vBPwUwH3S8XPVdvCYX',
            proof: '4kGaEwPzjJF6sECoMJWokDJ6LWFhvaY1TiqGCK48mHp9MRL6x8GMB1vPQNypX3itnMyvrt4wL2Qdxr65C2RJ4jiA'
        }
    },
    [SIGN_TYPE.REISSUE]: {
        2: {
            name: 'reissure',
            data: {
                assetId: 'CUrS6BkWPJVniWE7zh8LyN7PYehMa5WxSKUz3jaGdU2C',
                quantity: new BigNumber('900000000000'),
                reissuable: true,
                senderPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                fee: Money.fromTokens(1, AcrylAsset),
                timestamp: new Date('2019-05-13T15:45:14.160Z'),
                version: 2,
            },
            id: '4Bi6yzTk3ZGZyYSY6u5PGWmGpZaBPfiAZBRJjM4iqZPw',
            proof: '5H563hudCEeTsfJ2eZs8Q5J52YQ5ZjxFFK5bCaMn4pbm5P7Pf467H3g2YRQvi8e8rw9ZWbi74Db9UmNBHzPbvcYk'
        }
    },
    [SIGN_TYPE.BURN]: {
        2: {
            name: 'burn',
            data: {
                senderPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                assetId: 'GouQ4XCiunWv8A8zJ6BCB9yyWHyFHREiqkuNYiATjJeW',
                amount: new BigNumber(1000000000000000000),
                fee: Money.fromCoins(100000, AcrylAsset),
                timestamp: new Date(1558588376106),
                version: 2,
            },
            id: '7DXdsxeKuYjHkWzg6KouMEjWUQ64Bwyq35euQG78C8ee',
            proof: '3Lj7NkZDvDugM2onWJRGDS2f317BcuTWMjpYKuqWhQRbxgronfTLFGjGYjdYzmdUM1m9sxH1vbX1smAkjkm2TZtS',
        }
    },
    [SIGN_TYPE.TRANSFER]: {
        2: {
            name: 'transfer',
            data: {
                amount: Money.fromCoins(150200000, BtcAsset),
                attachment: base58Decode('7KeHm8BxCSPdAQe947Lxff'),
                fee: Money.fromCoins(10000, TORCorp),
                recipient: '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
                sender: '3EPmQxy3YsAUk3RMmWSt3U1bjyGFhm5PW1F',
                senderPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                timestamp: new Date(1553167249572),
                version: 2
            },
            id: 'FPj8HrFnC2baZagH4MdY7SxvQP3K2ydGTftQd3bSvhEE',
            proof: '4uNDmuaD72f3TUkiVtqvkTiFuvKBCpk2xeUcC6HdcrGBLbAd2BK22snWMG8bkAKCRYmFgjtbfTstVLyWoYtr8zHb'
        },
    },
    [SIGN_TYPE.LEASE]: {
        2: {
            name: 'lease',
            data: {
                recipient: '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
                senderPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                amount: Money.fromTokens(3.14220034, AcrylAsset),
                fee: Money.fromTokens(0.001, AcrylAsset),
                timestamp: new Date('2019-05-23T12:36:04.304Z'),
                version: 2,
            },
            id: 'D4yQpWL76MqhL85AbndVKNPiSGN4TU1uxwu8tY1URuUw',
            proof: '3fPMqsWT4MotpNsV6suHpcQfrmtfTqwQfzbybyJmDDF5gNMN4mj6CniQaGoZzvcifSjFJbArMWHSQJVQejQW54ZE'
        },
    },
    [SIGN_TYPE.CANCEL_LEASING]: {
        2: {
            name: 'cancel leasing',
            data: {
                senderPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                leaseId: 'Ag6o9tTqT85AxAwWxzbWR9MEBzxptGjM2h59sGNNPzeT',
                fee: Money.fromTokens(0.001, AcrylAsset),
                timestamp: '2019-05-23T12:28:53.064Z',
                version: 2,
            },
            id: 'EzzCzmt1VD6SVEHjFJ5dJNKGGrmtUY1Yg34jfYVyodps',
            proof: '4EXVsSokNpeXvtasDxK1nsS4ZqAY3wsogVRfGzt5MyoeMUdr5eus9Jbq22KA2w6qYRRPKtK7HeCBogTiGTxdj4Nh',
        }
    },
    [SIGN_TYPE.CREATE_ALIAS]: {
        2: {
            name: 'create alias',
            data: {
                timestamp: new Date('2019-05-22T22:06:36.873Z'),
                version: 2,
                senderPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                alias: 'yes2yunos',
                fee: Money.fromCoins(100000, AcrylAsset),
            },
            id: 'HUCgRD5bR543w9dypWYBj2Z6YW7bjTF4kJjWEYDvgxwM',
            proof: '42AVsPH8eu6TLuVseAj6v52EUXeP82U84vS5zmECiqr4wXLbtpAu2FTpuhJywadLHHMKzoPUb4572MBgUmHNew2c',
        }
    },
    [SIGN_TYPE.MASS_TRANSFER]: {
        1: {
            name: 'mass transfer',
            data: {
                totalAmount: Money.fromCoins(1000, INSTANTCOIN),
                transfers: [
                    {
                        amount: Money.fromCoins(500, INSTANTCOIN),
                        name: '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B'
                    },
                    {
                        amount: Money.fromCoins(500, INSTANTCOIN),
                        name: '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B'
                    }],
                attachment: base58Decode('9phjj2o13msVqLm8PdmcpLzWbRNJi6oKCY4mSuEN5pKKtQtqQc5M6r16txhfyhqFrMG49Kva9LGR1E94zHikcBqEL2La3'),
                fee: Money.fromCoins(200000, AcrylAsset),
                sender: '3EPmQxy3YsAUk3RMmWSt3U1bjyGFhm5PW1F',
                senderPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                timestamp: 1558529580270,
                version: 1,
            },
            id: '3aQ6p6PvTCZbaRXVMiReb5QGN58QiL1RSB86zsAbsgwm',
            proof: 'yiWfBkv6mGrcziRcneTYJhNr6VuzuYiZNb7fbwR6uoSvxg2ENMzwfNhSMHBcTRjr2wx1K1rda6qEEj2qgrwHxei'
        }
    },
    [SIGN_TYPE.DATA]: {
        1: {
            name: 'data',
            data: {
                version: 1,
                timestamp: '2019-05-17T16:02:48.062Z',
                senderPublicKey: '4q1NnuNeQAxsEnukCsAmkgaZR9fx8nLuexSBy8TVXgQr',
                fee: Money.fromTokens(0.001, AcrylAsset),
                data: [
                    {
                        key: '3P6TxorzdA6yEG4orVU3Z7GbSeh4oq7k1Ko',
                        type: 'integer',
                        value: -3
                    }
                ]
            },
            id: 'HVBSz73gT2wemWBNd6rAUZfmvtP1f41PVwuwEUyfgXwV',
            proof: 'XFcT3ptaMDkMFMCDUUT7r7LuyaXi45AwUnTFauYVUzFVw27AT5oEAbYrzMZyGWnUeiav2BHwXctK7yd3SMhLVNP',
        }
    },
    [SIGN_TYPE.EXCHANGE]: {
        0: {
            name: 'exchange',
            data: {
                senderPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                fee: Money.fromCoins(300000, AcrylAsset),
                timestamp: 1512075551784,
                version: 1,
                buyOrder: {
                    version: 1,
                    id: 'HFe1UL2xF9q7T1vcxhSk5h6L53sQcM9eevvjtASe1Szs',
                    sender: '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
                    senderPublicKey: '4MUrTiAwkVhRdkUj2Ya4LZbM7tGgd4sinLsGRZBvBvNa',
                    matcherPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                    orderType: 'buy',
                    amount: Money.fromCoins(1230364480, WETH),
                    price: Money.fromCoins(8971734818, AcrylAsset),
                    timestamp: 1512075437685,
                    expiration: 1512161837685,
                    matcherFee: 300000,
                    signature: '4kh4HmFLCJnJuUfoCFir6G8GSiUcogVpMFEmUjpqutXqhpKFu5ECzxqQ3Kd1TxvtSN5aG35M76nrfvP7bt7UQ1k1',
                    proofs: [
                        '4kh4HmFLCJnJuUfoCFir6G8GSiUcogVpMFEmUjpqutXqhpKFu5ECzxqQ3Kd1TxvtSN5aG35M76nrfvP7bt7UQ1k1'
                    ]
                },
                sellOrder: {
                    version: 1,
                    id: 'EBxTpRwrRPpSgEaH1Lco8B9wZwXYbxUHfggP1tPiSEfW',
                    sender: '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
                    senderPublicKey: '4MUrTiAwkVhRdkUj2Ya4LZbM7tGgd4sinLsGRZBvBvNa',
                    matcherPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                    assetPair: {
                        amountAsset: '474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu',
                        priceAsset: null
                    },
                    orderType: 'sell',
                    amount: Money.fromCoins(49816000, WETH),
                    price: Money.fromCoins(8971734818, AcrylAsset),
                    timestamp: 1512075546319,
                    expiration: 1513803546319,
                    matcherFee: 300000,
                    signature: '2pY4uNy5yHWquYLyBWPCrBiMhNNELAoFTJtWuaXkdb2nMDgDnZUx85ierKAbDtjiE5isv3jTd5udNvm7tfqrDagY',
                    proofs: [
                        '2pY4uNy5yHWquYLyBWPCrBiMhNNELAoFTJtWuaXkdb2nMDgDnZUx85ierKAbDtjiE5isv3jTd5udNvm7tfqrDagY'
                    ]
                },
                amount: 49816000,
                price: 8971734818,
                buyMatcherFee: 12146,
                sellMatcherFee: 300000,
                height: 774422
            },
            id: 'AwCidhjk8xUhh4nAMvYRtfW752GuLKiVPRdY8gFJ3fSt',
            proof: '4y9bgqtpu1NUmKkXnsr8Mk3XYw8ocfsaTqQpmcZEYKYFjDH3GXAviXMmeRxnQqhoTnRtdY4mmT4YbqvmJToAwm3i',
        },
        2: {
            name: 'exchange',
            data: {
                'type': 7,
                'senderPublicKey': 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                'fee': Money.fromCoins(300000, AcrylAsset),
                'timestamp': 1559218968473,
                'version': 2,
                'buyOrder': {
                    'version': 1,
                    'id': 'Du7mcUrKveCyBchxfR8RULZK6Ad21AtfWQcR8uqo3WZq',
                    'sender': '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
                    'senderPublicKey': '4MUrTiAwkVhRdkUj2Ya4LZbM7tGgd4sinLsGRZBvBvNa',
                    'matcherPublicKey': 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                    'orderType': 'buy',
                    'amount': Money.fromCoins(139538564044, Voyage),
                    'price': Money.fromCoins(105, AcrylAsset),
                    'timestamp': 1559218968424,
                    'expiration': 1559219033424,
                    'matcherFee': Money.fromCoins(300000, AcrylAsset),
                    'signature': 'SrzSabfBaGFyw1Ex6S7X4BH6mtujgwVxBMKNwcPb2wsyzTrkAzipybjAZcyoBdkEhBoUooUAUPGmHqFcffcTaVG',
                    'proofs': [
                        'SrzSabfBaGFyw1Ex6S7X4BH6mtujgwVxBMKNwcPb2wsyzTrkAzipybjAZcyoBdkEhBoUooUAUPGmHqFcffcTaVG'
                    ]
                },
                'sellOrder': {
                    'version': 1,
                    'id': '8KyKHCgGPYrwco9QNGaNwCbVZgSBvjz8JNW24VxVr5Vb',
                    'sender': '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
                    'senderPublicKey': '4MUrTiAwkVhRdkUj2Ya4LZbM7tGgd4sinLsGRZBvBvNa',
                    'matcherPublicKey': 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                    'assetPair': {
                        'amountAsset': '9JKjU6U2Ho71U7VWHvr14RB7iLpx2qYBtyUZqLpv6pVB',
                        'priceAsset': null
                    },
                    'orderType': 'sell',
                    'amount': Money.fromCoins(139538564044000, Voyage),
                    'price': Money.fromCoins(105, AcrylAsset),
                    'timestamp': 1559218958940,
                    'expiration': 1559219023940,
                    'matcherFee': Money.fromCoins(300000, AcrylAsset),
                    'signature': '3TSrKc3EnZtnULQKDGBW6fMQqqPFZoRzy4fC7n637dHXhHhs9K61mTwAkmXnq8M5sTV4Y7eG7fq1YFUCJVEWVLjC',
                    'proofs': [
                        '3TSrKc3EnZtnULQKDGBW6fMQqqPFZoRzy4fC7n637dHXhHhs9K61mTwAkmXnq8M5sTV4Y7eG7fq1YFUCJVEWVLjC'
                    ]
                },
                'amount': Money.fromCoins(139538095239, Voyage),
                'price': Money.fromCoins(105, AcrylAsset),
                'buyMatcherFee': Money.fromCoins(299998, Voyage),
                'sellMatcherFee': Money.fromCoins(299, Voyage),
            },
            id: '8XL13dWkbnSVbT4n382Gs2CaPVaiWGzeqrR8rcXHaknh',
            proof: '2kCmLL7SzCzCzECXqNhnAsCm2kbnMWkS1Xe2TaM1n9x5aoozxCniVoNnN93JKURhqnuVbRu2dcUBGHqtGz49tdiQ'
        },
    },
    [SIGN_TYPE.SPONSORSHIP]: {
        1: {
            name: 'sponsorship',
            data: {
                timestamp: '2019-05-23T01:51:16.417Z',
                version: 1,
                fee: Money.fromCoins(100000000, AcrylAsset),
                senderPublicKey: '2Dmh69GXHWkrM1zT5khG3FeRJmQBACBjPU3sdYz3qC5A',
                minSponsoredAssetFee: Money.fromCoins(100000000000, Aracoin)
            },
            id: '2Lvn7WGJdPgGR7Wdd66qyovUTXGGqcPRfkxU2P4msJQB',
            proof: '43L7KoZy3CUj5XunfbNiEqVbYcaeZrsztUa3qDWGUDFjGSTJDkNqhukFaQmcVFdgFKeh6VU1zCaqeYm9Q1kXfcuV',
        },
    },
    [SIGN_TYPE.SET_SCRIPT]: {
        1: {
            name: 'set script',
            data: {
                timestamp: '2019-05-19T16:57:14.262Z',
                version: 1,
                senderPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                script: 'base64:AgQAAAAJaHMxUHVia2V5AQAAACDQVb7HZxGcCjyEGUrIyKkyXvBUTCbTPFHtnRsj8pRfDQQAAAAJaHMyUHVia2V5AQAAACB9+8rXSKq9JZuI77yDN3Gwa1ube2kjCtazzXaevbq1LgQAAAAJaHMxU2lnbmVkAwkAAfQAAAADCAUAAAACdHgAAAAJYm9keUJ5dGVzCQABkQAAAAIIBQAAAAJ0eAAAAAZwcm9vZnMAAAAAAAAAAAAFAAAACWhzMVB1YmtleQAAAAAAAAAAAQAAAAAAAAAAAAQAAAAJaHMyU2lnbmVkAwkAAfQAAAADCAUAAAACdHgAAAAJYm9keUJ5dGVzCQABkQAAAAIIBQAAAAJ0eAAAAAZwcm9vZnMAAAAAAAAAAAEFAAAACWhzMlB1YmtleQAAAAAAAAAAAQAAAAAAAAAAAAkAAGcAAAACCQAAZAAAAAIFAAAACWhzMVNpZ25lZAUAAAAJaHMyU2lnbmVkAAAAAAAAAAACG6WDNQ==',
                fee: Money.fromCoins(1000000, AcrylAsset),
            },
            id: 'BYFojMgDyWp2AadQoaSms53yTZMDmskwmHdktKncAekw',
            proof: 'xqFWwEmzpG6xfbuRC9fgTYFYUabjgnFayWaurDnvQEYFjMJUwLZyj2a6kXdqX7gM7xUoYESaKpAJnEuyRZTT9HW',
        }
    },
    [SIGN_TYPE.SET_ASSET_SCRIPT]: {
        1: {
            name: 'set asset script',
            data: {
                senderPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                fee: Money.fromCoins(100000000, AcrylAsset),
                timestamp: 1555958479625,
                version: 1,
                assetId: 'HFW1aho3BGGZd4yFUmANaj38PjCYh2J2xm1WzKy4Td6G',
                script: 'base64:AgQAAAAHV0FWRVNJZAEAAAAEE6vZMwQAAAAGaXNzdWVyCQEAAAAHQWRkcmVzcwAAAAEBAAAACjBzQOgYK1aOY+IEAAAAB2Fzc2V0SWQBAAAACJ+kNIQu6TK4BAAAAAckbWF0Y2gwBQAAAAJ0eAMJAAABAAAAAgUAAAAHJG1hdGNoMAIAAAATRXhjaGFuZ2VUcmFuc2FjdGlvbgQAAAABdAUAAAAHJG1hdGNoMAMJAAAAAAAAAggICAUAAAABdAAAAAlzZWxsT3JkZXIAAAAJYXNzZXRQYWlyAAAACnByaWNlQXNzZXQFAAAAB1dBVkVTSWQGCQAAAAAAAAIICAgFAAAAAXQAAAAJc2VsbE9yZGVyAAAACWFzc2V0UGFpcgAAAAthbW91bnRBc3NldAUAAAAHV0FWRVNJZAaA4Tys',
            },
            id: 'BA7R2a5HqxgLma3AZ93PzBoWyeUNtEtqnFVi83CqbYtE',
            proof: '4APSBzftRrpasD2jwh5yB11xR98Hz1T5pMEQJgHom5cfsfdXBxgsccAXYRWJseVanM3vkcDfE6AB54wQRiR6CS8a',
        }
    },
    [SIGN_TYPE.SCRIPT_INVOCATION]: {
        1: {
            network: 'A',
            name: 'script invocation',
            data: {
                'senderPublicKey': 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                'call': {
                    'function': 'bet',
                    'args': [
                        {
                            'type': 'string',
                            'value': '6cPwB9AzRg3D3uTSVSfn1Pvhb5Y5Amxpv7akaCUWRbrv2REP1'
                        },
                        {
                            'type': 'string',
                            'value': '36'
                        }
                    ]
                },
                'dApp': '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
                'feeAssetId': null,
                'fee': Money.fromCoins(500000, AcrylAsset),
                'payment': [Money.fromCoins('1400500000', AcrylAsset)
                ],
                'id': 'CJUR4gGrYUz7hbfaxDLGpb8SRtJ1cuUrG5TRHJNMx585',
                'type': 16,
                'version': 1,
                'timestamp': 1559291920421
            },
            id: 'CJUR4gGrYUz7hbfaxDLGpb8SRtJ1cuUrG5TRHJNMx585',
            proof: '5Hxyuv3fSP5J3erjyVvR4xw4tjXCczZGEuHys65Fdcj5x3QUVYqs9nkCrfNxKKEejZUuJCEqh4cZvTRuAZUMsJWa'
        }
    },
    
    //////////////NOT TX////////////////
    [SIGN_TYPE.AUTH]: {
        1: {
            name: 'auth request',
            data: {
                host: 'chrome-ext.wvservices.com',
                name: 'test app',
                data: 'test random data',
                senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr'
            },
            id: 'G6VKU9BqJmrp1gjyPf618WTZeMg8PYQBkTCtqx9gbC8g',
            proof: '3ijDFHgMbdBgXkxddV8VMv5ocuKvgWvH4QM65h6E93ixDJiUGVCQnzVcKqBVmV4n6BkVT828C28bCp8hVo38ySxP'
        }
    },
    
    [SIGN_TYPE.COINOMAT_CONFIRMATION]: {
        1: {
            name: 'coinomat confirmation request',
            data: {
                timestamp: 1559227375,
                senderPublicKey: 'AHLRHBJYtxwqjCcBYnFWeDco8hGJicWYrFd5yM5bWmNh'
            },
            id: 'FypP87BPZMygFU4bgrryLCtRCVu28mFGg2V1voKGP1PS',
            proof: '5PzPWJZ5qiFfvkRRn2ois2C9iE5fBB6hogSxkGZB8WBt7urrDRRvNX6xxD6FuNd7S1qHeJdtpUQD8ENBzcQmiVkR'
        }
    },
    
    [SIGN_TYPE.MATCHER_ORDERS]: {
        1: {
            name: 'matcher orders request',
            data: {
                timestamp: 1560812209521,
                senderPublicKey: 'AHLRHBJYtxwqjCcBYnFWeDco8hGJicWYrFd5yM5bWmNh'
            },
            id: '7Ehybg7fHc613Dar7v2KpUP5Vz2fgsDKc5pJwfUhp3Lg',
            proof: '5zWuPQNs8QD7uGWiNLCLjHgFVYwzbyUXTb8bPaQgirfV6AEmdhVUqgmcbSgxJn2YgL3yuQjAZ9TuQrSsb16w9GMc'
        }
    },
    
    [SIGN_TYPE.CANCEL_ORDER]: {
        0: {
            name: 'cancel order',
            data: {
                id: "GwaYg9pVvFonAXM2afaojQuDJyssJVEJPUjnY1bqhvfs",
                senderPublicKey: "2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr",
            },
            proof: "5UQa5pdm3dysTDc8iPXKcM5DxE2rfyWs759xNUCffLJTeCh3Q89exkonWWWzE2rjVnp3deVq78X5XAvCJGA8F6NJ",
            id: 'EipnRjs8AeYYRKGRPUTy2rxMVaBjt1atJjFDD6vFqtN7'
        },
        1: {
            name: 'cancel order request',
            data: {
                id: '2LRmS354UfyAgSf1Z6gataNmFRYZXjVeGeg8mEgvUt29',
                senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr'
                
            },
            id: '6o4iPH2dTgZzajmtg4vzYuUBV8nocKsh1mB8Nb7YrFNw',
            proof: 'CuvYBVak3JPHsQaAKvijDr1g5WkEpbvP3uoXbQxZXbbAs4Q3BrvqtTsE46bceRmaSUmyXw2DNRWkbwfGZFkMkbv'
        }
    },
    
    [SIGN_TYPE.CREATE_ORDER]: {
        1: {
            data: {
                senderPublicKey: 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                orderType: 'sell',
                price: Money.fromTokens('0.00030665', BtcAsset),
                amount: Money.fromTokens('0.05186534', AcrylAsset),
                matcherFee: Money.fromTokens('0.00300000', AcrylAsset),
                matcherPublicKey: '7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy',
                expiration: 1561795622165,
                version: 1,
                timestamp: 1559290022165
            },
            id: 'RJxtx6GZc7Smf5Mb12nyMoizb79GuzRZvuKHSiuEne8',
            proof: '5d8WKWYhjwz3iQSHnVi5HBvPfzdG2reZ6Vwe23wgwN94dYizA5EiDStrBhHSAD9knjt3Z6PkfM65P6YVCe7h2vua'
        },
        2: {
            data: {
                'version': 2,
                'senderPublicKey': 'EcLWiQ3yH9kREogVVKff1XApYDxaYBinAYcPigW7TMo6',
                'matcherPublicKey': 'E3UwaHCQCySghK3zwNB8EDHoc3b8uhzGPFz3gHmWon4W',
                'orderType': 'buy',
                'amount': Money.fromCoins(71841490, AcrylAsset),
                'price': Money.fromCoins(30800, TBTC),
                'timestamp': 1559291009514,
                'expiration': 1561796609514,
                'matcherFee': Money.fromCoins(700000, AcrylAsset),
            },
            id: '29oB5JeNZQFq3E21URYSj9a6z5XphSMWMgKD5V57TKSU',
            proof: 'AAFJfndARTUjM3EZpom1DthE8dHtHnEhds517ew57qJd8q3d4yeVCF2CUJ1cvnREeRaTjiaarrowsos1eUT3aHr'
        }
    },
};
