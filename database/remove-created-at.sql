-- Migration: Remove created_at columns from all tables
-- Database: db_lumixor_studio

USE db_lumixor_studio;

-- Remove created_at from users table
ALTER TABLE users DROP COLUMN created_at;

-- Remove created_at from items table
ALTER TABLE items DROP COLUMN created_at;

-- Remove created_at from loans table
ALTER TABLE loans DROP COLUMN created_at;