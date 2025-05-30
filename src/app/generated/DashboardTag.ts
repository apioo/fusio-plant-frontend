/**
 * DashboardTag automatically generated by SDKgen please do not edit this file manually
 * {@link https://sdkgen.app}
 */

import {TagAbstract, HttpRequest} from "sdkgen-client"
import {ClientException, UnknownStatusCodeException} from "sdkgen-client";

import {DashboardCollection} from "./DashboardCollection";
import {Message} from "./Message";
import {MessageException} from "./MessageException";

export class DashboardTag extends TagAbstract {
    /**
     * Returns all dashboard statistics
     *
     * @returns {Promise<DashboardCollection>}
     * @throws {MessageException}
     * @throws {ClientException}
     */
    public async getAll(): Promise<DashboardCollection> {
        const url = this.parser.url('/dashboard', {
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
            return await response.json() as DashboardCollection;
        }

        const statusCode = response.status;
        if (statusCode >= 0 && statusCode <= 999) {
            throw new MessageException(await response.json() as Message);
        }

        throw new UnknownStatusCodeException('The server returned an unknown status code: ' + statusCode);
    }



}
