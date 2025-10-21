import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWarehouse } from '@/http/api';
import { toast } from "sonner"


import { warehouse } from '@/types';
import CreateWarehouseForm, { FormValues } from './create-wareHouse-form';
import { useNewWarehouse } from '@/store/warehouse/warehouse-store';

const WarehouseSheet = () => {
   

    const { isOpen, onClose } = useNewWarehouse();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['create-warehouse'],
        mutationFn: (data: warehouse) => createWarehouse(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouses'] });
            toast("wareHouse has been created ");
                 onClose();
        },
    });

    const onSubmit = (values: FormValues) => {
        mutate(values as warehouse);
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="min-w-[28rem] space-y-4">
                <SheetHeader>
                    <SheetTitle>Create Warehouse</SheetTitle>
                    <SheetDescription>Create a new warehouse</SheetDescription>
                </SheetHeader>
                <CreateWarehouseForm onSubmit={onSubmit} disabled={isPending} />
            </SheetContent>
        </Sheet>
    );
};

export default WarehouseSheet;