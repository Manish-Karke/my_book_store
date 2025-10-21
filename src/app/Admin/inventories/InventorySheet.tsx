
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInventories } from "@/http/api";
import { InventoryData } from "@/types";
import { toast } from "sonner";
import CreateInventoryForm, {
  FormValues,
} from "./create-delivery-inventory-form";
import { useNewInventory } from "@/store/inventories/inventory-store";

const DeliveryPersonSheet = () => {
  const { isOpen, onClose } = useNewInventory();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-Inventories"],
    mutationFn: (data: InventoryData) => createInventories(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] }); // ✅ fixed
      toast("Inventory has been created");
      onClose();
    },
    onError: () => {
      toast.error("Failed to create inventory");
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate(values as InventoryData);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Create Inventory</SheetTitle>
          <SheetDescription>Create a new Inventory</SheetDescription>
        </SheetHeader>
        <CreateInventoryForm onSubmit={onSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  );
};

export default DeliveryPersonSheet;
