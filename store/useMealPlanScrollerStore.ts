import { RefObject, createRef } from "react";
import { create } from "zustand";

interface MealPlanScrollerStore {
    scrollLeft: number;
    clientX: number;
    setClientX: (clientX: number) => void;
    scrollX: number;
    setScrollX: (scrollX: number) => void;
    isScrolling: boolean;
    setIsScrolling: (isScrolling: boolean) => void;
    handleMouseDown: (e: React.MouseEvent<HTMLUListElement, MouseEvent>, ref: RefObject<HTMLUListElement> ) => void;
    handleMouseUp: () => void;
    onMouseMove: (e: React.MouseEvent<HTMLUListElement, MouseEvent>, ref: RefObject<HTMLUListElement>) => void;
}

export const useMealPlanScrollerStore = create<MealPlanScrollerStore>((set, get) => ({
    scrollLeft: 0,
    clientX: 0,
    setClientX: (clientX: number) => set({ clientX }),
    scrollX: 0,
    setScrollX: (scrollX: number) => set({ scrollX }),
    isScrolling: false,
    setIsScrolling: (isScrolling: boolean) => set({ isScrolling }),
    handleMouseDown: (e: React.MouseEvent<HTMLUListElement, MouseEvent>, ref: RefObject<HTMLUListElement>) => {
        set({ clientX: e.clientX, isScrolling: true });
        if (ref.current) {
            set({ scrollX: ref.current!.scrollLeft });
        }
    },
    handleMouseUp: () => set({ isScrolling: false }),
    onMouseMove: (e: React.MouseEvent<HTMLUListElement, MouseEvent>, ref: RefObject<HTMLUListElement>) => {
        if (get().isScrolling && ref.current) {
            const x = get().scrollX - e.clientX + get().clientX
            set({scrollLeft: x});
        }
    }

}));

