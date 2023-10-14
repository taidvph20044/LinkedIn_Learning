import { IProduct } from '@/interfaces/product';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryApi = createApi({
    reducerPath: "Categories",
    tagTypes: ['Categories'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getCategorys: builder.query<any[], void>({
            query: () => `/Categories`,
            providesTags: ['Categories'],
            transformResponse: (response: any) => {
                console.log(response);

                return response.map((item: any) => ({
                    ...item,
                    id: item.id
                }));
            },
        }),

        getProductById: builder.query<IProduct, number | string>({
            query: (id) => `/Categories/${id}`,
            providesTags: ['Categories'],
            transformResponse: (response: any) => ({
                ...response.data.attributes,
                id: response.data.id
            }),
        }),

        removeCategory: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/Categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories'],
        }),

        addCategory: builder.mutation<IProduct, Partial<IProduct>>({
            query: (Courses) => ({
                url: '/Categories',
                method: 'POST',
                body: Courses
            }),
            invalidatesTags: ['Categories'],
        }),

        updateProduct: builder.mutation<IProduct, Partial<IProduct>>({
            query: (product) => ({
                url: `/Categories/${product.id}`,
                method: 'PUT',
                body: {
                    data: product // Đảm bảo gửi dữ liệu trong đối tượng "data"
                },
            }),
            invalidatesTags: ['Categories'],
        }),
    })
});

export const {
    useGetCategorysQuery,
    useAddCategoryMutation,
    useGetProductByIdQuery,
    useRemoveCategoryMutation,
    useUpdateProductMutation,
} = categoryApi;

export const categoryReducer = categoryApi.reducer;
export default categoryApi;
