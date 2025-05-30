/**
 * PresetTag automatically generated by SDKgen please do not edit this file manually
 * {@link https://sdkgen.app}
 */

import {TagAbstract, HttpRequest} from "sdkgen-client"
import {ClientException, UnknownStatusCodeException} from "sdkgen-client";

import {Message} from "./Message";
import {MessageException} from "./MessageException";
import {Preset} from "./Preset";
import {PresetCollection} from "./PresetCollection";

export class PresetTag extends TagAbstract {
    /**
     * Returns a preset for a specific app
     *
     * @returns {Promise<Preset>}
     * @throws {MessageException}
     * @throws {ClientException}
     */
    public async get(name: string): Promise<Preset> {
        const url = this.parser.url('/preset/:name', {
            'name': name,
        });

        let request: HttpRequest = {
            url: url,
            method: 'GET',
            headers: {
            },
            params: this.parser.query({
            }, [
            ]),
        };

        const response = await this.httpClient.request(request);
        if (response.ok) {
            return await response.json() as Preset;
        }

        const statusCode = response.status;
        if (statusCode >= 0 && statusCode <= 999) {
            throw new MessageException(await response.json() as Message);
        }

        throw new UnknownStatusCodeException('The server returned an unknown status code: ' + statusCode);
    }
    /**
     * Returns all available presets
     *
     * @returns {Promise<PresetCollection>}
     * @throws {MessageException}
     * @throws {ClientException}
     */
    public async getAll(): Promise<PresetCollection> {
        const url = this.parser.url('/preset', {
        });

        let request: HttpRequest = {
            url: url,
            method: 'GET',
            headers: {
            },
            params: this.parser.query({
            }, [
            ]),
        };

        const response = await this.httpClient.request(request);
        if (response.ok) {
            return await response.json() as PresetCollection;
        }

        const statusCode = response.status;
        if (statusCode >= 0 && statusCode <= 999) {
            throw new MessageException(await response.json() as Message);
        }

        throw new UnknownStatusCodeException('The server returned an unknown status code: ' + statusCode);
    }



}
