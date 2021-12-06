/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { COMMIT, COUNTRY, CURRENCY, INTENT, VAULT, type LocaleType, type FundingEligibilityType } from '@paypal/sdk-constants/src';

import { getPersonalization, LocationType } from './graphql';

type Tracking = {|
    click : string,
    impression : string
|};

type Treatment = {|
    name : string,
    action : {|
        html : {|
            markup : string,
            selector : string,
            location : $Values<typeof LocationType>
        |},
        css : string,
        js : string
    |}
|};

export type Experiment = {|
    id : string,
    name : string,
    tracking : Tracking,
    treatment : Treatment
|};

export type MLContext = {|
    userAgent? : string,
    buyerCountry : $Values<typeof COUNTRY>,
    merchantCountry? : $Values<typeof COUNTRY>,
    locale : LocaleType,
    clientId : string,
    buyerIp? : string,
    currency? : $Values<typeof CURRENCY>,
    cookies? : string
|};

export type Extra = {|
    intent? : $Values<typeof INTENT>,
    commit? : $Values<typeof COMMIT>,
    vault? : $Values<typeof VAULT>,
    merchantID? : $ReadOnlyArray<string>,
    buttonSessionID : string,
    label? : string,
    period? : string,
    taglineEnabled : boolean,
    renderedButtons? : $ReadOnlyArray<string>,
    layout? : string,
    buttonSize? : string
|};

export function fetchPersonalization({ mlContext, eligibility, extra } : {| mlContext : MLContext, eligibility : FundingEligibilityType, extra : Extra |}) : ?ZalgoPromise<$ReadOnlyArray<Experiment>> {
    return getPersonalization({ mlContext, eligibility, extra });
}
