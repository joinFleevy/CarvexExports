'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import ForgeButton from './ForgeButton';
import { BlurReveal } from '@/components/blur-reveal';
import {
  FORGE_MEDIA,
  MARQUEE_LOGOS,
  SHOWROOMS,
  IMPORT_CONDITIONS,
  HOME_COPY,
  type HomeLang,
} from './homeData';
import './home.css';

const LANG_OPTIONS: Array<{ id: HomeLang; label: string }> = [
  { id: 'en', label: 'EN' },
  { id: 'fr', label: 'FR' },
  { id: 'ar', label: 'AR' },
];

export default function MainShowcase() {
  const [lang, setLang] = useState<HomeLang>('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePreview, setActivePreview] = useState(0);
  const [activeShowroomId, setActiveShowroomId] = useState<'alger' | 'jijel' | 'ouargla'>('alger');
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);

  // Commission / Specification enquiry form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [formBranchId, setFormBranchId] = useState<'alger' | 'jijel' | 'ouargla'>('alger');
  const [regimeId, setRegimeId] = useState<string>('mohtarif');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Refs for zero-rerender smooth scroll choreography & custom cursor
  const heroStageRef = useRef<HTMLElement | null>(null);
  const crimsonWashRef = useRef<HTMLDivElement | null>(null);
  const heroRightColRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const cursorLabelRef = useRef<HTMLSpanElement | null>(null);
  const menuOpenRef = useRef(false);
  const scrollToYRef = useRef<((destY: number) => void) | null>(null);

  const t = HOME_COPY[lang];
  const isRtl = lang === 'ar';

  const activeShowroom = useMemo(
    () => SHOWROOMS.find((s) => s.id === activeShowroomId) ?? SHOWROOMS[0],
    [activeShowroomId]
  );

  const formBranch = useMemo(
    () => SHOWROOMS.find((s) => s.id === formBranchId) ?? SHOWROOMS[0],
    [formBranchId]
  );

  // Ensure regimeId stays valid when toggling languages
  useEffect(() => {
    const exists = t.formRegimeOptions.some((opt) => opt.id === regimeId);
    if (!exists && t.formRegimeOptions.length > 0) {
      setRegimeId(t.formRegimeOptions[0].id);
    }
  }, [lang, regimeId, t.formRegimeOptions]);

  // Lock body scroll while slide menu is open and close on Escape
  useEffect(() => {
    menuOpenRef.current = menuOpen;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Lenis-style inertial wheel glide + zero-rerender DOM scroll choreography
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const getScrollY = () =>
      Math.max(
        window.scrollY || 0,
        window.pageYOffset || 0,
        document.documentElement?.scrollTop || 0,
        document.body?.scrollTop || 0
      );

    const getMaxScroll = () => {
      const docHeight = Math.max(
        document.documentElement?.scrollHeight || 0,
        document.body?.scrollHeight || 0
      );
      return Math.max(1, docHeight - window.innerHeight);
    };

    let lastScrolled = false;
    const applyVisuals = (y: number) => {
      const maxScroll = getMaxScroll();
      const progress = Math.min(1, Math.max(0, y / maxScroll));
      const nearFooter = progress >= 0.92;
      const nextScrolled = y > 24 && !nearFooter;

      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }

      if (progressBarRef.current) {
        progressBarRef.current.dataset.visible = progress > 0.01 ? 'true' : 'false';
      }
      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      if (heroStageRef.current) {
        const rect = heroStageRef.current.getBoundingClientRect();
        const stageScrollable = Math.max(1, rect.height - window.innerHeight);
        const p = Math.min(1, Math.max(0, -rect.top / stageScrollable));

        if (crimsonWashRef.current) {
          crimsonWashRef.current.style.opacity = (p * 0.92).toFixed(3);
        }
        if (heroRightColRef.current) {
          heroRightColRef.current.style.opacity = Math.max(0.18, 1 - p * 0.82).toFixed(3);
          heroRightColRef.current.style.transform = `translate3d(0, ${(-p * 24).toFixed(1)}px, 0)`;
        }
      }
    };

    let currentY = getScrollY();
    let targetY = currentY;
    let inertiaRaf = 0;
    let syncRaf = 0;
    let isInertialActive = false;

    const stepInertia = () => {
      const ease = 0.085;
      const diff = targetY - currentY;

      if (Math.abs(diff) < 0.45) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        applyVisuals(currentY);
        inertiaRaf = 0;
        isInertialActive = false;
        return;
      }

      currentY += diff * ease;
      window.scrollTo(0, currentY);
      applyVisuals(currentY);
      inertiaRaf = window.requestAnimationFrame(stepInertia);
    };

    const smoothScrollTo = (destY: number) => {
      const clamped = Math.min(getMaxScroll(), Math.max(0, destY));
      if (reduceMotion) {
        window.scrollTo(0, clamped);
        applyVisuals(clamped);
        return;
      }
      if (!isInertialActive) {
        currentY = getScrollY();
      }
      targetY = clamped;
      isInertialActive = true;
      if (!inertiaRaf) {
        inertiaRaf = window.requestAnimationFrame(stepInertia);
      }
    };

    scrollToYRef.current = smoothScrollTo;

    const onWheel = (e: WheelEvent) => {
      if (
        reduceMotion ||
        coarsePointer ||
        menuOpenRef.current ||
        e.ctrlKey ||
        e.metaKey ||
        e.deltaY === 0
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const scrollableTextarea = target?.closest('textarea');
      if (
        scrollableTextarea &&
        scrollableTextarea.scrollHeight > scrollableTextarea.clientHeight
      ) {
        return;
      }

      e.preventDefault();
      if (!isInertialActive) {
        currentY = getScrollY();
        targetY = currentY;
      }

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 24;
      else if (e.deltaMode === 2) delta *= window.innerHeight;

      targetY = Math.min(getMaxScroll(), Math.max(0, targetY + delta));
      isInertialActive = true;
      if (!inertiaRaf) {
        inertiaRaf = window.requestAnimationFrame(stepInertia);
      }
    };

    const onScroll = () => {
      if (!isInertialActive) {
        currentY = getScrollY();
        targetY = currentY;
      }
      if (!syncRaf) {
        syncRaf = window.requestAnimationFrame(() => {
          syncRaf = 0;
          applyVisuals(getScrollY());
        });
      }
    };

    const onHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('.forge-home a[href^="#"]');
      const href = anchor?.getAttribute('href');
      if (!href || href.length < 2) return;

      const destEl = document.querySelector<HTMLElement>(href);
      if (!destEl) return;

      e.preventDefault();
      setMenuOpen(false);
      document.body.style.overflow = '';
      window.requestAnimationFrame(() => {
        const top = getScrollY() + destEl.getBoundingClientRect().top;
        smoothScrollTo(top);
      });
    };

    applyVisuals(currentY);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('click', onHashClick);

    return () => {
      scrollToYRef.current = null;
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('click', onHashClick);
      if (inertiaRaf) window.cancelAnimationFrame(inertiaRaf);
      if (syncRaf) window.cancelAnimationFrame(syncRaf);
    };
  }, []);

  // Desktop custom spring cursor (dot + trailing ring with context label)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const labelEl = cursorLabelRef.current;
    if (!dot || !ring || !labelEl) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let activeLabel = '';
    let isPointerVisible = false;
    let rafId = 0;

    const tick = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      if (isPointerVisible) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isPointerVisible) {
        isPointerVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        if (!rafId) rafId = window.requestAnimationFrame(tick);
      }

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>(
        '[data-cursor], a, button, [role="radio"]'
      );
      const nextLabel = interactive?.getAttribute('data-cursor') || '';
      const isInteractive = Boolean(interactive);

      if (nextLabel !== activeLabel) {
        activeLabel = nextLabel;
        labelEl.textContent = nextLabel;
      }

      ring.setAttribute('data-active', isInteractive ? 'true' : 'false');
      ring.setAttribute('data-has-label', nextLabel ? 'true' : 'false');
    };

    const onMouseLeave = () => {
      isPointerVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleStep = (step: string) => {
    setExpandedSteps((prev) => ({ ...prev, [step]: !prev[step] }));
  };

  const handleShowroomSelect = (id: 'alger' | 'jijel' | 'ouargla') => {
    setActiveShowroomId(id);
    setFormBranchId(id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) {
      setSubmitError(t.formError);
      return;
    }

    const selectedRegimeLabel =
      t.formRegimeOptions.find((r) => r.id === regimeId)?.label ?? regimeId;

    setSubmitting(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: trimmedName,
          client_phone: trimmedPhone,
          branch: formBranch.apiValue,
          vehicle: 'Bespoke Import Specification',
          customs_regime: selectedRegimeLabel,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        setSubmitError(data?.error || t.formError);
        return;
      }

      setSubmitSuccess(true);
      setFullName('');
      setPhone('');
      setNotes('');
    } catch {
      setSubmitError(t.formError);
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToTop = () => {
    if (scrollToYRef.current) {
      scrollToYRef.current(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const primaryPhone = activeShowroom.phones[0] ?? '0770727007';
  const primaryTelHref = `tel:+213${primaryPhone.replace(/^0/, '')}`;

  return (
    <div
      className="forge-home"
      data-lang={lang}
      lang={lang}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Desktop Custom Spring Cursor */}
      <div ref={dotRef} className="forge-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="forge-cursor-ring" aria-hidden="true">
        <span ref={cursorLabelRef} className="forge-cursor-label" />
      </div>

      {/* Skip Link */}
      <a className="forge-skip-link" href="#page">
        {t.skipToContent}
      </a>

      {/* Pure 3-Element Floating Header */}
      <header className="forge-header" data-scrolled={scrolled && !menuOpen ? 'true' : 'false'}>
        <nav className="forge-social-nav" aria-label="Social media">
          <a
            className="forge-social-icon"
            href={`https://wa.me/${activeShowroom.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Concierge"
            data-cursor="WhatsApp"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>
          <a
            className="forge-social-icon"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            data-cursor="Instagram"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            className="forge-social-icon"
            href={primaryTelHref}
            aria-label="Call Carvex Concierge"
            data-cursor="Call"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
        </nav>

        <Link
          href="/"
          className="forge-brand-center"
          aria-label="Carvex Export Home"
          data-cursor="Home"
        >
          <svg
            width="34"
            height="15"
            viewBox="0 0 48 21"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M24 1L45.5 20H37.5L24 7.8L10.5 20H2.5L24 1Z" />
            <path d="M24 11.2L33.2 20H26.4L24 17.6L19.4 20H14.8L24 11.2Z" opacity="0.88" />
          </svg>
          <span className="forge-brand-wordmark">CARVEX</span>
        </Link>

        <button
          type="button"
          className="forge-menu-btn"
          data-open={menuOpen ? 'true' : 'false'}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? t.closeLabel : t.navLabel}
          onClick={() => setMenuOpen((prev) => !prev)}
          data-cursor={menuOpen ? t.closeLabel : t.navLabel}
        >
          <em>
            <span>{t.navLabel}</span>
            <span>{t.closeLabel}</span>
          </em>
          <i className="forge-hamburger" aria-hidden="true">
            <span />
            <span />
            <span />
          </i>
        </button>
      </header>

      {/* Bottom Edge 2px White Scroll Progress Indicator */}
      <div
        ref={progressBarRef}
        className="forge-bottom-progress"
        data-visible="false"
        aria-hidden="true"
      >
        <div
          ref={progressFillRef}
          className="forge-bottom-progress-fill"
        />
      </div>

      {/* Fullscreen Navigation Slide Drawer */}
      <aside
        id="site-menu"
        className="forge-site-menu"
        data-open={menuOpen ? 'true' : 'false'}
        aria-hidden={!menuOpen}
      >
        <svg className="forge-menu-bg-svg" viewBox="0 0 200 220" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M100 10L185 48V115C185 162 148 197 100 210C52 197 15 162 15 115V48L100 10Z" strokeWidth="1" />
          <path d="M128 82C121 75 111 71 100 71C78 71 60 89 60 111C60 133 78 151 100 151C112 151 122 146 129 139" strokeWidth="1" />
        </svg>

        <div className="forge-menu-inner">
          <div className="forge-menu-previews" aria-hidden="true">
            {t.menuItems.map((item, idx) => (
              <div
                key={item.href + idx}
                className="forge-menu-preview-item"
                data-active={activePreview === idx ? 'true' : 'false'}
              >
                <img src={FORGE_MEDIA[item.preview]} alt="" />
                <div className="forge-menu-preview-caption">
                  <span>{item.idx}</span>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="forge-menu-links-col">
            <nav className="forge-menu-primary" aria-label="Primary navigation">
              {t.menuItems.map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setActivePreview(idx)}
                  onFocus={() => setActivePreview(idx)}
                  onClick={() => setMenuOpen(false)}
                  data-cursor="Open"
                >
                  <span className="forge-menu-idx">{item.idx}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="forge-menu-secondary">
              {t.menuSecondary.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="forge-menu-lang-bar" role="group" aria-label="Language switcher">
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="forge-lang-pill"
                  data-active={lang === opt.id ? 'true' : 'false'}
                  onClick={() => setLang(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="forge-menu-meta">
              <span>{activeShowroom.city[lang]}</span>
              <span>{activeShowroom.district[lang]}</span>
              <a href={primaryTelHref}>
                <bdi dir="ltr">{primaryPhone}</bdi>
              </a>
            </div>
          </div>
        </div>
      </aside>

      <main id="page">
        {/* STAGE 1: Sticky Draped Silk Hero + Scroll Crimson Wash + Rising Contact Box */}
        <section ref={heroStageRef} className="forge-hero-stage">
          <div className="forge-hero-sticky">
            <div className="forge-hero-bg">
              <img
                src={FORGE_MEDIA.heroSilk}
                alt="Carvex Export bespoke dark red silk drapery reveal"
              />
            </div>
            <div className="forge-hero-base-veil" aria-hidden="true" />
            <div
              ref={crimsonWashRef}
              className="forge-hero-crimson-wash"
              aria-hidden="true"
            />

            <div className="forge-hero-headline-wrap">
              <div className="waffl-grid">
                <div
                  ref={heroRightColRef}
                  className="col-7-13 forge-hero-right-col"
                >
                  <h1 className="forge-h1 forge-hero-title-lines">
                    {t.heroTitleLines.map((line, i) => (
                      <BlurReveal
                        key={`${lang}-${i}-${line}`}
                        as="span"
                        className="forge-hero-title-line"
                        delay={0.12 + i * 0.16}
                        speedReveal={1.6}
                        speedSegment={0.6}
                      >
                        {line}
                      </BlurReveal>
                    ))}
                  </h1>
                  <ForgeButton
                    label={t.heroCta}
                    href="#commission"
                    isRtl={isRtl}
                    cursorLabel="Begin"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Left Stacked 4-Row Contact / Portal Box Gliding Over the Dimmed Silk */}
          <div className="forge-hero-cards-overlay">
            <div className="waffl-grid">
              <div className="col-2-6 forge-contact-box">
                <a
                  href={primaryTelHref}
                  className="forge-contact-row"
                  data-cursor="Call"
                >
                  <div>
                    <span className="forge-h2">
                      {t.cardPhoneLabel} · <bdi dir="ltr">{activeShowroom.code}</bdi>
                    </span>
                    <div className="forge-contact-row-title">
                      {activeShowroom.phones.map((num, idx) => (
                        <React.Fragment key={num}>
                          {idx > 0 && ' / '}
                          <bdi dir="ltr">{num}</bdi>
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="forge-p">{activeShowroom.hours[lang]}</p>
                  </div>
                  <span className="forge-contact-row-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                </a>

                <Link
                  href="/vehicles"
                  className="forge-contact-row"
                  data-cursor="Stock"
                >
                  <div>
                    <span className="forge-h2">{t.cardCatalogLabel}</span>
                    <div className="forge-contact-row-title">{t.cardCatalogTitle}</div>
                    <p className="forge-p">{t.cardCatalogSub}</p>
                  </div>
                  <span className="forge-contact-row-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                </Link>

                <Link
                  href="/track"
                  className="forge-contact-row"
                  data-cursor="Track"
                >
                  <div>
                    <span className="forge-h2">{t.cardTrackLabel}</span>
                    <div className="forge-contact-row-title">{t.cardTrackTitle}</div>
                    <p className="forge-p">{t.cardTrackSub}</p>
                  </div>
                  <span className="forge-contact-row-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                      <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                      <polygon points="12 15 17 21 7 21 12 15" />
                    </svg>
                  </span>
                </Link>

                <a
                  href="#commission"
                  className="forge-contact-row"
                  data-cursor="Visit"
                >
                  <div>
                    <span className="forge-h2">{t.cardVisitLabel}</span>
                    <div className="forge-contact-row-title">
                      {activeShowroom.city[lang]} — {activeShowroom.role[lang]}
                    </div>
                    <p className="forge-p">{activeShowroom.district[lang]}</p>
                  </div>
                  <span className="forge-contact-row-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                </a>

                <div
                  className="forge-contact-tabs"
                  role="tablist"
                  aria-label="Official Showrooms"
                >
                  {SHOWROOMS.map((sr) => (
                    <button
                      key={sr.id}
                      type="button"
                      role="tab"
                      aria-selected={activeShowroomId === sr.id}
                      data-active={activeShowroomId === sr.id ? 'true' : 'false'}
                      className="forge-contact-tab"
                      onClick={() => handleShowroomSelect(sr.id)}
                      data-cursor={sr.city[lang]}
                    >
                      {sr.city[lang]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STAGE 2: Deep Velvet Crimson (#410306) Marquee & Specification Form */}
        <section id="commission" className="forge-crimson-section">
          <div className="forge-marquee-strip" aria-label="Sourced vehicle marques">
            <div className="forge-marquee-wrap">
              {[0, 1].map((dupIdx) => (
                <div
                  key={dupIdx}
                  className="forge-marquee-track"
                  aria-hidden={dupIdx === 1}
                >
                  {MARQUEE_LOGOS.map((logo) => (
                    <div key={`${dupIdx}-${logo.alt}`} className="forge-marquee-logo">
                      <img
                        src={logo.src}
                        alt={dupIdx === 0 ? logo.alt : ''}
                        width={logo.width}
                        height={logo.height}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="waffl-grid forge-spec-grid">
            <div className="col-2-6 forge-spec-sticky">
              <h2 className="forge-spec-title">
                <span>{t.formHeadingTop}</span>
                <span className="forge-spec-title-accent">{t.formHeadingAccent}</span>
              </h2>
              <p className="forge-p">{t.formDesc}</p>

              <div className="forge-inline-lang" role="group" aria-label="Language">
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className="forge-lang-pill"
                    data-active={lang === opt.id ? 'true' : 'false'}
                    onClick={() => setLang(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-7-12">
              <form id="form" className="forge-form" onSubmit={handleSubmit} noValidate>
                <div className="forge-field">
                  <div className="forge-field-head">
                    <label className="forge-label" htmlFor="lead-name">
                      {t.formNameLabel}
                    </label>
                  </div>
                  <input
                    id="lead-name"
                    name="client_name"
                    type="text"
                    className="forge-input-box"
                    placeholder={t.formNamePlaceholder}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="forge-field">
                  <div className="forge-field-head">
                    <label className="forge-label" htmlFor="lead-phone">
                      {t.formPhoneLabel}
                    </label>
                  </div>
                  <input
                    id="lead-phone"
                    name="client_phone"
                    type="tel"
                    className="forge-input-box"
                    placeholder={t.formPhonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="forge-field">
                  <div className="forge-field-head">
                    <span className="forge-label">{t.formShowroomLabel}</span>
                  </div>
                  <div className="forge-radio-boxes" role="radiogroup" aria-label={t.formShowroomLabel}>
                    {SHOWROOMS.map((sr) => {
                      const checked = formBranchId === sr.id;
                      return (
                        <button
                          key={sr.id}
                          type="button"
                          role="radio"
                          aria-checked={checked}
                          className="forge-radio-box"
                          onClick={() => handleShowroomSelect(sr.id)}
                        >
                          <span>{sr.city[lang]}</span>
                          <span className="forge-radio-dot" aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="forge-field">
                  <div className="forge-field-head">
                    <span className="forge-label">{t.formRegimeLabel}</span>
                  </div>
                  <div className="forge-radio-boxes" role="radiogroup" aria-label={t.formRegimeLabel}>
                    {t.formRegimeOptions.map((opt) => {
                      const checked = regimeId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          role="radio"
                          aria-checked={checked}
                          className="forge-radio-box"
                          onClick={() => setRegimeId(opt.id)}
                        >
                          <span>{opt.label}</span>
                          <span className="forge-radio-dot" aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="forge-field">
                  <div className="forge-field-head">
                    <label className="forge-label" htmlFor="lead-notes">
                      {t.formMessageLabel}
                    </label>
                    <span className="forge-field-optional">{t.formMessageOptional}</span>
                  </div>
                  <textarea
                    id="lead-notes"
                    name="notes"
                    rows={4}
                    className="forge-textarea-box"
                    placeholder={t.formMessagePlaceholder}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="forge-form-submit-row">
                  <ForgeButton
                    type="submit"
                    label={submitting ? t.formSending : t.formSubmit}
                    disabled={submitting}
                    isRtl={isRtl}
                    cursorLabel="Send"
                  />
                </div>

                {submitError && (
                  <div className="forge-form-feedback" data-tone="error" role="alert">
                    <p>{submitError}</p>
                  </div>
                )}

                {submitSuccess && (
                  <div className="forge-form-feedback" data-tone="success" role="status">
                    <strong>{t.formSuccessTitle}</strong>
                    <p>{t.formSuccessBody}</p>
                    <a
                      href={`https://wa.me/${formBranch.whatsapp}?text=${encodeURIComponent(
                        `Salam Carvex ${formBranch.city.en}, I just submitted an import specification enquiry.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.formWhatsapp} →
                    </a>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* STAGE 3: Sticky Craftsmanship Glove Photo + Staggered 01..04 Glass Cards */}
        <section id="process" className="forge-process-stage">
          <div className="forge-process-sticky-bg" aria-hidden="true">
            <img
              src={FORGE_MEDIA.craftGlove}
              alt="White glove automotive inspection craft"
              loading="lazy"
            />
            <div className="forge-process-veil" />
          </div>

          <div className="forge-process-content">
            <div className="waffl-grid">
              <div className="col-2-12">
                <div className="forge-process-header">
                  <h2 className="forge-process-display">
                    <BlurReveal
                      key={`${lang}-p1-${t.processLine1}`}
                      as="span"
                      className="forge-process-line"
                      inView
                      delay={0.08}
                      speedReveal={1.5}
                      speedSegment={0.55}
                    >
                      {t.processLine1}
                    </BlurReveal>
                    <BlurReveal
                      key={`${lang}-p2-${t.processLine2}`}
                      as="span"
                      className="forge-process-line"
                      inView
                      delay={0.24}
                      speedReveal={1.5}
                      speedSegment={0.55}
                    >
                      {t.processLine2}
                    </BlurReveal>
                  </h2>
                  <ForgeButton
                    label={t.processCalcLink}
                    href="/calculator"
                    isRtl={isRtl}
                    cursorLabel="Estimate"
                  />
                </div>

                <div className="forge-process-cards">
                  {IMPORT_CONDITIONS.map((item, idx) => {
                    const isOpen = Boolean(expandedSteps[item.step]);
                    return (
                      <button
                        key={item.step}
                        type="button"
                        className="forge-glass-card"
                        data-step={String(idx)}
                        data-open={isOpen ? 'true' : 'false'}
                        aria-expanded={isOpen}
                        onClick={() => toggleStep(item.step)}
                        data-cursor={isOpen ? 'Less' : '+ More'}
                      >
                        <span className="forge-glass-num">{item.step}</span>
                        <div>
                          <span className="forge-glass-badge">{item.badge[lang]}</span>
                          <h3 className="forge-h3">{item.title[lang]}</h3>
                          <p className="forge-p">{item.summary[lang]}</p>

                          {isOpen && (
                            <ul className="forge-glass-bullets">
                              {item.details[lang].map((line, lineIdx) => (
                                <li key={lineIdx}>{line}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STAGE 4A: Centered Portal — Available Stock (/vehicles) */}
        <section className="forge-portal">
          <div className="forge-portal-bg">
            <img
              src={FORGE_MEDIA.fleetStudio}
              alt="Carvex Export available multi-brand vehicle lineup in dark studio"
              loading="lazy"
            />
          </div>
          <div className="forge-portal-veil" aria-hidden="true" />
          <div className="forge-portal-center">
            <BlurReveal
              key={`${lang}-s1-${t.showcase1Title}`}
              as="h2"
              className="forge-portal-title"
              inView
              delay={0.1}
              speedReveal={1.5}
              speedSegment={0.55}
            >
              {t.showcase1Title}
            </BlurReveal>
            <p className="forge-p">{t.showcase1Body}</p>
            <ForgeButton
              label={t.showcase1Cta}
              href="/vehicles"
              isRtl={isRtl}
              cursorLabel="Explore"
            />
          </div>
        </section>

        {/* STAGE 4B: Centered Portal — Live Tracking (/track) */}
        <section className="forge-portal">
          <div className="forge-portal-bg">
            <img
              src={FORGE_MEDIA.fleetWet}
              alt="Carvex Export customs cleared fleet awaiting delivery"
              loading="lazy"
            />
          </div>
          <div className="forge-portal-veil" aria-hidden="true" />
          <div className="forge-portal-center">
            <BlurReveal
              key={`${lang}-s2-${t.showcase2Title}`}
              as="h2"
              className="forge-portal-title"
              inView
              delay={0.1}
              speedReveal={1.5}
              speedSegment={0.55}
            >
              {t.showcase2Title}
            </BlurReveal>
            <p className="forge-p">{t.showcase2Body}</p>
            <ForgeButton
              label={t.showcase2Cta}
              href="/track"
              isRtl={isRtl}
              cursorLabel="Track"
            />
          </div>
        </section>
      </main>

      {/* STAGE 5: Rear-Trio Footer ("Refuse Ordinary") */}
      <footer className="forge-footer">
        <aside className="forge-footer-backdrop" aria-hidden="true">
          <img
            src={FORGE_MEDIA.footerTrio}
            alt="Three rear automotive silhouettes emerging in studio light"
            loading="lazy"
          />
          <div className="forge-footer-gradient" />
        </aside>

        <div className="forge-footer-hero">
          <p className="forge-h2">{t.footerEyebrow}</p>
          <h2 className="forge-footer-title">
            <BlurReveal
              key={`${lang}-f1-${t.footerLine1}`}
              as="span"
              className="forge-footer-line"
              inView
              delay={0.08}
              speedReveal={1.5}
              speedSegment={0.55}
            >
              {t.footerLine1}
            </BlurReveal>
            <BlurReveal
              key={`${lang}-f2-${t.footerLine2}`}
              as="span"
              className="forge-footer-line"
              inView
              delay={0.24}
              speedReveal={1.5}
              speedSegment={0.55}
            >
              {t.footerLine2}
            </BlurReveal>
          </h2>
          <ForgeButton
            label={t.footerCta}
            href="/vehicles"
            isRtl={isRtl}
            cursorLabel="View Stock"
          />
        </div>

        <div className="forge-footer-bottom">
          <button
            type="button"
            className="forge-back-top"
            onClick={scrollToTop}
            data-cursor="Top"
          >
            <span>{t.footerBackTop}</span>
            <span aria-hidden="true">↑</span>
          </button>

          <div className="forge-footer-micro-row">
            <div className="forge-footer-micro-links">
              <Link href="/vehicles">{t.cardCatalogTitle}</Link>
              <Link href="/track">{t.cardTrackTitle}</Link>
              <Link href="/calculator">{t.processCalcLink}</Link>
              <Link href="/showrooms">{t.cardVisitTitle}</Link>
              <Link href="/documents">Dossier &amp; Decree 23-74</Link>
            </div>

            <div className="forge-footer-micro-links">
              {SHOWROOMS.map((sr) => (
                <a
                  key={sr.id}
                  href={`tel:+213${(sr.phones[0] ?? '0770727007').replace(/^0/, '')}`}
                >
                  {sr.city[lang]}: <bdi dir="ltr">{sr.phones[0]}</bdi>
                </a>
              ))}
            </div>
          </div>
        </div>

        <nav className="forge-site-nav-sr" aria-label="Site directory">
          <Link href="/">Home</Link>
          <Link href="/vehicles">Vehicles</Link>
          <Link href="/track">Live Tracking</Link>
          <Link href="/calculator">Customs Calculator</Link>
          <Link href="/showrooms">Showrooms</Link>
          <Link href="/documents">Documents</Link>
        </nav>
      </footer>
    </div>
  );
}
