CREATE OR REPLACE FUNCTION get_doctors_by_specialization_and_state(
  input_specialization_id INT,
  input_state VARCHAR
)
RETURNS TABLE (
  "id" UUID,
  "title" TEXT,
  "firstName" VARCHAR,
  "lastName" VARCHAR,
  "specializations" TEXT,
  "fullAddress" TEXT,
  "consultationType" TEXT,
  "firstConsultationFee" NUMERIC,
  "nextAvailableSlot" TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
DECLARE
  local_timezone TEXT := 'America/Argentina/Buenos_Aires';
BEGIN
  RETURN QUERY
  WITH filtered_doctors AS (
    SELECT d.*, o."id" AS "officeId",
           o."doctorId", o."timeSlotPerClientInMin", o."firstConsultationFee",
           o."followupConsultationFee", o."streetAddress", o."city", o."state",
           o."zip", o."apartment", o."phone", o."email", o."consultationType"
    FROM doctors d
    JOIN doctor_specialization ds ON ds."doctorId" = d."id"
    JOIN offices o ON o."doctorId" = d."id"
    WHERE ds."specializationId" = input_specialization_id
      AND o."state" ILIKE input_state
  ),
  specializations_per_doctor AS (
    SELECT
      d."id" AS "doctorId",
      STRING_AGG(s."name", ', ') AS "specializations"
    FROM doctors d
    JOIN doctor_specialization ds ON ds."doctorId" = d."id"
    JOIN specializations s ON s."id" = ds."specializationId"
    GROUP BY d."id"
  ),
  day_series AS (
    SELECT generate_series(CURRENT_DATE, CURRENT_DATE + INTERVAL '13 days', INTERVAL '1 day')::date AS day
  ),
  raw_slots AS (
    SELECT
      fd."id" AS doctorId,
      fd."officeId",
      (ds.day + a."startTime"::time + (n * (fd."timeSlotPerClientInMin")::int || ' minutes')::interval)::timestamptz AS "slotTime"
    FROM filtered_doctors fd
    JOIN office_doctor_availability a ON a."officeId" = fd."officeId"
    CROSS JOIN day_series ds
    CROSS JOIN generate_series(0, 20) AS n -- hasta 20 slots por día
    WHERE LOWER(TRIM(a."dayOfWeek")) = LOWER(TO_CHAR(ds.day, 'FMDay'))
  ),
  filtered_slots AS (
    SELECT s.*
    FROM raw_slots s
    LEFT JOIN office_doctor_exceptions e
      ON e."officeId" = s."officeId"
     AND s."slotTime" >= e."startDateTime"
     AND s."slotTime" < e."endDateTime"
     AND e."isAvailable" = FALSE
    LEFT JOIN appointments ap
      ON ap."officeId" = s."officeId"
     AND ap."probableStartTime" = s."slotTime"
    WHERE e."id" IS NULL
      AND ap."id" IS NULL
      AND s."slotTime" > (now() AT TIME ZONE local_timezone) -- Evitar turnos en el pasado
  ),
  next_slot_per_doctor AS (
    SELECT
      doctorId as "doctorId",
      MIN("slotTime") AS "nextAvailableSlot"
    FROM filtered_slots
    GROUP BY doctorId
  )
  SELECT
    d."id",
    d."title",
    d."firstName",
    d."lastName",
    spd."specializations",
    o."streetAddress" || ' ' || COALESCE(o."apartment", '') || ', ' || o."city" || ', ' || o."state" || ' ' || o."zip" AS "fullAddress",
    o."consultationType"::TEXT,
    o."firstConsultationFee",
    nas."nextAvailableSlot"
  FROM filtered_doctors o
  JOIN doctors d ON d."id" = o."doctorId"
  JOIN specializations_per_doctor spd ON spd."doctorId" = d."id"
  LEFT JOIN next_slot_per_doctor nas ON nas."doctorId" = d."id";
END;
$$;
