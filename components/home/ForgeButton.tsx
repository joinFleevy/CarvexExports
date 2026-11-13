'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import VariableFontHoverByLetter from '@/components/fancy/text/variable-font-hover-by-letter';

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
  staggerDuration?: number;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
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
  staggerDuration = 0.025,
  fromFontVariationSettings = "'wght' 400, 'slnt' 0",
  toFontVariationSettings = "'wght' 900, 'slnt' -10",
}: ForgeButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const inner = (
    <>
      <i className="forge-cta-shimmer" aria-hidden="true" />
      <span className={`forge-cta-text ${isRtl ? 'forge-cta-text--rtl' : ''}`}>
        <VariableFontHoverByLetter
          label={label}
          isHovered={isHovered}
          fromFontVariationSettings={fromFontVariationSettings}
          toFontVariationSettings={toFontVariationSettings}
          staggerDuration={staggerDuration}
          transition={{ type: 'spring', duration: 0.65 }}
        />
      </span>
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel || label}
      data-cursor-label={cursorLabel}
      className={`forge-cta ${className}`}
    >
      {inner}
    </button>
  );
}
