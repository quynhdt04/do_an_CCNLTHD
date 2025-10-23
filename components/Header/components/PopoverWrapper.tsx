// components/header/PopoverWrapper.tsx
"use client"; // <-- Thêm dòng này vì chúng ta sẽ dùng hook (useState)

import React, { useState } from "react";

interface PopoverWrapperProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function PopoverWrapper({
  trigger,
  children,
  className = "",
}: PopoverWrapperProps) {
  // Sử dụng state để quản lý việc hiển thị popover
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Bắt sự kiện mouseEnter và mouseLeave trên thẻ div bao ngoài cùng
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {trigger}
      {/* 
        Thay thế `hidden group-hover:block` bằng logic dựa trên state 'isOpen'.
        Nếu isOpen là true, thêm class 'block', ngược lại thêm class 'hidden'.
      */}
      <div
        className={`absolute right-0 top-full mt-2 bg-white shadow-lg border border-gray-200 rounded-md z-50 ${className} ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}