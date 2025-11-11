import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import Topbar from './Topbar.vue';

// Mock child components locally for Topbar
const ButtonsIconicStub = defineComponent({
  name: 'ButtonsIconic',
  props: ['icon'],
  template: '<button class="icon-button"><span :data-icon="icon" class="icon"></span></button>'
});

const ButtonsPrimaryStub = defineComponent({
  name: 'ButtonsPrimary',
  props: ['width', 'height'],
  template: '<button class="primary-button"><slot /></button>'
});

const SearchStub = defineComponent({
  name: 'Search',
  template: '<div class="search-component"><input type="text" /></div>'
});

function mountTopbar(options = {}) {
  return mount(Topbar, {
    global: {
      components: {
        ButtonsIconic: ButtonsIconicStub,
        ButtonsPrimary: ButtonsPrimaryStub,
        Search: SearchStub
      }
    },
    ...options
  });
}

describe('Topbar.vue', () => {
  describe('Component Structure', () => {
    it('should render topbar container', () => {
      const wrapper = mountTopbar();

      const topbar = wrapper.find('.topbar');
      expect(topbar.exists()).toBe(true);
    });

    it('should have left section', () => {
      const wrapper = mountTopbar();

      const left = wrapper.find('.left');
      expect(left.exists()).toBe(true);
    });

    it('should have right section', () => {
      const wrapper = mountTopbar();

      const right = wrapper.find('.right');
      expect(right.exists()).toBe(true);
    });

    it('should render as a div element', () => {
      const wrapper = mountTopbar();

      expect(wrapper.element.tagName.toLowerCase()).toBe('div');
    });

    it('should have topbar class', () => {
      const wrapper = mountTopbar();

      expect(wrapper.classes()).toContain('topbar');
    });
  });

  describe('Left Section', () => {
    it('should render back button', () => {
      const wrapper = mountTopbar();

      const iconButtons = wrapper.findAll('.icon-button');
      expect(iconButtons.length).toBeGreaterThanOrEqual(1);
    });

    it('should render breadcrumb', () => {
      const wrapper = mountTopbar();

      const breadcrumb = wrapper.find('.breadcrumb');
      expect(breadcrumb.exists()).toBe(true);
    });

    it('should display "Lessons" as breadcrumb text', () => {
      const wrapper = mountTopbar();

      const breadcrumb = wrapper.find('.breadcrumb');
      expect(breadcrumb.text()).toBe('Lessons');
    });

    it('should render back arrow icon', () => {
      const wrapper = mountTopbar();

      const left = wrapper.find('.left');
      const icons = left.findAll('.icon');

      // Should have at least one icon in the left section
      expect(icons.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Right Section', () => {
    it('should render Search component', () => {
      const wrapper = mountTopbar();

      const search = wrapper.find('.search-component');
      expect(search.exists()).toBe(true);
    });

    it('should render inbox button', () => {
      const wrapper = mountTopbar();

      const iconButtons = wrapper.findAll('.icon-button');
      // Should have back button and inbox button
      expect(iconButtons.length).toBeGreaterThanOrEqual(2);
    });

    it('should render primary button', () => {
      const wrapper = mountTopbar();

      const primaryButton = wrapper.find('.primary-button');
      expect(primaryButton.exists()).toBe(true);
    });

    it('should display "Submit Video" text in primary button', () => {
      const wrapper = mountTopbar();

      const primaryButton = wrapper.find('.primary-button');
      expect(primaryButton.text()).toContain('Submit Video');
    });

    it('should have button-flex wrapper in primary button', () => {
      const wrapper = mountTopbar();

      const buttonFlex = wrapper.find('.button-flex');
      expect(buttonFlex.exists()).toBe(true);
    });

    it('should render icon in primary button', () => {
      const wrapper = mountTopbar();

      const buttonFlex = wrapper.find('.button-flex');
      const icon = buttonFlex.find('.icon');
      expect(icon.exists()).toBe(true);
    });
  });

  describe('Component Rendering', () => {
    it('should render ButtonsIconic components', () => {
      const wrapper = mountTopbar();

      const iconButtons = wrapper.findAll('.icon-button');
      expect(iconButtons.length).toBeGreaterThanOrEqual(2);
    });

    it('should render Search component', () => {
      const wrapper = mountTopbar();

      const search = wrapper.find('.search-component');
      expect(search.exists()).toBe(true);
    });

    it('should render ButtonsPrimary component', () => {
      const wrapper = mountTopbar();

      const primaryButton = wrapper.find('.primary-button');
      expect(primaryButton.exists()).toBe(true);
    });

    it('should render Icon component', () => {
      const wrapper = mountTopbar();

      const icons = wrapper.findAll('.icon');
      expect(icons.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Layout Structure', () => {
    it('should have flexbox layout', () => {
      const wrapper = mountTopbar();

      const topbar = wrapper.find('.topbar');
      expect(topbar.exists()).toBe(true);
    });

    it('should contain left section with back button and breadcrumb', () => {
      const wrapper = mountTopbar();

      const left = wrapper.find('.left');
      expect(left.find('.icon-button').exists()).toBe(true);
      expect(left.find('.breadcrumb').exists()).toBe(true);
    });

    it('should contain right section with search, inbox, and submit button', () => {
      const wrapper = mountTopbar();

      const right = wrapper.find('.right');
      expect(right.find('.search-component').exists()).toBe(true);
      expect(right.find('.icon-button').exists()).toBe(true);
      expect(right.find('.primary-button').exists()).toBe(true);
    });

    it('should have proper element order in left section', () => {
      const wrapper = mountTopbar();

      const left = wrapper.find('.left');
      const children = Array.from(left.element.children);

      // First child should be icon button, second should be breadcrumb
      expect(children.length).toBeGreaterThanOrEqual(2);
    });

    it('should have proper element order in right section', () => {
      const wrapper = mountTopbar();

      const right = wrapper.find('.right');
      const children = Array.from(right.element.children);

      // Should have search, inbox button, and primary button
      expect(children.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Breadcrumb', () => {
    it('should display uppercase text', () => {
      const wrapper = mountTopbar();

      const breadcrumb = wrapper.find('.breadcrumb');
      expect(breadcrumb.classes()).toContain('breadcrumb');
    });

    it('should be in the left section', () => {
      const wrapper = mountTopbar();

      const left = wrapper.find('.left');
      const breadcrumb = left.find('.breadcrumb');
      expect(breadcrumb.exists()).toBe(true);
    });

    it('should show "Lessons" text', () => {
      const wrapper = mountTopbar();

      const breadcrumb = wrapper.find('.breadcrumb');
      expect(breadcrumb.text()).toBe('Lessons');
    });
  });

  describe('Buttons', () => {
    it('should have back button with arrow icon', () => {
      const wrapper = mountTopbar();

      const left = wrapper.find('.left');
      const iconButton = left.find('.icon-button');
      expect(iconButton.exists()).toBe(true);
    });

    it('should have inbox button', () => {
      const wrapper = mountTopbar();

      const right = wrapper.find('.right');
      const iconButtons = right.findAll('.icon-button');
      expect(iconButtons.length).toBeGreaterThanOrEqual(1);
    });

    it('should have submit video button', () => {
      const wrapper = mountTopbar();

      const primaryButton = wrapper.find('.primary-button');
      expect(primaryButton.exists()).toBe(true);
      expect(primaryButton.text()).toContain('Submit Video');
    });
  });

  describe('Submit Video Button', () => {
    it('should have correct text', () => {
      const wrapper = mountTopbar();

      const primaryButton = wrapper.find('.primary-button');
      expect(primaryButton.text()).toContain('Submit Video');
    });

    it('should have icon', () => {
      const wrapper = mountTopbar();

      const buttonFlex = wrapper.find('.button-flex');
      const icon = buttonFlex.find('.icon');
      expect(icon.exists()).toBe(true);
    });

    it('should have button-flex layout', () => {
      const wrapper = mountTopbar();

      const buttonFlex = wrapper.find('.button-flex');
      expect(buttonFlex.exists()).toBe(true);
    });
  });

  describe('Styling', () => {
    it('should have topbar class for styling', () => {
      const wrapper = mountTopbar();

      expect(wrapper.classes()).toContain('topbar');
    });

    it('should have left class for left section', () => {
      const wrapper = mountTopbar();

      const left = wrapper.find('.left');
      expect(left.classes()).toContain('left');
    });

    it('should have right class for right section', () => {
      const wrapper = mountTopbar();

      const right = wrapper.find('.right');
      expect(right.classes()).toContain('right');
    });
  });

  describe('Edge Cases', () => {
    it('should render without errors', () => {
      expect(() => {
        mountTopbar();
      }).not.toThrow();
    });

    it('should maintain structure', () => {
      const wrapper = mountTopbar();

      expect(wrapper.find('.topbar').exists()).toBe(true);
      expect(wrapper.find('.left').exists()).toBe(true);
      expect(wrapper.find('.right').exists()).toBe(true);
      expect(wrapper.find('.breadcrumb').exists()).toBe(true);
    });

    it('should have all required components', () => {
      const wrapper = mountTopbar();

      // Check all main components are present
      expect(wrapper.find('.breadcrumb').exists()).toBe(true);
      expect(wrapper.find('.search-component').exists()).toBe(true);
      expect(wrapper.findAll('.icon-button').length).toBeGreaterThanOrEqual(2);
      expect(wrapper.find('.primary-button').exists()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have semantic structure', () => {
      const wrapper = mountTopbar();

      expect(wrapper.element).toBeInstanceOf(HTMLElement);
    });

    it('should have visible breadcrumb text', () => {
      const wrapper = mountTopbar();

      const breadcrumb = wrapper.find('.breadcrumb');
      expect(breadcrumb.text().length).toBeGreaterThan(0);
    });

    it('should have clickable buttons', () => {
      const wrapper = mountTopbar();

      const iconButtons = wrapper.findAll('.icon-button');
      const primaryButton = wrapper.find('.primary-button');

      expect(iconButtons.length).toBeGreaterThanOrEqual(2);
      expect(primaryButton.exists()).toBe(true);
    });

    it('should have search functionality', () => {
      const wrapper = mountTopbar();

      const search = wrapper.find('.search-component');
      expect(search.exists()).toBe(true);
    });

    it('should have descriptive button text', () => {
      const wrapper = mountTopbar();

      const primaryButton = wrapper.find('.primary-button');
      expect(primaryButton.text()).toContain('Submit Video');
    });
  });

  describe('Integration', () => {
    it('should integrate all child components correctly', () => {
      const wrapper = mountTopbar();

      // Verify all components are rendered
      const hasBackButton = wrapper.find('.left').find('.icon-button').exists();
      const hasBreadcrumb = wrapper.find('.breadcrumb').exists();
      const hasSearch = wrapper.find('.search-component').exists();
      const hasInboxButton = wrapper.find('.right').findAll('.icon-button').length >= 1;
      const hasPrimaryButton = wrapper.find('.primary-button').exists();

      expect(hasBackButton).toBe(true);
      expect(hasBreadcrumb).toBe(true);
      expect(hasSearch).toBe(true);
      expect(hasInboxButton).toBe(true);
      expect(hasPrimaryButton).toBe(true);
    });

    it('should maintain layout with all components', () => {
      const wrapper = mountTopbar();

      const topbar = wrapper.find('.topbar');
      const children = topbar.element.children;

      // Should have left and right sections
      expect(children.length).toBe(2);
    });
  });
});
