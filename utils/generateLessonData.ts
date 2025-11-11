import { faker } from "@faker-js/faker";

export default (count: number) => {
  const collection = [];

  for (let i = 0; i < count; i++) {
    collection.push(getFakeObject());
  }

  return collection;
};

function getFakeObject() {
  return {
    lesson: `${faker.commerce.productName()} - ${faker.commerce.productDescription()}`,
    length: `${faker.string.numeric(2)}:${faker.string.numeric(2)}`,
    imageSrc: "https://picsum.dev//102/74",
  };
}
