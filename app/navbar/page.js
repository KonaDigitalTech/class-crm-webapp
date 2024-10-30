'use client'
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { toggleNavbar } from '@/lib/features/navbar/navbarSlice';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.nav.isOpen);

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <button onClick={() => dispatch(toggleNavbar())}>
        {isOpen ? 'Close' : 'Open'} Navbar
      </button>
    </nav>
  );
};

export default Navbar;