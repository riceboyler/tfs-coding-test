import { describe, expect, it } from "vitest";
import generateLessonData from "./generateLessonData";

describe('generateLessonData', () => {
  it('should return as many records as specified', () => {
    let result = generateLessonData(1);
    expect(result.length).toBe(1);

    result = generateLessonData(12);
    expect(result.length).toBe(12);
  });

  it('should return an object with specified fields', () => {
    const result = generateLessonData(1);
    const obj = result[0];
    expect(obj.lesson).toBeTruthy();
    expect(obj.type).toBe('Lesson');
    expect(obj.length).toContain(':');
    expect(obj.imageSrc).toBe('https://picsum.dev//102/74');
    expect(obj.completed).toBeDefined();
    expect(obj.bookmarked).toBeDefined();
    expect(obj.progress).toBeGreaterThan(0.01);
    expect(obj.progress).toBeLessThan(1);
  });
});