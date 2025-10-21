import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeliveryPerson } from "@/http/api";
import { DeliveryPerson } from "@/types";
import { toast } from "sonner";
import CreateDeliveryPersonForm, { FormValues } from "./create-delivery-person-form";
import { useNewInventory } from "@/store/inventories/inventory-store";

const DeliveryPersonSheet = () => {
  const { isOpen, onClose } = useNewInventory();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-Inventories"],
    mutationFn: (data: DeliveryPerson) => createDeliveryPerson(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Inventories"] });
      toast("inventory has been created");
      onClose();
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate(values as unknown as DeliveryPerson);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Create Delivery Person</SheetTitle>
          <SheetDescription>Create a new delivery person</SheetDescription>
        </SheetHeader>
        <CreateDeliveryPersonForm onSubmit={onSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  );
};

export default DeliveryPersonSheet;
