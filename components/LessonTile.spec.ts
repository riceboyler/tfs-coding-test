import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LessonTile from './LessonTile.vue';

type LessonData = {
  lesson: string;
  type: string;
  length: string;
  imageSrc: string;
  completed: boolean;
  bookmarked: boolean;
  progress: number;
};

const TEST_LESSONS: Record<string, LessonData> = {
  notStarted: {
    lesson: 'Introduction to Vue',
    type: 'Video',
    length: '10 min',
    imageSrc: '/images/lesson1.jpg',
    completed: false,
    bookmarked: false,
    progress: 0
  },
  inProgress: {
    lesson: 'Advanced Components',
    type: 'Interactive',
    length: '25 min',
    imageSrc: '/images/lesson2.jpg',
    completed: false,
    bookmarked: true,
    progress: 0.5
  },
  completed: {
    lesson: 'Testing with Vitest',
    type: 'Tutorial',
    length: '15 min',
    imageSrc: '/images/lesson3.jpg',
    completed: true,
    bookmarked: true,
    progress: 1.0
  },
  longTitle: {
    lesson: 'This is a very long lesson title that might wrap to multiple lines',
    type: 'Video',
    length: '30 min',
    imageSrc: '/images/lesson4.jpg',
    completed: false,
    bookmarked: false,
    progress: 0.25
  }
} as const;

