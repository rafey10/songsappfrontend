import { ReactNode } from "react";

export type ToastMessageType = 'error' | 'info' | 'success' | 'warning';
export interface ToastMessage {
    type: ToastMessageType;
    text: ReactNode;
    title?: string;
    to?: string;
}