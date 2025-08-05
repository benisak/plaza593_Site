import { Ingredient } from "./Ingredient";
import { PostCategory } from "./PostCategory";

//Here we are defining the Recipe entity to structurize the data we get from Sanity

export interface Recipe {
  _id: string;
  title: string;
  slug: Slug;
  excerpt?: string;
  author?: string;
  mainImage?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  publishedAt?: string;
  categories: PostCategory[];
  ingredients: Ingredient[];
}

export interface Slug {
  slug: {
    current: string;
    _type: string;
  };
}
