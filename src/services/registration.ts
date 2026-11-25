import { setPassword, updateMe } from './auth';
import { ApiError } from './client';
import type { UpdateUserInput } from './types';

interface RegistrationInput {
  name: string;
  password: string;
}

interface RegistrationSteps {
  updateMe: (patch: UpdateUserInput) => Promise<unknown>;
  setPassword: (password: string) => Promise<void>;
}

const defaultSteps: RegistrationSteps = { updateMe, setPassword };

export async function completeRegistration(
  input: RegistrationInput,
  steps: RegistrationSteps = defaultSteps,
): Promise<void> {
  await steps.updateMe({ name: input.name });

  try {
    await steps.setPassword(input.password);
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 409) throw error;
  }
}
