import { Collection } from "./collection";
import { Resource } from "./resource";

export interface PostResource {
    resourceDTO: Resource,
    secretToEmbed: string | null,
    collectionDTO: Collection
}
