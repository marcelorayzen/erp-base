-- Execute no Supabase SQL editor após criar tabelas via Prisma.
-- Estratégia: usar jwt claim tenant_id para filtragem por linha.

alter table "Customer" enable row level security;
alter table "FinancialTransaction" enable row level security;
alter table "SalesOrder" enable row level security;
alter table "SalesOrderItem" enable row level security;
alter table "PixCharge" enable row level security;
alter table "PixWebhookEvent" enable row level security;
alter table "FiscalDocument" enable row level security;
alter table "StockItem" enable row level security;
alter table "InventoryMovement" enable row level security;
alter table "WhatsAppMessage" enable row level security;
alter table "Notification" enable row level security;
alter table "AuditLog" enable row level security;
alter table "CompanySettings" enable row level security;

create policy tenant_isolation_customer on "Customer"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));

create policy tenant_isolation_transaction on "FinancialTransaction"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));

create policy tenant_isolation_sales_order on "SalesOrder"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));

create policy tenant_isolation_sales_item on "SalesOrderItem"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));

create policy tenant_isolation_pix_charge on "PixCharge"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));

create policy tenant_isolation_pix_event on "PixWebhookEvent"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));

create policy tenant_isolation_fiscal on "FiscalDocument"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));

create policy tenant_isolation_stock on "StockItem"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));

create policy tenant_isolation_movement on "InventoryMovement"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));

create policy tenant_isolation_whatsapp on "WhatsAppMessage"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));

create policy tenant_isolation_notification on "Notification"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));

create policy tenant_isolation_audit on "AuditLog"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));

create policy tenant_isolation_settings on "CompanySettings"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));
