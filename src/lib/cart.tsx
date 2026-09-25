import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

/** Cart line stored in the bag. `price` is rendered as 0 until real MuDi retail
 * pricing is confirmed for Uzbekistan (catalog `price` is number | null). */
export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  brandName: string;
  price: number;
  seed: string;
  shade?: string;
  volume: string;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addLine: (product: Product, quantity?: number, shade?: string) => void;
  setQuantity: (productId: string, shade: string | undefined, quantity: number) => void;
  removeLine: (productId: string, shade?: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "mudi-cart-v1";

const sameLine = (
  a: Pick<CartLine, "productId" | "shade">,
  b: Pick<CartLine, "productId" | "shade">,
) => a.productId === b.productId && a.shade === b.shade;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartLine[]) : [];
    } catch {
      return [];
    }
  });
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable — cart lives in memory only
    }
  }, [lines]);

  const addLine = useCallback((product: Product, quantity = 1, shade?: string) => {
    setLines((prev) => {
      const key = { productId: product.id, shade };
      const existing = prev.find((l) => sameLine(l, key));
      const price = product.price ?? 0;
      if (existing) {
        return prev.map((l) =>
          sameLine(l, key) ? { ...l, quantity: Math.min(l.quantity + quantity, 99) } : l,
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          brandName: product.brandId.toUpperCase(),
          price,
          seed: product.seed,
          shade,
          volume: product.volume,
          quantity,
        },
      ];
    });
    setDrawerOpen(true);
  }, []);

  const setQuantity = useCallback((productId: string, shade: string | undefined, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => !sameLine(l, { productId, shade }))
        : prev.map((l) =>
            sameLine(l, { productId, shade }) ? { ...l, quantity: Math.min(quantity, 99) } : l,
          ),
    );
  }, []);

  const removeLine = useCallback((productId: string, shade?: string) => {
    setLines((prev) => prev.filter((l) => !sameLine(l, { productId, shade })));
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, l) => sum + l.quantity, 0);
    const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
    return {
      lines,
      count,
      subtotal,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      addLine,
      setQuantity,
      removeLine,
      clear,
    };
  }, [lines, isDrawerOpen, openDrawer, closeDrawer, addLine, setQuantity, removeLine, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
