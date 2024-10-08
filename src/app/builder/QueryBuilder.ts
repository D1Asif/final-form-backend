import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => (
                    {
                        [field]: {
                            $regex: searchTerm,
                            $options: 'i'
                        }
                    }
                ) as FilterQuery<T>)
            });
        }

        return this;
    }

    filter() {
        const categories = (this?.query?.category as string)?.split(",")
        const tags = (this?.query?.tags as string)?.split(",")

        if (categories?.length) {
            this.modelQuery = this.modelQuery.find({category: {$in: categories}} as FilterQuery<T>);
        }

        if (tags?.length) {
            this.modelQuery = this.modelQuery.find({tags: {$all: tags}} as FilterQuery<T>)
        }

        if (this.query?.minPrice) {
            this.modelQuery = this.modelQuery.find({price: {$gte: this.query.minPrice}} as FilterQuery<T>)
        }

        if (this.query?.maxPrice) {
            this.modelQuery = this.modelQuery.find({price: {$lte: this.query.maxPrice}} as FilterQuery<T>)
        }

        return this;
    }

    sort() {
        const sort = (this?.query?.sort as string)?.split(",")?.join(" ") ?? '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);

        return this;
    }

    paginate() {
        const page = Number(this.query?.page) || 1;
        const limit = Number(this.query?.limit) || 10;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);

        return this;
    }

    fields() {
        const fields =(this?.query?.fields as string)?.split(",")?.join(" ") ?? '-__v';

        this.modelQuery = this.modelQuery.select(fields);

        return this;
    }
}

export default QueryBuilder;