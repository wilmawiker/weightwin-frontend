// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IWorkout {
  exercises: IExerciseToAdd[];
  planned: boolean;
}

export interface IExerciseToAdd {
  name: string;
  exerciseId: string;
  set: ISet[];
}
export interface ISet {
  id: number;
  reps: number;
  weight: number;
}

export const deafultWorkout: IWorkout = {
  exercises: [
    {
      name: "",
      exerciseId: "",
      set: [
        {
          id: 0,
          reps: 0,
          weight: 0,
        },
      ],
    },
  ],
  planned: false,
};