describe('LessonTile.vue', () => {
  describe('Component Structure', () => {
    it('should render tile container', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const tile = wrapper.find('.tile');
      expect(tile.exists()).toBe(true);
    });

    it('should have tile-top section', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const tileTop = wrapper.find('.tile-top');
      expect(tileTop.exists()).toBe(true);
    });

    it('should have tile-bottom section', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const tileBottom = wrapper.find('.tile-bottom');
      expect(tileBottom.exists()).toBe(true);
    });

    it('should have image wrapper', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const imgWrapper = wrapper.find('.img-wrapper');
      expect(imgWrapper.exists()).toBe(true);
    });

    it('should have tile-right section', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const tileRight = wrapper.find('.tile-right');
      expect(tileRight.exists()).toBe(true);
    });
  });

  describe('Lesson Data Display', () => {
    it('should display lesson title', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const lessonTitle = wrapper.find('.lesson-title');
      expect(lessonTitle.text()).toBe(TEST_LESSONS.notStarted.lesson);
    });

    it('should display lesson type', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const lessonType = wrapper.find('.lesson-type');
      expect(lessonType.text()).toBe(TEST_LESSONS.notStarted.type);
    });

    it('should display lesson length', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const lessonLength = wrapper.find('.lesson-length');
      expect(lessonLength.text()).toBe(TEST_LESSONS.notStarted.length);
    });

    it('should handle long lesson titles', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.longTitle
        }
      });

      const lessonTitle = wrapper.find('.lesson-title');
      expect(lessonTitle.text()).toBe(TEST_LESSONS.longTitle.lesson);
    });
  });

  describe('Image Display', () => {
    it('should render NuxtImg component', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const img = wrapper.find('img');
      expect(img.exists()).toBe(true);
    });

    it('should set image src from item', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const img = wrapper.find('img');
      expect(img.attributes('src')).toBe(TEST_LESSONS.notStarted.imageSrc);
    });

    it('should have tile-image class', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const img = wrapper.find('img');
      expect(img.classes()).toContain('tile-image');
    });

    it('should update image when item changes', async () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      await wrapper.setProps({ item: TEST_LESSONS.inProgress });

      const img = wrapper.find('img');
      expect(img.attributes('src')).toBe(TEST_LESSONS.inProgress.imageSrc);
    });
  });

  describe('Icons Display', () => {
    it('should have lesson-icons container', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const lessonIcons = wrapper.find('.lesson-icons');
      expect(lessonIcons.exists()).toBe(true);
    });

    it('should render two icons', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const icons = wrapper.findAll('.icon');
      expect(icons.length).toBe(2);
    });

    it('should show outline bookmark icon when not completed', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const icons = wrapper.findAll('.icon');
      expect(icons[0].attributes('data-icon')).toBe('mdi:bookmark-outline');
    });

    it('should show filled bookmark icon when completed', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.completed
        }
      });

      const icons = wrapper.findAll('.icon');
      expect(icons[0].attributes('data-icon')).toBe('mdi:bookmark');
    });

    it('should show outline check icon when not bookmarked', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const icons = wrapper.findAll('.icon');
      expect(icons[1].attributes('data-icon')).toBe('material-symbols:check-circle-outline-rounded');
    });

    it('should show filled check icon when bookmarked', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.inProgress
        }
      });

      const icons = wrapper.findAll('.icon');
      expect(icons[1].attributes('data-icon')).toBe('material-symbols:check-circle-rounded');
    });

    it('should have size 24px for icons', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const icons = wrapper.findAll('.icon');
      icons.forEach(icon => {
        expect(icon.attributes('data-size')).toBe('24px');
      });
    });
  });

  describe('Progress Bar', () => {
    it('should render progress bar', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const progressBar = wrapper.find('.progress-bar');
      expect(progressBar.exists()).toBe(true);
    });

    it('should render progress indicator', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const progress = wrapper.find('.progress');
      expect(progress.exists()).toBe(true);
    });

    it('should set progress width to 0% when not started', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const progress = wrapper.find('.progress');
      expect(progress.attributes('style')).toContain('width: 0%');
    });

    it('should set progress width to 50% when halfway', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.inProgress
        }
      });

      const progress = wrapper.find('.progress');
      expect(progress.attributes('style')).toContain('width: 50%');
    });

    it('should set progress width to 100% when completed', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.completed
        }
      });

      const progress = wrapper.find('.progress');
      expect(progress.attributes('style')).toContain('width: 100%');
    });

    it('should set progress width to 25% for quarter progress', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.longTitle
        }
      });

      const progress = wrapper.find('.progress');
      expect(progress.attributes('style')).toContain('width: 25%');
    });

    it('should update progress when item changes', async () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      expect(wrapper.find('.progress').attributes('style')).toContain('width: 0%');

      await wrapper.setProps({ item: TEST_LESSONS.inProgress });

      expect(wrapper.find('.progress').attributes('style')).toContain('width: 50%');
    });
  });

  describe('Item Prop', () => {
    it('should have item as required prop', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      expect(wrapper.props('item')).toEqual(TEST_LESSONS.notStarted);
    });

    it('should update display when item prop changes', async () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      expect(wrapper.find('.lesson-title').text()).toBe(TEST_LESSONS.notStarted.lesson);

      await wrapper.setProps({ item: TEST_LESSONS.inProgress });

      expect(wrapper.find('.lesson-title').text()).toBe(TEST_LESSONS.inProgress.lesson);
      expect(wrapper.find('.lesson-type').text()).toBe(TEST_LESSONS.inProgress.type);
      expect(wrapper.find('.lesson-length').text()).toBe(TEST_LESSONS.inProgress.length);
    });
  });

  describe('Layout', () => {
    it('should have tile-top-row', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const tileTopRow = wrapper.find('.tile-top-row');
      expect(tileTopRow.exists()).toBe(true);
    });

    it('should contain lesson title in tile-top-row', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const tileTopRow = wrapper.find('.tile-top-row');
      const lessonTitle = tileTopRow.find('.lesson-title');
      expect(lessonTitle.exists()).toBe(true);
    });

    it('should contain icons in tile-top-row', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const tileTopRow = wrapper.find('.tile-top-row');
      const lessonIcons = tileTopRow.find('.lesson-icons');
      expect(lessonIcons.exists()).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should render without errors', () => {
      expect(() => {
        mount(LessonTile, {
          props: {
            item: TEST_LESSONS.notStarted
          }
        });
      }).not.toThrow();
    });

    it('should handle progress of 0', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: { ...TEST_LESSONS.notStarted, progress: 0 }
        }
      });

      const progress = wrapper.find('.progress');
      expect(progress.attributes('style')).toContain('width: 0%');
    });

    it('should handle progress of 1', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: { ...TEST_LESSONS.notStarted, progress: 1 }
        }
      });

      const progress = wrapper.find('.progress');
      expect(progress.attributes('style')).toContain('width: 100%');
    });

    it('should handle fractional progress', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: { ...TEST_LESSONS.notStarted, progress: 0.75 }
        }
      });

      const progress = wrapper.find('.progress');
      expect(progress.attributes('style')).toContain('width: 75%');
    });

    it('should maintain structure after prop updates', async () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      await wrapper.setProps({ item: TEST_LESSONS.inProgress });
      await wrapper.setProps({ item: TEST_LESSONS.completed });

      expect(wrapper.find('.tile').exists()).toBe(true);
      expect(wrapper.find('.tile-top').exists()).toBe(true);
      expect(wrapper.find('.tile-bottom').exists()).toBe(true);
      expect(wrapper.find('.progress-bar').exists()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have semantic structure', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      expect(wrapper.element).toBeInstanceOf(HTMLElement);
    });

    it('should have visible lesson title', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const lessonTitle = wrapper.find('.lesson-title');
      expect(lessonTitle.text().length).toBeGreaterThan(0);
    });

    it('should have image for visual context', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.notStarted
        }
      });

      const img = wrapper.find('img');
      expect(img.exists()).toBe(true);
    });

    it('should have visual progress indicator', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.inProgress
        }
      });

      const progress = wrapper.find('.progress');
      expect(progress.exists()).toBe(true);
    });
  });

  describe('Integration', () => {
    it('should display all lesson states correctly', () => {
      const lessons = [
        TEST_LESSONS.notStarted,
        TEST_LESSONS.inProgress,
        TEST_LESSONS.completed
      ];

      lessons.forEach(lesson => {
        const wrapper = mount(LessonTile, {
          props: { item: lesson }
        });

        expect(wrapper.find('.lesson-title').text()).toBe(lesson.lesson);
        expect(wrapper.find('.lesson-type').text()).toBe(lesson.type);
        expect(wrapper.find('.lesson-length').text()).toBe(lesson.length);
        expect(wrapper.find('.progress').attributes('style')).toContain(`width: ${lesson.progress * 100}%`);
      });
    });

    it('should correctly show completion and bookmark states', () => {
      const wrapper = mount(LessonTile, {
        props: {
          item: TEST_LESSONS.completed
        }
      });

      const icons = wrapper.findAll('.icon');
      expect(icons[0].attributes('data-icon')).toBe('mdi:bookmark');
      expect(icons[1].attributes('data-icon')).toBe('material-symbols:check-circle-rounded');
    });
  });
});
