'use client';

import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { type AnimationOptions, motion, stagger, useAnimate } from 'motion/react';

export interface VariableFontHoverByLetterProps {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  transition?: AnimationOptions;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | number;
  className?: string;
  onClick?: () => void;
  isHovered?: boolean;
}

export const VariableFontHoverByLetter = ({
  label,
  fromFontVariationSettings = "'wght' 400, 'slnt' 0",
  toFontVariationSettings = "'wght' 900, 'slnt' -10",
  transition = {
    type: 'spring',
    duration: 0.7,
  },
  staggerDuration = 0.03,
  staggerFrom = 'first',
  className = '',
  onClick,
  isHovered: controlledIsHovered,
  ...props
}: VariableFontHoverByLetterProps) => {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);

  const mergeTransition = (baseTransition: AnimationOptions) => ({
    ...baseTransition,
    delay: stagger(staggerDuration, {
      from: staggerFrom,
    }),
  });

  const triggerAnimate = debounce(
    (hovering: boolean) => {
      if (!scope.current) return;
      animate(
        '.letter',
        { fontVariationSettings: hovering ? toFontVariationSettings : fromFontVariationSettings },
        mergeTransition(transition)
      );
    },
    60,
    { leading: true, trailing: true }
  );

  useEffect(() => {
    if (controlledIsHovered !== undefined) {
      triggerAnimate(controlledIsHovered);
    }
  }, [controlledIsHovered, toFontVariationSettings, fromFontVariationSettings]);

  const hoverStart = debounce(
    () => {
      if (controlledIsHovered !== undefined) return;
      if (isHovered) return;
      setIsHovered(true);
      triggerAnimate(true);
    },
    100,
    { leading: true, trailing: true }
  );

  const hoverEnd = debounce(
    () => {
      if (controlledIsHovered !== undefined) return;
      setIsHovered(false);
      triggerAnimate(false);
    },
    100,
    { leading: true, trailing: true }
  );

  const isArabic = typeof label === 'string' && /[\u0600-\u06FF]/.test(label);

  return (
    <motion.span
      className={className}
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{label}</span>

      {isArabic ? (
        label.split(' ').map((word: string, i: number, arr: string[]) => (
          <span key={`w-${i}`} className="inline-block whitespace-nowrap">
            <motion.span
              className="inline-block letter"
              aria-hidden="true"
              style={{ fontVariationSettings: fromFontVariationSettings }}
            >
              {word}
            </motion.span>
            {i < arr.length - 1 && <span>&nbsp;</span>}
          </span>
        ))
      ) : (
        label.split('').map((letter: string, i: number) => {
          return (
            <motion.span
              key={i}
              className="inline-block whitespace-pre letter"
              aria-hidden="true"
              style={{ fontVariationSettings: fromFontVariationSettings }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          );
        })
      )}
    </motion.span>
  );
};

export default VariableFontHoverByLetter;
