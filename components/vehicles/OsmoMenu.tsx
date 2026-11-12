'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import './OsmoMenu.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
  if (!CustomEase.get('main')) {
    CustomEase.create('main', '0.22, 1, 0.36, 1');
  }
}

export type VehiclesNavTab = 'vehicles' | 'home' | 'favourites' | 'recents';

interface OsmoMenuProps {
  activeTab: VehiclesNavTab;
  onTabChange: (tab: VehiclesNavTab) => void;
  favoritesCount: number;
  recentsCount?: number;
}

export default function OsmoMenu({
  activeTab,
  onTabChange,
  favoritesCount,
  recentsCount = 0,
}: OsmoMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const openNav = useCallback(() => {
    const navWrap = navWrapRef.current;
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    const menuButton = menuButtonRef.current;
    if (!navWrap || !menu || !overlay || !menuButton) return;

    const bgPanels = navWrap.querySelectorAll('.osmo-bg-panel');
    const menuLinks = navWrap.querySelectorAll('.osmo-menu-link');
    const fadeTargets = navWrap.querySelectorAll('[data-menu-fade]');
    const menuButtonTexts = menuButton.querySelectorAll('p');
    const menuButtonIcon = menuButton.querySelector('.osmo-menu-button-icon');

    navWrap.setAttribute('data-nav', 'open');

    const allTargets = [
      navWrap,
      menu,
      overlay,
      ...Array.from(bgPanels),
      ...Array.from(menuLinks),
      ...Array.from(fadeTargets),
      ...Array.from(menuButtonTexts),
      ...(menuButtonIcon ? [menuButtonIcon] : []),
    ];
    gsap.killTweensOf(allTargets);

    if (!tlRef.current) {
      tlRef.current = gsap.timeline();
    }
    const tl = tlRef.current;

    tl.clear()
      .set(navWrap, { display: 'block' })
      .set(menu, { xPercent: 0 }, '<')
      .fromTo(
        menuButtonTexts,
        { yPercent: 0 },
        { yPercent: -100, stagger: 0.06, ease: 'main', duration: 0.42 },
        '<'
      )
      .fromTo(
        menuButtonIcon,
        { rotate: 0 },
        { rotate: 315, ease: 'main', duration: 0.42 },
        '<'
      )
      .fromTo(
        overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'power2.out', duration: 0.38 },
        '<'
      )
      .fromTo(
        bgPanels,
        { xPercent: -101 },
        { xPercent: 0, stagger: 0.07, duration: 0.46, ease: 'main' },
        '<'
      )
      .fromTo(
        menuLinks,
        { y: 26, autoAlpha: 0, rotate: 0 },
        {
          y: 0,
          autoAlpha: 1,
          rotate: 0,
          stagger: 0.03,
          ease: 'main',
          duration: 0.44,
          clearProps: 'transform,opacity,visibility',
        },
        '<+=0.1'
      )
      .fromTo(
        fadeTargets,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.03,
          ease: 'main',
          duration: 0.4,
          clearProps: 'transform,opacity,visibility',
        },
        '<+=0.08'
      );
  }, []);

  const closeNav = useCallback(() => {
    const navWrap = navWrapRef.current;
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    const menuButton = menuButtonRef.current;
    if (!navWrap || !menu || !overlay || !menuButton) return;

    const bgPanels = navWrap.querySelectorAll('.osmo-bg-panel');
    const menuLinks = navWrap.querySelectorAll('.osmo-menu-link');
    const fadeTargets = navWrap.querySelectorAll('[data-menu-fade]');
    const menuButtonTexts = menuButton.querySelectorAll('p');
    const menuButtonIcon = menuButton.querySelector('.osmo-menu-button-icon');

    navWrap.setAttribute('data-nav', 'closed');

    const allTargets = [
      navWrap,
      menu,
      overlay,
      ...Array.from(bgPanels),
      ...Array.from(menuLinks),
      ...Array.from(fadeTargets),
      ...Array.from(menuButtonTexts),
      ...(menuButtonIcon ? [menuButtonIcon] : []),
    ];
    gsap.killTweensOf(allTargets);

    if (!tlRef.current) {
      tlRef.current = gsap.timeline();
    }
    const tl = tlRef.current;

    tl.clear()
      .to(overlay, { autoAlpha: 0, ease: 'power2.inOut', duration: 0.36 })
      .to(menu, { xPercent: -105, ease: 'power3.inOut', duration: 0.38 }, '<')
      .to(menuButtonTexts, { yPercent: 0, ease: 'main', duration: 0.36 }, '<')
      .to(menuButtonIcon, { rotate: 0, ease: 'main', duration: 0.36 }, '<')
      .set(navWrap, { display: 'none' });
  }, []);

  const handleToggle = useCallback(() => {
    const navWrap = navWrapRef.current;
    if (!navWrap) return;
    const state = navWrap.getAttribute('data-nav');
    if (state === 'open') {
      closeNav();
    } else {
      openNav();
    }
  }, [openNav, closeNav]);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    if (!CustomEase.get('main')) {
      CustomEase.create('main', '0.22, 1, 0.36, 1');
    }
    const navWrap = navWrapRef.current;
    if (navWrap) {
      gsap.set(navWrap, { display: 'none' });
    }
    tlRef.current = gsap.timeline();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'Escape' &&
        navWrapRef.current?.getAttribute('data-nav') === 'open'
      ) {
        closeNav();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      tlRef.current?.kill();
    };
  }, [closeNav]);

  const handleTabClick = (tab: VehiclesNavTab) => {
    onTabChange(tab);
    closeNav();
  };

  return (
    <div ref={rootRef} className="osmo-menu-root">
      {/* Top-Left Menu / Close Toggle Button */}
      <button
        ref={menuButtonRef}
        type="button"
        onClick={handleToggle}
        data-menu-toggle=""
        className="osmo-menu-button"
        aria-label="Toggle navigation menu"
      >
        <div className="osmo-menu-button-text">
          <p>Menu</p>
          <p>Close</p>
        </div>
        <div className="osmo-icon-wrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 16 16"
            fill="none"
            className="osmo-menu-button-icon"
          >
            <path
              d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
              fill="currentColor"
            />
            <path
              d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
              fill="currentColor"
            />
            <path
              d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
              fill="currentColor"
            />
            <path
              d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
              fill="currentColor"
            />
            <path
              d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
              fill="currentColor"
            />
            <path
              d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </button>

      {/* Side Wipe Navigation Drawer (Left Side) */}
      <div ref={navWrapRef} data-nav="closed" className="osmo-nav">
        <div
          ref={overlayRef}
          onClick={closeNav}
          data-menu-toggle=""
          className="osmo-overlay"
        />
        <nav ref={menuRef} className="osmo-menu" aria-label="Main navigation">
          <div className="osmo-menu-bg">
            <div className="osmo-bg-panel first" />
            <div className="osmo-bg-panel second" />
            <div className="osmo-bg-panel" />
          </div>

          <div className="osmo-menu-inner">
            <ul className="osmo-menu-list">
              <li className="osmo-menu-list-item">
                <Link href="/" onClick={closeNav} className="osmo-menu-link">
                  <p className="osmo-menu-link-heading">Home</p>
                  <p className="osmo-eyebrow">01</p>
                  <div className="osmo-menu-link-bg" />
                </Link>
              </li>

              <li className="osmo-menu-list-item">
                <button
                  type="button"
                  onClick={() => handleTabClick('vehicles')}
                  className="osmo-menu-link"
                >
                  <p className="osmo-menu-link-heading">Vehicles</p>
                  <p className="osmo-eyebrow">
                    02{activeTab === 'vehicles' ? ' •' : ''}
                  </p>
                  <div className="osmo-menu-link-bg" />
                </button>
              </li>

              <li className="osmo-menu-list-item">
                <button
                  type="button"
                  onClick={() => handleTabClick('favourites')}
                  className="osmo-menu-link"
                >
                  <p className="osmo-menu-link-heading">Favourites</p>
                  <p className="osmo-eyebrow">
                    03{favoritesCount > 0 ? ` (${favoritesCount})` : ''}
                    {activeTab === 'favourites' ? ' •' : ''}
                  </p>
                  <div className="osmo-menu-link-bg" />
                </button>
              </li>

              <li className="osmo-menu-list-item">
                <button
                  type="button"
                  onClick={() => handleTabClick('recents')}
                  className="osmo-menu-link"
                >
                  <p className="osmo-menu-link-heading">Recents</p>
                  <p className="osmo-eyebrow">
                    04{recentsCount > 0 ? ` (${recentsCount})` : ''}
                    {activeTab === 'recents' ? ' •' : ''}
                  </p>
                  <div className="osmo-menu-link-bg" />
                </button>
              </li>

              <li className="osmo-menu-list-item">
                <Link
                  href="/showrooms"
                  onClick={closeNav}
                  className="osmo-menu-link"
                >
                  <p className="osmo-menu-link-heading">Contact us</p>
                  <p className="osmo-eyebrow">05</p>
                  <div className="osmo-menu-link-bg" />
                </Link>
              </li>
            </ul>

            <div className="osmo-menu-details">
              <p data-menu-fade="" className="osmo-p-small">
                Carvex Channels &amp; Tools
              </p>
              <div className="osmo-socials-row">
                <Link
                  data-menu-fade=""
                  href="/calculator"
                  onClick={closeNav}
                  className="osmo-p-large osmo-text-link"
                >
                  Calculator
                </Link>
                <Link
                  data-menu-fade=""
                  href="/track"
                  onClick={closeNav}
                  className="osmo-p-large osmo-text-link"
                >
                  Track
                </Link>
                <a
                  data-menu-fade=""
                  href="https://www.instagram.com/carvexexport/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="osmo-p-large osmo-text-link"
                >
                  Instagram
                </a>
                <a
                  data-menu-fade=""
                  href="https://wa.me/213770727007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="osmo-p-large osmo-text-link"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
