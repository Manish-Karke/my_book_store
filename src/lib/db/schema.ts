import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fname: varchar("fname", { length: 100 }).notNull(),
  lname: varchar("lname", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  provider: varchar("provider", { length: 20 }),
  externalId: varchar("externalId", { length: 100 }).notNull(),
  image: text("image"),
  role: varchar("role", { length: 100 }).notNull().default("customer"),
  updatedAt: timestamp("updated_At").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_At").default(sql`CURRENT_TIMESTAMP`),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  image: text("image"),
  description: varchar("description"),
  price: integer("price"),
  updatedAt: timestamp("updated_At").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_At").default(sql`CURRENT_TIMESTAMP`),
});

export const wareHouses = pgTable(
  "wareHouses",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    pincode: varchar("pincode", { length: 6 }).notNull(),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("pincode_idx").on(table.pincode)]
);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
});

export const deliveryPerson = pgTable("delivery_Person", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 14 }).notNull(),
  wareHousesId: integer("warehouses_id").references(() => wareHouses.id, {
    onDelete: "cascade",
  }),
  orderId: integer("order_id").references(() => orders.id, {
    onDelete: "set null",
  }),
  updatedAt: timestamp("updated_At").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_At").default(sql`CURRENT_TIMESTAMP`),
});

export const inventories = pgTable("inventories", {
  id: serial("id").primaryKey(),
  sku: varchar("sku", { length: 8 }).unique().notNull(),
  orderId: integer("order_id").references(() => orders.id, {
    onDelete: "set null",
  }),
  wareHousesId: integer("warehouse_id").references(() => wareHouses.id, {
    onDelete: "cascade",
  }),
  productId: integer("product_id").references(() => products.id, {
    onDelete: "cascade",
  }),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});
