import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "https://8803-yurihartman-carlifescic-h0ybo7rj46s.ws-us78.gitpod.io";
const httpClient = fetchUtils.fetchJson;

export const dataProvider = {
    getList: (resource: any, params: any) => {
        // const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        // const query = {
        //     sort: JSON.stringify([field, order]),
        //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        //     filter: JSON.stringify(params.filter),
        // };
        const url = `${apiUrl}/invoke/car-lifes-cicle-channel/alo`;
        let body = {
            method: "AssetTransferContract:GetAllAssets",
            args: []
        };
        console.log("getList", body)
        let data_response: any = []
        // httpClient(url,
        //     {
        //         method: 'POST',
        //         body: JSON.stringify(body),
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem("token")}`
        //         }
        //     }).then(({ headers, json }) => (
        //         data = json.response
        //     ));
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => response.json())
            .then(data => data_response = data)

        console.log(data_response)
        return Promise.resolve({ data: [], total: 0 })
    },

    getOne: (resource: any, params: { id: any; }) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource: any, params: { ids: any; }) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource: any, params: { pagination: { page: any; perPage: any; }; sort: { field: any; order: any; }; filter: any; target: any; id: any; }) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: 0,
        }));
    },

    update: (resource: any, params: { id: any; data: any; }) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource: any, params: { ids: any; data: any; }) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource: any, params: { data: any; }) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource: any, params: { id: any; }) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource: any, params: { ids: any; }) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    }
};