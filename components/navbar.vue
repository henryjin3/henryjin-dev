<template>
  <nav class="nav">
    <div class="nav__content">
      <ul class="nav__menu js-nav-menu" id="nav-menu">
        <li v-for="link in links" :key="link.name" class="nav__item">
          <nuxt-link :to="link.href" class="nav__link">
            {{ link.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>

    <div class="nav__bg theme-dark">
      <div class="nav__bg__circle"></div>
    </div>
  </nav>
</template>

<script>
import '../assets/styles/base/_reboot.scss';
import '../assets/styles/base/_focus.scss';

export default {
  name: 'Navbar',
  data() {
    return {
      links: [
        { href: '/about', name: 'about' },
        { href: '/writing', name: 'writing' }
      ]
    };
  }
};
</script>

<style lang="scss">
.nav {
  display: flex;
  align-items: center;

  // Nav Menu UL
  &__menu {
    display: flex;
  }

  // Nav Item LI
  &__item {
    position: relative;

    // Underline
    &::after {
      content: '';
      display: block;
      height: 5px;
      background-color: var(--border-color);
      position: absolute;
      left: 1.25rem;
      right: 1.25rem;
      bottom: -5px;
      transform: scaleX(0);
      transform-origin: 0 50%;
      transition: transform 0.3s cubic-bezier(0.86, 0, 0.07, 1);
    }

    // Hover Underline
    &:hover::after {
      transform: scaleX(1);
    }

    // Current Page Active Item
    &--active {
      &::after {
        background-color: var(--brand-color-primary) !important;
        transform: none;
      }
      > a {
        color: var(--text-color);
      }
    }
  }

  // Nav Link
  &__link {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    padding: 0.75rem 1.25rem;
    line-height: 1;
    white-space: nowrap;
    text-transform: lowercase;
    color: var(--text-color);
    transition: color 0.2s linear;

    @include hover-focus {
      color: var(--text-color);
    }
  }

  // ==================================
  // MOBILE VERSION (TABLET AND DOWN)
  // ==================================

  @include mq-down(lg) {
    &__content {
      display: none;
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: center;

      position: fixed;
      z-index: z('nav');
      top: 0;
      left: 0;
    }

    &__menu {
      flex-direction: column;
      justify-content: center;
      flex: 1 0 auto;
      opacity: 0;
      transform: translateY(1.5rem);
      transition: opacity 0.5s linear 0.25s,
        transform 0.5s $animation-curve-default 0.25s;
    }

    &__item {
      padding: 0 15%;
      font-family: $font-family-serif;
      font-size: 2.5rem;
      letter-spacing: 1px;
      color: #fff;

      &::after {
        left: 0;
        right: 70%;
        height: 10px;
        bottom: 15%;
        background-color: $gray;
      }

      &--active > a {
        color: #fff;
      }
      &--active .nav__num {
        color: $gray;
      }
    }

    &__link {
      padding: 1.5rem;
      text-transform: none;
      color: $gray-light;

      @include hover-focus {
        color: #fff;
      }
    }
  }
}
</style>
