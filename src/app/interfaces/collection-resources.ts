import { Collection } from "./collection";
import { ResourceNameAndDescription } from "./resource-name-and-description";

export interface CollectionResources {
    collectionDTO: Collection,
    resourceNameAndDescriptionDTO: ResourceNameAndDescription[]
}
