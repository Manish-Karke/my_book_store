import { DeliveryPerson, Inventory, warehouse } from "@/types";
import { api } from "./client";

export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const createProduct = async (data: FormData) => {
  const response = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllWarehouses = async () => {
  const response = await api.get("/warehouse");
  return await response.data;
};

export const createWarehouse = async (data: warehouse) => {
  const response = await api.post("/warehouse", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getAllDeliveryPersons = async () => {
  const response = await api.get("/delivery-person");
  return response.data;
};

export const createDeliveryPerson = async (data: DeliveryPerson) => {
  const response = await api.post("/delivery-person", data);
  return response.data;
};

export const getAllInventoriers = async () => {
  const response = await api.get("/inventories");
  return response.data;
};

export const createInventories = async (data: Inventory) => {
  const response = await api.post("/inventories", data);
  return response.data;
};
