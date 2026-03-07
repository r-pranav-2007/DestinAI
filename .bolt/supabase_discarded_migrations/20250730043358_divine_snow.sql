/*
  # Add Category column to destinations table

  1. Changes
    - Add Category column to destinations table
    - Update existing data with appropriate categories based on destination names
    - Set default category values

  2. Security
    - No changes to RLS policies needed
*/

-- Add Category column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'destinations' AND column_name = 'Category'
  ) THEN
    ALTER TABLE destinations ADD COLUMN "Category" text DEFAULT 'Domestic';
  END IF;
END $$;

-- Update categories based on destination names
-- International destinations
UPDATE destinations 
SET "Category" = 'International' 
WHERE "Name" IN (
  'Amsterdam', 'Bali', 'Bangkok', 'Barcelona', 'Cairo',
  'Dubai', 'London', 'Paris', 'Tokyo', 'New York',
  'Rome', 'Sydney', 'Singapore', 'Istanbul', 'Prague',
  'Vienna', 'Zurich', 'Copenhagen', 'Stockholm', 'Oslo'
);

-- Domestic destinations (Indian destinations)
UPDATE destinations 
SET "Category" = 'Domestic' 
WHERE "Name" IN (
  'Andaman Islands', 'Goa', 'Jaipur', 'Kashmir', 'Kerala',
  'Ladakh', 'Manali', 'Ooty', 'Shimla', 'Udaipur',
  'Agra', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai',
  'Kolkata', 'Pune', 'Hyderabad', 'Kochi', 'Mysore',
  'Rishikesh', 'Haridwar', 'Varanasi', 'Pushkar', 'Hampi'
);

-- Set remaining destinations as Domestic by default (assuming they are Indian destinations)
UPDATE destinations 
SET "Category" = 'Domestic' 
WHERE "Category" IS NULL OR "Category" = '';