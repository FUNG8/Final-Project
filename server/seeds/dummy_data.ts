import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
  await knex('notification').del();
  await knex('drug_instruction').del();
  await knex('diagnosis').del();
  await knex('doctor').del();
  await knex('medicine').del();
  await knex('patient').del();
  await knex('admin').del();

  // Inserts seed entries
  await knex('admin').insert([
    { id: 1, username: 'admin', password: 'password' },
  ]);

  await knex('patient').insert([
    {
      id: 1,
      name: 'John Doe',
      password: 'password123',
      id_number: '123456789',
      birth_date: '1980-01-01',
      phone_number: '555-1234',
      diagnosis_id: 1,
      emergency_name: 'Jane Doe',
      emergency_contact: '555-5678',
      updated_at: '2023-06-01 12:00:00',
      created_at: '2023-05-01 10:00:00',
    },
    {
      id: 2,
      name: 'Jane Smith',
      password: 'password456',
      id_number: '987654321',
      birth_date: '1985-05-15',
      phone_number: '555-9012',
      diagnosis_id: 2,
      emergency_name: 'John Smith',
      emergency_contact: '555-3456',
      updated_at: '2023-06-02 14:30:00',
      created_at: '2023-05-15 09:00:00',
    },
  ]);

  await knex('medicine').insert([
    {
      id: 1,
      name: 'Aspirin',
      generic_drug: 'Acetylsalicylic Acid',
      description: 'Pain relief and anti-inflammatory medication',
      dosage: 500,
      type: 'Tablet',
      shape: 'Round',
      color: 'White',
      created_at: '2022-01-01 00:00:00',
      updated_at: '2022-01-01 00:00:00',
    },
    {
      id: 2,
      name: 'Ibuprofen',
      generic_drug: 'Ibuprofen',
      description: 'Pain relief and anti-inflammatory medication',
      dosage: 200,
      type: 'Capsule',
      shape: 'Oval',
      color: 'Blue',
      created_at: '2022-03-15 00:00:00',
      updated_at: '2022-03-15 00:00:00',
    },
  ]);

  await knex('diagnosis').insert([
    {
      id: 1,
      name: 'Headache',
      doctor_id: 1,
      remarks: 'Mild tension headache',
      updated_at: '2023-06-01 12:00:00',
      created_at: '2023-05-01 10:00:00',
    },
    {
      id: 2,
      name: 'Fever',
      doctor_id: 2,
      remarks: 'Viral infection',
      updated_at: '2023-06-02 14:30:00',
      created_at: '2023-05-15 09:00:00',
    },
  ]);

  await knex('doctor').insert([
    {
      id: 1,
      name: 'Dr. John Smith',
      specialty: 'General Practitioner',
    },
    {
      id: 2,
      name: 'Dr. Jane Johnson',
      specialty: 'Pediatrician',
    },
  ]);

  await knex('drug_instruction').insert([
    {
      id: 1,
      medicine_id: 1,
      diagnosis_id: 1,
      total_quantity: 20,
      method: 'Oral',
      taken_count_today: 1,
      taken_count: 5,
      period_day: 1,
      period_hr: 6,
      frequency_per_day: 3,
      dosage_per_serving: 1,
      remarks: 'Take with food',
      notification_id: 1,
    },
    {
      id: 2,
      medicine_id: 2,
      diagnosis_id: 2,
      total_quantity: 30,
      method: 'Oral',
      taken_count_today: 2,
      taken_count: 10,
      period_day: 1,
      period_hr: 8,
      frequency_per_day: 4,
      dosage_per_serving: 2,
      remarks: 'Take with water',
      notification_id: 2,
    },
  ]);

  await knex('notification').insert([
    {
      id: 1,
      patient_id: 1,
      medicine_id: 1,
      send_at: '2023-06-01 08:00:00',
      taken: true,
      taken_at: '2023-06-01 08:15:00',
    },
    {
      id: 2,
      patient_id: 2,
      medicine_id: 2,
      send_at: '2023-06-02 10:00:00',
      taken: false,
      taken_at: null,
    },
  ]);
};
