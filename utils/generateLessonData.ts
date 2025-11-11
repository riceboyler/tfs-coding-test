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
    type: 'Lesson',
    length: `${faker.number.int({ max: 59, min: 1 }).toString()}:${faker.number.int({ max: 59, min: 10 }).toString()}`,
    imageSrc: "https://picsum.dev//102/74",
    completed: faker.datatype.boolean(),
    bookmarked: faker.datatype.boolean(),
    progress: faker.number.float({ max: 1, min: 0.01 })
  };
}
