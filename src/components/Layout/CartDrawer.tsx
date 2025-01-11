import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/context/cart.types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MercadoPagoButton } from '@/components/MercadoPagoButton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FaMinus, FaPlus, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { toast } from '@/hooks/use-toast';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total } = useCart();

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemoveItem = (item: CartItem) => {
    removeItem(item.id);
    toast({
      title: "Eliminado del carrito",
      description: "El template ha sido eliminado del carrito"
    });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <FaShoppingCart className="mr-2" />
            Carrito de Compras
          </SheetTitle>
          <SheetDescription>
            Aquí puedes ver los items en tu carrito y proceder al pago
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-8">
            <FaShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 my-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="h-20 w-20 relative rounded-md overflow-hidden">
                      <img
                        src={item.image || '/placeholder.png'}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ${item.price}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        >
                          <FaMinus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        >
                          <FaPlus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                          onClick={() => handleRemoveItem(item)}
                        >
                          <FaTrash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 mt-4">
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold">${total.toFixed(2)}</span>
              </div>
              <MercadoPagoButton items={items} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
