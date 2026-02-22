'use client';

import { useRef, useEffect, memo } from 'react';

interface DropdownProps {
  open: boolean;
  onClose: () => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Dropdown = memo(function Dropdown({
  open,
  onClose,
  trigger,
  children,
  align = 'left',
  className,
  onMouseEnter,
  onMouseLeave,
}: DropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus container when dropdown opens so Escape key works immediately
  useEffect(() => {
    if (open) containerRef.current?.focus();
  }, [open]);

  // Close on outside click — re-runs only when onClose changes (stable via useCallback in parents)
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      className={`relative${className ? ` ${className}` : ''}`}
      tabIndex={-1}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {trigger}
      {open && (
        <div className={`absolute top-full mt-1 z-20 ${align === 'right' ? 'right-0' : 'left-0'}`}>
          <div className="absolute -top-1 inset-x-0 h-1" />
          {children}
        </div>
      )}
    </div>
  );
});
