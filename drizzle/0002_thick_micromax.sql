CREATE TABLE "warehouses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"pincode" varchar(6) NOT NULL,
	"updated_At" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_At" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "description" SET DATA TYPE varchar;--> statement-breakpoint
CREATE INDEX "pincode_idx" ON "warehouses" USING btree ("pincode");