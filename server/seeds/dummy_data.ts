import { Knex } from "knex";
import { hashPassword } from "../utils/hash";
import { faker } from '@faker-js/faker';


export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("notification").del();
  await knex("drug_instruction").del();
  await knex("patient").del();
  await knex("diagnosis").del();
  await knex("medicine").del();
  await knex("drug_shape").del();
  await knex("doctor").del();

  // Inserts seed entries
  await knex("drug_shape").insert([
    { id: 1, shape: "Oval" },
    { id: 2, shape: "Round" },
    { id: 3, shape: "Capsule" },
    { id: 4, shape: "Tablet" },
  ]);

  await knex("doctor").insert([
    {
      id: 1,
      name: "Dr. John Doe",
      specialty: "General Practitioner",
      username: "jdoe",
      password: "password123",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialty: "Cardiologist",
      username: "jsmith",
      password: "password456",
    },
  ]);

  await knex("diagnosis").insert([
    {
      id: 1,
      name: "Common Cold",
      doctor_id: 1,
      remarks: "Typical cold symptoms, no additional concerns.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "High Blood Pressure",
      doctor_id: 2,
      remarks: "Patient has elevated blood pressure, monitoring required.",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  await knex("medicine").insert([
    {
      id: 1,
      name: "Aspirin",
      generic_drug: "Acetylsalicylic Acid",
      description: "Pain reliever and anti-inflammatory.",
      dosage: 325,
      unit_measurement: 1,
      type: "Oral",
      drug_shape_id: 4,
      color: "White",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Atorvastatin",
      generic_drug: "Atorvastatin Calcium",
      description: "Lowers cholesterol levels.",
      dosage: 10,
      unit_measurement: 1,
      type: "Oral",
      drug_shape_id: 4,
      color: "Blue",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  for (let i = 0; i < 100; i++) {
    const firstName_data = faker.person.firstName()
    const lastName_data = faker.person.lastName()
    const gender_data = faker.person.sex()
    const phone_data = faker.phone.number()

    await knex("patient").insert([
      {
        id: i + 1,
        register_id: Math.floor(Math.random() * 100) + 1,
        firstName: firstName_data,
        lastName: lastName_data,
        gender: gender_data,
        blood: "O",
        password: await hashPassword("password1"),
        hkid: "y1234567",
        birth_date: new Date("1980-01-01"),
        phone_number: phone_data,
        diagnosis_id: 1,
        emergency_name: "Jane Doe",
        emergency_contact: phone_data,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  }


  await knex("drug_instruction").insert([
    {
      id: 1,
      medicine_id: 1,
      diagnosis_id: 1,
      unit_measurement: 1,
      total_quantity: 30,
      method: "Oral",
      taken_count_today: 1,
      taken_count: 3,
      period_day: 10,
      period_hr: 0,
      frequency_per_day: 3,
      dosage_per_serving: 1,
      remarks: "Take 1 tablet 3 times a day with food.",
    },
    {
      id: 2,
      medicine_id: 2,
      diagnosis_id: 2,
      unit_measurement: 1,
      total_quantity: 60,
      method: "Oral",
      taken_count_today: 1,
      taken_count: 1,
      period_day: 30,
      period_hr: 0,
      frequency_per_day: 1,
      dosage_per_serving: 1,
      remarks: "Take 1 tablet once a day with food.",
    },
  ]);

  await knex("notification").insert([
    {
      id: 1,
      patient_id: 1,
      send_at: new Date(),
      taken: false,
      taken_at: new Date(),
      drug_instruction_id: 1,
    },
    {
      id: 2,
      patient_id: 2,
      send_at: new Date(),
      taken: false,
      taken_at: new Date(),
      drug_instruction_id: 2,
    },
  ]);
}
