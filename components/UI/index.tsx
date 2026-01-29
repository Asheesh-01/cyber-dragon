"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-xl p-6
        transition-all duration-300
        ${hover ? "hover:-translate-y-1 hover:border-white/20" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "secondary";
  className?: string;
}

export function Badge({
  children,
  variant = "secondary",
  className = "",
}: BadgeProps) {
  const variantClasses = {
    primary: "bg-blue-600/20 text-blue-300 border-blue-600/30",
    success: "bg-green-600/20 text-green-300 border-green-600/30",
    warning: "bg-yellow-600/20 text-yellow-300 border-yellow-600/30",
    danger: "bg-red-600/20 text-red-300 border-red-600/30",
    secondary: "bg-white/10 text-gray-300 border-white/20",
  };

  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-0.5
        rounded-full
        text-xs font-medium
        border
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showLabel = true,
}: ProgressBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          <span className="text-sm font-medium text-blue-400">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/20">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    outline: "border border-blue-600 text-blue-400 hover:bg-blue-600/10",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      disabled={loading || disabled}
      className={`
        rounded-lg font-medium
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon = "📭",
  title,
  description,
  actionLabel,
  actionHref,
  action,
}: EmptyStateProps) {
  const Link = require("next/link").default;
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-center mb-6 max-w-md">{description}</p>
      {actionHref && actionLabel ? (
        <Link href={actionHref}>
          <Button>{actionLabel}</Button>
        </Link>
      ) : action ? (
        <Button onClick={action.onClick}>{action.label}</Button>
      ) : null}
    </div>
  );
}

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          border-2 border-white/20 border-t-blue-500
          rounded-full
          animate-spin
          ${sizeClasses[size]}
        `}
      />
    </div>
  );
}

interface TabsProps {
  items?: Array<{ label: string; value: string; content: React.ReactNode }>;
  tabs?: Array<{ id: string; label: string }>;
  defaultValue?: string;
  onChange?: (value: string) => void;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

export function Tabs({ 
  items, 
  tabs,
  defaultValue, 
  onChange,
  activeTab: externalActiveTab,
  onTabChange,
}: TabsProps) {
  const [internalActiveTab, setInternalActiveTab] = React.useState(defaultValue || items?.[0]?.value || tabs?.[0]?.id || "");
  const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;
  
  const handleTabChange = (value: string) => {
    if (externalActiveTab === undefined) {
      setInternalActiveTab(value);
    }
    onChange?.(value);
    onTabChange?.(value);
  };

  const tabItems = items || tabs || [];

  return (
    <div>
      <div className="flex border-b border-white/10 mb-6 overflow-x-auto">
        {tabItems.map((item) => {
          const value = (item as any).value || (item as any).id;
          const label = item.label;
          
          return (
            <button
              key={value}
              onClick={() => handleTabChange(value)}
              className={`
                px-4 py-2 font-medium transition-colors whitespace-nowrap
                ${
                  activeTab === value
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-white"
                }
              `}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div>
        {items?.find((item) => item.value === activeTab)?.content}
      </div>
    </div>
  );
}

interface AlertProps {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  message: string;
  onClose?: () => void;
}

export function Alert({
  type = "info",
  title,
  message,
  onClose,
}: AlertProps) {
  const typeClasses = {
    info: "bg-blue-600/10 border-blue-600/30 text-blue-300",
    success: "bg-green-600/10 border-green-600/30 text-green-300",
    warning: "bg-yellow-600/10 border-yellow-600/30 text-yellow-300",
    error: "bg-red-600/10 border-red-600/30 text-red-300",
  };

  return (
    <div
      className={`
        p-4 rounded-lg border
        ${typeClasses[type]}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <p>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-current opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

interface GridProps {
  children: React.ReactNode;
  cols?: number;
  className?: string;
}

export function Grid({
  children,
  cols = 3,
  className = "",
}: GridProps) {
  return (
    <div
      className={`
        grid gap-6
        grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
