'use client';

import React from 'react';
import Link from 'next/link';

interface ForgeButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  isRtl?: boolean;
  className?: string;
  ariaLabel?: string;
  cursorLabel?: string;
  external?: boolean;
}

export default function ForgeButton({
  label,
  href,
  onClick,
  type = 'button',
  disabled = false,
  isRtl = false,
  className = '',
  ariaLabel,
  cursorLabel = 'Explore',
  external = false,
}: ForgeButtonProps) {
  const content = isRtl ? (
    <span className="forge-cta-text forge-cta-text--rtl">{label}</span>
  ) : (
    <span className="forge-cta-text" aria-hidden="true">
      {Array.from(label).map((ch, idx) => (
        <span
          key={`${ch}-${idx}`}
          style={{ transitionDelay: `${Math.min(idx, 20) * 0.02}s` }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );

  const inner = (
    <>
      <i className="forge-cta-shimmer" aria-hidden="true" />
      {content}
      <span className="sr-only">{label}</span>
    </>
  );

  if (href) {
    if (external || href.startsWith('#') || href.startsWith('http') || href.startsWith('tel:')) {
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          onClick={onClick}
          aria-label={ariaLabel || label}
          data-cursor-label={cursorLabel}
          className={`forge-cta ${className}`}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link
        href={href}
        onClick={onClick}
        aria-label={ariaLabel || label}
        data-cursor-label={cursorLabel}
        className={`forge-cta ${className}`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || label}
      data-cursor-label={cursorLabel}
      className={`forge-cta ${className}`}
    >
      {inner}
    </button>
  );
}
