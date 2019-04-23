ALTER TABLE public.settings
    ADD COLUMN "dailyFee" numeric(24, 2);

ALTER TABLE public.settings
    ADD COLUMN capacity integer;