import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SidebarLink from './SidebarLink.vue';

type NavItem = {
  icon: string;
  text: string;
  href?: string | URL;
  onClick?: () => void;
};

const TEST_NAV_ITEMS: Record<string, NavItem> = {
  home: {
    icon: 'mdi:home',
    text: 'Home',
    href: '/'
  },
  lessons: {
    icon: 'mdi:book',
    text: 'Lessons',
    href: '/lessons'
  },
  profile: {
    icon: 'mdi:account',
    text: 'Profile',
    href: '/profile'
  },
  settings: {
    icon: 'mdi:cog',
    text: 'Settings',
    href: '/settings'
  },
  longText: {
    icon: 'mdi:text',
    text: 'This is a very long navigation item text',
    href: '/long'
  },
  withCallback: {
    icon: 'mdi:click',
    text: 'Click Me',
    onClick: () => {}
  },
  noHref: {
    icon: 'mdi:icon',
    text: 'No Link'
  }
} as const;

describe('SidebarLink.vue', () => {
  describe('Component Structure', () => {
    it('should render NuxtLink component', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const link = wrapper.find('.sidebar-link');
      expect(link.exists()).toBe(true);
    });

    it('should render flex-wrapper div', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const flexWrapper = wrapper.find('.flex-wrapper');
      expect(flexWrapper.exists()).toBe(true);
    });

    it('should render icon component', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const icon = wrapper.find('.icon');
      expect(icon.exists()).toBe(true);
    });

    it('should render link text', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const linkText = wrapper.find('.link-text');
      expect(linkText.exists()).toBe(true);
    });

    it('should have sidebar-link class', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      expect(wrapper.classes()).toContain('sidebar-link');
    });
  });

  describe('Item Prop', () => {
    it('should display item text', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const linkText = wrapper.find('.link-text');
      expect(linkText.text()).toBe(TEST_NAV_ITEMS.home.text);
    });

    it('should pass href to NuxtLink', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const link = wrapper.find('.sidebar-link');
      expect(link.attributes('href')).toBe(TEST_NAV_ITEMS.home.href);
    });

    it('should display icon', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const icon = wrapper.find('.icon');
      expect(icon.attributes('data-icon')).toBe(TEST_NAV_ITEMS.home.icon);
    });

    it('should handle different nav items', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.lessons
        }
      });

      expect(wrapper.find('.link-text').text()).toBe(TEST_NAV_ITEMS.lessons.text);
      expect(wrapper.find('.icon').attributes('data-icon')).toBe(TEST_NAV_ITEMS.lessons.icon);
      expect(wrapper.find('.sidebar-link').attributes('href')).toBe(TEST_NAV_ITEMS.lessons.href);
    });

    it('should update when item prop changes', async () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      expect(wrapper.find('.link-text').text()).toBe(TEST_NAV_ITEMS.home.text);

      await wrapper.setProps({ item: TEST_NAV_ITEMS.profile });

      expect(wrapper.find('.link-text').text()).toBe(TEST_NAV_ITEMS.profile.text);
      expect(wrapper.find('.icon').attributes('data-icon')).toBe(TEST_NAV_ITEMS.profile.icon);
    });
  });

  describe('Icon Display', () => {
    it('should render icon before text', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const flexWrapper = wrapper.find('.flex-wrapper');
      const children = Array.from(flexWrapper.element.children);

      // First child should have icon class
      expect(children[0].classList.contains('icon')).toBe(true);
      // Second child should have link-text class
      expect(children[1].classList.contains('link-text')).toBe(true);
    });

    it('should pass correct icon name', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.settings
        }
      });

      const icon = wrapper.find('.icon');
      expect(icon.attributes('data-icon')).toBe(TEST_NAV_ITEMS.settings.icon);
    });

    it('should handle icon even if empty', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: {
            icon: '',
            text: 'Test',
            href: '/'
          }
        }
      });

      const icon = wrapper.find('.icon');
      expect(icon.exists()).toBe(true);
    });
  });

  describe('Text Display', () => {
    it('should display short text', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const linkText = wrapper.find('.link-text');
      expect(linkText.text()).toBe('Home');
    });

    it('should display long text', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.longText
        }
      });

      const linkText = wrapper.find('.link-text');
      expect(linkText.text()).toBe(TEST_NAV_ITEMS.longText.text);
    });

    it('should handle empty text', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: {
            icon: 'mdi:home',
            text: '',
            href: '/'
          }
        }
      });

      const linkText = wrapper.find('.link-text');
      expect(linkText.text()).toBe('');
    });
  });

  describe('Navigation', () => {
    it('should have href attribute', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const link = wrapper.find('.sidebar-link');
      expect(link.attributes('href')).toBeTruthy();
    });

    it('should handle different href values', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.lessons
        }
      });

      expect(wrapper.find('.sidebar-link').attributes('href')).toBe('/lessons');
    });

    it('should handle missing href', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.noHref
        }
      });

      const link = wrapper.find('.sidebar-link');
      expect(link.exists()).toBe(true);
    });
  });

  describe('Styling', () => {
    it('should have sidebar-link class', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      expect(wrapper.classes()).toContain('sidebar-link');
    });

    it('should have flex-wrapper class on inner div', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const flexWrapper = wrapper.find('.flex-wrapper');
      expect(flexWrapper.exists()).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should render without errors', () => {
      expect(() => {
        mount(SidebarLink, {
          props: {
            item: TEST_NAV_ITEMS.home
          }
        });
      }).not.toThrow();
    });

    it('should handle null/undefined item gracefully', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: undefined
        }
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should maintain structure after prop updates', async () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      await wrapper.setProps({ item: TEST_NAV_ITEMS.lessons });
      await wrapper.setProps({ item: TEST_NAV_ITEMS.profile });

      expect(wrapper.find('.sidebar-link').exists()).toBe(true);
      expect(wrapper.find('.flex-wrapper').exists()).toBe(true);
      expect(wrapper.find('.icon').exists()).toBe(true);
      expect(wrapper.find('.link-text').exists()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should be a semantic link element', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const link = wrapper.find('a');
      expect(link.exists()).toBe(true);
    });

    it('should have visible text for screen readers', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const linkText = wrapper.find('.link-text');
      expect(linkText.text().length).toBeGreaterThan(0);
    });

    it('should have icon and text for better accessibility', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      expect(wrapper.find('.icon').exists()).toBe(true);
      expect(wrapper.find('.link-text').exists()).toBe(true);
    });

    it('should be keyboard navigable as a link', () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const link = wrapper.find('a');
      expect(link.exists()).toBe(true);
    });
  });

  describe('Integration', () => {
    it('should work with multiple nav item types', () => {
      const navItems = [
        TEST_NAV_ITEMS.home,
        TEST_NAV_ITEMS.lessons,
        TEST_NAV_ITEMS.profile,
        TEST_NAV_ITEMS.settings
      ];

      navItems.forEach(item => {
        const wrapper = mount(SidebarLink, {
          props: { item }
        });

        expect(wrapper.find('.link-text').text()).toBe(item.text);
        expect(wrapper.find('.icon').attributes('data-icon')).toBe(item.icon);
      });
    });

    it('should maintain consistent structure across different items', async () => {
      const wrapper = mount(SidebarLink, {
        props: {
          item: TEST_NAV_ITEMS.home
        }
      });

      const initialStructure = {
        hasLink: wrapper.find('.sidebar-link').exists(),
        hasWrapper: wrapper.find('.flex-wrapper').exists(),
        hasIcon: wrapper.find('.icon').exists(),
        hasText: wrapper.find('.link-text').exists()
      };

      await wrapper.setProps({ item: TEST_NAV_ITEMS.lessons });

      expect(wrapper.find('.sidebar-link').exists()).toBe(initialStructure.hasLink);
      expect(wrapper.find('.flex-wrapper').exists()).toBe(initialStructure.hasWrapper);
      expect(wrapper.find('.icon').exists()).toBe(initialStructure.hasIcon);
      expect(wrapper.find('.link-text').exists()).toBe(initialStructure.hasText);
    });
  });
});
