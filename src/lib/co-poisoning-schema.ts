import { z } from "zod";

const optionalInt = z
  .union([z.number().int(), z.null()])
  .optional()
  .transform((v) => (v === undefined ? null : v));

const optionalFloat = z
  .union([z.number(), z.null()])
  .optional()
  .transform((v) => (v === undefined ? null : v));

const optionalString = z
  .union([z.string(), z.null()])
  .optional()
  .transform((v) => {
    if (v === undefined || v === null) return null;
    const trimmed = v.trim();
    return trimmed.length ? trimmed : null;
  });

export const coPoisoningCaseSchema = z.object({
  poisonedAt: z.string().min(1, "Огноо шаардлагатай"),
  epi: optionalInt,
  reportingOrganization: optionalString,
  address: optionalString,
  locationType: optionalString,
  provinceName: optionalString,
  provinceId: optionalInt,
  soumName: optionalString,
  soumId: optionalInt,
  khorooSoum: optionalString,
  code: optionalString,
  age: optionalInt,
  gender: z
    .union([z.literal(1), z.literal(2), z.null()])
    .optional()
    .transform((v) => (v === undefined ? null : v)),
  hospitalArrival: optionalInt,
  physicalCondition: optionalString,
  outcome: optionalInt,
  hbco: optionalFloat,
  household: optionalInt,
  cause: optionalString,
  khoroo: optionalInt,
});

export type CoPoisoningCaseInput = z.infer<typeof coPoisoningCaseSchema>;

export function toCaseData(body: CoPoisoningCaseInput) {
  return {
    poisonedAt: new Date(body.poisonedAt),
    epi: body.epi,
    reportingOrganization: body.reportingOrganization,
    address: body.address,
    locationType: body.locationType,
    provinceName: body.provinceName,
    provinceId: body.provinceId,
    soumName: body.soumName,
    soumId: body.soumId,
    khorooSoum: body.khorooSoum,
    code: body.code,
    age: body.age,
    gender: body.gender,
    hospitalArrival: body.hospitalArrival,
    physicalCondition: body.physicalCondition,
    outcome: body.outcome,
    hbco: body.hbco,
    household: body.household,
    cause: body.cause,
    khoroo: body.khoroo,
  };
}

export function serializeCase<T extends { poisonedAt: Date; createdAt: Date; updatedAt: Date }>(
  record: T
) {
  return {
    ...record,
    poisonedAt: record.poisonedAt.toISOString(),
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
