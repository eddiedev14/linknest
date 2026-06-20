import { z } from 'zod';

function validateField(schema: z.ZodObject, field: string, value: unknown): string {
  // Get the scheme for that field
  const fieldSchema = schema.shape[field];

  if (!fieldSchema) {
    return '';
  }

  // Validate the value with the scheme field
  const result = fieldSchema.safeParse(value);

  if (!result.success) {
    return result.error.issues[0]?.message as string;
  }

  return '';
}

export { validateField };
