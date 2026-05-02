"use client";

import { createContext, useContext, useState } from "react";
import ContactModal from "./ContactModal";

type ModalCtx = { openModal: () => void; closeModal: () => void };

const ModalContext = createContext<ModalCtx>({ openModal: () => {}, closeModal: () => {} });

export function useModal() {
  return useContext(ModalContext);
}

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ModalContext.Provider>
  );
}
