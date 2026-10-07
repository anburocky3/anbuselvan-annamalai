"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { LuCheck, LuChevronDown, LuSearch, LuX } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface SearchableOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: readonly (string | SearchableOption)[] | (string | SearchableOption)[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  allowCustom?: boolean;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  id?: string;
}

export function SearchableSelect({
  options,
  value = "",
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Type to search...",
  allowCustom = true,
  disabled = false,
  error = false,
  className = "",
  id,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Normalize options to { value, label } format
  const normalizedOptions: SearchableOption[] = useMemo(() => {
    return options.map((opt) =>
      typeof opt === "string" ? { value: opt, label: opt } : opt
    );
  }, [options]);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return normalizedOptions;
    return normalizedOptions.filter((opt) =>
      opt.label.toLowerCase().includes(query) ||
      opt.value.toLowerCase().includes(query)
    );
  }, [normalizedOptions, searchQuery]);

  // Check if current search query matches an existing option exactly
  const exactMatchExists = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return normalizedOptions.some(
      (opt) => opt.label.toLowerCase() === query || opt.value.toLowerCase() === query
    );
  }, [normalizedOptions, searchQuery]);

  // Find currently selected option's display label
  const selectedOption = useMemo(() => {
    return normalizedOptions.find((opt) => opt.value === value);
  }, [normalizedOptions, value]);

  const displayLabel = selectedOption ? selectedOption.label : value;

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setHighlightedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Keep highlighted item in view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setSearchQuery("");
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    const totalCount = filteredOptions.length + (!exactMatchExists && allowCustom ? 1 : 0);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % (totalCount || 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + totalCount) % (totalCount || 1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex < filteredOptions.length) {
          const opt = filteredOptions[highlightedIndex];
          if (opt) handleSelect(opt.value);
        } else if (!exactMatchExists && allowCustom && searchQuery.trim()) {
          handleSelect(searchQuery.trim());
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          "w-full h-11 px-3.5 py-2 flex items-center justify-between text-left text-sm rounded-lg transition-all",
          "border bg-white dark:bg-slate-900",
          "border-slate-200 dark:border-slate-800",
          "hover:border-slate-300 dark:hover:border-slate-700",
          "focus:outline-hidden focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 dark:focus:border-purple-400",
          "shadow-xs select-none",
          disabled && "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800",
          error && "border-destructive dark:border-destructive focus:ring-destructive/30"
        )}
      >
        <span
          className={cn(
            "truncate block pr-2",
            displayLabel
              ? "text-slate-900 dark:text-slate-100 font-medium"
              : "text-slate-400 dark:text-slate-500"
          )}
        >
          {displayLabel || placeholder}
        </span>

        <div className="flex items-center space-x-1 shrink-0 text-slate-400 dark:text-slate-500">
          {value && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="Clear selection"
            >
              <LuX className="w-3.5 h-3.5" />
            </span>
          )}
          <LuChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isOpen && "rotate-180 text-purple-600 dark:text-purple-400"
            )}
          />
        </div>
      </button>

      {/* Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute z-50 left-0 right-0 mt-1.5 rounded-xl shadow-xl border overflow-hidden",
              "bg-white dark:bg-slate-900",
              "border-slate-200 dark:border-slate-800",
              "backdrop-blur-xl"
            )}
          >
            {/* Search Input Bar */}
            <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="relative flex items-center">
                <LuSearch className="absolute left-3 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setHighlightedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={searchPlaceholder}
                  className={cn(
                    "w-full h-9 pl-9 pr-8 text-sm rounded-lg border",
                    "bg-white dark:bg-slate-800",
                    "border-slate-200 dark:border-slate-700",
                    "text-slate-900 dark:text-slate-100",
                    "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                    "focus:outline-hidden focus:ring-1 focus:ring-purple-500"
                  )}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <LuX className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Options List */}
            <ul
              ref={listRef}
              role="listbox"
              className="max-h-60 overflow-y-auto p-1.5 space-y-0.5 text-sm focus:outline-hidden"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt, idx) => {
                  const isSelected = opt.value === value;
                  const isHighlighted = idx === highlightedIndex;

                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(opt.value)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      className={cn(
                        "relative flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors select-none",
                        isHighlighted && !isSelected && "bg-slate-100 dark:bg-slate-800/80",
                        isSelected &&
                          "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-semibold",
                        !isSelected && "text-slate-700 dark:text-slate-200"
                      )}
                    >
                      <span className="truncate pr-4">{opt.label}</span>
                      {isSelected && (
                        <LuCheck className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                      )}
                    </li>
                  );
                })
              ) : (
                <li className="px-3 py-4 text-center text-xs text-slate-400 dark:text-slate-500">
                  No matching institutions found
                </li>
              )}

              {/* Allow Custom Value Entry if not an exact match */}
              {allowCustom && searchQuery.trim() && !exactMatchExists && (
                <li
                  role="option"
                  aria-selected={value === searchQuery.trim()}
                  onClick={() => handleSelect(searchQuery.trim())}
                  onMouseEnter={() => setHighlightedIndex(filteredOptions.length)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors border-t border-slate-100 dark:border-slate-800 mt-1",
                    highlightedIndex === filteredOptions.length
                      ? "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300"
                      : "text-purple-600 dark:text-purple-400"
                  )}
                >
                  <span className="text-xs truncate font-medium">
                    Use &ldquo;<span className="font-semibold">{searchQuery.trim()}</span>&rdquo; as institution
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 ml-2 shrink-0">
                    Custom
                  </span>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
