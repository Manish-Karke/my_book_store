ALTER TABLE "warehouses" RENAME TO "wareHouses";--> statement-breakpoint
ALTER TABLE "wareHouses" RENAME COLUMN "updated_At" TO "updated_at";--> statement-breakpoint
ALTER TABLE "wareHouses" RENAME COLUMN "created_At" TO "created_at";--> statement-breakpoint
ALTER TABLE "delivery_Person" DROP CONSTRAINT "delivery_Person_warehouses_id_warehouses_id_fk";
--> statement-breakpoint
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_warehouse_id_warehouses_id_fk";
--> statement-breakpoint
ALTER TABLE "delivery_Person" ADD CONSTRAINT "delivery_Person_warehouses_id_wareHouses_id_fk" FOREIGN KEY ("warehouses_id") REFERENCES "public"."wareHouses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_warehouse_id_wareHouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."wareHouses"("id") ON DELETE cascade ON UPDATE no action;