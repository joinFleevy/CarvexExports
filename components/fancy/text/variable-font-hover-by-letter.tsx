'use client';

import React, { useEffect, useRef, useState } from 'react';
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

const parseWeight = (settings: string, fallback: number): number => {
  const match = settings.match(/'wght'\s*(\d+)/i) || settings.match(/wght\s*(\d+)/i);
  return match ? parseInt(match[1], 10) : fallback;
};

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
  const [internalHovered, setInternalHovered] = useState(false);

  const fromWeight = parseWeight(fromFontVariationSettings, 400);
  const toWeight = parseWeight(toFontVariationSettings, 900);

  const mergeTransition = (baseTransition: AnimationOptions) => ({
    ...baseTransition,
    delay: stagger(staggerDuration, {
      from: staggerFrom,
    }),
  });

  // Keep a stable ref to perform animation
  const runAnimationRef = useRef<(hovering: boolean) => void>(() => {});
  runAnimationRef.current = (hovering: boolean) => {
    if (!scope.current) return;
    animate(
      '.letter',
      {
        fontVariationSettings: hovering ? toFontVariationSettings : fromFontVariationSettings,
        fontWeight: hovering ? toWeight : fromWeight,
      },
      mergeTransition(transition)
    );
  };

  const debouncedAnimateRef = useRef(
    debounce(
      (hovering: boolean) => {
        runAnimationRef.current(hovering);
      },
      60,
      { leading: true, trailing: true }
    )
  );

  // Controlled hover from parent (e.g. ForgeButton)
  useEffect(() => {
    if (controlledIsHovered !== undefined) {
      debouncedAnimateRef.current(controlledIsHovered);
    }
  }, [controlledIsHovered, toFontVariationSettings, fromFontVariationSettings, toWeight, fromWeight]);

  // Uncontrolled hover handlers
  const hoverStartRef = useRef(
    debounce(
      () => {
        if (controlledIsHovered !== undefined) return;
        setInternalHovered(true);
        debouncedAnimateRef.current(true);
      },
      100,
      { leading: true, trailing: true }
    )
  );

  const hoverEndRef = useRef(
    debounce(
      () => {
        if (controlledIsHovered !== undefined) return;
        setInternalHovered(false);
        debouncedAnimateRef.current(false);
      },
      100,
      { leading: true, trailing: true }
    )
  );

  const isArabic = typeof label === 'string' && /[\u0600-\u06FF]/.test(label);

  return (
    <motion.span
      className={`inline-block ${className}`}
      data-hovered={controlledIsHovered !== undefined ? controlledIsHovered : internalHovered}
      onHoverStart={() => hoverStartRef.current()}
      onHoverEnd={() => hoverEndRef.current()}
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
              style={{
                fontVariationSettings: fromFontVariationSettings,
                fontWeight: fromWeight,
              }}
            >
              {word}
            </motion.span>
            {i < arr.length - 1 && <span>&nbsp;</span>}
          </span>
        ))
      ) : (
        label.split('').map((letter: string, i: number) => (
          <motion.span
            key={i}
            className="inline-block whitespace-pre letter"
            aria-hidden="true"
            style={{
              fontVariationSettings: fromFontVariationSettings,
              fontWeight: fromWeight,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))
      )}
    </motion.span>
  );
};

export default VariableFontHoverByLetter;
