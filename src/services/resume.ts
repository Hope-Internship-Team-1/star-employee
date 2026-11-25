export interface ResumeModuleStatus {
  key: string;
  status: 'empty' | 'filled';
}

export interface ResumeStatus {
  completeness: number;
  modules: ResumeModuleStatus[];
}

// Mocked until the CV endpoints exist on the backend.
export function getResumeStatus(): ResumeStatus {
  return {
    completeness: 0,
    modules: [
      { key: 'education', status: 'empty' },
      { key: 'work_history', status: 'empty' },
    ],
  };
}
